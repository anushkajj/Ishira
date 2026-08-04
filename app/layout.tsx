import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import './globals.css'

const _cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
})

const _jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-jost',
})

export const metadata: Metadata = {
  title: 'Ishira Homeware — Quietly Beautiful Ceramics',
  description:
    'Handcrafted ceramic homewares — cups, trays, vases and more. Premium feel, everyday prices. Launching soon.',
  generator: 'v0.app',
  openGraph: {
    title: 'Ishira Homeware',
    description: 'Quietly beautiful ceramics for everyday rituals.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#c4784a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${_cormorant.variable} ${_jost.variable} antialiased font-sans`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
