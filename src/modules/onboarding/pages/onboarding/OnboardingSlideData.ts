import freshIngredients from '@assets/onboarding/fresh-ingredients.webp'
import guidedMealPlanning from '@assets/onboarding/guided-meal-planning.webp'
import healthyMealServe from '@assets/onboarding/healthy-meal-serve.webp'

export type Slide = {
  step: 1 | 2 | 3
  title: string
  description: string
  illustration: string
  topActionLabel: 'Saltar' | 'Ingresar'
  topActionTo: string
  bottomActionLabel: 'Siguiente' | 'Empezar'
  bottomActionTo: string
  bottomActionStyle: 'circle' | 'pill'
}

export const SLIDES: Slide[] = [
  {
    step: 1,
    title: 'Descubre recetas fáciles',
    description: 'Encuentra recetas simples con ingredientes claros y pasos fáciles de seguir.',
    illustration: freshIngredients,
    topActionLabel: 'Saltar',
    topActionTo: '/login',
    bottomActionLabel: 'Siguiente',
    bottomActionTo: '/onboarding',
    bottomActionStyle: 'circle',
  },
  {
    step: 2,
    title: 'Sigue pasos simples',
    description: 'Cada receta te guía paso a paso para que cocines con confianza y sin complicaciones.',
    illustration: guidedMealPlanning,
    topActionLabel: 'Saltar',
    topActionTo: '/login',
    bottomActionLabel: 'Siguiente',
    bottomActionTo: '/onboarding',
    bottomActionStyle: 'circle',
  },
  {
    step: 3,
    title: 'Cocina rico y saludable',
    description: 'Te ayudamos a disfrutar de comidas deliciosas y nutritivas todos los días.',
    illustration: healthyMealServe,
    topActionLabel: 'Ingresar',
    topActionTo: '/login',
    bottomActionLabel: 'Empezar',
    bottomActionTo: '/register',
    bottomActionStyle: 'pill',
  },
]

export const CONTENT_EXIT_MS = 180
