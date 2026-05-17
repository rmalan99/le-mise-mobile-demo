import type { ReactNode } from 'react'
import { ButtonUI } from '../ui'

interface PrimaryButtonProps {
  onClick?: () => void
  children: ReactNode
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export default function PrimaryButton({
  onClick,
  children,
  className = '',
  disabled,
  type = 'button',
}: PrimaryButtonProps) {
  return (
    <ButtonUI
      variant="primary"
      size="lg"
      fullWidth
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={className}
    >
      {children}
    </ButtonUI>
  )
}
