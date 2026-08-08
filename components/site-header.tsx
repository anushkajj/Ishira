'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Announcement Banner */}
      <div className="bg-terracotta/90 backdrop-blur-md text-white font-sans text-[10px] sm:text-xs font-medium py-1.5 sm:py-2 px-3 text-center tracking-wider uppercase shadow-xs">
        📢 Notice: We are currently not accepting new orders.
      </div>

      {/* Main Header */}
      <header
        className={`transition-all duration-500 ${
          scrolled
            ? 'bg-stone-950/40 backdrop-blur-md border-b border-white/10 shadow-sm py-2.5 sm:py-3 text-stone-100'
            : 'bg-gradient-to-b from-stone-950/30 via-stone-950/10 to-transparent backdrop-blur-[2px] py-3 sm:py-4 text-white'
        }`}
        role="banner"
      >
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-12 flex items-center justify-between transition-all duration-300">

          {/* Left: Quick Nav Links */}
          <nav className="flex items-center gap-3 sm:gap-6 md:gap-8 min-w-[70px]">
            <Link
              href="/#catalogue"
              className="font-sans text-[10px] sm:text-[11px] font-medium tracking-[0.15em] sm:tracking-[0.25em] uppercase text-white/90 hover:text-white border-b border-white/30 hover:border-white transition-all pb-0.5 drop-shadow-xs"
            >
              Shop
            </Link>
            <Link
              href="/story"
              className="hidden sm:inline-block font-sans text-[11px] font-medium tracking-[0.25em] uppercase text-white/90 hover:text-white border-b border-white/30 hover:border-white transition-all pb-0.5 drop-shadow-xs"
            >
              Our Story
            </Link>
          </nav>

          {/* Center: Brand PNG Logo (Scaled Up) */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center hover:opacity-80 transition-opacity"
            aria-label="Ishira Homeware home"
          >
          <Image
            src="/logo-full.png"
            alt="Ishira Homeware Logo"
            width={280}
            height={80}
            priority
            className="h-14 sm:h-18 md:h-22 w-auto object-contain brightness-0 invert drop-shadow-sm scale-150 sm:scale-175 md:scale-[2]"
          />
          </Link>

          {/* Right: Actions & Cart Trigger */}
          <div className="flex items-center justify-end gap-2.5 sm:gap-5 min-w-[70px]">
            <Link
              href="/#catalogue"
              className="hidden md:inline-block font-sans text-[11px] font-medium tracking-[0.25em] uppercase text-white/90 hover:text-white border-b border-white/30 hover:border-white transition-all pb-0.5 drop-shadow-xs"
            >
              Collection
            </Link>

            {/* My Orders Link */}
            <Link
              href="/orders"
              className="p-1 sm:p-0 flex items-center gap-1.5 text-white/90 hover:text-white transition-colors group drop-shadow-xs"
              title="My Orders"
              aria-label="View My Orders"
            >
              <Package className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
              <span className="hidden sm:inline-block font-sans text-[11px] font-medium tracking-[0.25em] uppercase border-b border-white/30 hover:border-white transition-all pb-0.5">
                Orders
              </span>
            </Link>

            {/* Cart Trigger Button */}
            <button
              type="button"
              onClick={openCart}
              className="relative p-1.5 text-white/90 hover:text-white transition-colors group cursor-pointer drop-shadow-xs"
              aria-label={`Shopping Cart with ${totalItems} items`}
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 px-1.5 py-0.2 bg-terracotta text-white font-sans text-[9px] sm:text-[10px] font-bold rounded-full shadow-xs min-w-[16px] text-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

        </div>
      </header>
    </div>
  )
}