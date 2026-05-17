import { IconArrowRight } from '@tabler/icons-react'

type Props = {
  slideIndex: number
  onBottomAction: () => void
  title: string
  description: string
  bottomActionLabel: string
  bottomActionStyle: 'circle' | 'pill'
}

export function OnboardingFooter({
  slideIndex,
  onBottomAction,
  title,
  description,
  bottomActionLabel,
  bottomActionStyle,
}: Props) {
  return (
    <footer className="mt-auto flex w-full flex-col items-center gap-6 rounded-t-[32px] bg-[var(--app-color-secondary)] px-6 pb-0 pt-6">
      <div className="w-full text-center">
        <h2 className="text-xl font-semibold leading-tight text-white">
          {title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-white/90">
          {description}
        </p>
      </div>

      <ProgressDots currentIndex={slideIndex} total={3} />

      <div className="flex w-full justify-center pb-6">
        <button
          type="button"
          onClick={onBottomAction}
          className={`${
            bottomActionStyle === 'pill'
              ? 'h-12 rounded-full bg-[var(--app-color-primary)] px-8 text-sm font-semibold text-white shadow-[0_4px_16px_color-mix(in_srgb,var(--app-color-primary)_40%,transparent)] transition-all duration-150 hover:shadow-[0_6px_20px_color-mix(in_srgb,var(--app-color-primary)_50%,transparent)] active:scale-95'
              : 'flex h-16 w-16 items-center justify-center rounded-full border-2 border-gray-300 bg-white text-gray-500 shadow-[0_4px_16px_rgba(255,255,255,0.22)] transition-all duration-150 hover:border-gray-400 hover:text-gray-600 active:scale-95'
          }`}
        >
          {bottomActionStyle === 'circle' ? (
            <IconArrowRight aria-hidden="true" size={24} stroke={1.8} />
          ) : (
            bottomActionLabel
          )}
        </button>
      </div>
    </footer>
  )
}

function ProgressDots({ currentIndex, total }: { currentIndex: number; total: number }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`h-2 w-2 rounded-full transition-all duration-300 ${
            i === currentIndex
              ? 'w-4 bg-white'
              : 'bg-white/45'
          }`}
        />
      ))}
    </div>
  )
}
