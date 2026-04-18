'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/pack/starter', label: 'Starter' },
  { href: '/pack/artisan', label: 'Artisan' },
  { href: '/pack/business', label: 'Business' },
  { href: '/options', label: 'Options' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-4'
      }`}
      style={{
        backgroundColor: scrolled
          ? 'var(--bg)'
          : 'var(--bg)',
        borderBottom: `1px solid ${scrolled ? 'var(--border)' : 'transparent'}`,
        boxShadow: scrolled ? 'var(--shadow-soft)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg"
          style={{ color: 'var(--fg)' }}
        >
          <span
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            AP
          </span>
          <span className="hidden sm:block">Artisan Pro</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  color: isActive ? 'var(--accent)' : 'var(--fg)',
                  backgroundColor: isActive ? 'var(--accent-subtle, rgba(44, 95, 138, 0.08))' : 'transparent',
                  fontWeight: isActive ? '600' : '500',
                }}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Mobile burger */}
        <button
          className="md:hidden p-2 rounded-lg"
          style={{ color: 'var(--fg)' }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <span
              className={`block h-0.5 transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-1.5' : ''}`}
              style={{ backgroundColor: 'var(--fg)' }}
            />
            <span
              className={`block h-0.5 transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`}
              style={{ backgroundColor: 'var(--fg)' }}
            />
            <span
              className={`block h-0.5 transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2.5' : ''}`}
              style={{ backgroundColor: 'var(--fg)' }}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden px-4 py-4 space-y-1"
          style={{
            backgroundColor: 'var(--bg)',
            borderTop: '1px solid var(--border)',
          }}
        >
          {navLinks.map((link) => {
            const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 rounded-xl text-sm font-medium transition-all"
                style={{
                  color: isActive ? 'var(--accent)' : 'var(--fg)',
                  backgroundColor: isActive ? 'var(--accent-subtle, rgba(44, 95, 138, 0.08))' : 'transparent',
                }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      )}
    </header>
  )
}
