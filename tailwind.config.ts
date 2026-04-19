import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:  ["'DM Sans'", 'system-ui', 'sans-serif'],
        mono:  ["'JetBrains Mono'", 'monospace'],
        syne:  ["'Syne'", 'sans-serif'],
        ubuntu: ["'Ubuntu'", 'system-ui', 'sans-serif'],
      },
      colors: {
        accent:  '#00F2FF',
        accent2: '#F97316',
      },
      boxShadow: {
        soft:         '0 4px 12px rgba(0,0,0,0.3)',
        card:         '0 4px 16px rgba(0,0,0,0.4)',
        'card-hover': '0 8px 24px rgba(0,0,0,0.5)',
      },
      borderRadius: {
        card: '12px',
        xl2:  '16px',
      },
      animation: {
        'fade-in':  'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
