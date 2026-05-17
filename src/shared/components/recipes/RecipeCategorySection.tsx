import {
  IconClock,
  IconFilter,
  IconLeaf,
  IconMoon,
  IconSunrise,
  IconWheatOff,
  type Icon,
} from "@tabler/icons-react";

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
    Icon: IconMoon,
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

const DEFAULT_STYLE = {
  Icon: IconFilter,
  tileClassName: "bg-[#FFF3D6]",
  iconClassName: "text-[#F2B21B]",
};

const LABEL_OVERRIDES: Record<string, string> = {
  all: "Todas",
};

interface RecipeCategorySectionProps {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
}

function RecipeCategorySection({
  categories,
  selectedCategory,
  onSelect,
}: RecipeCategorySectionProps) {
  return (
    <div className="overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex gap-2.5 pr-2">
        {categories.map((category) => {
          const isSelected = selectedCategory === category;
          const categoryStyle = CATEGORY_STYLES[category] ?? DEFAULT_STYLE;
          const CategoryIcon = categoryStyle.Icon;
          const label = LABEL_OVERRIDES[category] ?? category;

          return (
            <button
              key={category}
              type="button"
              onClick={() => onSelect(category)}
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
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export { CATEGORY_STYLES };
export default RecipeCategorySection;