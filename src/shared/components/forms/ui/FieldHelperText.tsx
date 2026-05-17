import type { ReactNode } from 'react'

interface FieldHelperTextProps {
  children: ReactNode
  className?: string
}

export function FieldHelperText({ children, className = '' }: FieldHelperTextProps) {
  return (
    <span className={`text-xs text-[var(--app-color-text-disabled)] ${className}`}>
      {children}
    </span>
  )
}
