import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import ThemeToggle from '@/components/layout/ThemeToggle'

export const metadata: Metadata = {
  title: 'Guide Artisan Pro — Créez des sites vitrines professionnels',
  description:
    'Guide pas-à-pas interactif pour créer des sites vitrines pour artisans. Packs Starter, Artisan et Business.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          <ThemeToggle />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
