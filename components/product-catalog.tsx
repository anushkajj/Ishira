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
    <section id="catalogue" className="py-24 px-6 md:px-12 bg-background border-t border-border/50">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/60 pb-8">
          <div className="flex flex-col gap-3">
            <span className="font-sans text-xs font-medium tracking-[0.25em] uppercase text-terracotta flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              Ishira Homeware
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground leading-tight">
              The Launch Collection
            </h2>
          </div>
          <p className="font-sans text-sm text-muted-foreground leading-relaxed max-w-sm">
            Small batches, hand-mixed glazes, and wheel-thrown ceramics. Twelve pieces chosen to sit together on one shelf, one table, one morning at a time.
          </p>
        </div>

        {/* Tab & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-sand/30 p-4 border border-border/60 rounded-xs">
          
          {/* Active Single Tab: Launch Collection */}
          <div className="flex items-center gap-2">
            <span className="px-5 py-2.5 bg-foreground text-background font-sans text-xs font-medium tracking-[0.15em] uppercase rounded-full shadow-xs">
              Launch Collection ({PRODUCTS.length})
            </span>
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-60">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search collection..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-background border border-border focus:border-terracotta text-xs font-sans text-foreground outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <SlidersHorizontal className="w-4 h-4 text-muted-foreground shrink-0 hidden sm:block" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full sm:w-auto px-3 py-2 bg-background border border-border focus:border-terracotta text-xs font-sans text-foreground outline-none cursor-pointer"
              >
                <option value="featured">Sort: Featured</option>
                <option value="bestsellers">Sort: Bestsellers</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center gap-4 bg-sand/20 border border-dashed border-border/80">
            <h3 className="font-serif text-2xl text-foreground font-light">No ceramic pieces found</h3>
            <p className="font-sans text-xs text-muted-foreground">
              Try adjusting your search query.
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="px-5 py-2.5 bg-foreground text-background font-sans text-xs font-medium uppercase tracking-wider hover:bg-terracotta transition-colors"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
