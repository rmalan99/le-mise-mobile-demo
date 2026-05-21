import { IonContent, IonPage } from '@ionic/react'
import {
  IconChevronRight,
  IconPhoto,
  IconSettings,
  IconWorld,
  IconLogout,
} from '@tabler/icons-react'
import { useHistory } from 'react-router-dom'
import { useSessionStore } from '@/store/session'

const PROFILE_OPTIONS = [
  { id: 'preferences', label: 'Preferencias', Icon: IconSettings },
  { id: 'language', label: 'Idioma', Icon: IconWorld },
]

function ProfilePage() {
  const history = useHistory()
  const userData = useSessionStore((state) => state.userData)

  const fullName = [userData?.firstName, userData?.lastName].filter(Boolean).join(' ')
  const profileName = fullName || 'Mi perfil'
  const profileHandle = userData?.email ? `@${userData.email.split('@')[0]}` : '@lemise'

  const handleOptionClick = (optionId: string) => {
    if (optionId === 'preferences') {
      history.push('/tabs/profile/preferences')
      return
    }

    if (optionId === 'language') {
      history.push('/tabs/profile/language')
    }
  }

  return (
    <IonPage>
      <IonContent fullscreen className="app-tabs-content">
        <div
          className="app-tabs-surface px-6 pb-8"
          style={{ paddingTop: 'max(16px, env(safe-area-inset-top))' }}
        >
          <div className="mx-auto max-w-sm">
            <div className="flex items-center justify-between">
              <div className="h-9 w-9 shrink-0" aria-hidden="true" />

              <h1 className="text-[26px] font-semibold tracking-[-0.03em] text-[var(--app-color-text-primary)]">
                Mi perfil
              </h1>

              <div className="h-9 w-9 shrink-0" aria-hidden="true" />
            </div>

            <section className="mt-6 rounded-[28px] bg-[var(--app-color-card)] px-5 py-5 shadow-[0_14px_36px_rgba(164,130,74,0.10)]">
              <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                <div className="h-24 w-24 overflow-hidden rounded-full bg-[radial-gradient(circle_at_50%_28%,#f6ded3_0_16%,var(--app-color-primary)_16%_100%)] ring-4 ring-[#FFF8F1] shadow-[0_10px_24px_rgba(255,107,107,0.18)]">
                  <div className="flex h-full w-full items-start justify-center bg-[radial-gradient(circle_at_50%_12%,rgba(255,255,255,0.92)_0_11%,transparent_11%),radial-gradient(circle_at_50%_40%,#f0c5b4_0_20%,transparent_20%),radial-gradient(circle_at_50%_88%,#b91644_0_56%,var(--app-color-primary)_56%_100%)]">
                    <div className="mt-6 h-12 w-16 rounded-[999px_999px_24px_24px] bg-[#2c201f]" aria-hidden="true" />
                  </div>
                </div>

                <button
                  type="button"
                  aria-label="Cambiar foto de perfil"
                  className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-white text-[var(--app-color-text-primary)] shadow-[0_8px_18px_rgba(164,130,74,0.14)]"
                >
                  <IconPhoto size={14} stroke={2} aria-hidden="true" />
                </button>
              </div>

              <div className="min-w-0 flex-1 pt-1">
                <h2 className="truncate text-[19px] font-semibold leading-tight tracking-[-0.03em] text-[var(--app-color-text-primary)]">
                  {profileName}
                </h2>
                <p className="mt-1 text-[13px] font-medium text-[var(--app-color-text-secondary)]">{profileHandle}</p>

                <button
                  type="button"
                  className="mt-4 inline-flex h-11 items-center justify-center rounded-[16px] bg-[var(--app-color-primary)] px-6 text-[16px] font-semibold text-white shadow-[0_14px_24px_rgba(255,107,107,0.28)]"
                >
                  Editar perfil
                </button>
              </div>
              </div>
            </section>

            <nav aria-label="Opciones de perfil" className="mt-6 rounded-[28px] bg-[var(--app-color-card)] px-5 shadow-[0_14px_36px_rgba(164,130,74,0.08)]">
              <ul className="divide-y divide-[#efefef]">
                {PROFILE_OPTIONS.map(({ id, label, Icon }) => (
                  <li key={id}>
                    <button
                      type="button"
                      onClick={() => handleOptionClick(id)}
                      className="flex w-full items-center gap-4 py-5 text-left"
                      aria-label={label}
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--app-color-surface)] text-[var(--app-color-primary)]">
                        <Icon size={19} stroke={1.9} aria-hidden="true" />
                      </span>

                      <span className="flex-1 text-[16px] font-medium text-[var(--app-color-text-primary)]">{label}</span>

                      <IconChevronRight
                        size={18}
                        stroke={1.9}
                        className="text-[var(--app-color-text-disabled)]"
                        aria-hidden="true"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <button
              type="button"
              className="mt-4 flex w-full items-center gap-4 rounded-[24px] bg-[var(--app-color-card)] px-5 py-5 text-left shadow-[0_14px_36px_rgba(164,130,74,0.08)]"
              aria-label="Cerrar sesión"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#FFF1F1] text-[var(--app-color-danger)]">
                <IconLogout size={19} stroke={1.9} aria-hidden="true" />
              </span>
              <span className="flex-1 text-[16px] font-medium text-[var(--app-color-text-primary)]">Cerrar sesión</span>
              <IconChevronRight
                size={18}
                stroke={1.9}
                className="text-[var(--app-color-text-disabled)]"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default ProfilePage
