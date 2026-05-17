interface PageEmptyStateProps {
  title?: string;
  message?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

function PageEmptyState({
  title = "No encontramos nada",
  message = "Probá con otra búsqueda o cambiá los filtros.",
  action,
}: PageEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF3D6]">
        <span className="text-2xl" role="img" aria-hidden="true">
          🔍
        </span>
      </div>
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-[var(--app-color-text-primary)]">{title}</h2>
        <p className="text-sm text-[var(--app-color-text-secondary)]">{message}</p>
      </div>
      {action ? (
        <button
          type="button"
          onClick={action.onClick}
          className="mt-2 rounded-xl bg-[var(--app-color-primary)] px-5 py-2.5 text-sm font-medium text-white"
        >
          {action.label}
        </button>
      ) : null}
    </div>
  );
}

export default PageEmptyState;