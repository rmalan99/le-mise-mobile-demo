import { create } from 'zustand'
import { createJSONStorage, persist, type StateStorage } from 'zustand/middleware'

const SESSION_KEY = 'le-mise-session'
const SESSION_STORE_VERSION = 1

export type UserPreferenceKey = 'onDiet' | 'lactoseIntolerant' | 'glutenFree' | 'vegetarian'
export type SupportedLanguage = 'es'

export type UserPreferences = Record<UserPreferenceKey, boolean>

export const DEFAULT_USER_PREFERENCES: UserPreferences = {
  onDiet: false,
  lactoseIntolerant: false,
  glutenFree: false,
  vegetarian: false,
}

export interface SessionUserData {
  firstName: string
  lastName: string
  email: string
  password: string
  language: SupportedLanguage
  preferences: UserPreferences
}

export interface Session {
  onboard: boolean
  userData: SessionUserData | null
}

interface SessionStore extends Session {
  hasHydrated: boolean
  setHasHydrated: (hasHydrated: boolean) => void
  markOnboardingComplete: () => void
  registerUser: (userData: SessionUserData) => void
  updateUserPreferences: (preferences: UserPreferences) => void
  updateUserLanguage: (language: SupportedLanguage) => void
  clearSession: () => void
  validateLogin: (email: string, password: string) => boolean
}

const DEFAULT_SESSION: Session = {
  onboard: false,
  userData: null,
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function normalizeUserPreferences(rawPreferences: unknown): UserPreferences {
  const preferences = isRecord(rawPreferences) ? rawPreferences : {}

  return {
    onDiet: preferences.onDiet === true,
    lactoseIntolerant: preferences.lactoseIntolerant === true,
    glutenFree: preferences.glutenFree === true,
    vegetarian: preferences.vegetarian === true,
  }
}

function normalizeUserLanguage(rawLanguage: unknown): SupportedLanguage {
  return rawLanguage === 'es' ? rawLanguage : 'es'
}

function normalizeSession(rawSession: unknown): Session {
  if (!isRecord(rawSession)) {
    return DEFAULT_SESSION
  }

  const fallbackPreferences = normalizeUserPreferences(rawSession.preferences)

  const userData = isRecord(rawSession.userData)
    && typeof rawSession.userData.firstName === 'string'
      && typeof rawSession.userData.lastName === 'string'
      && typeof rawSession.userData.email === 'string'
      && typeof rawSession.userData.password === 'string'
    ? {
        firstName: rawSession.userData.firstName,
        lastName: rawSession.userData.lastName,
        email: rawSession.userData.email,
        password: rawSession.userData.password,
        language: normalizeUserLanguage(rawSession.userData.language),
        preferences: normalizeUserPreferences(rawSession.userData.preferences ?? fallbackPreferences),
      }
    : null

  const onboard = typeof rawSession.onboard === 'boolean'
    ? rawSession.onboard
    : rawSession.hasSeenOnboarding === true

  return {
    onboard,
    userData,
  }
}

const sessionStorage: StateStorage = {
  getItem: (name) => {
    try {
      const raw = localStorage.getItem(name)

      if (raw === null) {
        return null
      }

      const parsed = JSON.parse(raw)

      if (isRecord(parsed) && 'state' in parsed) {
        return JSON.stringify({
          ...parsed,
          state: normalizeSession(parsed.state),
        })
      }

      // Migrate the legacy plain object shape into Zustand's persisted envelope.
      return JSON.stringify({
        state: normalizeSession(parsed),
        version: SESSION_STORE_VERSION,
      })
    } catch {
      return null
    }
  },

  setItem: (name, value) => {
    try {
      localStorage.setItem(name, value)
    } catch {
      // storage unavailable - fail silently
    }
  },

  removeItem: (name) => {
    try {
      localStorage.removeItem(name)
    } catch {
      // storage unavailable - fail silently
    }
  },
}

export const useSessionStore = create<SessionStore>()(
  persist(
    (set, get) => ({
      ...DEFAULT_SESSION,
      hasHydrated: false,
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
      markOnboardingComplete: () => set({ onboard: true }),
      registerUser: (userData) => {
        set((state) => ({
          onboard: true,
          userData: {
            ...userData,
            language: normalizeUserLanguage(userData.language ?? state.userData?.language),
            preferences: normalizeUserPreferences(userData.preferences ?? state.userData?.preferences),
          },
        }))
      },
      updateUserPreferences: (preferences) => {
        set((state) => ({
          userData: state.userData === null
            ? null
            : {
                ...state.userData,
                preferences,
              },
        }))
      },
      updateUserLanguage: (language) => {
        set((state) => ({
          userData: state.userData === null
            ? null
            : {
                ...state.userData,
                language,
              },
        }))
      },
      clearSession: () => {
        set((state) => ({
          onboard: state.onboard,
          userData: null,
        }))
      },
      validateLogin: (email, password) => {
        const storedUser = get().userData
        const normalizedEmail = email.trim().toLowerCase()

        return storedUser !== null
          && storedUser.email.trim().toLowerCase() === normalizedEmail
          && storedUser.password === password
      },
    }),
    {
      name: SESSION_KEY,
      version: SESSION_STORE_VERSION,
      storage: createJSONStorage(() => sessionStorage),
      partialize: ({ onboard, userData }) => ({
        onboard,
        userData,
      }),
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...normalizeSession(persistedState),
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    },
  ),
)
