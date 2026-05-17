import type { ReactNode } from 'react'

interface FieldErrorTextProps {
  children: ReactNode
  className?: string
}

export function FieldErrorText({ children, className = '' }: FieldErrorTextProps) {
  return (
    <span className={`text-xs text-[var(--app-color-danger)] ${className}`}>
      {children}
    </span>
  )
}
