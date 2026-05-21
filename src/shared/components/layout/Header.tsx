import { IconBell } from "@tabler/icons-react";
import Brand from "../brand";

export const AppHeader = () => {
  return (
    <div className="flex items-start justify-between gap-4">
      <Brand
        size={"sm"}
        aria-label="Le Mise"
        className="text-[var(--app-color-primary)]"
      />
      <button
        type="button"
        aria-label="Notificaciones"
        className="relative mt-0.5 flex h-9 w-9 shrink-0 items-center shadow-sm justify-center rounded-full bg-white text-[var(--app-color-primary)]"
      >
        <IconBell size={18} stroke={2} aria-hidden="true" />
        <span
          className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[var(--app-color-primary)] "
          aria-hidden="true"
        />
      </button>
    </div>
  );
};
