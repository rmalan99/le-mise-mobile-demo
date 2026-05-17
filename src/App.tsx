import { IonApp, IonRouterOutlet } from '@ionic/react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { AlertMise } from '@shared-components/alert'
import SplashPage from '@splash/pages/splash/SplashPage'
import OnboardingScreen from '@onboarding/pages/onboarding/OnboardingScreen'
import LoginPage from '@auth-pages/login/LoginPage'
import RegisterPage from '@auth-pages/register/RegisterPage'
import ResetPasswordPage from '@auth-pages/reset-password/ResetPasswordPage'
import ForgotPasswordPage from '@auth-pages/forgot-password/ForgotPasswordPage'
import Tabs from '@tabs/Tabs'

function App() {
  return (
    <IonApp>
      <AlertMise />
      <IonRouterOutlet>
        <Switch>
          <Route exact path="/">
            <SplashPage />
          </Route>
          <Route exact path="/onboarding">
            <OnboardingScreen />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/register">
            <RegisterPage />
          </Route>
          <Route exact path="/reset-password">
            <ResetPasswordPage />
          </Route>
          <Route exact path="/forgot-password">
            <ForgotPasswordPage />
          </Route>
          <Route path="/tabs">
            <Tabs />
          </Route>
          <Redirect to="/" />
        </Switch>
      </IonRouterOutlet>
    </IonApp>
  )
}

export default App
