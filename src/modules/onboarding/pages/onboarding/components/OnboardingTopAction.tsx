import type { ButtonHTMLAttributes } from 'react'

type Props = {
  label: 'Skip' | 'Login'
  onClick: () => void
}

export function OnboardingTopAction({ label, onClick }: Props) {
  const isSkip = label === 'Skip'

  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-150 active:scale-95 ${
        isSkip
          ? 'bg-[#F5F0E8] text-[#3D3D3D] hover:bg-[#EDE7DC]'
          : 'bg-[var(--app-color-primary)] text-white hover:opacity-90'
      }`}
    >
      {label}
    </button>
  )
}
