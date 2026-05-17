import type { ReactNode } from 'react'

interface FieldLabelProps {
  htmlFor?: string
  children: ReactNode
  className?: string
}

export function FieldLabel({ htmlFor, children, className = '' }: FieldLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-[13px] font-medium text-[var(--app-color-text-secondary)] ${className}`}
    >
      {children}
    </label>
  )
}
