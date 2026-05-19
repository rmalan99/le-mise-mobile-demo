import {
  IconClock,
  IconHeart,
  IconHeartFilled,
  IconLeaf,
} from "@tabler/icons-react";
import type { Recipe } from "@/shared/mocks/recipes";

interface RecipeCardHighlightProps {
  recipe: Recipe;
  difficultyLabel: string;
  isFavorite?: boolean;
  onToggleFavorite?: (recipeId: string) => void;
  onOpenRecipe?: (recipeId: string) => void;
}

function RecipeCardHighlight({
  recipe,
  difficultyLabel,
  isFavorite,
  onToggleFavorite,
  onOpenRecipe,
}: RecipeCardHighlightProps) {
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
      className="w-full"
      role={onOpenRecipe ? "button" : undefined}
      tabIndex={onOpenRecipe ? 0 : undefined}
      onClick={onOpenRecipe ? handleOpenRecipe : undefined}
      onKeyDown={onOpenRecipe ? handleKeyDown : undefined}
    >
      <div className="overflow-hidden rounded-[20px] border border-white/80 bg-white/96 px-3 py-3 shadow-[0_16px_34px_rgba(164,130,74,0.10)] backdrop-blur-sm">
        <div className="relative grid grid-cols-[1fr_110px]  gap-2">
          <div className="flex min-w-0 flex-1 flex-col s">
            <div className="flex justify-start items-center  gap-2">
              {onToggleFavorite && (
                <button
                  type="button"
                  aria-label={
                    isFavorite
                      ? `Quitar ${recipe.title} de favoritos`
                      : `Guardar ${recipe.title} en favoritos`
                  }
                  onClick={handleFavoriteClick}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#EEF0E7] bg-white text-[#6A8E2A] shadow-[0_8px_18px_rgba(164,130,74,0.08)]"
                >
                  {isFavorite ? (
                    <IconHeartFilled
                      size={18}
                      className="text-[#6A8E2A]"
                      aria-hidden="true"
                    />
                  ) : (
                    <IconHeart size={18} stroke={1.9} aria-hidden="true" />
                  )}
                </button>
              )}
              <h2 className="text-[1.05rem] font-bold leading-[1.15] tracking-[-0.04em] text-[#202331]">
                {recipe.title}
              </h2>
            </div>

            <div className="mt-4 min-w-0 max-w-[210px]">
              <p className="mt-3 line-clamp-3 text-[0.96rem] leading-7 text-[#5D606A]">
                {recipe.promotionalDescription ?? recipe.description}
              </p>
            </div>

            <div className="mt-auto flex flex-wrap items-center gap-3 pt-5 text-sm text-[#202331]">
              <div className="inline-flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EEF7E8] text-[#6A8E2A]">
                  <IconClock size={15} aria-hidden="true" />
                </span>
                <span className="font-medium">{totalTime} min</span>
              </div>

              <span className="h-5 w-px bg-[#E8DED1]" aria-hidden="true" />

              <div className="inline-flex items-center gap-2 font-medium text-[#6A8E2A]">
                <IconLeaf size={16} aria-hidden="true" />
                <span>{difficultyLabel}</span>
              </div>
            </div>
          </div>

          <div className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center justify-end">
            {recipe.mainImage ? (
              <div className="rounded-full shadow-[0_12px_28px_rgba(164,130,74,0.14)]">
                <img
                  src={recipe.mainImage}
                  alt={recipe.title}
                  className="h-[110px] w-[110px] rounded-full object-cover"
                />
              </div>
            ) : (
              <div className="h-[110px] w-[110px] rounded-full bg-[var(--app-color-secondary)] p-[2px] shadow-[0_10px_24px_rgba(164,130,74,0.18)]">
                <div className="h-full w-full rounded-full bg-[#F5EFE4]" />
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default RecipeCardHighlight;
