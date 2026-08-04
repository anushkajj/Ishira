export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-muted/30" aria-label="Site footer">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-16">
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <span className="font-serif text-2xl font-light text-foreground tracking-wide">Ishira</span>
            <p className="font-sans text-sm text-muted-foreground leading-relaxed max-w-xs">
              Quietly beautiful ceramics for everyday rituals. Handcrafted, thoughtfully priced.
            </p>
          </div>

          {/* Connect column */}
          <div className="flex flex-col gap-4">
            <span className="font-sans text-xs font-medium tracking-[0.2em] uppercase text-terracotta">
              Connect
            </span>
            <nav aria-label="Social and contact links" className="flex flex-col gap-3">
              <a
                href="https://instagram.com/ishira.homeware"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group w-fit"
                aria-label="Follow Ishira Homeware on Instagram"
              >
                {/* Instagram icon */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground group-hover:text-terracotta transition-colors duration-300"
                  aria-hidden="true"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span className="font-sans text-sm text-foreground group-hover:text-terracotta transition-colors duration-300">
                  @ishirahomeware
                </span>
              </a>

              <a
                href="mailto:hello@ishirahomeware.com"
                className="flex items-center gap-3 group w-fit"
                aria-label="Email Ishira Homeware"
              >
                {/* Email icon */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground group-hover:text-terracotta transition-colors duration-300"
                  aria-hidden="true"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span className="font-sans text-sm text-foreground group-hover:text-terracotta transition-colors duration-300">
                  hello@ishirahomeware.com
                </span>
              </a>
            </nav>
          </div>

          {/* Future links column — ready for catalogue, ordering, etc. */}
          <div className="flex flex-col gap-4">
            <span className="font-sans text-xs font-medium tracking-[0.2em] uppercase text-terracotta">
              Coming Soon
            </span>
            <nav aria-label="Future site sections" className="flex flex-col gap-3">
              {['Catalogue', 'Ordering', 'About'].map((item) => (
                <span
                  key={item}
                  className="font-sans text-sm text-muted-foreground/60 cursor-default select-none"
                  aria-label={`${item} — coming soon`}
                >
                  {item}
                </span>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="font-sans text-xs text-muted-foreground/60">
            &copy; {year} Ishira Homeware. All rights reserved.
          </p>
          <p className="font-sans text-xs text-muted-foreground/40 italic font-serif">
            Made with care.
          </p>
        </div>
      </div>
    </footer>
  )
}
