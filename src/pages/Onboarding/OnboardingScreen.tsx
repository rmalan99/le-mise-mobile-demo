import { useState } from 'react'
import type { CSSProperties } from 'react'
import { useHistory } from 'react-router-dom'
import { IonContent, IonPage } from '@ionic/react'
import { IconArrowRight } from '@tabler/icons-react'
import { sessionStore } from '../../stores/session'
import freshIngredients from '../../assets/onboarding/fresh-ingredients.webp'
import guidedMealPlanning from '../../assets/onboarding/guided-meal-planning.webp'
import healthyMealServe from '../../assets/onboarding/healthy-meal-serve.webp'

type OnboardingTone = 'coral' | 'green' | 'amber'

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

const SLIDES = [
  {
    step: 1 as const,
    tone: 'amber' as OnboardingTone,
    title: 'Discover fresh meals',
    description: 'Browse beautifully simple recipes with clear ingredients and effortless prep.',
    illustration: freshIngredients,
    topActionLabel: 'Skip',
    topActionTo: '/login',
    bottomActionLabel: 'Next',
    bottomActionTo: '/onboarding',
    bottomActionStyle: 'circle' as const,
  },
  {
    step: 2 as const,
    tone: 'green' as OnboardingTone,
    title: 'Cook with confidence',
    description: 'Follow step-by-step guidance, timing cues, and helpful checkpoints as you go.',
    illustration: guidedMealPlanning,
    topActionLabel: 'Skip',
    topActionTo: '/login',
    bottomActionLabel: 'Next',
    bottomActionTo: '/onboarding',
    bottomActionStyle: 'circle' as const,
  },
  {
    step: 3 as const,
    tone: 'coral' as OnboardingTone,
    title: 'Build healthy momentum',
    description: 'Save your favorites, stay consistent, and jump into your account when you are ready.',
    illustration: healthyMealServe,
    topActionLabel: 'Login',
    topActionTo: '/login',
    bottomActionLabel: 'Start',
    bottomActionTo: '/register',
    bottomActionStyle: 'pill' as const,
  },
]

function OnboardingScreen() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const history = useHistory()
  const slide = SLIDES[currentSlide]

  const handleBottomAction = () => {
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide((s) => s + 1)
    } else {
      sessionStore.markOnboardingSeen()
      history.push(slide.bottomActionTo)
    }
  }

  const handleTopAction = () => {
    sessionStore.markOnboardingSeen()
    history.push(slide.topActionTo)
  }

  return (
    <IonPage>
      <IonContent fullscreen scrollY={false} className="onboarding-page">
        <div
          className={`onboarding-page__shell onboarding-page__shell--${slide.tone}`}
          style={toneStyles[slide.tone]}
        >
          <div className="onboarding-page__pattern" aria-hidden="true" />
          <div className="onboarding-page__glow onboarding-page__glow--left" aria-hidden="true" />
          <div className="onboarding-page__glow onboarding-page__glow--right" aria-hidden="true" />

          <div className="onboarding-page__frame">
            <div className="onboarding-page__topbar">
              <img src="/app-icon.svg" alt="Le Mise" className="onboarding-page__brand" />
              <button
                type="button"
                className={`onboarding-page__top-action onboarding-page__top-action--${slide.tone}`}
                onClick={handleTopAction}
              >
                {slide.topActionLabel}
              </button>
            </div>

            <div className="onboarding-page__art">
              <img
                key={slide.step}
                src={slide.illustration}
                alt={slide.title}
                className="onboarding-page__illustration"
              />
            </div>

            <section className="onboarding-page__panel" aria-labelledby={`onboarding-title-${slide.step}`}>
              <h1 id={`onboarding-title-${slide.step}`} className="onboarding-page__title">
                {slide.title}
              </h1>
              <p className="onboarding-page__description">{slide.description}</p>

              <div className="onboarding-page__progress" aria-label={`Onboarding step ${slide.step} of 3`}>
                {SLIDES.map((_, i) => (
                  <span
                    key={i}
                    className={`onboarding-page__dot${i === currentSlide ? ' onboarding-page__dot--active' : ''}`}
                    aria-hidden="true"
                  />
                ))}
              </div>

              <button
                type="button"
                className={`onboarding-page__cta onboarding-page__cta--${slide.bottomActionStyle}`}
                onClick={handleBottomAction}
                aria-label={slide.bottomActionLabel}
              >
                {slide.bottomActionStyle === 'pill' ? (
                  <span>{slide.bottomActionLabel}</span>
                ) : (
                  <>
                    <span className="onboarding-page__cta-label">{slide.bottomActionLabel}</span>
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