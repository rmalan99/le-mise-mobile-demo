import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonUIProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
  fullWidth?: boolean
  children: ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-[var(--app-color-primary)] text-white hover:opacity-90',
  secondary: 'bg-[var(--app-color-secondary)] text-white hover:opacity-90',
  ghost: 'bg-transparent text-[var(--app-color-text-primary)] hover:bg-black/5',
  link: 'bg-transparent text-[var(--app-color-primary)] hover:underline p-0',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}

export default function ButtonUI({
  variant = 'primary',
  size = 'md',
  loading = false,
  leadingIcon,
  trailingIcon,
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...rest
}: ButtonUIProps) {
  const isDisabled = disabled || loading

  return (
    <button
      type="button"
      disabled={isDisabled}
      className={`
        inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition-all duration-150
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}
        ${className}
      `.trim()}
      {...rest}
    >
      {loading && (
        <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
      )}
      {!loading && leadingIcon && <span className="shrink-0">{leadingIcon}</span>}
      {children}
      {!loading && trailingIcon && <span className="shrink-0">{trailingIcon}</span>}
    </button>
  )
}