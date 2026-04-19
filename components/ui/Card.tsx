import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white border border-[#f0e5d8] rounded-[20px] shadow-[0_4px_12px_rgba(0,0,0,0.05)] p-6 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-shadow ${className}`}>
      {children}
    </div>
  )
}
