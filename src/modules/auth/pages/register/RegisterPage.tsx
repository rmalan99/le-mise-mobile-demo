import { type FormEvent } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHistory } from "react-router-dom";
import {
  registerSchema,
  type RegisterFormValues,
} from "./schemas/registerSchema";
import { AuthShell } from '@auth-components/AuthShell';
import {
  RhfTextField,
  RhfPasswordField,
} from "@shared/components/forms";

const TAGLINE = "Tu próxima comida favorita empieza acá.";

function RegisterPage() {
  const history = useHistory();
  const methods = useForm<RegisterFormValues>({
    mode: "onBlur",
    resolver: zodResolver(registerSchema),
  });

  const submitRegistration = () => {
    history.push("/tabs");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    methods.handleSubmit(() => {
      submitRegistration();
    })(e);
  };

  return (
    <FormProvider {...methods}>
      <AuthShell
        title="Crear cuenta"
        tagline={TAGLINE}
        primaryCtaLabel="Registrarme"
        onPrimaryCta={() => handleSubmit}
        formContent={
          <form onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col gap-4">
              <RhfTextField
                name="firstName"
                label="Nombre"
                placeholder="Tu nombre"
                autoComplete="given-name"
                inputMode="text"
              />
              <RhfTextField
                name="lastName"
                label="Apellido"
                placeholder="Tu apellido"
                autoComplete="family-name"
                inputMode="text"
              />
              <RhfTextField
                name="email"
                label="Correo electrónico"
                placeholder="tu@email.com"
                type="email"
                autoComplete="email"
                inputMode="email"
              />
              <RhfPasswordField
                name="password"
                label="Contraseña"
                placeholder="Mínimo 8 caracteres"
                helperText="Usá al menos 8 caracteres con letras y números"
              />
            </div>
          </form>
        }
        switchModeText="¿Ya tenés cuenta? Ingresá"
        onSwitchMode={() => history.push("/login")}
      />
    </FormProvider>
  );
}

export default RegisterPage;
