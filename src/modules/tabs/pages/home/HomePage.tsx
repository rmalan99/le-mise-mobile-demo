import { IonContent, IonPage } from '@ionic/react'
import { useHistory } from 'react-router-dom'
import { IconChevronRight, IconClock, IconToolsKitchen2, IconBowl, IconSalad, IconGrill, IconCake, IconCalendarPlus } from '@tabler/icons-react'

// ─── Mock data ────────────────────────────────────────────────────────────────

const GREETING = {
  name: 'María',
  phrase: 'Hoy es un gran día para cocinar algo especial.',
}

const RECIPES = [
  {
    id: '1',
    title: 'Risotto de setas y parmesano',
    description: 'Cremoso y reconfortante, con quinoa y verduras salteadas',
    difficulty: 'Media',
    time: '35 min',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=80',
    category: 'Italianos',
  },
  {
    id: '2',
    title: 'Salmón al horno con limon',
    description: 'Pescado tierno con hierbas frescas y verduras asadas',
    difficulty: 'Fácil',
    time: '25 min',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80',
    category: 'Pescado',
  },
  {
    id: '3',
    title: 'Tarta de verduras y queso',
    description: 'Masa crujiente con relleno de calabacín, pimiento y brie',
    difficulty: 'Media',
    time: '50 min',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80',
    category: 'Vegetariano',
  },
]

const CATEGORIES = [
  { id: 'c1', label: 'Todo', Icon: IconBowl },
  { id: 'c2', label: 'Ensaladas', Icon: IconSalad },
  { id: 'c3', label: 'A la plancha', Icon: IconGrill },
  { id: 'c4', label: 'Dulces', Icon: IconCake },
  { id: 'c5', label: 'Caldos', Icon: IconToolsKitchen2 },
]

const QUICK_LINKS = [
  { id: 'q1', label: 'Qué cocinar hoy', Icon: IconBowl, href: '/tabs/explore' },
  { id: 'q2', label: 'Crear agenda culinaria', Icon: IconCalendarPlus, href: '/tabs/explore' },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function GreetingSection() {
  return (
    <div className="px-6 pt-10 pb-4">
      <p className="text-sm text-[var(--app-color-text-secondary)] font-medium">
        Buenos días
      </p>
      <h1 className="mt-0.5 text-2xl font-bold text-[var(--app-color-text-primary)]">
        {GREETING.name}
      </h1>
      <p className="mt-1 text-base text-[var(--app-color-text-secondary)]">
        {GREETING.phrase}
      </p>
    </div>
  )
}

function SectionHeader({ title, ctaLabel = 'Ver más', onCtaClick }: { title: string; ctaLabel?: string; onCtaClick?: () => void }) {
  return (
    <div className="flex items-center justify-between px-6 mt-6 mb-3">
      <h2 className="text-lg font-bold text-[var(--app-color-text-primary)]">{title}</h2>
      {onCtaClick ? (
        <button
          type="button"
          onClick={onCtaClick}
          className="flex items-center gap-1 text-sm font-semibold text-[var(--app-color-primary)]"
        >
          {ctaLabel}
          <IconChevronRight size={16} stroke={2} aria-hidden="true" />
        </button>
      ) : null}
    </div>
  )
}

function RecipeCard({ recipe }: { recipe: typeof RECIPES[0] }) {
  return (
    <div
      className="relative flex flex-col rounded-3xl overflow-hidden shadow-md shrink-0"
      style={{ width: '72vw', maxWidth: 300, height: 380 }}
    >
      {/* Image */}
      <div className="relative w-full h-full">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(31,41,55,0.75) 0%, rgba(31,41,55,0.2) 45%, transparent 70%)',
          }}
        />
        {/* Category badge */}
        <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full bg-white/90 text-[var(--app-color-text-primary)]">
          {recipe.category}
        </span>
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-lg font-bold text-white leading-tight">{recipe.title}</h3>
          <p
            className="mt-1 text-sm text-white/80"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {recipe.description}
          </p>
          <div className="mt-3 flex items-center gap-3">
            <span className="flex items-center gap-1 text-xs font-medium text-white/90">
              <IconClock size={14} stroke={2} aria-hidden="true" />
              {recipe.time}
            </span>
            <span className="w-px h-3 bg-white/40" />
            <span className="text-xs font-medium text-white/90">{recipe.difficulty}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function RecipeCarousel() {
  return (
    <div
      className="flex gap-4 overflow-x-auto snap-x snap-mandatory pr-6 pb-4"
      style={{
        scrollSnapType: 'x mandatory',
        scrollPaddingLeft: '1.5rem',
        paddingLeft: '1.5rem',
        scrollBehavior: 'smooth',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {RECIPES.map((recipe) => (
        <div key={recipe.id} className="snap-start">
          <RecipeCard recipe={recipe} />
        </div>
      ))}
    </div>
  )
}

function CategoriesSection() {
  return (
    <div className="flex gap-3 px-6 overflow-x-auto pb-2">
      {CATEGORIES.map(({ id, label, Icon }) => (
        <button
          type="button"
          key={id}
          className="flex flex-col items-center gap-1.5 shrink-0"
          aria-label={label}
        >
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[var(--app-color-card)] shadow-sm">
            <Icon size={24} stroke={1.7} className="text-[var(--app-color-primary)]" aria-hidden="true" />
          </div>
          <span className="text-xs font-semibold text-[var(--app-color-text-secondary)]">{label}</span>
        </button>
      ))}
    </div>
  )
}

function QuickAccessSection() {
  const history = useHistory()

  return (
    <div className="px-6 mt-2 pb-8">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-bold text-[var(--app-color-text-primary)]">Accesos rápidos</h2>
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
              <Icon size={20} stroke={1.8} className="text-[var(--app-color-primary)]" aria-hidden="true" />
            </div>
            <span className="text-base font-semibold text-[var(--app-color-text-primary)]">{label}</span>
            <IconChevronRight size={18} stroke={2} className="ml-auto text-[var(--app-color-text-disabled)]" aria-hidden="true" />
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function HomePage() {
  const history = useHistory()

  return (
    <IonPage>
      <IonContent scrollY>
        <GreetingSection />
        <SectionHeader title="Qué cocinar hoy" onCtaClick={() => history.push('/tabs/explore')} />
        <RecipeCarousel />
        <SectionHeader title="Categorías" />
        <CategoriesSection />
        <QuickAccessSection />
      </IonContent>
    </IonPage>
  )
}

export default HomePage
