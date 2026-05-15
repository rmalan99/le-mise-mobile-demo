import { IonApp, IonRouterOutlet } from '@ionic/react'
import { Route, Switch, Redirect } from 'react-router-dom'
import SplashPage from './pages/Splash/SplashPage'
import OnboardingPage1 from './pages/Onboarding/OnboardingPage1'
import OnboardingPage2 from './pages/Onboarding/OnboardingPage2'
import OnboardingPage3 from './pages/Onboarding/OnboardingPage3'
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
          <Route exact path="/onboarding-1">
            <OnboardingPage1 />
          </Route>
          <Route exact path="/onboarding-2">
            <OnboardingPage2 />
          </Route>
          <Route exact path="/onboarding-3">
            <OnboardingPage3 />
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
