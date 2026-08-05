'use client'

import React, { useState } from 'react'
import { useCart } from '@/context/cart-context'
import { X, CheckCircle2, ShieldCheck, ArrowRight, Package } from 'lucide-react'

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { cart, subtotal, clearCart } = useCart()
  const [step, setStep] = useState<'details' | 'success'>('details')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    notes: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderId, setOrderId] = useState('')

  if (!isOpen) return null

  const shippingCost = subtotal >= 3000 ? 0 : 150
  const finalTotal = subtotal + shippingCost

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate order placement
    setTimeout(() => {
      const generatedId = 'ISHIRA-' + Math.floor(100000 + Math.random() * 900000)
      setOrderId(generatedId)
      setIsSubmitting(false)
      setStep('success')
      clearCart()
    }, 1200)
  }

  const handleClose = () => {
    setStep('details')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-0" onClick={handleClose} />

      <div className="relative w-full max-w-2xl bg-background border border-border rounded-sm shadow-2xl z-10 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-terracotta font-medium">
              Ishira Homeware Checkout
            </span>
            <h3 className="font-serif text-2xl text-foreground font-light">
              {step === 'details' ? 'Delivery Details & Summary' : 'Order Confirmed!'}
            </h3>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {step === 'details' ? (
          <form onSubmit={handleSubmit} className="overflow-y-auto p-6 flex flex-col gap-6">
            {/* Order Brief */}
            <div className="bg-sand/30 border border-border/60 p-4 rounded-xs flex flex-col gap-2">
              <span className="font-sans text-xs font-semibold uppercase tracking-wider text-foreground">
                Order Summary ({cart.reduce((a, b) => a + b.quantity, 0)} Items)
              </span>
              <div className="flex flex-col gap-1 divide-y divide-border/40 max-h-36 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.product.id} className="pt-1 flex justify-between font-sans text-xs">
                    <span className="text-foreground">
                      {item.product.name} × {item.quantity}
                    </span>
                    <span className="font-medium text-foreground">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border/80 pt-2 flex justify-between font-sans text-xs font-semibold text-foreground">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between font-sans text-xs text-muted-foreground">
                <span>Pan-India Shipping</span>
                <span>{shippingCost === 0 ? 'FREE (Orders > ₹3,000)' : `₹${shippingCost}`}</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between font-sans text-sm font-bold text-foreground">
                <span>Total Amount</span>
                <span>₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Customer Inputs */}
            <div className="flex flex-col gap-4">
              <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-foreground">
                Shipping & Contact Information
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Ananya Sharma"
                    className="w-full px-3 py-2 bg-background border border-border focus:border-terracotta text-sm text-foreground outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-sans text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-3 py-2 bg-background border border-border focus:border-terracotta text-sm text-foreground outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block font-sans text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. ananya@example.com"
                  className="w-full px-3 py-2 bg-background border border-border focus:border-terracotta text-sm text-foreground outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block font-sans text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-1">
                  Delivery Address *
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="House / Apartment no., Street, Area"
                  className="w-full px-3 py-2 bg-background border border-border focus:border-terracotta text-sm text-foreground outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. Mumbai"
                    className="w-full px-3 py-2 bg-background border border-border focus:border-terracotta text-sm text-foreground outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-sans text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-1">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="e.g. 400001"
                    className="w-full px-3 py-2 bg-background border border-border focus:border-terracotta text-sm text-foreground outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isSubmitting || cart.length === 0}
              className="w-full py-4 bg-foreground text-background hover:bg-terracotta hover:text-white font-sans text-xs font-medium uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 mt-2"
            >
              {isSubmitting ? (
                'Processing Order...'
              ) : (
                <>
                  Place Order — ₹{finalTotal.toLocaleString('en-IN')}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        ) : (
          /* Success Screen */
          <div className="p-8 flex flex-col items-center text-center gap-6 my-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-sans text-xs font-semibold uppercase tracking-widest text-terracotta">
                Thank you for your order
              </span>
              <h3 className="font-serif text-3xl text-foreground font-light">
                Your ceramic treasures are being prepared.
              </h3>
              <p className="font-sans text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                Order reference number: <strong className="text-foreground">{orderId}</strong>. We have sent a confirmation email to <span className="text-foreground">{formData.email}</span> with delivery tracking updates.
              </p>
            </div>

            <div className="w-full max-w-sm bg-sand/40 border border-border p-4 text-left font-sans text-xs flex flex-col gap-2 rounded-xs">
              <div className="flex items-center gap-2 font-semibold text-foreground border-b border-border/60 pb-2">
                <Package className="w-4 h-4 text-terracotta" />
                Delivery Information
              </div>
              <p className="text-muted-foreground">
                <strong className="text-foreground">{formData.name}</strong><br />
                {formData.address}, {formData.city} - {formData.pincode}<br />
                Phone: {formData.phone}
              </p>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="py-3 px-8 bg-foreground text-background hover:bg-terracotta hover:text-white font-sans text-xs font-medium uppercase tracking-widest transition-colors duration-200"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
