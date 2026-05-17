import { IconFilter, IconSearch } from "@tabler/icons-react";

interface RecipeSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onFilterClick?: () => void;
}

function RecipeSearchInput({
  value,
  onChange,
  placeholder = "Buscar recetas",
  onFilterClick,
}: RecipeSearchInputProps) {
  return (
    <div className="flex items-center gap-3">
      <label className="flex min-h-12 flex-1 items-center gap-3 rounded-2xl border border-[#EADFCF] bg-white px-4 shadow-[0_8px_24px_rgba(164,130,74,0.08)]">
        <IconSearch size={18} className="text-[var(--app-color-text-secondary)]" aria-hidden="true" />
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-full w-full bg-transparent text-sm text-[var(--app-color-text-primary)] outline-none placeholder:text-[var(--app-color-text-secondary)]"
        />
      </label>

      {onFilterClick ? (
        <button
          type="button"
          onClick={onFilterClick}
          aria-label="Cambiar filtro"
          className="flex min-h-12 min-w-12 items-center justify-center rounded-2xl border border-[#EADFCF] bg-white text-[var(--app-color-primary)] shadow-[0_8px_24px_rgba(164,130,74,0.08)]"
        >
          <IconFilter size={18} aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
}

export default RecipeSearchInput;