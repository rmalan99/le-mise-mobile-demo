import { useController, type UseControllerProps } from 'react-hook-form'
import type { ComponentProps } from 'react'
import { TextInputUI } from '../../ui'

type RhfTextFieldProps = UseControllerProps<Record<string, unknown>> & Omit<ComponentProps<typeof TextInputUI>, 'name'>

export default function RhfTextField({ name, rules, shouldUnregister, onChange, onBlur, disabled, ...props }: RhfTextFieldProps) {
  const { field, fieldState } = useController({ name, rules, shouldUnregister })

  return (
    <TextInputUI
      {...props}
      value={typeof field.value === 'string' || typeof field.value === 'number' ? field.value : ''}
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
