import type { Recipe } from "@/shared/mocks/recipes";
import RecipeCard from "./RecipeCard";
import PageEmptyState from "@/shared/components/page-state/PageEmptyState";

interface RecipeListProps {
  recipes: Recipe[];
  variant?: "default" | "highlight";
  emptyMessage?: string;
  onClearFilters?: () => void;
  isFavorite?: (recipeId: string) => boolean;
  onToggleFavorite?: (recipeId: string) => void;
}

function RecipeList({
  recipes,
  variant = "highlight",
  emptyMessage = "No encontramos recetas",
  onClearFilters,
  isFavorite,
  onToggleFavorite,
}: RecipeListProps) {
  if (recipes.length === 0) {
    return (
      <PageEmptyState
        title={emptyMessage}
        message="Probá con otro nombre o cambiá el filtro."
        action={onClearFilters ? { label: "Limpiar filtros", onClick: onClearFilters } : undefined}
      />
    );
  }

  return (
    <div className="space-y-4">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          variant={variant}
          isFavorite={isFavorite?.(recipe.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}

export default RecipeList;