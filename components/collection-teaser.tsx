import Image from 'next/image'

interface Product {
  id: string
  name: string
  description: string
  imageSrc: string
  tag: string
}

// Add or edit products here — swap imageSrc for your own product photos
const products: Product[] = [
  {
    id: 'cup',
    name: 'Ritual Cup',
    description: 'Wheel-thrown in small batches. Hand painted clay art work',
    imageSrc: '/images/product-cup-1.png',
    tag: 'Drinkware',
  },
  {
    id: 'tray',
    name: 'Catchall Tray',
    description: 'Clean, low-walled, and endlessly useful. A surface for everything you care about.',
    imageSrc: '/images/product-tray-1.jpeg',
    tag: 'Storage',
  },
  {
    id: 'vase',
    name: 'Cutlery Holder',
    description: 'Chic basket shaped earthenware-glazed. Perfect addition for your table',
    imageSrc: '/images/product-holder.png',
    tag: 'Décor',
  },
]

export function CollectionTeaser() {
  return (
    <section
      className="py-24 md:py-32 px-6 md:px-10 bg-background"
      aria-labelledby="collection-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <div className="flex flex-col gap-3">
            <span className="font-sans text-xs font-medium tracking-[0.2em] uppercase text-terracotta">
              The Collection
            </span>
            <h2
              id="collection-heading"
              className="font-serif text-4xl md:text-5xl font-light text-foreground leading-tight text-balance"
            >
              A preview of what&apos;s coming.
            </h2>
          </div>
          <p className="font-sans text-sm text-muted-foreground leading-relaxed max-w-xs text-balance">
            Each piece is designed to become part of your daily rhythm — nothing fussy, everything considered.
          </p>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {products.map((product) => (
            <article
              key={product.id}
              className="bg-background group flex flex-col"
            >
              {/* Image container */}
              <div className="relative aspect-[4/5] overflow-hidden bg-sand">
                <Image
                  src={product.imageSrc}
                  alt={product.name}
                  fill
                  className="object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Tag badge */}
                <span className="absolute top-4 left-4 px-3 py-1 bg-background/80 backdrop-blur-sm font-sans text-xs tracking-widest uppercase text-muted-foreground">
                  {product.tag}
                </span>
              </div>

              {/* Product info */}
              <div className="flex flex-col gap-2 p-6 border-t border-border">
                <h3 className="font-serif text-2xl font-light text-foreground leading-tight">
                  {product.name}
                </h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
                <span className="mt-2 font-sans text-xs font-medium tracking-widest uppercase text-terracotta">
                  Available at launch
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Teaser bottom note */}
        <div className="mt-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-border">
          <p className="font-serif text-lg font-light text-muted-foreground italic">
            More pieces to be revealed.
          </p>
          <span className="font-sans text-xs font-medium tracking-widest uppercase text-foreground/50">
            Full catalogue coming soon
          </span>
        </div>
      </div>
    </section>
  )
}
