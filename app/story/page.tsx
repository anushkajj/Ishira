'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ArrowLeft, Sparkles, Flame, RefreshCw, Sun, Compass } from 'lucide-react'

export default function StoryPage() {
  return (
    <>
      <SiteHeader />
      
      <main className="bg-background min-h-screen">
        {/* Full Bleed Story Hero Banner */}
        <section className="relative w-full h-[65vh] min-h-[500px] overflow-hidden flex items-center justify-center text-center">
          <Image
            src="/images/pottery-wheel.png"
            alt="Artisan hands shaping raw ceramic clay"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/45" />

          <div className="relative z-10 max-w-4xl px-6 flex flex-col items-center gap-4 text-white animate-fade-up">
            <span className="font-sans text-xs uppercase tracking-[0.3em] text-white/80 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              The Ishira Philosophy
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light leading-[1.08] text-white">
              Beauty belongs in everyday life.
            </h1>
          </div>
        </section>

        {/* Narrative Article (Exact Story Text) */}
        <section className="mx-auto max-w-3xl px-6 md:px-10 py-24 flex flex-col gap-12">
          
          <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground leading-[1.3] italic border-b border-border/60 pb-8">
            &ldquo;Ishira began with a question: why do we save the beautiful things for guests?&rdquo;
          </h2>

          <div className="flex flex-col gap-8 font-serif text-xl md:text-2xl font-light text-foreground/90 leading-[1.75]">
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

        </section>

        {/* Craft Process Grid
        <section className="bg-sand/30 py-24 border-t border-b border-border/60">
          <div className="max-w-5xl mx-auto px-6 md:px-10 flex flex-col gap-12">
            <div className="text-center flex flex-col gap-3">
              <span className="font-sans text-xs uppercase tracking-[0.25em] text-terracotta">
                Artisan Process
              </span>
              <h2 className="font-serif text-4xl font-light text-foreground">
                Small Batches, Hand-Mixed Glazes
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 bg-background border border-border/60 rounded-xs flex flex-col gap-3">
                <Compass className="w-6 h-6 text-terracotta" />
                <h3 className="font-serif text-xl font-normal text-foreground">1. Local Earth Clay</h3>
                <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                  Harvested sustainably from regional beds, selected for density and organic warmth.
                </p>
              </div>

              <div className="p-6 bg-background border border-border/60 rounded-xs flex flex-col gap-3">
                <RefreshCw className="w-6 h-6 text-terracotta" />
                <h3 className="font-serif text-xl font-normal text-foreground">2. Wheel Throwing</h3>
                <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                  Hand-shaped by artisans we know by name, ensuring every curve feels human.
                </p>
              </div>

              <div className="p-6 bg-background border border-border/60 rounded-xs flex flex-col gap-3">
                <Sun className="w-6 h-6 text-terracotta" />
                <h3 className="font-serif text-xl font-normal text-foreground">3. Hand Glazing</h3>
                <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                  Glazes mixed by hand so no two speckles or subtle color shifts are ever identical.
                </p>
              </div>

              <div className="p-6 bg-background border border-border/60 rounded-xs flex flex-col gap-3">
                <Flame className="w-6 h-6 text-terracotta" />
                <h3 className="font-serif text-xl font-normal text-foreground">4. High Firing</h3>
                <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                  High-fired for strength, chip resistance, and microwave safety for daily rituals.
                </p>
              </div>
            </div>
          </div>
        </section> */}

        {/* Back to Catalogue Banner */}
        <section className="mx-auto max-w-4xl px-6 md:px-10 py-20 text-center flex flex-col items-center gap-6">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground">
            Explore the Launch Collection.
          </h2>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-background border border-border text-foreground hover:bg-muted font-sans text-xs font-medium uppercase tracking-wider transition-colors rounded-full"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <Link
              href="/#catalogue"
              className="inline-flex items-center gap-2 px-8 py-3 bg-foreground text-background hover:bg-terracotta hover:text-white font-sans text-xs font-medium uppercase tracking-wider transition-colors shadow-md rounded-full"
            >
              Shop Collection
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
