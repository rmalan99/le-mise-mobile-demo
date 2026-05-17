import { IconClock, IconHeart, IconHeartFilled } from "@tabler/icons-react";
import type { Recipe } from "@/shared/mocks/recipes";
import RecipeBadge from "./RecipeBadge";

interface RecipeCardDefaultProps {
  recipe: Recipe;
  difficultyLabel: string;
  isFavorite?: boolean;
  onToggleFavorite?: (recipeId: string) => void;
  onOpenRecipe?: (recipeId: string) => void;
}

function RecipeCardDefault({ recipe, difficultyLabel, isFavorite, onToggleFavorite, onOpenRecipe }: RecipeCardDefaultProps) {
  const totalTime = (recipe.prepTime ?? 0) + (recipe.cookTime ?? 0);

  const handleFavoriteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onToggleFavorite?.(recipe.id);
  };

  const handleOpenRecipe = () => {
    onOpenRecipe?.(recipe.id);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleOpenRecipe();
    }
  };

  return (
    <article
      className="overflow-hidden rounded-[20px] border border-[#EADFCF] bg-white shadow-[0_8px_24px_rgba(164,130,74,0.08)]"
      role={onOpenRecipe ? "button" : undefined}
      tabIndex={onOpenRecipe ? 0 : undefined}
      onClick={onOpenRecipe ? handleOpenRecipe : undefined}
      onKeyDown={onOpenRecipe ? handleKeyDown : undefined}
    >
      <div className="relative">
        {recipe.mainImage ? (
          <img src={recipe.mainImage} alt={recipe.title} className="h-48 w-full object-cover" />
        ) : null}

        {onToggleFavorite && (
          <button
            type="button"
            aria-label={isFavorite ? `Quitar ${recipe.title} de favoritos` : `Guardar ${recipe.title} en favoritos`}
            onClick={handleFavoriteClick}
            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-[#FF7A63] shadow-sm"
          >
            {isFavorite ? (
              <IconHeartFilled size={16} aria-hidden="true" />
            ) : (
              <IconHeart size={16} stroke={2} aria-hidden="true" />
            )}
          </button>
        )}
      </div>

      <div className="p-4">
        <h2 className="text-[20px] font-semibold leading-6 text-[var(--app-color-text-primary)]">
          {recipe.title}
        </h2>

        <p className="mt-2 text-sm leading-6 text-[var(--app-color-text-secondary)]">
          {recipe.promotionalDescription ?? recipe.description}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-[var(--app-color-text-secondary)]">
          <RecipeBadge label={difficultyLabel} variant="highlight" />

          <RecipeBadge
            label={`${totalTime} min`}
            icon={<IconClock size={14} aria-hidden="true" />}
            variant="muted"
            className="bg-transparent px-0 py-0 text-[var(--app-color-text-secondary)]"
          />
        </div>
      </div>
    </article>
  );
}

export default RecipeCardDefault;
