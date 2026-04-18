import ThemeToggle from '@/components/ui/ThemeToggle'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer
      className="mt-16 py-8 px-4"
      style={{
        borderTop: '1px solid var(--border)',
        backgroundColor: 'var(--bg)',
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: branding */}
        <div className="flex items-center gap-2">
          <span
            className="w-6 h-6 rounded-md flex items-center justify-center text-white text-xs font-bold"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            AP
          </span>
          <span className="text-sm font-medium" style={{ color: 'var(--fg)' }}>
            Guide Artisan Pro
          </span>
        </div>

        {/* Center: links */}
        <nav className="flex items-center gap-4">
          {[
            { href: '/pack/starter', label: 'Starter' },
            { href: '/pack/artisan', label: 'Artisan' },
            { href: '/pack/business', label: 'Business' },
            { href: '/options', label: 'Options' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm hover:opacity-70 transition-opacity"
              style={{ color: 'var(--fg-muted)' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: theme toggle */}
        <div className="flex items-center gap-3">
          <span className="text-xs" style={{ color: 'var(--fg-muted)' }}>
            Thème
          </span>
          <ThemeToggle />
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-6 pt-6 text-center" style={{ borderTop: '1px solid var(--border)' }}>
        <p className="text-xs" style={{ color: 'var(--fg-muted)' }}>
          Guide interne · Freelance Artisan Pro · Progression sauvegardée localement
        </p>
      </div>
    </footer>
  )
}
