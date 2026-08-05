'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function OurStorySection() {
  return (
    <section id="our-story" className="bg-sand/20">
      
      {/* ── 1. Full-Bleed Pottery Banner (Matching Reference Image 2) ── */}
      <div className="relative w-full h-[60vh] min-h-[480px] overflow-hidden flex items-center">
        <Image
          src="/images/pottery-wheel.png"
          alt="Hands shaping clay on potter's wheel"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Subtle dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-black/35 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-xl flex flex-col gap-4 text-white animate-fade-up">
            <span className="font-sans text-[11px] font-medium tracking-[0.3em] uppercase text-white/80">
              Our Story
            </span>
            <h2 className="font-serif font-light text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-white">
              Beauty belongs in everyday life.
            </h2>
          </div>
        </div>
      </div>

      {/* ── 2. Editorial Narrative Section (Exact Provided Copy) ── */}
      <div className="py-24 px-6 md:px-12 max-w-4xl mx-auto flex flex-col gap-10">
        
        {/* Lead Quote Question */}
        <h3 className="font-serif text-3xl md:text-4xl font-light text-foreground leading-[1.25] italic border-b border-border/60 pb-8 text-stone-800">
          &ldquo;Ishira began with a question: why do we save the beautiful things for guests?&rdquo;
        </h3>

        {/* Story Paragraphs */}
        <div className="flex flex-col gap-8 font-serif text-lg md:text-xl font-light text-foreground/90 leading-[1.75]">
          <p>
            We make objects for the parts of the day nobody photographs — the first coffee before the house wakes, the plate you reach for without thinking, the candle lit while dinner simmers. These are the rituals that quietly shape a life, and we believe they deserve the same care as any occasion.
          </p>

          <p>
            Every piece is made in small batches by artisans we know by name. Our glazes are mixed by hand, so no two pieces are identical; the speckle on your mug will not be the speckle on anyone else&apos;s. We prefer it that way.
          </p>

          <p>
            We release collections rarely and keep them small. Twelve pieces, chosen to sit together on one shelf, one table, one morning at a time.
          </p>
        </div>

        {/* Read Journal Link */}
        <div className="pt-4 flex items-center gap-4">
          <Link
            href="/story"
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-foreground text-background font-sans text-xs font-medium uppercase tracking-[0.18em] hover:bg-terracotta hover:text-white transition-all duration-300 shadow-md group rounded-full"
          >
            Explore Our Journal & Philosophy
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

      </div>

    </section>
  )
}
