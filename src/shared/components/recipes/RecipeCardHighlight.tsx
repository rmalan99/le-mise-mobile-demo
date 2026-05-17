import {
  IconClock,
  IconHeart,
  IconHeartFilled,
  IconSparkles,
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
      className="w-80"
      role={onOpenRecipe ? "button" : undefined}
      tabIndex={onOpenRecipe ? 0 : undefined}
      onClick={onOpenRecipe ? handleOpenRecipe : undefined}
      onKeyDown={onOpenRecipe ? handleKeyDown : undefined}
    >
      <div className="aspect-[4/2] overflow-visible rounded-[24px] border border-gray-200 bg-white px-4 py-3 shadow-[0_10px_28px_rgba(164,130,74,0.12)]">
        <div className="relative flex h-full gap-2">
          <div className="flex min-w-0 flex-1 flex-col pr-[80px]">
            <div className="mt-3 min-w-0 pr-3 ">
              <div className=" flex  flex-1 flex-col-2 items-center gap-2 text-sm font-medium text-[#6B6B6B]">
                <div>
                  {onToggleFavorite && (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        aria-label={
                          isFavorite
                            ? `Quitar ${recipe.title} de favoritos`
                            : `Guardar ${recipe.title} en favoritos`
                        }
                        onClick={handleFavoriteClick}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D8D8D8] bg-white text-[#6B6B6B] shadow-sm"
                      >
                        {isFavorite ? (
                          <IconHeartFilled
                            size={16}
                            className="text-[#FF7A63]"
                            aria-hidden="true"
                          />
                        ) : (
                          <IconHeart size={16} stroke={2} aria-hidden="true" />
                        )}
                      </button>
                    </div>
                  )}
                </div>

                <h2 className="text-lg font-semibold leading-5 text-[#181818]">
                  {recipe.title}
                </h2>
              </div>

              <p className="mt-1 line-clamp-2 text-sm leading-4 text-[#5F5F5F]">
                {recipe.promotionalDescription ?? recipe.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-3">
              <div className="flex items-center gap-1 text-sm font-semibold leading-none text-[#181818]">
                <IconClock size={14} aria-hidden="true" />
                {totalTime} min
              </div>
              <div className="mt-1 inline-flex items-center gap-1 text-[11px] font-medium text-[#6D8F1F]">
                <IconSparkles size={12} aria-hidden="true" />
                {difficultyLabel}
              </div>
            </div>
          </div>

          <div className="absolute right-[-46px] top-1/2 flex -translate-y-1/2 items-center justify-end">
            {recipe.mainImage ? (
              <div className="rounded-full">
                <img
                  src={recipe.mainImage}
                  alt={recipe.title}
                  className="h-[116px] w-[116px] rounded-full object-cover"
                />
              </div>
            ) : (
              <div className="h-[116px] w-[116px] rounded-full bg-[var(--app-color-secondary)] p-[2px] shadow-[0_10px_24px_rgba(164,130,74,0.18)]">
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
