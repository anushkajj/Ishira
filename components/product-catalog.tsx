'use client'

import React, { useState, useMemo } from 'react'
import { PRODUCTS } from '@/data/products'
import { Product } from '@/types/product'
import { ProductCard } from '@/components/product-card'
import { ProductDetailModal } from '@/components/product-detail-modal'
import { Search, SlidersHorizontal, Sparkles, X } from 'lucide-react'

type SortOption = 'featured' | 'price-low' | 'price-high' | 'bestsellers'

export function ProductCatalog() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('featured')
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesSearch
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price
      if (sortBy === 'price-high') return b.price - a.price
      if (sortBy === 'bestsellers') return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0)
      return 0
    })
  }, [searchQuery, sortBy])

  return (
    <section id="catalogue" className="py-12 sm:py-24 px-3 sm:px-6 md:px-12 bg-background border-t border-border/50">
      <div className="max-w-7xl mx-auto flex flex-col gap-6 sm:gap-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 border-b border-border/60 pb-4 sm:pb-8">
          <div className="flex flex-col gap-1.5 sm:gap-3">
            <span className="font-sans text-[10px] sm:text-xs font-medium tracking-[0.2em] sm:tracking-[0.25em] uppercase text-terracotta flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              Ishira Homeware
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight">
              The Launch Collection
            </h2>
          </div>
        </div>

        {/* Tab & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 bg-sand/30 p-2.5 sm:p-4 border border-border/60 rounded-xs">
          {/* Active Single Tab: Launch Collection */}
          <div className="flex items-center gap-2">
            <span className="px-3 sm:px-5 py-1.5 sm:py-2.5 bg-foreground text-background font-sans text-[10px] sm:text-xs font-medium tracking-[0.12em] sm:tracking-[0.15em] uppercase rounded-full shadow-xs">
              Launch Collection ({PRODUCTS.length})
            </span>
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-60">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-7 py-1.5 sm:py-2 bg-background border border-border focus:border-terracotta text-[11px] sm:text-xs font-sans text-foreground outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 w-auto">
              <SlidersHorizontal className="w-4 h-4 text-muted-foreground shrink-0 hidden sm:block" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full sm:w-auto px-2 sm:px-3 py-1.5 sm:py-2 bg-background border border-border focus:border-terracotta text-[11px] sm:text-xs font-sans text-foreground outline-none cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="bestsellers">Bestsellers</option>
                <option value="price-low">Price: Low</option>
                <option value="price-high">Price: High</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid - 2 columns on Mobile (`grid-cols-2`) */}
        {filteredProducts.length === 0 ? (
          <div className="py-12 sm:py-20 text-center flex flex-col items-center gap-3 sm:gap-4 bg-sand/20 border border-dashed border-border/80 px-4">
            <h3 className="font-serif text-xl sm:text-2xl text-foreground font-light">No ceramic pieces found</h3>
            <p className="font-sans text-[11px] sm:text-xs text-muted-foreground">
              Try adjusting your search query.
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="px-4 py-2 sm:px-5 sm:py-2.5 bg-foreground text-background font-sans text-[10px] sm:text-xs font-medium uppercase tracking-wider hover:bg-terracotta transition-colors"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      <ProductDetailModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  )
}