import { IonContent, IonPage } from "@ionic/react";
import { IconChevronLeft } from "@tabler/icons-react";
import { useHistory } from "react-router-dom";
import Brand from "@/shared/components/brand";
import {
  CATEGORY_STYLES,
  DEFAULT_CATEGORY_STYLE,
  getAvailableRecipeCategories,
} from "@/shared/config/recipeCategories";

const categories = getAvailableRecipeCategories();

function CategoriesPage() {
  const history = useHistory();

  return (
    <IonPage>
      <IonContent fullscreen className="bg-white">
        <div className="min-h-full bg-white px-6 pb-8 pt-10">
          <div className="flex items-start justify-between gap-4">
            <button
              type="button"
              onClick={() => history.goBack()}
              aria-label="Volver"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFF7EA] text-[var(--app-color-primary)]"
            >
              <IconChevronLeft size={20} stroke={2} aria-hidden="true" />
            </button>

            <Brand size="sm" aria-label="Le Mise" className="text-[var(--app-color-primary)]" />
          </div>

          <div className="mt-6">
            <h1 className="app-font-display text-[28px] leading-none text-[var(--app-color-primary)]">
              Todas las categorías
            </h1>
            <p className="mt-2 text-sm text-[var(--app-color-text-secondary)]">
              Elegí una categoría para explorar recetas relacionadas.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-x-3 gap-y-5">
            {categories.map((category) => {
              const categoryStyle = CATEGORY_STYLES[category] ?? DEFAULT_CATEGORY_STYLE;
              const CategoryIcon = categoryStyle.Icon;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => history.push(`/tabs/explore?category=${encodeURIComponent(category)}`)}
                  className="flex flex-col items-center gap-2"
                  aria-label={`Explorar ${category}`}
                >
                  <div
                    className={`flex h-20 w-20 items-center justify-center rounded-3xl border border-[#F0E4D2] shadow-[0_6px_18px_rgba(164,130,74,0.08)] ${categoryStyle.tileClassName}`}
                  >
                    <CategoryIcon
                      size={28}
                      stroke={1.9}
                      className={categoryStyle.iconClassName}
                      aria-hidden="true"
                    />
                  </div>

                  <span className="text-center text-xs font-medium leading-tight text-[var(--app-color-text-secondary)]">
                    {category}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default CategoriesPage;
