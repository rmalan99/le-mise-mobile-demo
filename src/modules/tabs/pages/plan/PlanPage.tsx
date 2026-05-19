import { IonContent, IonPage } from "@ionic/react";
import { IconCalendarWeek, IconChefHat, IconShoppingBag } from "@tabler/icons-react";

const upcomingPlan = [
  {
    day: "Hoy",
    meal: "Cena ligera",
    recipe: "Sopa de lentejas",
  },
  {
    day: "Mañana",
    meal: "Almuerzo",
    recipe: "Ensalada tibia de quinoa",
  },
  {
    day: "Viernes",
    meal: "Desayuno",
    recipe: "Batido de frutos rojos",
  },
];

function PlanPage() {
  return (
    <IonPage>
      <IonContent fullscreen className="[--background:var(--app-color-surface-light)]">
        <div className="min-h-full bg-[linear-gradient(180deg,var(--app-color-surface-light)_0%,var(--app-color-surface)_100%)] px-6 pb-8 pt-10">
          <header>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#A28A70]">
              Organizar semana
            </p>
            <h1 className="mt-2 text-[2rem] font-bold leading-none tracking-[-0.04em] text-[#202331]">
              Plan
            </h1>
            <p className="mt-3 max-w-xs text-sm leading-6 text-[var(--app-color-text-secondary)]">
              Guardá tus próximas comidas y armá una rutina simple para cocinar sin improvisar.
            </p>
          </header>

          <section className="mt-6 rounded-[30px] border border-white/80 bg-white/90 p-5 shadow-[0_18px_40px_rgba(164,130,74,0.10)] backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF7E8] text-[#5E982D]">
                <IconCalendarWeek size={22} stroke={1.8} aria-hidden="true" />
              </span>

              <div>
                <h2 className="text-lg font-semibold text-[#202331]">Agendadas</h2>
                <p className="text-sm text-[var(--app-color-text-secondary)]">
                  Tus próximas comidas para esta semana.
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {upcomingPlan.map((item) => (
                <article
                  key={`${item.day}-${item.recipe}`}
                  className="rounded-[22px] border border-[#F2E7D9] bg-[#FFFDF9] px-4 py-3 shadow-[0_8px_20px_rgba(164,130,74,0.06)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B59879]">
                        {item.day}
                      </p>
                      <h3 className="mt-1 text-base font-semibold text-[#202331]">{item.recipe}</h3>
                      <p className="mt-1 text-sm text-[var(--app-color-text-secondary)]">{item.meal}</p>
                    </div>

                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#EEF7E8] text-[#5E982D]">
                      <IconChefHat size={18} stroke={1.8} aria-hidden="true" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-5 rounded-[30px] border border-white/80 bg-white/90 p-5 shadow-[0_18px_40px_rgba(164,130,74,0.10)] backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF4E8] text-[var(--app-color-primary)]">
                <IconShoppingBag size={22} stroke={1.8} aria-hidden="true" />
              </span>

              <div>
                <h2 className="text-lg font-semibold text-[#202331]">Próximo paso</h2>
                <p className="text-sm text-[var(--app-color-text-secondary)]">
                  Convertí este plan en una lista de compras cuando quieras.
                </p>
              </div>
            </div>
          </section>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default PlanPage;
