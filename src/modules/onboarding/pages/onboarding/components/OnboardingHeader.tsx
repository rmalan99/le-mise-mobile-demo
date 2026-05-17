import { Brand } from '@shared/components/brand'
import { OnboardingTopAction } from './OnboardingTopAction'

type Props = {
  topActionLabel: 'Skip' | 'Login'
  onTopAction: () => void
}

export function OnboardingHeader({ topActionLabel, onTopAction }: Props) {
  return (
    <header className="relative z-10 flex items-center justify-between px-6 pt-7">
      <Brand size="md" />
      <OnboardingTopAction label={topActionLabel} onClick={onTopAction} />
    </header>
  )
}
