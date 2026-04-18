'use client'

import { useTheme } from '@/components/layout/ThemeProvider'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
      className="relative inline-flex items-center w-12 h-6 rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      style={{
        backgroundColor: isDark ? 'var(--accent)' : 'var(--border)',
      }}
    >
      {/* Cercle coulissant */}
      <span
        className="absolute top-1 w-4 h-4 rounded-full transition-all duration-300 flex items-center justify-center text-xs"
        style={{
          left: isDark ? '1.75rem' : '0.25rem',
          backgroundColor: 'white',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        }}
      >
        {isDark ? '🌙' : '☀️'}
      </span>
    </button>
  )
}
