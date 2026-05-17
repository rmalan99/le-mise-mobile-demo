import { useMemo, useState } from "react";
import {
  IonContent,
  IonPage,
} from "@ionic/react";
import { IconBell } from "@tabler/icons-react";
import { useHistory } from "react-router-dom";
import { useFavoritesStore } from "@/store/favorites";
import Brand from "@/shared/components/brand";
import { recipeMocks } from "@/shared/mocks/recipes";
import RecipeList from "@/shared/components/recipes/RecipeList";
import RecipeSearchInput from "@/shared/components/recipes/RecipeSearchInput";
import RecipeCategorySection from "@/shared/components/recipes/RecipeCategorySection";
import { PageEmptyState, PageLoadingState } from "@/shared/components/page-state";

function FavoritesPage() {
  const history = useHistory();
  const { favoriteIds, hasHydrated, toggleFavorite } = useFavoritesStore();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    recipeMocks.forEach((recipe) => {
      recipe.categories.forEach((category) => uniqueCategories.add(category));
    });
    return ["all", ...Array.from(uniqueCategories).slice(0, 5)];
  }, []);

  const favoriteRecipes = useMemo(() => {
    return recipeMocks.filter((recipe) => favoriteIds.has(recipe.id));
  }, [favoriteIds]);

  const filteredRecipes = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return favoriteRecipes.filter((recipe) => {
      const matchesCategory =
        selectedCategory === "all" || recipe.categories.includes(selectedCategory);

      const matchesQuery =
        normalizedQuery.length === 0 ||
        recipe.title.toLowerCase().includes(normalizedQuery) ||
        recipe.categories.some((category) => category.toLowerCase().includes(normalizedQuery));

      return matchesCategory && matchesQuery;
    });
  }, [favoriteRecipes, query, selectedCategory]);

  const handleSearchChange = (value: string) => {
    setQuery(value);
  };

  const handleClearFilters = () => {
    setQuery("");
    setSelectedCategory("all");
  };

  const isFavorite = (recipeId: string) => favoriteIds.has(recipeId);

  if (!hasHydrated) {
    return (
      <IonPage>
        <IonContent>
          <PageLoadingState message="Cargando favoritos..." />
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonContent fullscreen className="bg-white">
        <div className="min-h-full bg-white pb-8">
          <header className="px-6 pt-10 pb-4">
            <div className="flex items-start justify-between gap-4">
              <Brand size="sm" aria-label="Le Mise" className="text-[var(--app-color-primary)]" />

              <button
                type="button"
                aria-label="Notificaciones"
                className="relative mt-0.5 flex h-11 w-11 items-center justify-center rounded-full bg-[#FFF7EA] text-[var(--app-color-primary)]"
              >
                <IconBell size={18} stroke={2} aria-hidden="true" />
                <span
                  className="absolute right-3 top-3 h-2 w-2 rounded-full bg-[var(--app-color-primary)]"
                  aria-hidden="true"
                />
              </button>
            </div>

            <div className="mt-3">
              <RecipeSearchInput
                value={query}
                onChange={handleSearchChange}
                placeholder="Buscar en favoritos"
              />
            </div>

            <div className="mt-4">
              <RecipeCategorySection
                categories={categories}
                selectedCategory={selectedCategory}
                onSelect={(category) => setSelectedCategory(category)}
              />
            </div>
          </header>

          <section className="px-6">
            <div className="mb-4 flex items-end justify-between gap-3">
              <div>
                <span className="text-lg font-semibold leading-none tracking-[-0.03em] text-[var(--app-color-text-primary)]">
                  Mis favoritos
                </span>
              </div>

              <span className="text-sm text-[var(--app-color-text-secondary)]">
                {favoriteRecipes.length} receta{favoriteRecipes.length === 1 ? "" : "s"}
              </span>
            </div>

            {favoriteRecipes.length === 0 ? (
              <PageEmptyState
                title="Aún no tenés favoritos"
                message="Marcá las recetas que más te gusten para verlas acá."
              />
            ) : filteredRecipes.length === 0 ? (
              <PageEmptyState
                title="No encontramos recetas"
                message="Probá con otro nombre o cambiá el filtro."
                action={{ label: "Limpiar filtros", onClick: handleClearFilters }}
              />
            ) : (
              <RecipeList
                recipes={filteredRecipes}
                variant="highlight"
                isFavorite={isFavorite}
                onToggleFavorite={toggleFavorite}
                onClearFilters={handleClearFilters}
                onOpenRecipe={(recipeId) => history.push(`/tabs/recipes/${recipeId}`)}
              />
            )}
          </section>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default FavoritesPage;
