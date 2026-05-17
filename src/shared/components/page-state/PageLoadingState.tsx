interface PageLoadingStateProps {
  message?: string;
}

function PageLoadingState({ message = "Cargando..." }: PageLoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 px-6 py-16">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#EADFCF] border-t-[var(--app-color-primary)]" />
      <p className="text-sm text-[var(--app-color-text-secondary)]">{message}</p>
    </div>
  );
}

export default PageLoadingState;