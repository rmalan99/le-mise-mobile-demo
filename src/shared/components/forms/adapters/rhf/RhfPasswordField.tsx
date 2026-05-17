import { useController, type UseControllerProps } from 'react-hook-form'
import type { ComponentProps } from 'react'
import PasswordField from '@shared-fields/PasswordField'

type RhfPasswordFieldProps = UseControllerProps<Record<string, unknown>> & Omit<ComponentProps<typeof PasswordField>, 'name'>

export default function RhfPasswordField({ name, rules, shouldUnregister, onChange, onBlur, disabled, ...props }: RhfPasswordFieldProps) {
  const { field, fieldState } = useController({ name, rules, shouldUnregister })

  return (
    <PasswordField
      {...props}
      value={typeof field.value === 'string' ? field.value : ''}
      onChange={(e) => {
        field.onChange(e)
        onChange?.(e)
      }}
      onBlur={(e) => {
        field.onBlur()
        onBlur?.(e)
      }}
      disabled={disabled || field.disabled}
      errorMessage={fieldState.error?.message}
    />
  )
}
