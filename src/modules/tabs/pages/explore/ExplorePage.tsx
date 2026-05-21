import { useEffect, useMemo, useState } from "react";
import {
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonPage,
} from "@ionic/react";
import { useHistory, useLocation } from "react-router-dom";
import { useFavoritesStore } from "@/store/favorites";
import { getAvailableRecipeCategories } from "@/shared/config/recipeCategories";
import { recipeMocks } from "@/shared/mocks/recipes";
import RecipeList from "@/shared/components/recipes/RecipeList";
import RecipeSearchInput from "@/shared/components/recipes/RecipeSearchInput";
import RecipeCategorySection from "@/shared/components/recipes/RecipeCategorySection";
import { AppHeader } from "@/shared/components/layout/Header";

const PAGE_SIZE = 6;

function ExplorePage() {
  const history = useHistory();
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const { favoriteIds, toggleFavorite } = useFavoritesStore();

  const categories = useMemo(() => {
    return ["all", ...getAvailableRecipeCategories()];
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryFromQuery = params.get("category");

    if (categoryFromQuery && categories.includes(categoryFromQuery)) {
      setSelectedCategory(categoryFromQuery);
      setVisibleCount(PAGE_SIZE);
      return;
    }

    setSelectedCategory("all");
    setVisibleCount(PAGE_SIZE);
  }, [categories, location.search]);

  const filteredRecipes = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return recipeMocks.filter((recipe) => {
      const matchesCategory =
        selectedCategory === "all" ||
        recipe.categories.includes(selectedCategory);

      const matchesQuery =
        normalizedQuery.length === 0 ||
        recipe.title.toLowerCase().includes(normalizedQuery) ||
        recipe.categories.some((category) =>
          category.toLowerCase().includes(normalizedQuery),
        );

      return matchesCategory && matchesQuery;
    });
  }, [query, selectedCategory]);

  const visibleRecipes = filteredRecipes.slice(0, visibleCount);
  const hasMoreRecipes = visibleCount < filteredRecipes.length;

  const handleSearchChange = (value: string) => {
    setQuery(value);
    setVisibleCount(PAGE_SIZE);
  };

  const handleClearFilters = () => {
    setQuery("");
    setSelectedCategory("all");
    setVisibleCount(PAGE_SIZE);
  };

  const handleInfiniteScroll = async (event: CustomEvent<void>) => {
    setVisibleCount((current) => current + PAGE_SIZE);
    (event.target as HTMLIonInfiniteScrollElement).complete();
  };

  return (
    <IonPage>
      <IonContent fullscreen className="app-tabs-content">
        <div className="app-tabs-surface pb-8">
          <header className="px-6 pt-10 pb-4">
            <AppHeader />
            <div className="mt-6">
              <RecipeSearchInput
                value={query}
                onChange={handleSearchChange}
                placeholder="Buscar recetas, ingredientes..."
              />
            </div>

            <div className="mt-5">
              <RecipeCategorySection
                categories={categories}
                selectedCategory={selectedCategory}
                onSelect={(category) => {
                  setSelectedCategory(category);
                  setVisibleCount(PAGE_SIZE);
                }}
              />
            </div>
          </header>

          <section className="px-6">
            <RecipeList
              recipes={visibleRecipes}
              variant="highlight"
             onClearFilters={handleClearFilters}
              isFavorite={(recipeId) => favoriteIds.has(recipeId)}
              onToggleFavorite={toggleFavorite}
              onOpenRecipe={(recipeId) =>
                history.push(`/tabs/recipes/${recipeId}`)
              }
            />
          </section>

          <IonInfiniteScroll
            onIonInfinite={handleInfiniteScroll}
            disabled={!hasMoreRecipes}
          >
            <IonInfiniteScrollContent loadingText="Cargando más recetas..." />
          </IonInfiniteScroll>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default ExplorePage;
