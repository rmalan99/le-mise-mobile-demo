import OnboardingScreen from './OnboardingScreen'
import illustration from '../../assets/onboarding/fresh-ingredients.webp'

function OnboardingPage1() {
  return (
    <OnboardingScreen
      step={1}
      tone="amber"
      title="Discover fresh meals"
      description="Browse beautifully simple recipes with clear ingredients and effortless prep."
      illustration={illustration}
      topActionLabel="Skip"
      topActionTo="/login"
      bottomActionLabel="Next"
      bottomActionTo="/onboarding-2"
    />
  )
}

export default OnboardingPage1
