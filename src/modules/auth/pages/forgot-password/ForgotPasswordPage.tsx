import { type FormEvent } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useHistory } from 'react-router-dom'
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from './schemas/forgotPasswordSchema'
import { AuthShell } from '@auth-components/AuthShell'
import { RhfTextField } from '@shared/components/forms'
import { useAlertMise } from '@shared-components/alert'

const TAGLINE = 'Te vamos a enviar un enlace para que recuperes tu cuenta.'

function ForgotPasswordPage() {
  const history = useHistory()
  const { showAlert } = useAlertMise()
  const methods = useForm<ForgotPasswordFormValues>({
    mode: 'onBlur',
    resolver: zodResolver(forgotPasswordSchema),
  })

  const submitForgotPassword = async () => {
    // Mock submit handler — replace with real API call when backend exists
    await new Promise((resolve) => setTimeout(resolve, 800))
    await showAlert({
      header: 'Revisá tu correo',
      message:
        'Te enviamos un enlace para recuperar tu cuenta. Si no lo ves, revisá la carpeta de spam.',
      buttons: [
        {
          text: 'Volver al inicio',
          handler: () => {
            history.push('/login')
          },
        },
      ],
    })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    methods.handleSubmit(() => {
      submitForgotPassword()
    })(e)
  }

  const handleBackToLogin = () => {
    history.push('/login')
  }

  return (
    <FormProvider {...methods}>
      <AuthShell
        title="¿Olvidaste tu contraseña?"
        tagline={TAGLINE}
        primaryCtaLabel="Enviar enlace"
        onPrimaryCta={methods.handleSubmit(submitForgotPassword)}
        secondaryLinkLabel="Volver al inicio"
        onSecondaryLink={handleBackToLogin}
        formContent={
          <form onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col gap-4">
              <RhfTextField
                name="email"
                label="Correo electrónico"
                placeholder="tu@email.com"
                type="email"
                autoComplete="email"
                inputMode="email"
              />
            </div>
          </form>
        }
        switchModeText="¿Recordaste tu contraseña? Ingresá"
        onSwitchMode={handleBackToLogin}
        socialProviders={[]}
      />
    </FormProvider>
  )
}

export default ForgotPasswordPage
