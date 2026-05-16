import { OnboardingTopAction } from './OnboardingTopAction'

type Props = {
  topActionLabel: 'Skip' | 'Login'
  onTopAction: () => void
}

export function OnboardingHeader({ topActionLabel, onTopAction }: Props) {
  return (
    <header className="relative z-10 flex items-center justify-between px-6 pt-7">
      <img src="/app-icon.svg" alt="Le Mise" className="h-15 w-15 object-contain" />
      <OnboardingTopAction label={topActionLabel} onClick={onTopAction} />
    </header>
  )
}