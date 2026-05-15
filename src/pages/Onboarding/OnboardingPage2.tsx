import OnboardingScreen from './OnboardingScreen'
import illustration from '../../assets/onboarding/guided-meal-planning.webp'

function OnboardingPage2() {
  return (
    <OnboardingScreen
      step={2}
      tone="green"
      title="Cook with confidence"
      description="Follow step-by-step guidance, timing cues, and helpful checkpoints as you go."
      illustration={illustration}
      topActionLabel="Skip"
      topActionTo="/login"
      bottomActionLabel="Next"
      bottomActionTo="/onboarding-3"
    />
  )
}

export default OnboardingPage2
