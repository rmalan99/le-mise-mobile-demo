import { useEffect, useState } from 'react'
import { IonContent, IonPage } from '@ionic/react'
import { useHistory } from 'react-router-dom'
import { OnboardingHeader } from './components/OnboardingHeader'
import { OnboardingIllustration } from './components/OnboardingIllustration'
import { OnboardingFooter } from './components/OnboardingFooter'
import { SLIDES } from './OnboardingSlideData'
import { sessionStore } from '@store/session'

function OnboardingScreen() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const history = useHistory()
  const slide = SLIDES[currentSlide]

  useEffect(() => {
    const preloadedImages = SLIDES.map(({ illustration }) => {
      const image = new Image()
      image.src = illustration
      return image
    })
    return () => {
      preloadedImages.forEach((image) => {
        image.src = ''
      })
    }
  }, [])

  const moveToSlide = (nextSlide: number) => {
    if (nextSlide === currentSlide) return
    setCurrentSlide(nextSlide)
  }

  const handleBottomAction = () => {
    if (currentSlide < SLIDES.length - 1) {
      moveToSlide(currentSlide + 1)
      return
    }
    sessionStore.markOnboardingSeen()
    history.push(slide.bottomActionTo)
  }

  const handleTopAction = () => {
    sessionStore.markOnboardingSeen()
    history.push(slide.topActionTo)
  }

  return (
    <IonPage>
      <IonContent
        fullscreen
        scrollY={false}
        style={{
          '--background': 'linear-gradient(180deg, var(--app-color-surface) 0%, color-mix(in srgb, var(--app-color-surface) 90%, white 10%) 100%)',
        }}
      >
        <div className="relative flex min-h-full items-end justify-center overflow-hidden bg-[var(--app-color-surface)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,color-mix(in_srgb,white_90%,var(--app-color-surface)_10%),color-mix(in_srgb,var(--app-color-surface)_96%,white_4%)_45%,var(--app-color-surface)_100%)]" />

          <div className="relative flex h-screen w-full max-w-[420px] flex-col overflow-hidden border border-white/80 bg-white shadow-[0_18px_60px_color-mix(in_srgb,var(--app-color-text-secondary)_14%,transparent)]">
            <OnboardingHeader
              topActionLabel={slide.topActionLabel}
              onTopAction={handleTopAction}
            />

            <div className="relative z-10 flex h-[60%] items-center justify-center px-5 pt-3">
              <div className="relative h-full w-full">
                <OnboardingIllustration
                  title={slide.title}
                  illustration={slide.illustration}
                />
              </div>
            </div>

            <OnboardingFooter
              slideIndex={currentSlide}
              title={slide.title}
              description={slide.description}
              bottomActionLabel={slide.bottomActionLabel}
              bottomActionStyle={slide.bottomActionStyle}
              onBottomAction={handleBottomAction}
            />
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default OnboardingScreen
