import {
  IconChefHat,
  IconClock,
  IconFilter,
  IconGlassFull,
  IconLeaf,
  IconMoon,
  IconSparkles,
  IconSoup,
  IconSunrise,
  IconToolsKitchen2,
  IconWheatOff,
  IconWorld,
  type Icon,
} from "@tabler/icons-react";
import { recipeMocks } from "@/shared/mocks/recipes";

export const HOME_CATEGORY_LIMIT = 8;

export const CATEGORY_STYLES: Record<
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
  Sopas: {
    Icon: IconSoup,
    tileClassName: "bg-[#EAF8EC]",
    iconClassName: "text-[#78C58B]",
  },
  "Plato principal": {
    Icon: IconChefHat,
    tileClassName: "bg-[#FFE9E4]",
    iconClassName: "text-[#FF7A63]",
  },
  Mediterránea: {
    Icon: IconWorld,
    tileClassName: "bg-[#FFF3D6]",
    iconClassName: "text-[#F2B21B]",
  },
  Vegana: {
    Icon: IconLeaf,
    tileClassName: "bg-[#EAF8EC]",
    iconClassName: "text-[#78C58B]",
  },
  Bebidas: {
    Icon: IconGlassFull,
    tileClassName: "bg-[#FFF3D6]",
    iconClassName: "text-[#F2B21B]",
  },
  Jugos: {
    Icon: IconGlassFull,
    tileClassName: "bg-[#FFF3D6]",
    iconClassName: "text-[#F2B21B]",
  },
  Dominicana: {
    Icon: IconWorld,
    tileClassName: "bg-[#FFE9E4]",
    iconClassName: "text-[#FF7A63]",
  },
  Refrescante: {
    Icon: IconSparkles,
    tileClassName: "bg-[#F2FBF3]",
    iconClassName: "text-[#9FD7AE]",
  },
  Saludable: {
    Icon: IconLeaf,
    tileClassName: "bg-[#EAF8EC]",
    iconClassName: "text-[#78C58B]",
  },
  "Sin cocción": {
    Icon: IconToolsKitchen2,
    tileClassName: "bg-[#FFF3D6]",
    iconClassName: "text-[#F2B21B]",
  },
};

export const DEFAULT_CATEGORY_STYLE = {
  Icon: IconFilter,
  tileClassName: "bg-[#FFF3D6]",
  iconClassName: "text-[#F2B21B]",
};

export const CATEGORY_LABEL_OVERRIDES: Record<string, string> = {
  all: "Todas",
};

export function getAvailableRecipeCategories() {
  const uniqueCategories = new Set<string>();

  recipeMocks.forEach((recipe) => {
    recipe.categories.forEach((category) => uniqueCategories.add(category));
  });

  return Array.from(uniqueCategories).sort((firstCategory, secondCategory) =>
    firstCategory.localeCompare(secondCategory, "es"),
  );
}
