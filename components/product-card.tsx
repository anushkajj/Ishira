'use client'

import React from 'react'
import Image from 'next/image'
import { Product } from '@/types/product'
import { useCart } from '@/context/cart-context'
import { Eye, ShoppingBag, Check } from 'lucide-react'

interface ProductCardProps {
  product: Product
  onQuickView: (product: Product) => void
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addToCart, cart } = useCart()
  const [added, setAdded] = React.useState(false)

  const isInCart = cart.some((item) => item.product.id === product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addToCart(product, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <article
      onClick={() => onQuickView(product)}
      className="group bg-background cursor-pointer flex flex-col border border-border/60 hover:border-terracotta/40 transition-all duration-300 rounded-sm overflow-hidden"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-sand/40">
        <Image
          src={product.imageSrc}
          alt={product.name}
          fill
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isBestSeller && (
            <span className="px-2.5 py-1 bg-terracotta text-white font-sans text-[10px] font-medium tracking-widest uppercase rounded-xs shadow-xs">
              Bestseller
            </span>
          )}
          {product.isNewArrival && (
            <span className="px-2.5 py-1 bg-foreground text-background font-sans text-[10px] font-medium tracking-widest uppercase rounded-xs">
              New Arrival
            </span>
          )}
        </div>

        {/* Category Tag */}
        <span className="absolute bottom-3 left-3 px-2.5 py-1 bg-background/85 backdrop-blur-md font-sans text-[10px] font-medium tracking-widest uppercase text-muted-foreground border border-border/40">
          {product.category}
        </span>

        {/* Quick Action Overlay Buttons */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 p-4">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onQuickView(product)
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-background text-foreground font-sans text-xs font-medium uppercase tracking-wider hover:bg-foreground hover:text-background transition-colors duration-200 shadow-md"
            aria-label={`Quick view ${product.name}`}
          >
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="flex flex-col flex-1 p-5 border-t border-border/60 justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif text-xl font-normal text-foreground group-hover:text-terracotta transition-colors duration-200">
              {product.name}
            </h3>
            <span className="font-sans text-sm font-semibold text-foreground whitespace-nowrap">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
          </div>
          <p className="font-sans text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {product.subtitle}
          </p>
        </div>

        {/* Add to Cart Button */}
        <button
          type="button"
          onClick={handleAddToCart}
          className={`w-full py-2.5 px-4 font-sans text-xs font-medium tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-300 border ${
            added
              ? 'bg-emerald-800 text-white border-emerald-800'
              : isInCart
              ? 'bg-secondary text-secondary-foreground border-border hover:bg-terracotta hover:text-white hover:border-terracotta'
              : 'bg-foreground text-background border-foreground hover:bg-terracotta hover:border-terracotta hover:text-white'
          }`}
        >
          {added ? (
            <>
              <Check className="w-3.5 h-3.5" />
              Added to Bag
            </>
          ) : isInCart ? (
            <>
              <ShoppingBag className="w-3.5 h-3.5" />
              In Bag (Add More)
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5" />
              Add to Bag
            </>
          )}
        </button>
      </div>
    </article>
  )
}
