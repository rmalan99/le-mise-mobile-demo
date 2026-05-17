import { type FormEvent } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useHistory } from 'react-router-dom'
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from './schemas/resetPasswordSchema'
import { AuthShell } from '@auth-components/AuthShell'
import { RhfPasswordField } from '@shared/components/forms'
import { useAlertMise } from '@shared-components/alert'

const TAGLINE = 'Creá una nueva contraseña segura para tu cuenta.'

function ResetPasswordPage() {
  const history = useHistory()
  const { showAlert } = useAlertMise()
  const methods = useForm<ResetPasswordFormValues>({
    mode: 'onBlur',
    resolver: zodResolver(resetPasswordSchema),
  })

  const submitResetPassword = async () => {
    // Mock submit handler — replace with real API call when backend exists
    await new Promise((resolve) => setTimeout(resolve, 800))
    await showAlert({
      header: 'Contraseña actualizada',
      message:
        'Tu contraseña fue actualizada exitosamente. Ya podés iniciar sesión.',
      buttons: [
        {
          text: 'Ir al inicio',
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
      submitResetPassword()
    })(e)
  }

  const handleBackToLogin = () => {
    history.push('/login')
  }

  return (
    <FormProvider {...methods}>
      <AuthShell
        title="Nueva contraseña"
        tagline={TAGLINE}
        primaryCtaLabel="Actualizar contraseña"
        onPrimaryCta={methods.handleSubmit(submitResetPassword)}
        secondaryLinkLabel="Volver al inicio"
        onSecondaryLink={handleBackToLogin}
        formContent={
          <form onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col gap-4">
              <RhfPasswordField
                name="newPassword"
                label="Nueva contraseña"
                placeholder="Mínimo 8 caracteres"
                helperText="Usá al menos 8 caracteres con letras y números"
                autoComplete="new-password"
              />
              <RhfPasswordField
                name="confirmPassword"
                label="Confirmar contraseña"
                placeholder="Repetí tu contraseña"
                autoComplete="new-password"
              />
            </div>
          </form>
        }
        switchModeText="¿Ya recordaste tu contraseña? Ingresá"
        onSwitchMode={handleBackToLogin}
        socialProviders={[]}
      />
    </FormProvider>
  )
}

export default ResetPasswordPage
