import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { ProductCatalog } from '@/components/product-catalog'
import { OurStorySection } from '@/components/our-story-section'
import { CollectionTeaser } from '@/components/collection-teaser'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <ProductCatalog />
        <OurStorySection />
        <div id="collection-teaser">
          <CollectionTeaser />
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
