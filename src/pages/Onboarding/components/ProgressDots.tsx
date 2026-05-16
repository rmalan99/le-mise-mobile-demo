type Props = {
  total: number
  current: number
}

export function ProgressDots({ total, current }: Props) {
  return (
    <div className="mt-5 flex items-center justify-center gap-3" aria-label={`Onboarding step ${current} of ${total}`}>
      {Array.from({ length: total }, (_, index) => (
        <span
          key={index}
          aria-hidden="true"
          className={`h-3 w-3 rounded-full ${index === current ? 'bg-white' : 'bg-white/35'}`}
        />
      ))}
    </div>
  )
}