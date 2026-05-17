const SESSION_KEY = 'le-mise-session'

export interface Session {
  hasSeenOnboarding: boolean
}

function getSession(): Session {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? (JSON.parse(raw) as Session) : { hasSeenOnboarding: false }
  } catch {
    return { hasSeenOnboarding: false }
  }
}

function saveSession(session: Session): void {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  } catch {
    // storage unavailable — fail silently
  }
}

export const sessionStore = {
  get hasSeenOnboarding(): boolean {
    return getSession().hasSeenOnboarding
  },

  markOnboardingSeen(): void {
    const session = getSession()
    session.hasSeenOnboarding = true
    saveSession(session)
  },
}