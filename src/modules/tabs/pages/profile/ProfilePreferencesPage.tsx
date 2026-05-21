import { IonContent, IonPage, IonToggle } from '@ionic/react'
import { IconChevronLeft } from '@tabler/icons-react'
import { useHistory } from 'react-router-dom'
import {
  DEFAULT_USER_PREFERENCES,
  type UserPreferenceKey,
  useSessionStore,
} from '@/store/session'

const PREFERENCE_OPTIONS: Array<{ key: UserPreferenceKey, label: string }> = [
  { key: 'onDiet', label: 'Estoy a dieta' },
  { key: 'lactoseIntolerant', label: 'Soy intolerante a la lactosa' },
  { key: 'glutenFree', label: 'Sin gluten' },
  { key: 'vegetarian', label: 'Vegetariano/a' },
]

function ProfilePreferencesPage() {
  const history = useHistory()
  const preferences = useSessionStore((state) => state.userData?.preferences ?? DEFAULT_USER_PREFERENCES)
  const updateUserPreferences = useSessionStore((state) => state.updateUserPreferences)

  const handleToggle = (key: UserPreferenceKey, checked: boolean) => {
    updateUserPreferences({
      ...preferences,
      [key]: checked,
    })
  }

  return (
    <IonPage>
      <IonContent fullscreen className="app-tabs-content">
        <div
          className="app-tabs-surface px-6 pb-8"
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
                Preferencias
              </h1>

              <div className="h-10 w-10 shrink-0" aria-hidden="true" />
            </div>

            <section className="mt-6 rounded-[28px] bg-[var(--app-color-card)] px-5 py-5 shadow-[0_14px_36px_rgba(164,130,74,0.10)]">
              <p className="text-[14px] leading-6 text-[var(--app-color-text-secondary)]">
                Estas preferencias afectan cómo se arma tu listado de recetas.
              </p>

              <ul className="mt-4 divide-y divide-[#efefef]">
                {PREFERENCE_OPTIONS.map(({ key, label }) => (
                  <li key={key} className="flex items-center justify-between gap-4 py-4">
                    <span className="flex-1 text-[16px] font-medium text-[var(--app-color-text-primary)]">
                      {label}
                    </span>

                    <IonToggle
                      checked={preferences[key]}
                      onIonChange={(event) => handleToggle(key, event.detail.checked)}
                      aria-label={label}
                    />
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default ProfilePreferencesPage
