import { IonContent, IonPage, IonRadio, IonRadioGroup } from '@ionic/react'
import { IconChevronLeft, IconCircleCheckFilled } from '@tabler/icons-react'
import { useHistory } from 'react-router-dom'
import { useSessionStore } from '@/store/session'

function ProfileLanguagePage() {
  const history = useHistory()
  const language = useSessionStore((state) => state.userData?.language ?? 'es')
  const updateUserLanguage = useSessionStore((state) => state.updateUserLanguage)

  return (
    <IonPage>
      <IonContent fullscreen className="[--background:var(--app-color-surface)]">
        <div
          className="min-h-full bg-[linear-gradient(180deg,var(--app-color-surface)_0%,var(--app-color-surface-alt)_100%)] px-6 pb-8"
          style={{ paddingTop: 'max(16px, env(safe-area-inset-top))' }}
        >
          <div className="mx-auto max-w-sm">
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => history.push('/tabs/profile')}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--app-color-card)] text-[var(--app-color-text-primary)] shadow-[0_10px_24px_rgba(164,130,74,0.10)]"
                aria-label="Volver a perfil"
              >
                <IconChevronLeft size={20} stroke={2} aria-hidden="true" />
              </button>

              <h1 className="flex-1 text-center text-[26px] font-semibold tracking-[-0.03em] text-[var(--app-color-text-primary)]">
                Idioma
              </h1>

              <div className="h-10 w-10 shrink-0" aria-hidden="true" />
            </div>

            <section className="mt-6 rounded-[28px] bg-[var(--app-color-card)] px-5 py-5 shadow-[0_14px_36px_rgba(164,130,74,0.10)]">
              <p className="text-[14px] leading-6 text-[var(--app-color-text-secondary)]">
                Por ahora la app solo tiene soporte para español.
              </p>

              <IonRadioGroup
                value={language}
                onIonChange={(event) => updateUserLanguage(event.detail.value)}
                className="mt-[5px]"
              >
                <label className="flex items-center gap-4 rounded-[20px] border border-[#efefef] px-4 py-4">
                  <span
                    className="flex h-11 w-11 shrink-0 overflow-hidden rounded-full border border-[#f0e4d3] shadow-[0_8px_18px_rgba(164,130,74,0.10)]"
                    aria-hidden="true"
                  >
                    <span className="h-full w-[30%] bg-[#c60b1e]" />
                    <span className="h-full w-[40%] bg-[#ffc400]" />
                    <span className="h-full w-[30%] bg-[#c60b1e]" />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-[16px] font-medium text-[var(--app-color-text-primary)]">
                      Language
                    </span>
                    <span className="mt-1 block text-[13px] text-[var(--app-color-text-secondary)]">
                      Español
                    </span>
                  </span>

                  <span className="relative flex h-6 w-6 items-center justify-center">
                    {language === 'es' ? (
                      <IconCircleCheckFilled
                        size={22}
                        className="text-[var(--app-color-primary)]"
                        aria-hidden="true"
                      />
                    ) : null}
                    <IonRadio value="es" aria-label="Español" className="absolute inset-0 opacity-0" />
                  </span>
                </label>
              </IonRadioGroup>
            </section>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default ProfileLanguagePage
