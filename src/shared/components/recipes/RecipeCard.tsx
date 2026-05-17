import type { Recipe } from "@/shared/mocks/recipes";
import RecipeCardDefault from "./RecipeCardDefault";
import RecipeCardHighlight from "./RecipeCardHighlight";

interface RecipeCardProps {
  recipe: Recipe;
  variant?: "default" | "highlight";
  isFavorite?: boolean;
  onToggleFavorite?: (recipeId: string) => void;
}

function getDifficultyLabel(difficulty: Recipe["difficulty"]) {
  if (difficulty === "easy") return "Fácil";
  if (difficulty === "medium") return "Media";
  return "Difícil";
}

function RecipeCard({ recipe, variant = "default", isFavorite, onToggleFavorite }: RecipeCardProps) {
  const difficultyLabel = getDifficultyLabel(recipe.difficulty);

  if (variant === "highlight") {
    return (
      <RecipeCardHighlight
        recipe={recipe}
        difficultyLabel={difficultyLabel}
        isFavorite={isFavorite}
        onToggleFavorite={onToggleFavorite}
      />
    );
  }

  return (
    <RecipeCardDefault
      recipe={recipe}
      difficultyLabel={difficultyLabel}
      isFavorite={isFavorite}
      onToggleFavorite={onToggleFavorite}
    />
  );
}

export default RecipeCard;