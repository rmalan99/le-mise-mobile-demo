import type { ReactNode } from "react";
import { IonContent, IonPage } from "@ionic/react";
import facebookLogo from '@assets/svg/facebook.svg';
import googleLogo from '@assets/svg/google.svg';
import instagramLogo from '@assets/svg/instagran.svg';
import { Brand } from '@shared/components/brand';
import { APP_BRAND_NAME } from '@shared/config/branding';
import { ButtonUI } from '@shared/components/forms';

type SocialProvider = "google" | "instagram" | "facebook";

const SOCIAL_CONFIG: Record<
  SocialProvider,
  {
    icon: ReactNode;
    label: string;
    buttonClassName: string;
  }
> = {
  google: {
    icon: (
      <img
        src={googleLogo}
        alt=""
        aria-hidden="true"
        className="h-6 w-6 object-contain"
      />
    ),
    label: "Continuar con Google",
    buttonClassName: "bg-[color-mix(in_srgb,#4285F4_14%,white_86%)]",
  },
  instagram: {
    icon: (
      <img
        src={instagramLogo}
        alt=""
        aria-hidden="true"
        className="h-6 w-6 object-contain"
      />
    ),
    label: "Continuar con Instagram",
    buttonClassName: "bg-[color-mix(in_srgb,#E1306C_14%,white_86%)]",
  },
  facebook: {
    icon: (
      <img
        src={facebookLogo}
        alt=""
        aria-hidden="true"
        className="h-6 w-6 object-contain"
      />
    ),
    label: "Continuar con Facebook",
    buttonClassName: "bg-[color-mix(in_srgb,#1877F2_14%,white_86%)]",
  },
};

interface AuthShellProps {
  appName?: string;
  title: string;
  tagline: string;
  primaryCtaLabel: string;
  primaryCtaIcon?: ReactNode;
  primaryCta?: ReactNode;
  onPrimaryCta?: () => void;
  secondaryLinkLabel?: string;
  onSecondaryLink?: () => void;
  formContent: ReactNode;
  switchModeText: string;
  onSwitchMode: () => void;
  socialProviders?: SocialProvider[];
  footerContent?: ReactNode;
}

export function AuthShell({
  appName = APP_BRAND_NAME,
  title,
  tagline,
  primaryCtaLabel,
  primaryCtaIcon,
  primaryCta,
  onPrimaryCta,
  secondaryLinkLabel,
  onSecondaryLink,
  formContent,
  switchModeText,
  onSwitchMode,
  socialProviders = ["google", "instagram", "facebook"],
  footerContent,
}: AuthShellProps) {
  const hasSocialProviders = socialProviders.length > 0;
  const questionMarkIdx = switchModeText.indexOf("?");
  const switchPrefix =
    questionMarkIdx !== -1
      ? switchModeText.slice(0, questionMarkIdx + 1) + " "
      : "";
  const switchLinkText =
    questionMarkIdx !== -1
      ? switchModeText.slice(questionMarkIdx + 1).trim()
      : switchModeText;

  return (
    <IonPage>
      <IonContent fullscreen style={{ "--background": "#ffffff" }}>
        <div className="flex min-h-full items-center justify-center bg-white px-5 py-10">
          <div className="flex w-full max-w-[420px] flex-col items-center">
            <Brand size="md" appName={appName} />

            <div className="mt-8 text-center">
              <h1 className="text-[1.75rem] font-extrabold leading-tight tracking-[-0.03em] text-[var(--app-color-text-primary)]">
                {title}
              </h1>
              <p className="mt-2 text-base leading-relaxed text-[var(--app-color-text-secondary)]">
                {tagline}
              </p>
            </div>

            <div className="mt-8 w-full">{formContent}</div>

            <div className="mt-8 w-full">
              {primaryCta ?? (
                <ButtonUI
                  variant="primary"
                  onClick={onPrimaryCta}
                  leadingIcon={primaryCtaIcon}
                  fullWidth
                >
                  {primaryCtaLabel}
                </ButtonUI>
              )}
            </div>

            {secondaryLinkLabel && onSecondaryLink && (
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={onSecondaryLink}
                  className="text-sm font-medium text-[var(--app-color-primary)] transition-opacity duration-150 hover:opacity-75"
                >
                  {secondaryLinkLabel}
                </button>
              </div>
            )}

            {hasSocialProviders && (
              <>
                <div
                  className="mt-8 flex w-full items-center gap-3"
                  aria-label="O continúa con"
                >
                  <div className="h-px flex-1 bg-[color-mix(in_srgb,var(--app-color-text-disabled)_20%,white_80%)]" />
                  <span className="text-xs font-medium uppercase tracking-wider text-[var(--app-color-text-disabled)]">
                    O
                  </span>
                  <div className="h-px flex-1 bg-[color-mix(in_srgb,var(--app-color-text-disabled)_20%,white_80%)]" />
                </div>

                <div
                  className="mt-5 flex items-center justify-center gap-5"
                  role="group"
                  aria-label="Continuar con red social"
                >
                  {socialProviders.map((provider) => {
                    const config = SOCIAL_CONFIG[provider];
                    return (
                      <button
                        key={provider}
                        type="button"
                        aria-label={config.label}
                        className={`flex h-14 w-14 items-center justify-center rounded-full shadow-[0_8px_20px_rgba(15,23,42,0.08)] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(15,23,42,0.12)] active:scale-95 ${config.buttonClassName}`}
                      >
                        {config.icon}
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {footerContent && <div className="mt-5">{footerContent}</div>}

            <div className="mt-8 text-center">
              <p className="text-sm text-[var(--app-color-text-secondary)]">
                {switchPrefix}
                <button
                  type="button"
                  onClick={onSwitchMode}
                  className="font-semibold text-[var(--app-color-primary)] transition-opacity duration-150 hover:opacity-75"
                >
                  {switchLinkText}
                </button>
              </p>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
