'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/cart-context'
import { ShoppingBag, Package } from 'lucide-react'

export function SiteHeader() {
  const { openCart, totalItems } = useCart()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    // Set initial scroll position
    handleScroll()

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-stone-900/85 backdrop-blur-md border-b border-white/10 shadow-lg text-white py-3'
          : 'bg-gradient-to-b from-black/60 via-black/30 to-transparent text-white py-5'
      }`}
      role="banner"
    >
      <div className="mx-auto w-full max-w-7xl px-6 md:px-12 flex items-center justify-between transition-all duration-300">
        
        {/* Left: Quick Nav Links */}
        <nav className="flex items-center gap-6 sm:gap-8">
          <Link
            href="/#catalogue"
            className="font-sans text-[11px] font-medium tracking-[0.25em] uppercase text-white/90 hover:text-white border-b border-white/40 hover:border-white transition-all pb-0.5"
          >
            Shop
          </Link>
          <Link
            href="/story"
            className="font-sans text-[11px] font-medium tracking-[0.25em] uppercase text-white/90 hover:text-white border-b border-white/40 hover:border-white transition-all pb-0.5"
          >
            Our Story
          </Link>
        </nav>

        {/* Center: Brand Name Logo */}
        <Link
          href="/"
          className="font-serif text-2xl md:text-3xl tracking-[0.35em] uppercase font-light text-white hover:opacity-90 transition-opacity"
          aria-label="Ishira Homeware home"
        >
          Ishira
        </Link>

        {/* Right: Collection Link, Orders Link & Cart Trigger */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/#catalogue"
            className="hidden md:inline-block font-sans text-[11px] font-medium tracking-[0.25em] uppercase text-white/90 hover:text-white border-b border-white/40 hover:border-white transition-all pb-0.5"
          >
            Collection
          </Link>

          {/* My Orders Link */}
          <Link
            href="/orders"
            className="flex items-center gap-1.5 text-white/90 hover:text-white transition-colors group"
            title="My Orders"
            aria-label="View My Orders"
          >
            <Package className="w-5 h-5 stroke-[1.5]" />
            <span className="hidden sm:inline-block font-sans text-[11px] font-medium tracking-[0.25em] uppercase border-b border-white/40 hover:border-white transition-all pb-0.5">
              Orders
            </span>
          </Link>

          {/* Cart Trigger Button */}
          <button
            type="button"
            onClick={openCart}
            className="relative p-2 text-white/90 hover:text-white transition-colors group cursor-pointer"
            aria-label={`Shopping Cart with ${totalItems} items`}
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-terracotta text-white font-sans text-[10px] font-bold rounded-full">
                {totalItems}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  )
}