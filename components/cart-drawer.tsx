'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/cart-context'
import { CheckoutModal } from '@/components/checkout-modal'
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, Truck } from 'lucide-react'

// Dynamic script loader for Razorpay Checkout SDK
const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve(false)
    if ((window as any).Razorpay) return resolve(true)

    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export function CartDrawer() {
  const router = useRouter()
  const { cart, isCartOpen, closeCart, removeFromCart, updateQuantity, subtotal, totalItems, clearCart } = useCart()
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  if (!isCartOpen) return null

  const freeShippingThreshold = 1000
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100)
  const remainingForFreeShipping = freeShippingThreshold - subtotal

  // Direct Razorpay Payment Handler (Kept intact for quick re-enabling)
  const handleRazorpayPayment = async () => {
    setIsLoading(true)

    try {
      const isLoaded = await loadRazorpayScript()
      if (!isLoaded) {
        alert('Failed to load Razorpay SDK. Please check your internet connection.')
        setIsLoading(false)
        return
      }

      const res = await fetch('/api/razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: subtotal }),
      })

      const orderData = await res.json()

      if (!res.ok || !orderData.id) {
        throw new Error(orderData.error || 'Failed to initialize payment order.')
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Ishira Homeware',
        description: `Order for ${totalItems} item(s)`,
        order_id: orderData.id,
        handler: function (response: any) {
          const newOrder = {
            id: response.razorpay_order_id || `ORD-${Date.now()}`,
            paymentId: response.razorpay_payment_id,
            date: new Date().toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            }),
            items: [...cart],
            totalAmount: subtotal,
            status: 'Confirmed',
          }

          try {
            const existingOrders = JSON.parse(localStorage.getItem('my_orders') || '[]')
            localStorage.setItem('my_orders', JSON.stringify([newOrder, ...existingOrders]))
          } catch (e) {
            console.error('Failed to record order history', e)
          }

          localStorage.removeItem('ishira_cart_v1')
          clearCart()
          closeCart()
          router.push('/orders')
        },
        theme: {
          color: '#C86D51',
        },
      }

      const paymentObject = new (window as any).Razorpay(options)
      paymentObject.open()
    } catch (err: any) {
      console.error('Payment Error:', err)
      alert(err.message || 'Payment initialization failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
          onClick={closeCart}
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <div className="w-screen max-w-md bg-background border-l border-border shadow-2xl flex flex-col justify-between z-10 animate-slide-left">

            {/* Header */}
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-terracotta" />
                <h2 className="font-serif text-2xl font-light text-foreground">Your Shopping Bag</h2>
                <span className="px-2 py-0.5 bg-muted text-muted-foreground font-sans text-xs font-medium rounded-full">
                  {totalItems}
                </span>
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors rounded-full"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Bar */}
            <div className="bg-sand/40 px-6 py-3 border-b border-border/60">
              <div className="flex justify-between items-center font-sans text-xs mb-1.5">
                <span className="text-foreground font-medium flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-terracotta" />
                  {remainingForFreeShipping <= 0 ? (
                    <span className="text-emerald-700 font-semibold">You unlocked FREE Shipping in Bangalore!</span>
                  ) : (
                    <span>Add <strong className="text-terracotta">₹{remainingForFreeShipping.toLocaleString('en-IN')}</strong> more for Free Shipping</span>
                  )}
                </span>
                <span className="text-muted-foreground font-sans text-[10px]">₹3,000 threshold</span>
              </div>
              <div className="w-full bg-border/60 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-terracotta h-full transition-all duration-500 ease-out"
                  style={{ width: `${progressToFreeShipping}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 divide-y divide-border/60">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-16">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-serif text-2xl font-light text-foreground">Your bag is empty</h3>
                    <p className="font-sans text-xs text-muted-foreground max-w-xs leading-relaxed">
                      Discover handcrafted ceramic pieces designed to bring quiet elegance to your everyday rituals.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={closeCart}
                    className="mt-2 px-6 py-3 bg-foreground text-background hover:bg-terracotta font-sans text-xs font-medium uppercase tracking-widest transition-colors duration-200 cursor-pointer"
                  >
                    Explore Catalogue
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.product.id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                    {/* Item Image */}
                    <div className="relative w-20 h-24 bg-sand/40 border border-border/60 rounded-xs overflow-hidden shrink-0">
                      <Image
                        src={item.product.imageSrc}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Item Info & Controls */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h4 className="font-serif text-lg font-normal text-foreground leading-snug">
                            {item.product.name}
                          </h4>
                          <span className="font-sans text-[11px] text-muted-foreground">
                            {item.product.category}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-muted-foreground hover:text-destructive p-1 transition-colors cursor-pointer"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        {/* Quantity Counter */}
                        <div className="flex items-center border border-border">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1.5 hover:bg-muted text-foreground transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center font-sans text-xs font-medium">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1.5 hover:bg-muted text-foreground transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="font-sans text-sm font-semibold text-foreground">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Summary CTA */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-border bg-background flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center font-sans text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold text-foreground text-base">
                      ₹{subtotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <p className="font-sans text-[11px] text-muted-foreground">
                    Taxes included. Free shipping in Bangalore applied on qualified orders.
                  </p>
                </div>

                {/* Paused Ordering Button */}
                <button
                  type="button"
                  disabled={true}
                  className="w-full py-4 bg-muted text-muted-foreground font-sans text-xs font-medium uppercase tracking-widest cursor-not-allowed opacity-80 border border-border flex items-center justify-center text-center"
                >
                  Ordering Temporarily Paused
                </button>

                <div className="flex items-center justify-center gap-2 font-sans text-[10px] text-muted-foreground uppercase tracking-widest pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-terracotta" />
                  256-Bit Encrypted Secure Checkout
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </>
  )
}