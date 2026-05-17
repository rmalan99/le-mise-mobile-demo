type Props = {
  title: string
  illustration: string
}

export function OnboardingIllustration({ title, illustration }: Props) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <img
        src={illustration}
        alt={title}
        className="h-full w-full object-contain"
      />
    </div>
  )
}