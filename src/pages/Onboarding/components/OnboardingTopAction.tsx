type Props = {
  label: 'Skip' | 'Login'
  onClick: () => void
}

const SKIP_CLASSES = 'min-h-12 min-w-24 rounded-full px-6 text-base font-bold shadow-[0_10px_24px_color-mix(in_srgb,var(--app-color-text-secondary)_12%,transparent)] transition-transform active:scale-95 appearance-none cursor-pointer'
const LOGIN_CLASSES = 'min-h-12 min-w-24 rounded-full px-6 text-base font-bold shadow-[0_10px_24px_color-mix(in_srgb,var(--app-color-text-secondary)_12%,transparent)] transition-transform active:scale-95 appearance-none cursor-pointer'

export function OnboardingTopAction({ label, onClick }: Props) {
  const classes = label === 'Login' ? LOGIN_CLASSES : SKIP_CLASSES

  return (
    <button
      type="button"
      onClick={onClick}
      className={classes}
      style={
        label === 'Login'
          ? { backgroundColor: 'var(--app-color-primary)', color: '#ffffff', border: 'none' }
          : {
              backgroundColor: 'color-mix(in srgb, var(--app-color-text-disabled) 12%, var(--app-color-surface) 88%)',
              color: 'var(--app-color-text-secondary)',
              border: '1px solid color-mix(in srgb, var(--app-color-text-disabled) 18%, white 82%)',
            }
      }
    >
      {label}
    </button>
  )
}