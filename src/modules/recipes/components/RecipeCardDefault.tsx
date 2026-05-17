import { IconClock, IconHeartFilled } from "@tabler/icons-react";
import type { Recipe } from "@/modules/recipes/mocks/recipes";

interface RecipeCardDefaultProps {
  recipe: Recipe;
  difficultyLabel: string;
}

function RecipeCardDefault({ recipe, difficultyLabel }: RecipeCardDefaultProps) {
  const totalTime = (recipe.prepTime ?? 0) + (recipe.cookTime ?? 0);

  return (
    <article className="overflow-hidden rounded-[20px] border border-[#EADFCF] bg-white shadow-[0_8px_24px_rgba(164,130,74,0.08)]">
      <div className="relative">
        {recipe.mainImage ? (
          <img src={recipe.mainImage} alt={recipe.title} className="h-48 w-full object-cover" />
        ) : null}

        <button
          type="button"
          aria-label={`Guardar ${recipe.title} en favoritos`}
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-[#FF7A63] shadow-sm"
        >
          <IconHeartFilled size={16} aria-hidden="true" />
        </button>
      </div>

      <div className="p-4">
        <h2 className="text-[20px] font-semibold leading-6 text-[var(--app-color-text-primary)]">
          {recipe.title}
        </h2>

        <p className="mt-2 text-sm leading-6 text-[var(--app-color-text-secondary)]">
          {recipe.promotionalDescription ?? recipe.description}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-[var(--app-color-text-secondary)]">
          <span className="rounded-full bg-[#EAF8EC] px-2.5 py-1 font-medium text-[#5EAF74]">
            {difficultyLabel}
          </span>

          <span className="flex items-center gap-1 font-medium text-[var(--app-color-text-secondary)]">
            <IconClock size={14} aria-hidden="true" />
            {totalTime} min
          </span>
        </div>
      </div>
    </article>
  );
}

export default RecipeCardDefault;
