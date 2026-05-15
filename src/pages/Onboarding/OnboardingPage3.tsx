import OnboardingScreen from './OnboardingScreen'
import illustration from '../../assets/onboarding/healthy-meal-serve.webp'

function OnboardingPage3() {
  return (
    <OnboardingScreen
      step={3}
      tone="coral"
      title="Build healthy momentum"
      description="Save your favorites, stay consistent, and jump into your account when you are ready."
      illustration={illustration}
      topActionLabel="Login"
      topActionTo="/login"
      bottomActionLabel="Start"
      bottomActionTo="/register"
      bottomActionStyle="pill"
    />
  )
}

export default OnboardingPage3
