import { useState, type TouchEvent } from "react";
import { IonContent, IonPage } from "@ionic/react";
import { useHistory } from "react-router-dom";
import {
  IconChevronRight,
  IconClock,
  IconToolsKitchen2,
  IconBowl,
  IconSalad,
  IconGrill,
  IconCake,
  IconCalendarPlus,
  IconBell,
  IconSunrise,
  IconSoup,
  IconMoon,
  IconCookie,
  IconBolt,
  IconLeaf,
  IconWheatOff,
  IconGlassFull,
} from "@tabler/icons-react";
import Brand from "@/shared/components/brand";

// ─── Mock data ────────────────────────────────────────────────────────────────

const GREETING = {
  name: "María",
  phrase: "Hoy es un gran día para cocinar algo especial.",
};

const RECIPES = [
  {
    id: "1",
    title: "Risotto de setas y parmesano",
    description: "Cremoso y reconfortante, con quinoa y verduras salteadas",
    difficulty: "Media",
    time: "35 min",
    image:
      "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=80",
    category: "Italianos",
  },
  {
    id: "2",
    title: "Salmón al horno con limon",
    description: "Pescado tierno con hierbas frescas y verduras asadas",
    difficulty: "Fácil",
    time: "25 min",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80",
    category: "Pescado",
  },
  {
    id: "3",
    title: "Tarta de verduras y queso",
    description: "Masa crujiente con relleno de calabacín, pimiento y brie",
    difficulty: "Media",
    time: "50 min",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80",
    category: "Vegetariano",
  },
];

const CATEGORIES = [
  {
    id: "c1",
    label: "Desayunos",
    Icon: IconSunrise,
    tileClassName: "bg-[#FFF3D6]",
    iconClassName: "text-[#F2B21B]",
  },
  {
    id: "c2",
    label: "Almuerzos",
    Icon: IconSoup,
    tileClassName: "bg-[#EAF8EC]",
    iconClassName: "text-[#78C58B]",
  },
  {
    id: "c3",
    label: "Cenas",
    Icon: IconMoon,
    tileClassName: "bg-[#FFE9E4]",
    iconClassName: "text-[#FF7A63]",
  },
  {
    id: "c4",
    label: "Postres",
    Icon: IconCookie,
    tileClassName: "bg-[#FFF3D6]",
    iconClassName: "text-[#F2B21B]",
  },
  {
    id: "c5",
    label: "Rápidas",
    Icon: IconBolt,
    tileClassName: "bg-[#FFE9E4]",
    iconClassName: "text-[#FF7A63]",
  },
  {
    id: "c6",
    label: "Saludables",
    Icon: IconLeaf,
    tileClassName: "bg-[#EAF8EC]",
    iconClassName: "text-[#78C58B]",
  },
  {
    id: "c7",
    label: "Sin gluten",
    Icon: IconWheatOff,
    tileClassName: "bg-[#F2FBF3]",
    iconClassName: "text-[#9FD7AE]",
  },
  {
    id: "c8",
    label: "Bebidas",
    Icon: IconGlassFull,
    tileClassName: "bg-[#FFF3D6]",
    iconClassName: "text-[#F2B21B]",
  },
];

const QUICK_LINKS = [
  { id: "q1", label: "Qué cocinar hoy", Icon: IconBowl, href: "/tabs/explore" },
  {
    id: "q2",
    label: "Crear agenda culinaria",
    Icon: IconCalendarPlus,
    href: "/tabs/explore",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function GreetingSection() {
  return (
    <div className="px-6 pt-10 pb-2">
      <div className="flex items-start justify-between gap-4">
        <Brand size={"sm"} aria-label="Le Mise" className="text-[var(--app-color-primary)]" />
        <button
          type="button"
          aria-label="Notificaciones"
          className="relative mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFF7EA] text-[var(--app-color-primary)]"
        >
          <IconBell size={18} stroke={2} aria-hidden="true" />
          <span
            className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[var(--app-color-primary)] "
            aria-hidden="true"
          />
        </button>
      </div>
      <div className="flex items-start justify-between gap-4 mt-2" >
        <h1 className="app-font-display text-[28px] leading-none text-[var(--app-color-primary)]">
          Buen día, {GREETING.name}
        </h1>
      </div>

      <p className=" text-gray-600 text-sm">{GREETING.phrase}</p>
    </div>
  );
}

function SectionHeader({
  title,
  ctaLabel = "Ver más",
  onCtaClick,
}: {
  title: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
}) {
  return (
    <div className="mt-4 mb-3 flex items-center justify-between px-6">
      <h2 className="text-[30px] font-semibold tracking-[-0.03em] text-[var(--app-color-text-primary)]">
        {title}
      </h2>
      {onCtaClick ? (
        <button
          type="button"
          onClick={onCtaClick}
          className="flex items-center gap-1 text-sm font-medium text-[var(--app-color-primary)]"
        >
          {ctaLabel}
        </button>
      ) : null}
    </div>
  );
}

function RecipeCard({ recipe }: { recipe: (typeof RECIPES)[0] }) {
  return (
    <div
      className="shrink-0 rounded-[24px] border border-[#EADFCF] bg-white p-3 shadow-[0_8px_24px_rgba(164,130,74,0.08)]"
      style={{ width: "88vw", maxWidth: 360 }}
    >
      <div className="relative overflow-hidden rounded-[18px]">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="h-[310px] w-full object-cover"
        />
      </div>

      <div className="px-1 pb-1 pt-3">
        <h3 className="mt-1 text-[28px] font-semibold leading-none tracking-[-0.03em] text-[var(--app-color-text-primary)]">
          {recipe.title}
        </h3>
        <p className="mt-2 text-sm text-[var(--app-color-text-secondary)]">
          {recipe.description}
        </p>

        <div className="mt-4 flex items-center gap-3">
          <span className="flex items-center gap-1 text-sm text-[var(--app-color-text-secondary)]">
            <IconClock size={15} stroke={1.8} aria-hidden="true" />
            {recipe.difficulty} · {recipe.time}
          </span>

          <button
            type="button"
            className="ml-auto rounded-full bg-[var(--app-color-primary)] px-4 py-2 text-xs font-semibold text-white"
          >
            Ver receta
          </button>
        </div>
      </div>
    </div>
  );
}

function RecipeCarousel() {
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const currentRecipe = RECIPES[currentRecipeIndex];

  const showRecipe = (index: number) => {
    const totalRecipes = RECIPES.length;
    setCurrentRecipeIndex((index + totalRecipes) % totalRecipes);
  };

  const showNextRecipe = () => {
    showRecipe(currentRecipeIndex + 1);
  };

  const showPreviousRecipe = () => {
    showRecipe(currentRecipeIndex - 1);
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    setTouchStartX(event.touches[0]?.clientX ?? null);
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) {
      return;
    }

    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX;
    const swipeDistance = touchStartX - touchEndX;
    const minimumSwipeDistance = 40;

    if (Math.abs(swipeDistance) < minimumSwipeDistance) {
      setTouchStartX(null);
      return;
    }

    if (swipeDistance > 0) {
      showNextRecipe();
    } else {
      showPreviousRecipe();
    }

    setTouchStartX(null);
  };

  return (
    <div className="pb-2">
      <div
        className="px-6"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <RecipeCard recipe={currentRecipe} />
      </div>

      <div className="mt-3 flex items-center justify-center gap-2">
        {RECIPES.map((recipe, index) => (
          <button
            key={recipe.id}
            type="button"
            onClick={() => showRecipe(index)}
            aria-label={`Mostrar receta ${index + 1}`}
            aria-pressed={currentRecipeIndex === index}
            className={
              currentRecipeIndex === index
                ? "h-1.5 w-4 rounded-full bg-[var(--app-color-primary)] transition-all duration-200"
                : "h-1.5 w-1.5 rounded-full bg-[#D9D9D9] transition-all duration-200"
            }
          />
        ))}
      </div>
    </div>
  );
}

function CategoriesSection() {
  return (
    <div className="flex gap-3 overflow-x-auto px-6 pb-2">
      {CATEGORIES.map(({ id, label, Icon, tileClassName, iconClassName }) => (
        <button
          type="button"
          key={id}
          className="flex shrink-0 flex-col items-center gap-2"
          aria-label={label}
        >
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-2xl border border-[#F0E4D2] shadow-[0_6px_18px_rgba(164,130,74,0.08)] ${tileClassName}`}
          >
            <Icon
              size={24}
              stroke={1.9}
              className={iconClassName}
              aria-hidden="true"
            />
          </div>
          <span className="max-w-16 text-center text-[11px] font-medium leading-tight text-[var(--app-color-text-secondary)]">
            {label}
          </span>
        </button>
      ))}
    </div>
  );
}

function QuickAccessSection() {
  const history = useHistory();

  return (
    <div className="px-6 mt-2 pb-8">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-bold text-[var(--app-color-text-primary)]">
          Accesos rápidos
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        {QUICK_LINKS.map(({ id, label, Icon, href }) => (
          <button
            key={id}
            type="button"
            onClick={() => history.push(href)}
            className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--app-color-card)] shadow-sm active:scale-[0.98] transition-transform"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[var(--app-color-surface)]">
              <Icon
                size={20}
                stroke={1.8}
                className="text-[var(--app-color-primary)]"
                aria-hidden="true"
              />
            </div>
            <span className="text-base font-semibold text-[var(--app-color-text-primary)]">
              {label}
            </span>
            <IconChevronRight
              size={18}
              stroke={2}
              className="ml-auto text-[var(--app-color-text-disabled)]"
              aria-hidden="true"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function HomePage() {
  const history = useHistory();

  return (
    <IonPage>
      <IonContent scrollY style={{ "--background": "#FFFFFF" }}>
        <div className="relative min-h-full overflow-hidden bg-white">
          <div className="relative z-10">
            <GreetingSection />
            <SectionHeader
              title="Qué cocinar hoy"
              onCtaClick={() => history.push("/tabs/explore")}
            />
            <RecipeCarousel />
            <SectionHeader title="Categorías" />
            <CategoriesSection />
            <QuickAccessSection />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default HomePage;
