import type { Metadata } from 'next'
import '../styles/globals.css'
import { Inter, Cormorant_Garamond, Space_Grotesk } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Chughtai Arts - Fine Arts Portfolio',
  description: 'Fine Arts portfolio featuring portraits, paintings, textiles, calligraphy, crochet, and jewelry by Museera Aftab.',
  keywords: 'fine arts, textile design, portraits, paintings, calligraphy, handmade jewelry, crochet, art portfolio',
  authors: [{ name: 'Museera Aftab' }],
  creator: 'Chughtai Arts',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Chughtai Arts',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
      </head>
      <body>{children}</body>
    </html>
  )
}
