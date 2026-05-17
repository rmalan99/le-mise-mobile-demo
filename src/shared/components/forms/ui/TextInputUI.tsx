import type { InputHTMLAttributes, ReactNode } from 'react'
import { forwardRef } from 'react'

interface TextInputUIProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  label?: string
  helperText?: string
  errorMessage?: string
  leadingIcon?: ReactNode
  trailingSlot?: ReactNode
}

const baseInputClass = `
  w-full min-h-[50px] px-4 py-3 rounded-2xl
  text-[13px] text-[var(--app-color-text-primary)]
  bg-white border transition-all duration-150
  placeholder:text-[var(--app-color-text-disabled)]
  focus:outline-none focus:ring-2 focus:ring-offset-0
`.trim()

export default forwardRef<HTMLInputElement, TextInputUIProps>(function TextInputUI(
  { label, helperText, errorMessage, leadingIcon, trailingSlot, className = '', ...rest },
  ref
) {
  const hasError = Boolean(errorMessage)

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-[13px] font-medium text-[var(--app-color-text-secondary)]">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leadingIcon && (
          <span className="absolute left-3 text-[var(--app-color-text-disabled)]">{leadingIcon}</span>
        )}
        <input
          ref={ref}
          className={`
            ${baseInputClass}
            ${leadingIcon ? 'pl-10' : ''}
            ${trailingSlot ? 'pr-10' : ''}
            ${hasError
              ? 'border-[var(--app-color-danger)] focus:ring-[var(--app-color-danger)]'
              : 'border-[var(--app-color-text-disabled)] focus:border-[var(--app-color-primary)] focus:ring-[var(--app-color-primary)]'
            }
            disabled:opacity-50 disabled:cursor-not-allowed
            ${className}
          `.trim()}
          {...rest}
        />
        {trailingSlot && (
          <span className="absolute right-3 text-[var(--app-color-text-disabled)]">{trailingSlot}</span>
        )}
      </div>
      {errorMessage ? (
        <span className="text-xs text-[var(--app-color-danger)]">{errorMessage}</span>
      ) : helperText ? (
        <span className="text-xs text-[var(--app-color-text-disabled)]">{helperText}</span>
      ) : null}
    </div>
  )
})