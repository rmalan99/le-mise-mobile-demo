import { IonApp, IonRouterOutlet } from '@ionic/react'
import { Route, Switch, Redirect } from 'react-router-dom'
import SplashPage from './pages/Splash/SplashPage'
import OnboardingScreen from './pages/Onboarding/OnboardingScreen'
import LoginPage from './pages/Auth/LoginPage'
import RegisterPage from './pages/Auth/RegisterPage'
import ResetPasswordPage from './pages/Auth/ResetPasswordPage'
import ForgotPasswordPage from './pages/Auth/ForgotPasswordPage'
import Tabs from './pages/Tabs/Tabs'

function App() {
  return (
    <IonApp>
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