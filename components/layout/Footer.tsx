import ThemeToggle from '@/components/ui/ThemeToggle'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer
      className="mt-16 py-8 px-4"
      style={{
        borderTop: '1px solid var(--border)',
        backgroundColor: 'var(--bg-elevated)',
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div
          style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1rem', letterSpacing: '-0.02em' }}
        >
          <span style={{ color: '#F97316', fontFamily: "'JetBrains Mono', monospace" }}>&lt;/&gt;</span>
          {' '}DES<span style={{ color: '#00F2FF' }}>CODES</span>
        </div>

        {/* Links */}
        <nav className="flex items-center gap-4">
          {[
            { href: '/generateur', label: 'Générateur' },
            { href: '/tutoriels/starter', label: 'Tutoriels' },
            { href: '/options', label: 'Options' },
            { href: '/charte-de-couleurs', label: 'Charte' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm hover:opacity-70 transition-opacity"
              style={{ color: 'var(--text-muted)', fontFamily: "'DM Sans', sans-serif" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Theme toggle */}
        <div className="flex items-center gap-3">
          <span
            className="text-xs"
            style={{ color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace" }}
          >
            // thème
          </span>
          <ThemeToggle />
        </div>
      </div>

      <div
        className="max-w-6xl mx-auto mt-6 pt-6 text-center"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <p
          className="text-xs"
          style={{ color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace" }}
        >
          © 2025 DESCODES — Progression sauvegardée localement
        </p>
      </div>
    </footer>
  )
}
