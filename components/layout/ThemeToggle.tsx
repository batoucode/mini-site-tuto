'use client'

import { useTheme } from './ThemeProvider'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      className="theme-toggle"
      id="themeToggle"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <span className="toggle-track">
        <span className="icon-sun">☀</span>
        <span className="icon-moon">🌙</span>
      </span>
    </button>
  )
}
