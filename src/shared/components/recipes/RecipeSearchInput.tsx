import { IconSearch } from "@tabler/icons-react";

interface RecipeSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function RecipeSearchInput({
  value,
  onChange,
  placeholder = "Buscar recetas",
}: RecipeSearchInputProps) {
  return (
    <div>
      <label className="flex min-h-14 items-center gap-3 rounded-full border border-[#EEE6DB] bg-white/96 px-5 shadow-[0_14px_30px_rgba(164,130,74,0.08)]">
        <IconSearch size={18} className="text-[var(--app-color-text-secondary)]" aria-hidden="true" />
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-full w-full bg-transparent text-sm text-[var(--app-color-text-primary)] outline-none placeholder:text-[var(--app-color-text-secondary)]"
        />
      </label>
    </div>
  );
}

export default RecipeSearchInput;
