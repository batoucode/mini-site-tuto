import { ReactNode, CSSProperties } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

export default function Card({ children, className = '', style }: CardProps) {
  return (
    <div
      className={className}
      style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        boxShadow: 'var(--shadow-soft)',
        padding: '1.5rem',
        transition: 'box-shadow 0.2s ease',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
