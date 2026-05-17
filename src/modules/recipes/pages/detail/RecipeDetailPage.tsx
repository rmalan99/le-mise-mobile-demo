import { IonContent, IonPage } from "@ionic/react";
import {
  IconChefHat,
  IconArrowLeft,
  IconChecklist,
  IconClock,
  IconHeart,
  IconHeartFilled,
  IconLeaf,
  IconSparkles,
  IconToolsKitchen2,
} from "@tabler/icons-react";
import type { ReactNode } from "react";
import { useHistory, useParams } from "react-router-dom";
import { PageErrorState } from "@/shared/components/page-state";
import RecipeBadge from "@/shared/components/recipes/RecipeBadge";
import { recipeMocks, type Recipe } from "@/shared/mocks/recipes";
import { useFavoritesStore } from "@/store/favorites";

function getDifficultyLabel(difficulty: Recipe["difficulty"]) {
  if (difficulty === "easy") return "Fácil";
  if (difficulty === "medium") return "Media";
  return "Difícil";
}

function getRecipeStepSummary(recipe: Recipe) {
  const stepPreview = recipe.steps
    .slice(0, 4)
    .map((step) => step.detail.trim())
    .join(" ");

  if (recipe.steps.length <= 4) {
    return stepPreview;
  }

  return `${stepPreview} Después seguí el resto de la preparación hasta completar ${recipe.steps.length} pasos.`;
}

function formatIngredient(quantity: number, unit: string) {
  return `${quantity} ${unit}`;
}

function getCategoryMeta(category: string) {
  const normalized = category.toLowerCase();

  if (normalized.includes("bebida") || normalized.includes("jugo")) {
    return {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
          <path d="M8 4h8" />
          <path d="M9 4l1 13a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2l1-13" />
          <path d="M10 9h4" />
        </svg>
      ),
      className: "bg-[#FFF1CC] text-[#A97209]",
    };
  }

  if (normalized.includes("veg") || normalized.includes("salud") || normalized.includes("verde")) {
    return {
      icon: <IconLeaf size={16} aria-hidden="true" />,
      className: "bg-[#EEF9EF] text-[#5FAF74]",
    };
  }

  return {
    icon: <IconChecklist size={16} aria-hidden="true" />,
    className: "bg-[#FFF1CC] text-[#A97209]",
  };
}

function getIngredientBadge(name: string) {
  const normalized = name.toLowerCase();

  if (normalized.includes("agua")) {
    return { label: "A", className: "bg-[#E8F5FF] text-[#4B95C8]" };
  }

  if (normalized.includes("lima") || normalized.includes("limón") || normalized.includes("limon")) {
    return { label: "L", className: "bg-[#F5F7D8] text-[#8FA229]" };
  }

  if (normalized.includes("pepino") || normalized.includes("apio") || normalized.includes("espinaca")) {
    return { label: "V", className: "bg-[#EAF8EC] text-[#58A86D]" };
  }

  if (normalized.includes("manzana") || normalized.includes("piña") || normalized.includes("pina")) {
    return { label: "F", className: "bg-[#FFF2D8] text-[#C28A18]" };
  }

  return { label: name.trim().charAt(0).toUpperCase(), className: "bg-[#F3EFE7] text-[#64748B]" };
}

function getUtensilIcon(name: string): ReactNode {
  const normalizedName = name.toLowerCase();

  const iconClassName = "h-4 w-4 shrink-0 text-[var(--app-color-primary)]";

  if (normalizedName.includes("cuchillo")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={iconClassName} aria-hidden="true">
        <path d="M4 20L14 10" />
        <path d="M13 5l6 6" />
        <path d="M11 7l6 6" />
      </svg>
    );
  }

  if (normalizedName.includes("tabla")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={iconClassName} aria-hidden="true">
        <rect x="5" y="4" width="14" height="16" rx="2" />
        <path d="M14 8h2" />
      </svg>
    );
  }

  if (normalizedName.includes("bowl")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={iconClassName} aria-hidden="true">
        <path d="M5 10a7 7 0 0 0 14 0Z" />
        <path d="M4 10h16" />
      </svg>
    );
  }

  if (normalizedName.includes("tapa")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={iconClassName} aria-hidden="true">
        <path d="M6 13a6 6 0 0 1 12 0" />
        <path d="M4 13h16" />
        <path d="M12 7v2" />
      </svg>
    );
  }

  if (normalizedName.includes("cuchara") || normalizedName.includes("espumadera")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={iconClassName} aria-hidden="true">
        <path d="M8 7a3 3 0 1 0 6 0a3 3 0 1 0-6 0" />
        <path d="M11 10v9" />
      </svg>
    );
  }

  if (normalizedName.includes("sartén") || normalizedName.includes("sarten")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={iconClassName} aria-hidden="true">
        <path d="M5 13h9a4 4 0 1 0 0-8H9" />
        <path d="M14 13h5" />
      </svg>
    );
  }

  if (normalizedName.includes("olla") || normalizedName.includes("caldero") || normalizedName.includes("pot")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={iconClassName} aria-hidden="true">
        <path d="M6 9h12v7a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2Z" />
        <path d="M9 6h6" />
        <path d="M4 10h2" />
        <path d="M18 10h2" />
      </svg>
    );
  }

  return <IconToolsKitchen2 size={16} className="shrink-0 text-[var(--app-color-primary)]" aria-hidden="true" />;
}

function RecipeDetailPage() {
  const history = useHistory();
  const { recipeId } = useParams<{ recipeId: string }>();
  const { favoriteIds, toggleFavorite } = useFavoritesStore();

  const recipe = recipeMocks.find((candidate) => candidate.id === recipeId);

  if (!recipe) {
    return (
      <IonPage>
        <IonContent fullscreen className="bg-white">
          <div className="flex min-h-full items-center justify-center bg-white px-6">
            <PageErrorState
              title="No encontramos la receta"
              message="Volvé a explorar recetas y elegí otra para ver el detalle."
              onRetry={() => window.location.assign("/tabs/explore")}
            />
          </div>
        </IonContent>
      </IonPage>
    );
  }

  const totalTime = (recipe.prepTime ?? 0) + (recipe.cookTime ?? 0);
  const difficultyLabel = getDifficultyLabel(recipe.difficulty);
  const isFavorite = favoriteIds.has(recipe.id);
  const stepSummary = getRecipeStepSummary(recipe);
  const primaryCategories = recipe.categories.slice(0, 4);
  const extraTags = [
    recipe.difficulty === "easy" ? "Saludable" : null,
    recipe.cookTime ? null : "Sin cocción",
  ].filter(Boolean) as string[];

  return (
    <IonPage>
      <IonContent fullscreen className="bg-[#FAF7F2]">
        <div className="min-h-full bg-[#FAF7F2] pb-32">
          <section className="relative overflow-hidden">
            {recipe.mainImage ? (
              <img
                src={recipe.mainImage}
                alt={recipe.title}
                className="h-[380px] w-full object-cover"
              />
            ) : (
              <div className="h-[380px] w-full bg-[#F2E7D4]" />
            )}

            <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/5 to-transparent" />

            <div className="absolute inset-x-0 top-0 flex items-center justify-between px-6 pt-8">
              <button
                type="button"
                aria-label="Volver"
                onClick={() => {
                  if (window.history.length > 1) {
                    history.goBack();
                    return;
                  }

                  window.location.assign("/tabs/explore");
                }}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#243041] shadow-[0_18px_40px_rgba(15,23,42,0.16)]"
              >
                <IconArrowLeft size={24} aria-hidden="true" />
              </button>

              <button
                type="button"
                aria-label={isFavorite ? `Quitar ${recipe.title} de favoritos` : `Guardar ${recipe.title} en favoritos`}
                onClick={() => toggleFavorite(recipe.id)}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#FF6E58] shadow-[0_18px_40px_rgba(15,23,42,0.16)]"
              >
                {isFavorite ? (
                  <IconHeartFilled size={24} aria-hidden="true" />
                ) : (
                  <IconHeart size={24} stroke={2} aria-hidden="true" />
                )}
              </button>
            </div>
          </section>

          <section className="relative z-10 -mt-10 rounded-t-[40px] bg-[#FFFDF8] px-6 pb-10 pt-8 shadow-[0_-12px_40px_rgba(194,154,96,0.08)]">
            <div className="space-y-7">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-[32px] font-semibold leading-tight tracking-[-0.03em] text-[var(--app-color-text-primary)]">
                    {recipe.title}
                  </h1>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#EFF9EF] text-[#68B77D]">
                    <IconLeaf size={18} aria-hidden="true" />
                  </span>
                </div>
                <p className="mt-3 text-[15px] leading-8 text-[var(--app-color-text-secondary)]">
                  {recipe.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <RecipeBadge
                  label={`${totalTime} min`}
                  icon={<IconClock size={14} aria-hidden="true" />}
                  variant="muted"
                  className="border border-[#E9E3D7] bg-white text-[var(--app-color-text-primary)] shadow-[0_10px_24px_rgba(164,130,74,0.05)]"
                />
                <RecipeBadge
                  label={difficultyLabel}
                  icon={<IconSparkles size={14} aria-hidden="true" />}
                  variant="highlight"
                />
                {primaryCategories.map((category) => {
                  const meta = getCategoryMeta(category);

                  return (
                    <RecipeBadge
                      key={category}
                      label={category}
                      icon={meta.icon}
                      className={meta.className}
                    />
                  );
                })}
                {extraTags.map((tag) => {
                  const meta = getCategoryMeta(tag);

                  return (
                    <RecipeBadge
                      key={tag}
                      label={tag}
                      icon={meta.icon}
                      className={meta.className}
                    />
                  );
                })}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <IconToolsKitchen2 size={22} className="text-[#64BB7B]" aria-hidden="true" />
                  <h2 className="text-[18px] font-semibold text-[var(--app-color-text-primary)]">
                    Utensilios
                  </h2>
                </div>

                <ul className="mt-3 grid grid-cols-2 gap-2">
                  {recipe.utensils.map((utensil) => (
                    <li
                      key={utensil.id}
                      className="flex border border-gray-200 p-2 rounded-lg items-center gap-2 text-sm text-[var(--app-color-text-secondary)]"
                    >
                      {getUtensilIcon(utensil.name)}
                      <span>{utensil.name}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <IconLeaf size={22} className="text-[#64BB7B]" aria-hidden="true" />
                  <h2 className="text-[18px] font-semibold text-[var(--app-color-text-primary)]">
                    Ingredientes
                  </h2>
                </div>

                <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1">
                  {recipe.ingredients.map((ingredient) => {
                    const badge = getIngredientBadge(ingredient.name);

                    return (
                      <li key={ingredient.id} className="grid grid-cols-[1fr] border border-gray-200 p-2 rounded-lg items-center gap-2 py-2 ">
                        <div className="flex gap-2 items-center">
                        <span
                          className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${badge.className}`}
                          aria-hidden="true"
                        >
                          {badge.label}
                        </span>
                        <span className="min-w-0 flex-1 text-sm font-medium text-[var(--app-color-text-primary)]">
                          {ingredient.name}
                        </span>

                        </div>
                        <span className="text-sm text-[var(--app-color-text-secondary)]">
                          {formatIngredient(ingredient.quantity, ingredient.unit)}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div
                id="recipe-preparation-summary"
                className="rounded-[24px] bg-[#FFF8EE] p-5 text-sm leading-7 text-[var(--app-color-text-secondary)] shadow-[0_10px_24px_rgba(164,130,74,0.05)]"
              >
                <div className="flex items-center gap-2 text-[16px] font-semibold text-[var(--app-color-text-primary)]">
                  <IconChefHat size={20} className="text-[#FF7A63]" aria-hidden="true" />
                  Resumen de preparación
                </div>
                <p className="mt-3">{stepSummary}</p>
              </div>
            </div>
          </section>

          <div className="fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-20 px-6">
            <button
              type="button"
              onClick={() => {
                history.push(`/cooking/${recipe.id}`);
              }}
              className="flex h-14 w-full items-center justify-center gap-3 rounded-full bg-[#FF6E58] px-6 text-lg font-semibold text-white shadow-[0_20px_40px_rgba(255,110,88,0.35)]"
              aria-label="Entrar en modo cocina"
            >
              <IconChefHat size={20} aria-hidden="true" />
              Ver preparación
            </button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default RecipeDetailPage;
