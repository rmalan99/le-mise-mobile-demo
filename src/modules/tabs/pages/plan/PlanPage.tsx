import { useMemo, useState } from "react";
import { IonContent, IonPage } from "@ionic/react";
import {
  IconCalendarWeek,
  IconChefHat,
  IconChevronRight,
  IconClock,
  IconLeaf,
  IconShoppingBag,
  IconSnowflake,
} from "@tabler/icons-react";
import { AppHeader } from "@/shared/components/layout/Header";

type ViewMode = "diaria" | "semanal";
type MealType = "desayuno" | "almuerzo" | "cena";

type PlannedMeal = {
  id: string;
  label: string;
  recipe: string;
  mealType: MealType;
  time: string;
  difficulty: "Fácil" | "Media";
};

type DayPlan = {
  id: string;
  shortDay: string;
  dayName: string;
  dayNumber: string;
  longLabel: string;
  isToday?: boolean;
  meals: PlannedMeal[];
};

type WeeklyHighlight = {
  id: string;
  badge: string;
  date: string;
  recipe: string;
  mealLabel: string;
};

const WEEK_DAYS: DayPlan[] = [
  {
    id: "mon-20",
    shortDay: "L",
    dayName: "Lunes",
    dayNumber: "20",
    longLabel: "lunes 20 de mayo",
    meals: [
      {
        id: "mon-breakfast",
        label: "Desayuno",
        recipe: "Tostadas de palta y huevo",
        mealType: "desayuno",
        time: "12 min",
        difficulty: "Fácil",
      },
      {
        id: "mon-lunch",
        label: "Almuerzo",
        recipe: "Bowl tibio de arroz integral",
        mealType: "almuerzo",
        time: "25 min",
        difficulty: "Fácil",
      },
    ],
  },
  {
    id: "tue-21",
    shortDay: "M",
    dayName: "Martes",
    dayNumber: "21",
    longLabel: "martes 21 de mayo",
    meals: [
      {
        id: "tue-lunch",
        label: "Almuerzo",
        recipe: "Ensalada tibia de quinoa",
        mealType: "almuerzo",
        time: "20 min",
        difficulty: "Fácil",
      },
      {
        id: "tue-dinner",
        label: "Cena",
        recipe: "Pasta con vegetales y oliva",
        mealType: "cena",
        time: "30 min",
        difficulty: "Media",
      },
    ],
  },
  {
    id: "wed-22",
    shortDay: "M",
    dayName: "Miércoles",
    dayNumber: "22",
    longLabel: "miércoles 22 de mayo",
    meals: [
      {
        id: "wed-breakfast",
        label: "Desayuno",
        recipe: "Smoothie proteico de banana",
        mealType: "desayuno",
        time: "8 min",
        difficulty: "Fácil",
      },
      {
        id: "wed-dinner",
        label: "Cena",
        recipe: "Sopa de lentejas con espinaca",
        mealType: "cena",
        time: "35 min",
        difficulty: "Media",
      },
    ],
  },
  {
    id: "thu-23",
    shortDay: "J",
    dayName: "Jueves",
    dayNumber: "23",
    longLabel: "jueves 23 de mayo",
    meals: [
      {
        id: "thu-lunch",
        label: "Almuerzo",
        recipe: "Wrap de pollo crocante",
        mealType: "almuerzo",
        time: "18 min",
        difficulty: "Fácil",
      },
      {
        id: "thu-dinner",
        label: "Cena",
        recipe: "Risotto cremoso de hongos",
        mealType: "cena",
        time: "35 min",
        difficulty: "Media",
      },
    ],
  },
  {
    id: "fri-24",
    shortDay: "V",
    dayName: "Viernes",
    dayNumber: "24",
    longLabel: "viernes 24 de mayo",
    isToday: true,
    meals: [
      {
        id: "fri-breakfast",
        label: "Desayuno",
        recipe: "Batido verde",
        mealType: "desayuno",
        time: "10 min",
        difficulty: "Fácil",
      },
      {
        id: "fri-lunch",
        label: "Almuerzo",
        recipe: "Ensalada de quinoa",
        mealType: "almuerzo",
        time: "25 min",
        difficulty: "Fácil",
      },
      {
        id: "fri-dinner",
        label: "Cena",
        recipe: "Sopa de lentejas",
        mealType: "cena",
        time: "40 min",
        difficulty: "Media",
      },
    ],
  },
  {
    id: "sat-25",
    shortDay: "S",
    dayName: "Sábado",
    dayNumber: "25",
    longLabel: "sábado 25 de mayo",
    meals: [
      {
        id: "sat-breakfast",
        label: "Desayuno",
        recipe: "Panqueques de avena",
        mealType: "desayuno",
        time: "18 min",
        difficulty: "Media",
      },
      {
        id: "sat-dinner",
        label: "Cena",
        recipe: "Pizza integral de vegetales",
        mealType: "cena",
        time: "30 min",
        difficulty: "Media",
      },
    ],
  },
  {
    id: "sun-26",
    shortDay: "D",
    dayName: "Domingo",
    dayNumber: "26",
    longLabel: "domingo 26 de mayo",
    meals: [
      {
        id: "sun-lunch",
        label: "Almuerzo",
        recipe: "Pasta con vegetales asados",
        mealType: "almuerzo",
        time: "28 min",
        difficulty: "Fácil",
      },
    ],
  },
];

const WEEKLY_HIGHLIGHTS: WeeklyHighlight[] = [
  {
    id: "weekly-today",
    badge: "Hoy",
    date: "20 MAY",
    recipe: "Sopa de lentejas",
    mealLabel: "Cena ligera",
  },
  {
    id: "weekly-tomorrow",
    badge: "Mañana",
    date: "21 MAY",
    recipe: "Ensalada tibia de quinoa",
    mealLabel: "Almuerzo",
  },
  {
    id: "weekly-friday",
    badge: "Viernes",
    date: "24 MAY",
    recipe: "Batido de frutos rojos",
    mealLabel: "Desayuno",
  },
  {
    id: "weekly-sunday",
    badge: "Domingo",
    date: "26 MAY",
    recipe: "Pasta con vegetales",
    mealLabel: "Cena",
  },
];

const MEAL_TYPE_ICON: Record<MealType, typeof IconLeaf> = {
  desayuno: IconSnowflake,
  almuerzo: IconLeaf,
  cena: IconLeaf,
};

function ViewToggle({
  value,
  onChange,
}: {
  value: ViewMode;
  onChange: (next: ViewMode) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Modo de visualización"
      className="mt-4 inline-flex rounded-full border border-[#EADFCF] bg-white p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
    >
      {([
        { key: "diaria", label: "Diaria" },
        { key: "semanal", label: "Semanal" },
      ] as const).map((option) => {
        const isSelected = value === option.key;

        return (
          <button
            key={option.key}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onChange(option.key)}
            className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
              isSelected
                ? "bg-[var(--app-color-primary)] text-white shadow-sm"
                : "text-[var(--app-color-text-secondary)]"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function DailyMealCard({ meal }: { meal: PlannedMeal }) {
  const Icon = MEAL_TYPE_ICON[meal.mealType];

  return (
    <article className="rounded-[24px] border border-[#EADFCF] bg-white px-4 py-4 shadow-[0_8px_24px_rgba(164,130,74,0.08)]">
      <div className="flex  gap-3 items-center">
        {/* <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FFE9E4] text-[#FF7A63]">
          <Icon size={19} stroke={1.9} aria-hidden="true" />
        </span> */}

        <div className="min-w-0 flex-1">
          <p className="inline-flex items-center gap-1 text-[0.88rem] font-medium text-[var(--app-color-text-secondary)]">
            <span className="text-[0.8rem]">•</span>
            <Icon size={14} stroke={1.8} aria-hidden="true" />
            {meal.label}
          </p>
          <h3 className="mt-1 text-[1.1rem] font-semibold leading-6 text-[var(--app-color-text-primary)]">
            {meal.recipe}
          </h3>
          <div className="mt-2 flex items-center gap-2 text-sm text-[var(--app-color-text-secondary)]">
            <IconClock size={15} stroke={1.8} aria-hidden="true" />
            <span>{meal.time}</span>
            <span className="mx-1 opacity-40">·</span>
            <span
              className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
              style={{
                backgroundColor: "#EAF8EC",
                color: "#78C58B",
              }}
            >
              {meal.difficulty}
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 pl-1">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#FFE9E4] text-[#FF7A63]">
            <IconChefHat size={20} stroke={1.9} aria-hidden="true" />
          </span>
          <span className="pr-1 text-[#8F8780]">
            <IconChevronRight size={18} stroke={2} aria-hidden="true" />
          </span>
        </div>
      </div>
    </article>
  );
}

function WeeklyScheduleCard({ item }: { item: WeeklyHighlight }) {
  return (
    <article className="rounded-[24px] border border-[#EADFCF] bg-white px-4 py-4 shadow-[0_8px_24px_rgba(164,130,74,0.08)]">
      <div className="flex items-center gap-3">
        <div className="w-[5.75rem] shrink-0">
          <p className="text-[0.82rem] font-semibold uppercase tracking-[0.06em] leading-5 text-[var(--app-color-primary)]">
            {item.badge}
          </p>
          <p className="mt-1 text-xs font-medium tracking-[0.08em] text-[var(--app-color-text-secondary)]">
            {item.date}
          </p>
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="pr-1 text-[1.02rem] font-semibold leading-6 text-[var(--app-color-text-primary)]">
            {item.recipe}
          </h3>
          <p className="mt-1 text-sm text-[var(--app-color-text-secondary)]">
            {item.mealLabel}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#EAF8EC] text-[#78C58B]">
            <IconChefHat size={20} stroke={1.9} aria-hidden="true" />
          </span>
          <span className="text-[#8F8780]">
            <IconChevronRight size={18} stroke={2} aria-hidden="true" />
          </span>
        </div>
      </div>
    </article>
  );
}

function ShoppingSummaryCard({ mealCount }: { mealCount: number }) {
  return (
    <section className="rounded-[24px] border border-[#EADFCF] bg-white px-4 py-4 shadow-[0_8px_24px_rgba(164,130,74,0.08)]">
      <div className="flex items-center gap-3">
        <span
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-white"
          style={{ backgroundColor: "var(--app-color-secondary)" }}
        >
          <IconShoppingBag size={21} stroke={1.8} aria-hidden="true" />
        </span>

        <div className="min-w-0 flex-1">
          <p className="text-[1.05rem] font-semibold text-[var(--app-color-text-primary)]">
            {mealCount} comidas planeadas
          </p>
          <p className="mt-1 text-sm leading-5 text-[var(--app-color-text-secondary)]">
            Equilibradas y listas para disfrutar.
          </p>
        </div>

        <button
          type="button"
          className="shrink-0 rounded-full px-4 py-3 text-sm font-semibold text-white"
          style={{ backgroundColor: "var(--app-color-primary)" }}
        >
          Ver lista
        </button>
      </div>
    </section>
  );
}

function WeeklyOverview() {
  return (
    <div className="space-y-5">
      <section className="rounded-[24px] border border-[#EADFCF] bg-white p-4 shadow-[0_8px_24px_rgba(164,130,74,0.08)]">
        <div className="flex items-center gap-3">
          <span
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-white"
            style={{ backgroundColor: "var(--app-color-secondary)" }}
          >
            <IconCalendarWeek size={22} stroke={1.8} aria-hidden="true" />
          </span>

          <div className="min-w-0 flex-1">
            <p className="text-[1.22rem] font-semibold text-[var(--app-color-text-primary)]">
              4 platos planificados
            </p>
            <p className="mt-1 text-sm text-[var(--app-color-text-secondary)]">
              Semana del 20–26 mayo
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-7 gap-2 text-center">
          {WEEK_DAYS.map((day) => {
            const isActive = day.isToday;

            return (
              <div key={day.id} className="flex flex-col items-center gap-2">
                <span className="text-[0.72rem] font-medium text-[var(--app-color-text-secondary)]">
                  {day.shortDay}
                </span>
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full border text-[0.78rem] font-semibold ${
                    isActive
                      ? "border-[var(--app-color-primary)] bg-[var(--app-color-primary)] text-white"
                      : "border-[#F0E6D8] text-[var(--app-color-text-secondary)]"
                  }`}
                >
                  {day.dayNumber}
                </span>
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    isActive ? "bg-[var(--app-color-primary)]" : "bg-[#D7CFC4]"
                  }`}
                />
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="text-[30px] font-semibold tracking-[-0.03em] text-[var(--app-color-text-primary)]">
          Tu semana
        </h2>
        <div className="mt-3 space-y-3">
          {WEEKLY_HIGHLIGHTS.map((item) => (
            <WeeklyScheduleCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="rounded-[24px] border border-[#EADFCF] bg-white px-4 py-4 shadow-[0_8px_24px_rgba(164,130,74,0.08)]">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FFE9E4] text-[#FF7A63]">
            <IconShoppingBag size={20} stroke={1.8} aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[1.03rem] font-semibold text-[var(--app-color-text-primary)]">
              Próximo paso
            </p>
            <p className="mt-1 text-sm leading-5 text-[var(--app-color-text-secondary)]">
              Convertí tu plan en una lista de compras con un solo toque.
            </p>
          </div>
          <button
            type="button"
            aria-label="Ir a lista de compras"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white"
            style={{ backgroundColor: "var(--app-color-primary)" }}
          >
            <IconChevronRight size={18} stroke={2.2} aria-hidden="true" />
          </button>
        </div>
      </section>
    </div>
  );
}

function DailyOverview({
  selectedDay,
  onSelectDay,
}: {
  selectedDay: DayPlan;
  onSelectDay: (dayId: string) => void;
}) {
  return (
    <div className="space-y-5">
      <section className="rounded-[24px] border border-[#EADFCF] bg-white p-4 shadow-[0_8px_24px_rgba(164,130,74,0.08)]">
        <div className="grid grid-cols-7 gap-2 text-center">
          {WEEK_DAYS.map((day) => {
            const isSelected = day.id === selectedDay.id;

            return (
              <button
                key={day.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => onSelectDay(day.id)}
                className="flex flex-col items-center gap-2 rounded-[18px] px-1 py-2"
              >
                <span className="text-[0.8rem] font-medium text-[var(--app-color-text-secondary)]">
                  {day.shortDay}
                </span>
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full border text-[1rem] font-semibold transition-colors ${
                    isSelected
                      ? "border-[var(--app-color-primary)] text-[var(--app-color-primary)] shadow-sm"
                      : "border-transparent text-[var(--app-color-text-primary)]"
                  }`}
                >
                  {day.dayNumber}
                </span>
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    isSelected ? "bg-[var(--app-color-primary)]" : "bg-[#DCD2C5]"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </section>

      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-[1.22rem] font-semibold text-[var(--app-color-text-primary)]">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full"
              style={{ backgroundColor: "#FFF3D6" }}
            >
              <IconCalendarWeek
                size={16}
                stroke={1.8}
                style={{ color: "#F2B21B" }}
                aria-hidden="true"
              />
            </span>
            {selectedDay.isToday
              ? `Hoy, ${selectedDay.longLabel}`
              : `${selectedDay.dayName}, ${selectedDay.longLabel}`}
          </p>
        </div>

        <button
          type="button"
          className="shrink-0 rounded-2xl border border-[#E5DDC9] bg-white px-3 py-2 text-sm font-medium text-[var(--app-color-primary)] shadow-sm"
        >
          Cambiar día
        </button>
      </div>

      <div className="space-y-3">
        {selectedDay.meals.map((meal) => (
          <DailyMealCard key={meal.id} meal={meal} />
        ))}
      </div>

      <ShoppingSummaryCard mealCount={selectedDay.meals.length} />
    </div>
  );
}

function PlanPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("semanal");
  const [selectedDayId, setSelectedDayId] = useState(
    WEEK_DAYS.find((day) => day.isToday)?.id ?? WEEK_DAYS[0].id,
  );

  const selectedDay = useMemo(
    () => WEEK_DAYS.find((day) => day.id === selectedDayId) ?? WEEK_DAYS[0],
    [selectedDayId],
  );

  return (
    <IonPage>
      <IonContent fullscreen className="app-tabs-content">
        <div className="app-tabs-surface px-5 pb-8 pt-10">
          <header>
            <AppHeader />

            <h1 className="mt-3 text-[28px] font-bold leading-none text-[var(--app-color-text-primary)]">
              Plan
            </h1>

            <p className="mt-4 max-w-[18rem] text-sm text-[var(--app-color-text-secondary)]">
              Organizá tus comidas para toda la semana y cociná sin improvisar.
            </p>

            <ViewToggle value={viewMode} onChange={setViewMode} />
          </header>

          <section className="mt-5">
            {viewMode === "semanal" ? (
              <WeeklyOverview />
            ) : (
              <DailyOverview selectedDay={selectedDay} onSelectDay={setSelectedDayId} />
            )}
          </section>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default PlanPage;