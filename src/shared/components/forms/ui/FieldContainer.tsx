import type { ReactNode } from 'react'

interface FieldContainerProps {
  children: ReactNode
  className?: string
}

export function FieldContainer({ children, className = '' }: FieldContainerProps) {
  return <div className={`flex flex-col gap-1 ${className}`}>{children}</div>
}