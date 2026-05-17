import type { Recipe } from "@/modules/recipes/mocks/recipes";
import RecipeCardDefault from "./RecipeCardDefault";
import RecipeCardHighlight from "./RecipeCardHighlight";

interface RecipeCardProps {
  recipe: Recipe;
  variant?: "default" | "highlight";
}

function getDifficultyLabel(difficulty: Recipe["difficulty"]) {
  if (difficulty === "easy") return "Fácil";
  if (difficulty === "medium") return "Media";
  return "Difícil";
}

function RecipeCard({ recipe, variant = "default" }: RecipeCardProps) {
  const difficultyLabel = getDifficultyLabel(recipe.difficulty);

  if (variant === "highlight") {
    return <RecipeCardHighlight recipe={recipe} difficultyLabel={difficultyLabel} />;
  }

  return <RecipeCardDefault recipe={recipe} difficultyLabel={difficultyLabel} />;
}

export default RecipeCard;
