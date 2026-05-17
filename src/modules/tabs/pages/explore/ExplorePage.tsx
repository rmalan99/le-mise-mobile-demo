import { useMemo, useState } from "react";
import {
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonPage,
} from "@ionic/react";
import {
  IconBell,
  IconClock,
  IconFilter,
  IconLeaf,
  IconMoon,
  IconSearch,
  IconSoup,
  IconSunrise,
  IconWheatOff,
  type Icon,
} from "@tabler/icons-react";
import RecipeCard from "@/modules/recipes/components/RecipeCard";
import Brand from "@/shared/components/brand";
import { recipeMocks } from "@/modules/recipes/mocks/recipes";

const PAGE_SIZE = 6;

const CATEGORY_STYLES: Record<
  string,
  {
    Icon: Icon;
    tileClassName: string;
    iconClassName: string;
  }
> = {
  all: {
    Icon: IconFilter,
    tileClassName: "bg-[#FFF3D6]",
    iconClassName: "text-[#F2B21B]",
  },
  Desayunos: {
    Icon: IconSunrise,
    tileClassName: "bg-[#FFF3D6]",
    iconClassName: "text-[#F2B21B]",
  },
  Almuerzos: {
    Icon: IconSoup,
    tileClassName: "bg-[#EAF8EC]",
    iconClassName: "text-[#78C58B]",
  },
  Cenas: {
    Icon: IconMoon,
    tileClassName: "bg-[#FFE9E4]",
    iconClassName: "text-[#FF7A63]",
  },
  Rápidas: {
    Icon: IconClock,
    tileClassName: "bg-[#FFE9E4]",
    iconClassName: "text-[#FF7A63]",
  },
  Vegetariano: {
    Icon: IconLeaf,
    tileClassName: "bg-[#EAF8EC]",
    iconClassName: "text-[#78C58B]",
  },
  "Sin gluten": {
    Icon: IconWheatOff,
    tileClassName: "bg-[#F2FBF3]",
    iconClassName: "text-[#9FD7AE]",
  },
};

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

  const handleInfiniteScroll = async (event: CustomEvent<void>) => {
    setVisibleCount((current) => current + PAGE_SIZE);
    event.target.complete();
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

            <div className="mt-3 flex items-center gap-3">
              <label className="flex min-h-12 flex-1 items-center gap-3 rounded-2xl border border-[#EADFCF] bg-white px-4 shadow-[0_8px_24px_rgba(164,130,74,0.08)]">
                <IconSearch size={18} className="text-[var(--app-color-text-secondary)]" aria-hidden="true" />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => handleSearchChange(event.target.value)}
                  placeholder="Buscar recetas"
                  className="h-full w-full bg-transparent text-sm text-[var(--app-color-text-primary)] outline-none placeholder:text-[var(--app-color-text-secondary)]"
                />
              </label>

              <button
                type="button"
                onClick={handleFilterClick}
                aria-label="Cambiar filtro"
                className="flex min-h-12 min-w-12 items-center justify-center rounded-2xl border border-[#EADFCF] bg-white text-[var(--app-color-primary)] shadow-[0_8px_24px_rgba(164,130,74,0.08)]"
              >
                <IconFilter size={18} aria-hidden="true" />
              </button>
            </div>

            <div className="mt-4 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex gap-2.5 pr-2">
              {categories.map((category) => {
                const isSelected = selectedCategory === category;
                const categoryStyle = CATEGORY_STYLES[category] ?? CATEGORY_STYLES.all;
                const CategoryIcon = categoryStyle.Icon;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(category);
                      setVisibleCount(PAGE_SIZE);
                    }}
                    className="flex shrink-0 flex-col items-center gap-2"
                  >
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl border shadow-[0_6px_18px_rgba(164,130,74,0.08)] transition-all ${
                        isSelected
                          ? "border-[var(--app-color-primary)] ring-2 ring-[var(--app-color-primary)]/15"
                          : "border-[#F0E4D2]"
                      } ${categoryStyle.tileClassName}`}
                    >
                      <CategoryIcon
                        size={20}
                        stroke={1.9}
                        className={categoryStyle.iconClassName}
                        aria-hidden="true"
                      />
                    </div>

                    <span className="max-w-14 text-center text-[10px] font-medium leading-tight text-[var(--app-color-text-secondary)]">
                      {category === "all" ? "Todas" : category}
                    </span>
                  </button>
                );
              })}
              </div>
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

            <div className="space-y-4">
              {visibleRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} variant="highlight" />
              ))}

              {filteredRecipes.length === 0 ? (
                <div className="rounded-[24px] border border-dashed border-[#EADFCF] bg-white px-5 py-8 text-center shadow-[0_8px_24px_rgba(164,130,74,0.05)]">
                  <h2 className="text-lg font-semibold text-[var(--app-color-text-primary)]">
                    No encontramos recetas
                  </h2>
                  <p className="mt-2 text-sm text-[var(--app-color-text-secondary)]">
                    Probá con otro nombre o cambiá el filtro.
                  </p>
                </div>
              ) : null}
            </div>
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
