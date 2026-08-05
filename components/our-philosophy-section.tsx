'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function OurPhilosophySection() {
  return (
    <section id="our-story" className="bg-sand/20">

      {/* ── 2. Editorial Narrative Section (Centered) ── */}
      <div className="py-24 px-6 md:px-12 max-w-4xl mx-auto flex flex-col items-center text-center gap-10">
        
        {/* Lead Quote Question */}
        <h3 className="font-serif text-3xl md:text-4xl font-light text-foreground leading-[1.25] italic border-b border-border/60 pb-8 text-stone-800 w-full">
          Designed for Everyday Rituals
        </h3>

        {/* Story Paragraphs */}
        <div className="flex flex-col gap-8 font-serif text-lg md:text-xl font-light text-foreground/90 leading-[1.75]">
          <p>
           At Ishira, we believe beauty belongs in everyday life. From morning coffee to evening tea, every ritual deserves thoughtfully curated objects that bring warmth, comfort and timeless elegance into your home.
          </p>
        </div>

        {/* Read Journal Link */}
        <div className="pt-4 flex justify-center w-full">
          <Link
            href="/story"
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-foreground text-background font-sans text-xs font-medium uppercase tracking-[0.18em] hover:bg-terracotta hover:text-white transition-all duration-300 shadow-md group rounded-full"
          >
            Read Our Story
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

      </div>

    </section>
  )
}