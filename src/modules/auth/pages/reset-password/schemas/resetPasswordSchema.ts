import { z } from 'zod'

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string({ message: 'La nueva contraseña es obligatoria' })
      .min(8, 'Usá al menos 8 caracteres con letras y números')
      .regex(/[0-9]/, 'Usá al menos 8 caracteres con letras y números')
      .regex(/[a-zA-Z]/, 'Usá al menos 8 caracteres con letras y números'),
    confirmPassword: z
      .string({ message: 'Por favor, confirmá tu contraseña' })
      .min(1, 'Por favor, confirmá tu contraseña'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  })

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>