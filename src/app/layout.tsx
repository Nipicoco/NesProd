import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { MusicPlayerProvider } from './contexts/MusicPlayerContext'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NES Producciones",
  description: "HACIENDO MILLONES",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <MusicPlayerProvider>
          {children}
          <Toaster />
        </MusicPlayerProvider>
      </body>
    </html>
  )
}