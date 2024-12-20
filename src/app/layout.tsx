import type { Metadata } from "next"
import { Inter, Quicksand } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { MusicPlayerProvider } from './contexts/MusicPlayerContext'
import { CartProvider } from '@/contexts/CartContext'
import Script from 'next/script'

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  adjustFontFallback: false
})

const quicksand = Quicksand({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-quicksand'
})

export const metadata: Metadata = {
  title: "NES Producciones",
  description: "HACIENDO MILLONES",
  openGraph: {
    title: 'NES Producciones',
    description: 'HACIENDO MILLONES',
    images: [
      {
        url: '/NES.jpg',
        width: 1200,
        height: 630,
        alt: 'NES Producciones',
      }
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NES Producciones',
    description: 'HACIENDO MILLONES',
    images: ['/og-image.jpg'],
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={quicksand.variable}>
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link 
          rel="preconnect" 
          href="https://nesprod-storage.nyc3.digitaloceanspaces.com" 
          crossOrigin="anonymous"
        />
        <Script id="bg-init" strategy="beforeInteractive">
          {`
            window.__BG_IMAGE__ = 'https://nesprod-storage.nyc3.digitaloceanspaces.com/photos/quelede.jpg';
            document.documentElement.style.setProperty('--global-bg-image', 'url(' + window.__BG_IMAGE__ + ')');
          `}
        </Script>
      </head>
      <body className={inter.className} font-quicksand>
        <CartProvider>
          <MusicPlayerProvider>
            {children}
            <Toaster />
          </MusicPlayerProvider>
        </CartProvider>
      </body>
    </html>
  )
}