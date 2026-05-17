import { type FormEvent } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useHistory } from 'react-router-dom'
import { loginSchema, type LoginFormValues } from './schemas/loginSchema'
import { AuthShell } from '@auth-components/AuthShell'
import { RhfTextField, RhfPasswordField } from '@shared/components/forms'
import { useSessionStore } from '@store/session'

const TAGLINE = 'Recetas que enamoran, cocina que divierte.'



function LoginPage() {
  const history = useHistory()
  const validateLogin = useSessionStore((state) => state.validateLogin)
  const methods = useForm<LoginFormValues>({
    mode: 'onBlur',
    resolver: zodResolver(loginSchema),
  })

  const submitLogin = ({ email, password }: LoginFormValues) => {
    if (!validateLogin(email, password)) {
      methods.setError('password', {
        type: 'validate',
        message: 'Correo electrónico o contraseña incorrectos',
      })
      return
    }

    history.push('/tabs')
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    methods.handleSubmit(submitLogin)(e)
  }

  const handleForgotPassword = () => {
    history.push('/forgot-password')
  }

  return (
    <FormProvider {...methods}>
      <AuthShell
        title="¡Bienvenido de nuevo!"
        tagline={TAGLINE}
        primaryCtaLabel="A cocinar"
        onPrimaryCta={methods.handleSubmit(submitLogin)}
        secondaryLinkLabel="Olvidé mi contraseña"
        onSecondaryLink={handleForgotPassword}
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
                onChange={() => {
                  if (methods.formState.errors.password?.type === 'validate') {
                    methods.clearErrors('password')
                  }
                }}
              />
              <RhfPasswordField
                name="password"
                label="Contraseña"
                placeholder="Tu contraseña"
                onChange={() => {
                  if (methods.formState.errors.password?.type === 'validate') {
                    methods.clearErrors('password')
                  }
                }}
              />
            </div>
          </form>
        }
        switchModeText="¿No tenés cuenta? Registrate"
        onSwitchMode={() => history.push('/register')}
      />
    </FormProvider>
  )
}

export default LoginPage
