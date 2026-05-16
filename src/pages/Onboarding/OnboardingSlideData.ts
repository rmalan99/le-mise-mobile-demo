import freshIngredients from '../../assets/onboarding/fresh-ingredients.webp'
import guidedMealPlanning from '../../assets/onboarding/guided-meal-planning.webp'
import healthyMealServe from '../../assets/onboarding/healthy-meal-serve.webp'

export type Slide = {
  step: 1 | 2 | 3
  title: string
  description: string
  illustration: string
  topActionLabel: 'Skip' | 'Login'
  topActionTo: string
  bottomActionLabel: 'Next' | 'Start'
  bottomActionTo: string
  bottomActionStyle: 'circle' | 'pill'
}

export const SLIDES: Slide[] = [
  {
    step: 1,
    title: 'Descubre recetas fáciles',
    description: 'Encuentra recetas simples con ingredientes claros y pasos fáciles de seguir.',
    illustration: freshIngredients,
    topActionLabel: 'Skip',
    topActionTo: '/login',
    bottomActionLabel: 'Next',
    bottomActionTo: '/onboarding',
    bottomActionStyle: 'circle',
  },
  {
    step: 2,
    title: 'Sigue pasos simples',
    description: 'Cada receta te guía paso a paso para que cocines con confianza y sin complicaciones.',
    illustration: guidedMealPlanning,
    topActionLabel: 'Skip',
    topActionTo: '/login',
    bottomActionLabel: 'Next',
    bottomActionTo: '/onboarding',
    bottomActionStyle: 'circle',
  },
  {
    step: 3,
    title: 'Cocina rico y saludable',
    description: 'Te ayudamos a disfrutar de comidas deliciosas y nutritivas todos los días.',
    illustration: healthyMealServe,
    topActionLabel: 'Login',
    topActionTo: '/login',
    bottomActionLabel: 'Start',
    bottomActionTo: '/register',
    bottomActionStyle: 'pill',
  },
]

export const CONTENT_EXIT_MS = 180