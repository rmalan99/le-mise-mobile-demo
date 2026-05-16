import { useEffect } from 'react'
import { IonContent, IonPage } from '@ionic/react'
import { sessionStore } from '../../stores/session'

function SplashPage() {
  useEffect(() => {
    // Small delay to display splash before redirecting
    const timer = setTimeout(() => {
      if (sessionStore.hasSeenOnboarding) {
        // User already saw onboarding — go to login (main entry point for returning users)
        window.location.replace('/login')
      } else {
        // First time — show onboarding
        window.location.replace('/onboarding')
      }
    }, 2000)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <IonPage>
      <IonContent fullscreen scrollY={false} className="[--background:var(--app-color-surface)]">
        <div className="relative flex min-h-full items-center justify-center overflow-hidden bg-[var(--app-color-surface)] px-6">
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-18 h-72 w-80 rotate-6 bg-[var(--app-color-primary)]/28 sm:-right-24 sm:-top-22 sm:h-96 sm:w-[28rem]"
            style={{ borderRadius: '60% 40% 65% 35% / 45% 58% 42% 55%' }}
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-20 -left-18 h-80 w-72 -rotate-6 bg-[var(--app-color-secondary)]/24 sm:-bottom-24 sm:-left-22 sm:h-[26rem] sm:w-[24rem]"
            style={{ borderRadius: '38% 62% 36% 64% / 60% 44% 56% 40%' }}
          />

          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 pointer-events-none select-none">
            <img
              src="/app-icon.png"
              alt="Le Mise"
              className="h-auto w-[196px] sm:w-[224px]"
            />

            <span className="inline-flex items-center gap-2" aria-hidden="true">
              <span className="size-2.5 rounded-full bg-[var(--app-color-danger)] animate-[pulse_1.2s_ease-in-out_infinite]" style={{ animationDelay: '0ms' }} />
              <span className="size-2.5 rounded-full bg-[var(--app-color-accent)] animate-[pulse_1.2s_ease-in-out_infinite]" style={{ animationDelay: '180ms' }} />
              <span className="size-2.5 rounded-full bg-[var(--app-color-secondary)] animate-[pulse_1.2s_ease-in-out_infinite]" style={{ animationDelay: '360ms' }} />
            </span>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default SplashPage