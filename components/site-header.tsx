'use client'

import Link from 'next/link'
import Image from 'next/image'

export function SiteHeader() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-md border-b border-border"
      role="banner"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10 h-24 flex items-center justify-between">
        
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center group"
          aria-label="Ishira Homeware home"
        >
          <Image
            src="/logo-full.png"
            alt="Ishira logo"
            width={180}
            height={100}
            priority
            className="object-contain opacity-90 group-hover:opacity-100 transition duration-300"
          />
        </Link>

        {/* Tagline */}
        <span className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-muted-foreground">
          Ceramics · Est. 2026
        </span>

      </div>
    </header>
  )
}