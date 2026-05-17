interface PageErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

function PageErrorState({
  title = "Algo salió mal",
  message = "No pudimos cargar esta sección. Intentalo de nuevo.",
  onRetry,
}: PageErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFE9E4]">
        <span className="text-2xl" role="img" aria-hidden="true">
          ⚠️
        </span>
      </div>
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-[var(--app-color-text-primary)]">{title}</h2>
        <p className="text-sm text-[var(--app-color-text-secondary)]">{message}</p>
      </div>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 rounded-xl bg-[var(--app-color-primary)] px-5 py-2.5 text-sm font-medium text-white"
        >
          Reintentar
        </button>
      ) : null}
    </div>
  );
}

export default PageErrorState;