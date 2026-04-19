import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost'
}

export default function Button({ variant = 'primary', className = '', style, ...props }: ButtonProps) {
  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 22px',
    borderRadius: '8px',
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 600,
    fontSize: '0.9rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: 'none',
  }

  const variants: Record<string, React.CSSProperties> = {
    primary: {
      background: '#F97316',
      color: '#000',
    },
    outline: {
      background: 'rgba(0,242,255,0.08)',
      color: '#00F2FF',
      border: '1px solid rgba(0,242,255,0.5)',
    },
    ghost: {
      background: 'transparent',
      color: '#00F2FF',
      border: '1px solid rgba(0,242,255,0.3)',
    },
  }

  return (
    <button
      style={{ ...base, ...variants[variant], ...style }}
      className={className}
      {...props}
    />
  )
}
