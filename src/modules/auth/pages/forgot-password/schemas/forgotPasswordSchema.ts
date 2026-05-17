import { z } from 'zod'

export const forgotPasswordSchema = z.object({
  email: z
    .string({ message: 'El correo electrónico es obligatorio' })
    .min(1, 'El correo electrónico es obligatorio')
    .email('Ingresá un correo electrónico válido'),
})

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>