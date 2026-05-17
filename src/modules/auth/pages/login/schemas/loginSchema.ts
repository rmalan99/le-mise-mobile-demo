import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string({ message: 'El correo electrónico es obligatorio' })
    .min(1, 'El correo electrónico es obligatorio')
    .email('Ingresá un correo electrónico válido'),
  password: z
    .string({ message: 'La contraseña es obligatoria' })
    .min(1, 'La contraseña es obligatoria'),
})

export type LoginFormValues = z.infer<typeof loginSchema>