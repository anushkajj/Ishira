'use client'

import Image from 'next/image'

export function Hero() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 lg:px-10 pt-44 md:pt-48 pb-24">
      
      {/* 2-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-14 lg:gap-20">
        
        {/* ── Left: Text ── */}
        <div className="flex flex-col gap-8 max-w-xl animate-fade-up">
          
          {/* Label */}
          <span className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            <span className="h-px w-8 bg-primary transition-all duration-500 group-hover:w-12" />
            Launching soon
          </span>

          {/* Heading */}
          <h1 className="font-serif font-light text-foreground leading-[1.05] tracking-tight text-4xl md:text-5xl lg:text-6xl max-w-lg">
            Quietly beautiful ceramics for everyday rituals.
          </h1>

          {/* Body */}
          <p className="text-sm md:text-[0.95rem] leading-relaxed text-muted-foreground max-w-md">
            Ishira Homeware is a design-led label by two sisters, curating and customizing handcrafted cups, trays, vases and more — made to feel premium, priced for every day. Something beautiful is on its way.
          </p>

          {/* Divider */}
          <div className="w-40 h-px bg-border mt-2 opacity-70" />

        </div>

        {/* ── Right: Image ── */}
        <div className="relative w-full lg:pl-6 animate-fade-up delay-200">
          
          <div className="relative w-full aspect-[4/5] overflow-hidden rounded-sm bg-muted group">
            <Image
              src="/images/product-vase.png"
              alt="Ishira ceramics"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          </div>

        </div>

      </div>
    </section>
  )
}