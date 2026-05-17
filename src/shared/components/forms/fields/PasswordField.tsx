import { useState } from 'react'
import { IconEye, IconEyeOff } from '@tabler/icons-react'
import { TextInputUI } from '../ui'

interface PasswordFieldProps {
  name?: string
  label?: string
  placeholder?: string
  helperText?: string
  autoComplete?: string
  required?: boolean
  disabled?: boolean
  readOnly?: boolean
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  className?: string
  errorMessage?: string
}

export default function PasswordField({
  label,
  placeholder,
  helperText,
  autoComplete,
  required,
  disabled,
  readOnly,
  value,
  onChange,
  onBlur,
  className = '',
  errorMessage,
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <TextInputUI
      type={showPassword ? 'text' : 'password'}
      label={label}
      placeholder={placeholder}
      helperText={helperText}
      autoComplete={autoComplete}
      required={required}
      disabled={disabled}
      readOnly={readOnly}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      errorMessage={errorMessage}
      trailingSlot={
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          className="text-[var(--app-color-text-disabled)] hover:text-[var(--app-color-text-secondary)]"
        >
          {showPassword ? <IconEyeOff size={20} stroke={1.8} aria-hidden="true" /> : <IconEye size={20} stroke={1.8} aria-hidden="true" />}
        </button>
      }
      className={className}
    />
  )
}
