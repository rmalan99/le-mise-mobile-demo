import { useMemo, useState } from "react";
import {
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonPage,
} from "@ionic/react";
import { IconBell } from "@tabler/icons-react";
import Brand from "@/shared/components/brand";
import { recipeMocks } from "@/shared/mocks/recipes";
import RecipeList from "@/shared/components/recipes/RecipeList";
import RecipeSearchInput from "@/shared/components/recipes/RecipeSearchInput";
import RecipeCategorySection from "@/shared/components/recipes/RecipeCategorySection";

const PAGE_SIZE = 6;

function ExplorePage() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();

    recipeMocks.forEach((recipe) => {
      recipe.categories.forEach((category) => uniqueCategories.add(category));
    });

    return ["all", ...Array.from(uniqueCategories).slice(0, 5)];
  }, []);

  const filteredRecipes = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return recipeMocks.filter((recipe) => {
      const matchesCategory =
        selectedCategory === "all" || recipe.categories.includes(selectedCategory);

      const matchesQuery =
        normalizedQuery.length === 0 ||
        recipe.title.toLowerCase().includes(normalizedQuery) ||
        recipe.categories.some((category) => category.toLowerCase().includes(normalizedQuery));

      return matchesCategory && matchesQuery;
    });
  }, [query, selectedCategory]);

  const visibleRecipes = filteredRecipes.slice(0, visibleCount);
  const hasMoreRecipes = visibleCount < filteredRecipes.length;

  const handleSearchChange = (value: string) => {
    setQuery(value);
    setVisibleCount(PAGE_SIZE);
  };

  const handleFilterClick = () => {
    const currentIndex = categories.indexOf(selectedCategory);
    const nextCategory = categories[(currentIndex + 1) % categories.length] ?? "all";

    setSelectedCategory(nextCategory);
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
                onFilterClick={handleFilterClick}
              />
            </div>

            <div className="mt-4">
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
            <div className="mb-4 flex items-end justify-between gap-3">
              <div>
                <span className="text-lg font-semibold leading-none tracking-[-0.03em] text-[var(--app-color-text-primary)]">
                  Explorar recetas
                </span>
              </div>

              <span className="text-sm text-[var(--app-color-text-secondary)]">
                {filteredRecipes.length} resultado{filteredRecipes.length === 1 ? "" : "s"}
              </span>
            </div>

            <RecipeList
              recipes={visibleRecipes}
              variant="highlight"
              onClearFilters={handleClearFilters}
            />
          </section>

          <IonInfiniteScroll onIonInfinite={handleInfiniteScroll} disabled={!hasMoreRecipes}>
            <IonInfiniteScrollContent loadingText="Cargando más recetas..." />
          </IonInfiniteScroll>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default ExplorePage;
