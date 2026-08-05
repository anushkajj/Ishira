'use client'

import Image from 'next/image'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[650px] overflow-hidden flex items-center">
      {/* Background Image: Full width left to right */}
      <Image
        src="/images/hero-ritual.png"
        alt="Ishira handcrafted ceramic mug on linen table"
        fill
        priority
        quality={95}
        className="object-cover object-center"
      />

      {/* Dark tint gradient for readable text contrast */}
      <div className="absolute inset-0 bg-black/25 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />

      {/* Content Overlay */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-16">
        <div className="max-w-xl flex flex-col gap-6 text-white animate-fade-up">
          
          {/* Tagline */}
          {/* <span className="font-sans text-[11px] font-medium tracking-[0.3em] uppercase text-white/80">
            Ishira Homewares
          </span> */}

          {/* Heading */}
          <h1 className="font-serif font-light text-5xl md:text-6xl lg:text-7xl leading-[1.08] tracking-tight text-white">
            Crafted for Everyday Rituals.
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-sm md:text-base leading-relaxed text-white/90 max-w-md font-light">
            Thoughtfully curated homeware designed to make everyday moments feel beautiful.
          </p>

          {/* Action CTAs */}
          <div className="flex items-center gap-6 pt-4">
            <Link
              href="/#catalogue"
              className="px-8 py-3.5 bg-white text-stone-900 font-sans text-xs font-medium uppercase tracking-[0.18em] rounded-full hover:bg-sand transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]"
            >
              Shop The Collection
            </Link>

            <Link
              href="/story"
              className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-white hover:text-white/80 border-b border-white/80 pb-0.5 transition-colors"
            >
              Our Story
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}