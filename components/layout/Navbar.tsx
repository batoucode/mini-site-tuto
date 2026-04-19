'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/generateur', label: '+ Créer un projet' },
  { href: '/tutoriels/starter', label: 'Tutoriels' },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-3' : 'py-4'}`}
      style={{
        backgroundColor: 'var(--bg-nav)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${scrolled ? 'var(--border)' : 'transparent'}`,
        boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.3)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        {/* Logo DESCODES */}
        <Link
          href="/"
          className="flex items-center gap-2"
          style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1.15rem', letterSpacing: '-0.02em', textDecoration: 'none' }}
        >
          <span style={{ color: '#F97316', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>&lt;/&gt;</span>
          <span style={{ color: 'var(--text-primary)' }}>
            DES<span style={{ color: '#00F2FF' }}>CODES</span>
          </span>
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
                  color: isActive ? '#00F2FF' : 'var(--text-secondary)',
                  backgroundColor: isActive ? 'rgba(0,242,255,0.08)' : 'transparent',
                  fontWeight: isActive ? '600' : '500',
                  border: isActive ? '1px solid rgba(0,242,255,0.2)' : '1px solid transparent',
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* CTA Desktop */}
        <Link
          href="/generateur"
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
          style={{
            background: '#F97316',
            color: '#000',
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Démarrer →
        </Link>

        {/* Mobile burger */}
        <button
          className="md:hidden p-2 rounded-lg"
          style={{ color: 'var(--text-primary)' }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <span
              className={`block h-0.5 transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-1.5' : ''}`}
              style={{ backgroundColor: '#00F2FF' }}
            />
            <span
              className={`block h-0.5 transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`}
              style={{ backgroundColor: '#00F2FF' }}
            />
            <span
              className={`block h-0.5 transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2.5' : ''}`}
              style={{ backgroundColor: '#00F2FF' }}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden px-4 py-4 space-y-1"
          style={{
            backgroundColor: 'var(--bg-nav)',
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
                  color: isActive ? '#00F2FF' : 'var(--text-secondary)',
                  backgroundColor: isActive ? 'rgba(0,242,255,0.08)' : 'transparent',
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
