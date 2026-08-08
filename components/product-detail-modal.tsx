'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Product } from '@/types/product'
import { useCart } from '@/context/cart-context'
import { X, ShoppingBag, Check, ShieldCheck, Truck, RotateCcw, Minus, Plus, Ban } from 'lucide-react'

interface ProductDetailModalProps {
  product: Product | null
  onClose: () => void
}

export function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const { addToCart } = useCart()
  const [selectedImage, setSelectedImage] = useState<string>('')
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  React.useEffect(() => {
    if (product) {
      setSelectedImage(product.imageSrc)
      setQuantity(1)
      setAdded(false)
    }
  }, [product])

  if (!product) return null

  const isOutOfStock = product.inStock === false

  const handleAddToCart = () => {
    if (isOutOfStock) return
    addToCart(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const gallery = product.images && product.images.length > 0 ? product.images : [product.imageSrc]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-background border border-border overflow-y-auto rounded-sm shadow-2xl z-10 animate-scale-up">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors rounded-full z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-8">
          {/* Left Column: Gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-sand/40 border border-border/50 rounded-sm">
              <Image
                src={selectedImage || product.imageSrc}
                alt={product.name}
                fill
                className={`object-cover object-center ${
                  isOutOfStock ? 'opacity-70 grayscale-[20%]' : ''
                }`}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Thumbnail switcher if multiple images */}
            {gallery.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-16 h-20 overflow-hidden border-2 transition-all ${
                      selectedImage === img
                        ? 'border-terracotta'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Specs & Purchase CTA */}
          <div className="flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              {/* Category & Tag */}
              <div className="flex items-center gap-2">
                <span className="font-sans text-[11px] font-medium uppercase tracking-widest text-terracotta">
                  {product.category}
                </span>
                {isOutOfStock ? (
                  <span className="text-[10px] uppercase font-sans tracking-widest px-2 py-0.5 bg-stone-700 text-white rounded-xs">
                    Sold Out
                  </span>
                ) : (
                  product.isBestSeller && (
                    <span className="text-[10px] uppercase font-sans tracking-widest px-2 py-0.5 bg-terracotta/10 text-terracotta border border-terracotta/20 rounded-xs">
                      Bestseller
                    </span>
                  )
                )}
              </div>

              {/* Title & Price */}
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-foreground leading-tight">
                {product.name}
              </h2>
              <div className={`font-sans text-2xl font-semibold ${
                isOutOfStock ? 'text-muted-foreground line-through' : 'text-foreground'
              }`}>
                ₹{product.price.toLocaleString('en-IN')}
              </div>

              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {/* Specs & Features List */}
              {product.details && product.details.length > 0 && (
                <div className="border-t border-border pt-4 mt-2">
                  <h4 className="font-sans text-xs font-semibold uppercase tracking-widest text-foreground mb-2">
                    Craft Details & Features
                  </h4>
                  <ul className="grid grid-cols-1 gap-2 font-sans text-xs text-muted-foreground">
                    {product.details.map((detail, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-terracotta/70" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Dimensions & Care */}
              {(product.dimensions || product.careInstructions) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-border/60">
                  {product.dimensions && (
                    <div>
                      <span className="block font-sans text-[10px] uppercase tracking-wider text-muted-foreground">
                        Dimensions
                      </span>
                      <span className="font-sans text-xs font-medium text-foreground">
                        {product.dimensions}
                      </span>
                    </div>
                  )}
                  {product.careInstructions && (
                    <div>
                      <span className="block font-sans text-[10px] uppercase tracking-wider text-muted-foreground">
                        Care Guide
                      </span>
                      <span className="font-sans text-xs font-medium text-foreground">
                        {product.careInstructions}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quantity & Add to Cart Controls */}
            <div className="flex flex-col gap-4 border-t border-border pt-6">
              <div className="flex items-center gap-4">
                <span className="font-sans text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Quantity
                </span>
                <div className={`flex items-center border border-border ${
                  isOutOfStock ? 'opacity-50 pointer-events-none' : ''
                }`}>
                  <button
                    type="button"
                    disabled={isOutOfStock}
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 hover:bg-muted text-foreground transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center font-sans text-sm font-medium">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    disabled={isOutOfStock}
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-2 hover:bg-muted text-foreground transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <button
                type="button"
                disabled={isOutOfStock}
                onClick={handleAddToCart}
                className={`w-full py-3.5 px-6 font-sans text-xs font-medium uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-300 ${
                  isOutOfStock
                    ? 'bg-muted text-muted-foreground cursor-not-allowed opacity-80'
                    : added
                    ? 'bg-emerald-800 text-white'
                    : 'bg-foreground text-background hover:bg-terracotta hover:text-white'
                }`}
              >
                {isOutOfStock ? (
                  <>
                    <Ban className="w-4 h-4" />
                    Out of Stock
                  </>
                ) : added ? (
                  <>
                    <Check className="w-4 h-4" />
                    Added to Bag
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    Add {quantity} to Bag — ₹{(product.price * quantity).toLocaleString('en-IN')}
                  </>
                )}
              </button>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border/40 text-center">
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-terracotta" />
                  <span className="font-sans text-[10px] text-muted-foreground">100% Handcrafted</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-terracotta" />
                  <span className="font-sans text-[10px] text-muted-foreground">Safe Shipping in Bangalore</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}