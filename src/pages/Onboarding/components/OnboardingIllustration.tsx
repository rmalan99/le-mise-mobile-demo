
type Props = {
  step: 1 | 2 | 3
  title: string
  illustration: string
}

export function OnboardingIllustration({ step, title, illustration }: Props) {
  return (
    <div className="relative flex w-full max-w-[350px] items-center justify-center ">
      <div key={`image-${step}`} className="relative z-10 w-full">
        <img
          src={illustration}
          alt={title}
          className="w-full m-auto max-w-[335px] object-contain"
          style={{ filter: 'drop-shadow(0 20px 30px rgba(31,41,55,0.12))' }}
        />
      </div>
    </div>
  )
}
