import { create } from 'zustand'
import { createJSONStorage, persist, type StateStorage } from 'zustand/middleware'

const SESSION_KEY = 'le-mise-session'
const SESSION_STORE_VERSION = 1

export interface SessionUserData {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface Session {
  onboard: boolean
  userData: SessionUserData | null
  preferences: Record<string, unknown> | null
}

interface SessionStore extends Session {
  hasHydrated: boolean
  setHasHydrated: (hasHydrated: boolean) => void
  markOnboardingComplete: () => void
  registerUser: (userData: SessionUserData) => void
  clearSession: () => void
  validateLogin: (email: string, password: string) => boolean
}

const DEFAULT_SESSION: Session = {
  onboard: false,
  userData: null,
  preferences: null,
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function normalizeSession(rawSession: unknown): Session {
  if (!isRecord(rawSession)) {
    return DEFAULT_SESSION
  }

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
      }
    : null

  const preferences = isRecord(rawSession.preferences) ? rawSession.preferences : null
  const onboard = typeof rawSession.onboard === 'boolean'
    ? rawSession.onboard
    : rawSession.hasSeenOnboarding === true

  return {
    onboard,
    userData,
    preferences,
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
          userData,
          preferences: state.preferences ?? {},
        }))
      },
      clearSession: () => {
        set((state) => ({
          onboard: state.onboard,
          userData: null,
          preferences: null,
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
      partialize: ({ onboard, userData, preferences }) => ({
        onboard,
        userData,
        preferences,
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
