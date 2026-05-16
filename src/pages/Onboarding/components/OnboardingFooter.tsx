import { IconArrowRight } from "@tabler/icons-react";
import { ProgressDots } from "./ProgressDots";
import { SLIDES } from "../OnboardingSlideData";

type Props = {
  slideIndex: number;
  onBottomAction: () => void;
};

const ROUNDED_BUTTON_BASE =
  "appearance-none cursor-pointer rounded-full active:scale-95";

export function OnboardingFooter({ slideIndex, onBottomAction }: Props) {
  const slide = SLIDES[slideIndex];

  return (
    <section
      aria-labelledby={`onboarding-title-${slide.step}`}
      className="relative z-10 mt-auto rounded-tl-[2.75rem] rounded-tr-[2.75rem] bg-[var(--app-color-secondary)] px-7 pt-7 shadow-[0_-12px_30px_color-mix(in_srgb,var(--app-color-text-secondary)_8%,transparent)]"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 26px)" }}
    >
      <span
        key={`title-${slide.step}`}
        id={`onboarding-title-${slide.step}`}
        className="mx-auto block max-w-[20ch] text-center text-lg font-extrabold leading-[1.1] tracking-[-0.03em] text-white"
      >
        {slide.title}
      </span>

      <p
        key={`description-${slide.step}`}
        className="mx-auto mt-4 block max-w-[15.5rem] text-center leading-6 text-white/90"
      >
        {slide.description}
      </p>

      <ProgressDots total={SLIDES.length} current={slideIndex} />

      <div className="mt-7 flex justify-center">
        <button
          type="button"
          onClick={onBottomAction}
          aria-label={slide.bottomActionLabel}
          className={`${ROUNDED_BUTTON_BASE} ${
            slide.bottomActionStyle === "circle"
              ? "flex h-[50px] w-[50px] items-center justify-center shadow-[0_18px_34px_rgba(0,0,0,0.12),0_0_0_6px_rgba(255,255,255,0.25)]"
              : "flex h-[50px] items-center px-8 text-lg font-bold shadow-[0_18px_34px_rgba(0,0,0,0.12)]"
          }`}
          style={
            slide.bottomActionStyle === "circle"
              ? {
                  backgroundColor: "#ffffff",
                  
                }
              : {
                  backgroundColor: "var(--app-color-primary)",
                  color: "#ffffff",
                }
          }
        >
          {slide.bottomActionStyle === "pill" ? (
            <span className="px-4 py-3">{slide.bottomActionLabel}</span>
          ) : (
            <IconArrowRight
              size={30}
              stroke={2.6}
              aria-hidden="true"
              className="text-[var(--app-color-text-secondary)]"
            />
          )}
        </button>
      </div>
    </section>
  );
}
