import { IonAlert, IonContent, IonPage } from "@ionic/react";
import {
  IconArrowLeft,
  IconX,
  IconToolsKitchen2,
  IconClock,
  IconPlayerPlay,
  IconCheck,
} from "@tabler/icons-react";
import { type ReactNode, useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { PageErrorState } from "@/shared/components/page-state";
import { recipeMocks, type Recipe } from "@/shared/mocks/recipes";

function formatTime(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) return `${hours}h`;
  return `${hours}h ${remainingMinutes}m`;
}

function formatTimeLeft(seconds: number): string {
  if (seconds <= 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

// ─── Timer Instance ────────────────────────────────────────────────

interface TimerInstance {
  id: string;
  stepId: string;
  label: string;
  totalSeconds: number;
  remainingSeconds: number;
  completed: boolean;
}

interface TimerCompletionAlert {
  id: string;
  label: string;
  message: string;
}

interface VisibleTimerAlert extends TimerCompletionAlert {
  open: boolean;
}

// ─── Summary Screen ────────────────────────────────────────────────

interface CookingModeSummaryProps {
  recipe: Recipe;
  onStart: () => void;
  onClose: () => void;
}

function CookingModeSummary({
  recipe,
  onStart,
  onClose,
}: CookingModeSummaryProps) {
  const totalTime = (recipe.prepTime ?? 0) + (recipe.cookTime ?? 0);

  return (
    <div className="flex min-h-full flex-col bg-[#FAF7F2]">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-12 pb-6">
        <button
          type="button"
          aria-label="Cerrar modo cocina"
          onClick={onClose}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F0EBE3] text-[#4B5563]"
        >
          <IconX size={22} aria-hidden="true" />
        </button>
        <span className="text-sm font-semibold text-[var(--app-color-text-secondary)]">
          Resumen
        </span>
        <div className="w-12" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-8">
        <div className="space-y-6">
          {/* Recipe name */}
          <div>
            <h1 className="text-[28px] font-semibold leading-tight tracking-[-0.02em] text-[var(--app-color-text-primary)]">
              {recipe.title}
            </h1>
            <p className="mt-2 text-[15px] leading-7 text-[var(--app-color-text-secondary)]">
              {recipe.description}
            </p>
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-full bg-[#FFF0E8] px-4 py-2 text-sm font-semibold text-[#FF6E58]">
              <IconClock size={16} aria-hidden="true" />
              {totalTime} min
            </div>
            <div className="flex items-center gap-2 rounded-full bg-[#FFF0E8] px-4 py-2 text-sm font-semibold text-[#FF6E58]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              {recipe.servings} porciones
            </div>
            <div className="flex items-center gap-2 rounded-full bg-[#FFF0E8] px-4 py-2 text-sm font-semibold text-[#FF6E58]">
              <IconToolsKitchen2 size={16} aria-hidden="true" />
              {recipe.steps.length} pasos
            </div>
          </div>

          {/* Utensils */}
          <div className="rounded-2xl bg-white p-5 shadow-[0_8px_24px_rgba(164,130,74,0.06)]">
            <h2 className="text-[16px] font-semibold text-[var(--app-color-text-primary)]">
              Utensilios
            </h2>
            <ul className="mt-3 grid grid-cols-2 gap-2">
              {recipe.utensils.map((utensil) => (
                <li
                  key={utensil.id}
                  className="flex items-center gap-2 text-sm text-[var(--app-color-text-secondary)]"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FFF0E8]">
                    <IconToolsKitchen2
                      size={12}
                      className="text-[#FF6E58]"
                      aria-hidden="true"
                    />
                  </span>
                  {utensil.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Notes */}
          {recipe.steps.some((step) => step.note) && (
            <div className="rounded-2xl bg-[#F0F4EE] p-5">
              <h2 className="text-[16px] font-semibold text-[var(--app-color-text-primary)]">
                Notas de preparación
              </h2>
              <ul className="mt-3 space-y-2">
                {recipe.steps
                  .filter((step) => step.note)
                  .map((step) => (
                    <li
                      key={step.id}
                      className="flex items-start gap-2 text-sm text-[var(--app-color-text-secondary)]"
                    >
                      <span
                        className="mt-1 flex h-2 w-2 shrink-0 rounded-full bg-[#64BB7B]"
                        aria-hidden="true"
                      />
                      <span>
                        <span className="font-semibold">
                          Paso {step.order}:
                        </span>{" "}
                        {step.note}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <button
          type="button"
          onClick={onStart}
          className="flex h-14 w-full items-center justify-center gap-3 rounded-full bg-[#FF6E58] px-6 text-lg font-semibold text-white shadow-[0_20px_40px_rgba(255,110,88,0.3)]"
          aria-label="Comenzar preparación"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          Comenzar
        </button>
      </div>
    </div>
  );
}

// ─── Active Timers Modal ────────────────────────────────────────────

interface ActiveTimersModalProps {
  timers: TimerInstance[];
  onClose: () => void;
}

function ActiveTimersModal({ timers, onClose }: ActiveTimersModalProps) {
  const activeTimers = timers.filter((t) => !t.completed);
  const completedTimers = timers.filter((t) => t.completed);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-t-3xl bg-[#FAF7F2] pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-6 shadow-2xl">
        {/* Handle */}
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-[#E9E3D7]" />
        {/* Header */}
        <div className="flex items-center justify-between px-6 pb-4">
          <span className="text-lg font-semibold text-[var(--app-color-text-primary)]">
            Temporizadores
          </span>
          <button
            type="button"
            aria-label="Cerrar temporizadores"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F0EBE3] text-[#4B5563]"
          >
            <IconX size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto px-6">
          {activeTimers.length === 0 && completedTimers.length === 0 && (
            <p className="py-8 text-center text-sm text-[var(--app-color-text-secondary)]">
              No hay temporizadores activos.
            </p>
          )}

          {activeTimers.length > 0 && (
            <div className="space-y-3 pb-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#FF6E58]">
                En curso
              </p>
              {activeTimers.map((timer) => (
                <div
                  key={timer.id}
                  className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-[0_4px_12px_rgba(164,130,74,0.06)]"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF8EE]">
                      <IconClock
                        size={20}
                        className="text-[#FF7A63]"
                        aria-hidden="true"
                      />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-[var(--app-color-text-primary)]">
                        {timer.label}
                      </p>
                      <p className="text-xs text-[var(--app-color-text-secondary)]">
                        Paso{" "}
                        {timer.stepId
                          .replace("step-", "")
                          .replace("step-lentils-", "")}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold tabular-nums text-[#FF6E58]">
                      {formatTimeLeft(timer.remainingSeconds)}
                    </p>
                    <p className="text-xs text-[var(--app-color-text-secondary)]">
                      de {formatTime(timer.totalSeconds)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {completedTimers.length > 0 && (
            <div className="space-y-3 pb-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#64BB7B]">
                Completados
              </p>
              {completedTimers.map((timer) => (
                <div
                  key={timer.id}
                  className="flex items-center justify-between rounded-2xl bg-[#F0F4EE] p-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F5EA]">
                      <IconCheck
                        size={20}
                        className="text-[#64BB7B]"
                        aria-hidden="true"
                      />
                    </span>
                    <p className="text-sm font-semibold text-[var(--app-color-text-primary)]">
                      {timer.label}
                    </p>
                  </div>
                  <p className="text-xs text-[#64BB7B]">Listo</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface CookingSectionCardProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}

function CookingSectionCard({ icon, title, children }: CookingSectionCardProps) {
  return (
    <section className="rounded-[24px] border border-[#EFE5D7] bg-white px-5 py-4 shadow-[0_14px_36px_rgba(184,145,87,0.08)]">
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FFF4ED] text-[#FF6E58]">
          {icon}
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-[15px] font-bold text-[#355D4F]">{title}</h2>
          <div className="mt-2">{children}</div>
        </div>
      </div>
    </section>
  );
}

function StepHeroIllustration() {
  return (
    <div className="relative h-[112px] w-[112px] shrink-0">
      <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
        <ellipse cx="64" cy="92" rx="34" ry="12" fill="#EADFD1" />
        <path
          d="M32 63c0 21 13 31 31 31s31-10 31-31H32Z"
          fill="#FFF6EA"
          stroke="#D7C2A8"
          strokeWidth="2"
        />
        <path
          d="M37 68c4 10 15 16 26 16s22-6 26-16"
          fill="none"
          stroke="#FFD57A"
          strokeWidth="16"
          strokeLinecap="round"
        />
        <path d="M32 63c4-7 15-12 31-12s27 5 31 12" fill="#FFFDF8" stroke="#D7C2A8" strokeWidth="2" />
        <path d="M71 22 84 66" stroke="#7D6A57" strokeWidth="4" strokeLinecap="round" />
        <path d="M77 24 92 65" stroke="#8D7965" strokeWidth="3" strokeLinecap="round" />
        <path d="M67 30c6 6 15 18 18 28" fill="none" stroke="#8D7965" strokeWidth="3" strokeLinecap="round" />
        <path d="M60 33c7 5 16 15 21 27" fill="none" stroke="#8D7965" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <span className="absolute left-2 top-3 text-[#FF6E58]">
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
          <path d="M12 2v5" />
          <path d="M4.9 4.9l3.5 3.5" />
          <path d="M2 12h5" />
        </svg>
      </span>
    </div>
  );
}

// ─── Step Screen ──────────────────────────────────────────────────

interface CookingModeStepProps {
  step: Recipe["steps"][number];
  currentIndex: number;
  totalSteps: number;
  utensils: Recipe["utensils"];
  ingredients: Recipe["ingredients"];
  activeTimers: TimerInstance[];
  onStartTimer: (step: Recipe["steps"][number]) => void;
  onOpenTimersModal: () => void;
  onBack: () => void;
  onBackToSummary: () => void;
  onNext: () => void;
  onClose: () => void;
  isLast: boolean;
}

function CookingModeStep({
  step,
  currentIndex,
  totalSteps,
  utensils,
  ingredients,
  activeTimers,
  onStartTimer,
  onOpenTimersModal,
  onBack,
  onBackToSummary,
  onNext,
  onClose,
  isLast,
}: CookingModeStepProps) {
  const stepUtensils = step.utensilIds
    .map((id) => utensils.find((u) => u.id === id))
    .filter(Boolean) as Recipe["utensils"];
  const stepIngredients = step.ingredientIds
    .map((id) => ingredients.find((ingredient) => ingredient.id === id))
    .filter(Boolean) as Recipe["ingredients"];

  const stepTimerActive = activeTimers.some(
    (t) => t.stepId === step.id && !t.completed,
  );
  const stepTimerCompleted = activeTimers.some(
    (t) => t.stepId === step.id && t.completed,
  );
  const activeTimersCount = activeTimers.filter((t) => !t.completed).length;
  const displayTitle = (step.title ?? `Paso ${step.order}`).toUpperCase();

  return (
    <div className="flex min-h-full flex-col bg-[radial-gradient(circle_at_top,_#FFFDF9_0%,_#F8F1E8_62%,_#F3E9DE_100%)]">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-12 pb-4">
        <button
          type="button"
          aria-label="Cerrar modo cocina"
          onClick={onClose}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-white/80 text-[#4B5563] shadow-[0_12px_24px_rgba(104,77,39,0.12)] backdrop-blur"
        >
          <IconX size={22} aria-hidden="true" />
        </button>
        <span className="text-sm font-bold text-[var(--app-color-text-secondary)]">
          Paso {currentIndex + 1} de {totalSteps}
        </span>
        <button
          type="button"
          aria-label={
            activeTimersCount > 0
              ? `Ver temporizadores activos (${activeTimersCount})`
              : "Ver temporizadores"
          }
          onClick={onOpenTimersModal}
          className={`relative flex h-12 w-12 items-center justify-center rounded-full border border-white/70 shadow-[0_12px_24px_rgba(104,77,39,0.12)] backdrop-blur ${
            activeTimersCount > 0
              ? "bg-[#FFF8EE]/95 text-[#FF7A63]"
              : "bg-white/80 text-[#4B5563]"
          }`}
        >
          <IconClock size={22} aria-hidden="true" />
          {activeTimersCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#FF6E58] text-xs font-bold text-white">
              {activeTimersCount}
            </span>
          )}
        </button>
      </div>

      {/* Progress bar */}
      <div className="px-6 pt-1">
        <div className="h-1.5 overflow-hidden rounded-full bg-[#E5DED3]">
          <div
            className="h-full rounded-full bg-[#FF6E58] transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-7">
        <div className="space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 pt-2">
              <h1 className="text-[22px] font-extrabold uppercase tracking-[-0.03em] text-[#FF6E58]">
                {displayTitle}
              </h1>
              <p className="mt-3 text-[15px] leading-7 text-[#4F5B57]">
                {step.detail}
              </p>
            </div>
            <StepHeroIllustration />
          </div>

          {/* Step-specific utensils */}
          {stepUtensils.length > 0 && (
            <CookingSectionCard
              title="Utensilios"
              icon={<IconToolsKitchen2 size={22} aria-hidden="true" />}
            >
              <ul className="space-y-1.5">
                {stepUtensils.map((utensil) => (
                  <li
                    key={utensil.id}
                    className="text-[15px] leading-6 text-[#5B6661]"
                  >
                    {utensil.name}
                  </li>
                ))}
              </ul>
            </CookingSectionCard>
          )}

          {/* Step-specific ingredients */}
          {stepIngredients.length > 0 && (
            <CookingSectionCard
              title="Ingredientes"
              icon={
                <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M4 9h16" />
                  <path d="M6 9l1 10h10l1-10" />
                  <path d="M9 9V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4" />
                </svg>
              }
            >
              <ul className="space-y-2.5">
                {stepIngredients.map((ingredient) => (
                  <li
                    key={ingredient.id}
                    className="flex items-center justify-between gap-3 text-[15px] text-[#5B6661]"
                  >
                    <span>{ingredient.name}</span>
                    <span className="rounded-full bg-[#FFF4ED] px-3 py-1 text-xs font-bold text-[#FF7A63]">
                      {ingredient.quantity} {ingredient.unit}
                    </span>
                  </li>
                ))}
              </ul>
            </CookingSectionCard>
          )}

          {/* Description */}
          {step.note && (
            <CookingSectionCard
              title="Nota"
              icon={
                <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <rect x="5" y="3" width="14" height="18" rx="2" />
                  <path d="M9 8h6" />
                  <path d="M9 12h6" />
                  <path d="M9 16h4" />
                </svg>
              }
            >
              <p className="text-[15px] leading-7 text-[#5B6661]">{step.note}</p>
            </CookingSectionCard>
          )}

          {/* Timer indicator
          {step.timerSeconds != null && (
            <div className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[#F0DCCB] bg-white/80 px-5 py-2.5 shadow-[0_10px_24px_rgba(184,145,87,0.06)]">
              <IconClock
                size={16}
                className="text-[#FF7A63]"
                aria-hidden="true"
              />
              <span className="text-sm font-medium text-[#FF7A63]">
                {formatTime(step.timerSeconds)}
              </span>
            </div>
          )} */}

          {/* Timer CTA */}
          {step.timerSeconds != null &&
            !stepTimerActive &&
            !stepTimerCompleted && (
              <button
                type="button"
                onClick={() => onStartTimer(step)}
                className="flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#FF674D_0%,#FF7E58_100%)] px-5 py-3 text-sm font-bold text-white shadow-[0_16px_30px_rgba(255,110,88,0.28)]"
                aria-label={`Iniciar temporizador de ${formatTime(step.timerSeconds)} para este paso`}
              >
                <IconPlayerPlay size={18} aria-hidden="true" />
                Iniciar temporizador ({formatTime(step.timerSeconds)})
              </button>
            )}

          {stepTimerActive && (
            <div className="flex items-center gap-3 rounded-[24px] border border-[#F0DCCB] bg-white/80 px-4 py-3 shadow-[0_10px_24px_rgba(184,145,87,0.06)]">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF0E8]">
                <IconClock
                  size={20}
                  className="text-[#FF7A63]"
                  aria-hidden="true"
                />
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-[var(--app-color-text-primary)]">
                  Temporizador en curso
                </p>
                <p className="text-xs text-[var(--app-color-text-secondary)]">
                  {formatTime(step.timerSeconds ?? 0)} — iniciaste este paso
                </p>
              </div>
              <button
                type="button"
                aria-label="Ver todos los temporizadores"
                onClick={onOpenTimersModal}
                className="flex h-9 items-center gap-1.5 rounded-full bg-[#FF6E58] px-3 text-xs font-bold text-white"
              >
                <IconClock size={14} aria-hidden="true" />
                Ver timers
              </button>
            </div>
          )}

          {stepTimerCompleted && (
            <div className="flex items-center gap-3 rounded-[24px] border border-[#D7E9D8] bg-[#F4FBF4] px-4 py-3 shadow-[0_10px_24px_rgba(110,159,118,0.06)]">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F5EA]">
                <IconCheck
                  size={20}
                  className="text-[#64BB7B]"
                  aria-hidden="true"
                />
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#64BB7B]">
                  Temporizador completado
                </p>
                {step.timerCompletionMessage && (
                  <p className="text-xs leading-5 text-[var(--app-color-text-secondary)]">
                    {step.timerCompletionMessage}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-4 px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4">
        <button
          type="button"
          onClick={currentIndex === 0 ? onBackToSummary : onBack}
          aria-label={
            currentIndex === 0 ? "Volver al resumen" : "Paso anterior"
          }
          className="flex h-14 flex-1 items-center justify-center gap-2 rounded-full border border-[#D7C9B8] bg-white/85 text-base font-bold text-[#55605B] shadow-[0_10px_24px_rgba(184,145,87,0.08)]"
        >
          <IconArrowLeft size={18} aria-hidden="true" />
          {currentIndex === 0 ? "Volver" : "Atrás"}
        </button>
        <button
          type="button"
          onClick={onNext}
          aria-label={isLast ? "Finalizar preparación" : "Siguiente paso"}
          className="flex h-14 flex-1 items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#FF674D_0%,#FF7E58_100%)] text-base font-bold text-white shadow-[0_16px_32px_rgba(255,110,88,0.25)]"
        >
          {isLast ? (
            <>
              Finalizar
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </>
          ) : (
            <>
              Siguiente
              <IconArrowLeft
                size={18}
                className="rotate-180"
                aria-hidden="true"
              />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────

type Screen = "summary" | "step";

function CookingModePage() {
  const history = useHistory();
  const { recipeId } = useParams<{ recipeId: string }>();

  const recipe = recipeMocks.find((candidate) => candidate.id === recipeId);

  const [screen, setScreen] = useState<Screen>("summary");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [timers, setTimers] = useState<TimerInstance[]>([]);
  const [showTimersModal, setShowTimersModal] = useState(false);
  const [pendingTimerAlerts, setPendingTimerAlerts] = useState<
    TimerCompletionAlert[]
  >([]);
  const [visibleTimerAlert, setVisibleTimerAlert] =
    useState<VisibleTimerAlert | null>(null);
  const [showExitAlert, setShowExitAlert] = useState(false);

  // ─── Timer ticker ────────────────────────────────────────────────
  useEffect(() => {
    if (timers.length === 0) return;
    const interval = setInterval(() => {
      const completedAlerts: TimerCompletionAlert[] = [];

      setTimers((prev) =>
        prev.map((t) => {
          if (t.completed || t.remainingSeconds <= 0) return t;
          const next = t.remainingSeconds - 1;
          if (next <= 0) {
            const step = recipe?.steps.find((s) => s.id === t.stepId);
            completedAlerts.push({
              id: t.id,
              label: t.label,
              message:
                step?.timerCompletionMessage ??
                `El temporizador "${t.label}" terminó.`,
            });
            return { ...t, remainingSeconds: 0, completed: true };
          }
          return { ...t, remainingSeconds: next };
        }),
      );

      if (completedAlerts.length > 0) {
        setShowTimersModal(false);
        setPendingTimerAlerts((prev) => [...prev, ...completedAlerts]);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timers.length, recipe]);

  useEffect(() => {
    if (showExitAlert || visibleTimerAlert || pendingTimerAlerts.length === 0) return;

    setVisibleTimerAlert({
      ...pendingTimerAlerts[0],
      open: true,
    });
  }, [showExitAlert, visibleTimerAlert, pendingTimerAlerts]);

  const handleStartTimer = useCallback(
    (step: Recipe["steps"][number]) => {
      if (step.timerSeconds == null) return;
      // Don't start if already active or completed for this step
      if (timers.some((t) => t.stepId === step.id)) return;
      const newTimer: TimerInstance = {
        id: `${step.id}-${Date.now()}`,
        stepId: step.id,
        label: step.title ?? `Paso ${step.order}`,
        totalSeconds: step.timerSeconds,
        remainingSeconds: step.timerSeconds,
        completed: false,
      };
      setTimers((prev) => [...prev, newTimer]);
    },
    [timers],
  );

  const handleClose = useCallback(() => {
    setShowExitAlert(true);
  }, []);

  if (!recipe) {
    return (
      <IonPage>
        <IonContent fullscreen className="bg-white">
          <div className="flex min-h-full items-center justify-center bg-white px-6">
            <PageErrorState
              title="Receta no encontrada"
              message="No pudimos cargar esta receta. Intentá de nuevo."
              onRetry={() => window.location.assign("/tabs/explore")}
            />
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonContent fullscreen className="bg-[#FAF7F2]">
        {screen === "summary" ? (
          <CookingModeSummary
            recipe={recipe}
            onStart={() => setScreen("step")}
            onClose={handleClose}
          />
        ) : (
          <CookingModeStep
            step={recipe.steps[currentStepIndex]}
            currentIndex={currentStepIndex}
            totalSteps={recipe.steps.length}
            utensils={recipe.utensils}
            ingredients={recipe.ingredients}
            activeTimers={timers}
            onStartTimer={handleStartTimer}
            onOpenTimersModal={() => setShowTimersModal(true)}
            onBack={() => setCurrentStepIndex((i) => Math.max(0, i - 1))}
            onBackToSummary={() => setScreen("summary")}
            onNext={() => {
              if (currentStepIndex < recipe.steps.length - 1) {
                setCurrentStepIndex((i) => i + 1);
              } else {
                history.replace(`/tabs/recipes/${recipe.id}`);
              }
            }}
            onClose={handleClose}
            isLast={currentStepIndex === recipe.steps.length - 1}
          />
        )}

        {showTimersModal && (
          <ActiveTimersModal
            timers={timers}
            onClose={() => setShowTimersModal(false)}
          />
        )}

        <IonAlert
          isOpen={showExitAlert}
          onDidDismiss={() => setShowExitAlert(false)}
          header="¿Salir del modo cocina?"
          message="Vas a perder el progreso de la preparación."
          buttons={[
            {
              text: "Cancelar",
              role: "cancel",
            },
            {
              text: "Salir",
              role: "destructive",
              handler: () => {
                history.replace(`/tabs/recipes/${recipe.id}`);
              },
            },
          ]}
        />

        <IonAlert
          isOpen={visibleTimerAlert?.open ?? false}
          onDidDismiss={() => {
            if (!visibleTimerAlert) return;

            setPendingTimerAlerts((prev) =>
              prev.filter((alert) => alert.id !== visibleTimerAlert.id),
            );
            setVisibleTimerAlert(null);
          }}
          header={visibleTimerAlert ? `¡${visibleTimerAlert.label} listo!` : ""}
          message={visibleTimerAlert?.message ?? ""}
          buttons={[{ text: "OK", role: "cancel" }]}
        />
      </IonContent>
    </IonPage>
  );
}

export default CookingModePage;
