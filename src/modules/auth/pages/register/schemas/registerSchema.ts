import { z } from 'zod'

export const registerSchema = z.object({
  firstName: z
    .string({ message: 'El nombre es obligatorio' })
    .min(1, 'El nombre es obligatorio'),
  lastName: z
    .string({ message: 'El apellido es obligatorio' })
    .min(1, 'El apellido es obligatorio'),
  email: z
    .string({ message: 'El correo electrónico es obligatorio' })
    .min(1, 'El correo electrónico es obligatorio')
    .email('Ingresá un correo electrónico válido'),
  password: z
    .string({ message: 'La contraseña es obligatoria' })
    .min(8, 'Usá al menos 8 caracteres con letras y números')
    .regex(/[0-9]/, 'Usá al menos 8 caracteres con letras y números')
    .regex(/[a-zA-Z]/, 'Usá al menos 8 caracteres con letras y números'),
})

export type RegisterFormValues = z.infer<typeof registerSchema>