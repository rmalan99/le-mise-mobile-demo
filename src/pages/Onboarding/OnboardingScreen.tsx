import type { CSSProperties } from 'react'
import { useHistory } from 'react-router-dom'
import { IonContent, IonPage } from '@ionic/react'
import { IconArrowRight } from '@tabler/icons-react'

type OnboardingTone = 'coral' | 'green' | 'amber'

type OnboardingScreenProps = {
  step: 1 | 2 | 3
  title: string
  description: string
  illustration: string
  tone: OnboardingTone
  topActionLabel: string
  topActionTo: string
  bottomActionLabel: string
  bottomActionTo: string
  bottomActionStyle?: 'circle' | 'pill'
}

type ToneStyle = CSSProperties & Record<string, string>

const toneStyles: Record<OnboardingTone, ToneStyle> = {
  coral: {
    '--onboarding-accent': 'var(--app-color-primary)',
    '--onboarding-accent-soft': 'color-mix(in srgb, var(--app-color-primary) 16%, transparent)',
    '--onboarding-accent-strong': '#ea4f47',
    '--onboarding-progress': 'var(--app-color-primary)',
    '--onboarding-progress-track': 'color-mix(in srgb, var(--app-color-primary) 14%, transparent)',
  },
  green: {
    '--onboarding-accent': 'var(--app-color-secondary)',
    '--onboarding-accent-soft': 'color-mix(in srgb, var(--app-color-secondary) 16%, transparent)',
    '--onboarding-accent-strong': '#22985a',
    '--onboarding-progress': 'var(--app-color-secondary)',
    '--onboarding-progress-track': 'color-mix(in srgb, var(--app-color-secondary) 14%, transparent)',
  },
  amber: {
    '--onboarding-accent': 'var(--app-color-accent)',
    '--onboarding-accent-soft': 'color-mix(in srgb, var(--app-color-accent) 16%, transparent)',
    '--onboarding-accent-strong': '#df8d12',
    '--onboarding-progress': 'var(--app-color-accent)',
    '--onboarding-progress-track': 'color-mix(in srgb, var(--app-color-accent) 14%, transparent)',
  },
}

function OnboardingScreen({
  step,
  title,
  description,
  illustration,
  tone,
  topActionLabel,
  topActionTo,
  bottomActionLabel,
  bottomActionTo,
  bottomActionStyle = 'circle',
}: OnboardingScreenProps) {
  const history = useHistory()

  return (
    <IonPage>
      <IonContent fullscreen scrollY={false} className="onboarding-page">
        <div className={`onboarding-page__shell onboarding-page__shell--${tone}`} style={toneStyles[tone]}>
          <div className="onboarding-page__pattern" aria-hidden="true" />
          <div className="onboarding-page__glow onboarding-page__glow--left" aria-hidden="true" />
          <div className="onboarding-page__glow onboarding-page__glow--right" aria-hidden="true" />

          <div className="onboarding-page__frame">
            <div className="onboarding-page__topbar">
              <img src="/app-icon.svg" alt="Le Mise" className="onboarding-page__brand" />
              <button
                type="button"
                className={`onboarding-page__top-action onboarding-page__top-action--${tone}`}
                onClick={() => history.push(topActionTo)}
              >
                {topActionLabel}
              </button>
            </div>

            <div className="onboarding-page__art">
              <img src={illustration} alt={title} className="onboarding-page__illustration" />
            </div>

            <section className="onboarding-page__panel" aria-labelledby={`onboarding-title-${step}`}>
              <h1 id={`onboarding-title-${step}`} className="onboarding-page__title">
                {title}
              </h1>
              <p className="onboarding-page__description">{description}</p>

              <div className="onboarding-page__progress" aria-label={`Onboarding step ${step} of 3`}>
                {[1, 2, 3].map((dot) => (
                  <span
                    key={dot}
                    className={`onboarding-page__dot${dot === step ? ' onboarding-page__dot--active' : ''}`}
                    aria-hidden="true"
                  />
                ))}
              </div>

              <button
                type="button"
                className={`onboarding-page__cta onboarding-page__cta--${bottomActionStyle}`}
                onClick={() => history.push(bottomActionTo)}
                aria-label={bottomActionLabel}
              >
                {bottomActionStyle === 'pill' ? (
                  <span>{bottomActionLabel}</span>
                ) : (
                  <>
                    <span className="onboarding-page__cta-label">{bottomActionLabel}</span>
                    <IconArrowRight size={34} stroke={2.4} aria-hidden="true" />
                  </>
                )}
              </button>
            </section>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default OnboardingScreen
