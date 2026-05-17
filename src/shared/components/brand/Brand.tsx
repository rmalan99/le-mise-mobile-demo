import { APP_BRAND_NAME } from '@shared/config/branding'

type BrandSize = 'sm' | 'md' | 'lg'

export interface BrandProps {
  /** Display size for logo and text. @default 'md' */
  size?: BrandSize
  /** Override the app name text. Defaults to the shared brand constant. */
  appName?: string
  /** Additional CSS classes applied to the wrapper. */
  className?: string
}

/** Mapping of size prop → { logoSize, textSize } consumed by Tailwind. */
const SIZE_MAP: Record<BrandSize, { logo: string; text: string }> = {
  sm: { logo: 'h-8 w-8', text: 'text-xl' },
  md: { logo: 'h-12 w-12', text: 'text-3xl' },
  lg: { logo: 'h-16 w-16', text: 'text-4xl' },
}

/**
 * Reusable brand component: app logo + brand wordmark.
 *
 * Consolidates the duplicated logo+name markup that appeared in
 * AuthShell and OnboardingHeader into a single, size-controllable component.
 */
export function Brand({
  size = 'md',
  appName = APP_BRAND_NAME,
  className = '',
}: BrandProps) {
  const { logo, text } = SIZE_MAP[size]

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <img
        src="/app-icon.svg"
        alt={appName}
        className={`object-contain ${logo}`}
      />
      <span
        className={`app-font-display bg-gradient-to-b from-[var(--app-color-primary)] to-[color-mix(in_srgb,var(--app-color-primary)_65%,#9b6bb5)] bg-clip-text tracking-wide text-transparent ${text}`}
      >
        {appName}
      </span>
    </span>
  )
}

export default Brand
