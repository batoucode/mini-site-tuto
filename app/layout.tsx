import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import ThemeToggle from '@/components/layout/ThemeToggle'

export const metadata: Metadata = {
  title: 'DESCODES — Générateur de sites artisans',
  description:
    'Générez un site vitrine professionnel pour artisans en quelques minutes grâce à l\'IA. Packs Starter, Artisan et Business.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" data-theme="dark" suppressHydrationWarning>
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
