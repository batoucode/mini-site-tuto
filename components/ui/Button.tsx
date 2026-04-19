import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline'
}

export default function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  const baseStyles = 'px-6 py-3 rounded-full font-medium transition-all'

  const variants = {
    primary: 'bg-primary text-white hover:bg-primaryHover shadow-soft hover:shadow-hover',
    outline: 'border border-border text-text hover:bg-gray-50',
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    />
  )
}
