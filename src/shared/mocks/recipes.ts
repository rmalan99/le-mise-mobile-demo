export type RecipeDifficulty = "easy" | "medium" | "hard";

export interface RecipeUtensil {
  id: string;
  name: string;
}

export interface RecipeIngredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
}

export interface RecipeStep {
  id: string;
  order: number;
  title?: string;
  detail: string;
  ingredientIds: string[];
  utensilIds: string[];
  timerSeconds?: number;
  timerCompletionMessage?: string;
  note?: string;
}

export interface Recipe {
  id: string;
  title: string;
  promotionalTitle?: string;
  description: string;
  promotionalDescription?: string;
  mainImage?: string;
  categories: string[];
  servings: number;
  prepTime: number;
  cookTime?: number;
  difficulty: RecipeDifficulty;
  utensils: RecipeUtensil[];
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
  sourceUrl?: string;
}

export const recipeMocks: Recipe[] = [
  {
    id: "recipe-arroz-con-huevo",
    title: "Arroz con huevo",
    promotionalTitle: "Un clásico rápido y reconfortante",
    description:
      "Una receta sencilla de arroz blanco con huevo revuelto, inspirada en una preparación casera dominicana.",
    promotionalDescription:
      "Económica, fácil de seguir y lista con ingredientes básicos.",
    mainImage: "https://elfogoncito.net/wp-content/uploads/2013/06/dscf6904.jpg?w=756&h=510&crop=1",
    categories: ["Almuerzos", "Rápidas", "Vegetariano"],
    servings: 4,
    prepTime: 10,
    cookTime: 20,
    difficulty: "easy",
    utensils: [
      { id: "utensil-pot", name: "Caldero o pot" },
      { id: "utensil-spoon", name: "Cuchara para remover" },
      { id: "utensil-bowl", name: "Bowl" },
      { id: "utensil-lid", name: "Tapa" }
    ],
    ingredients: [
      { id: "ingredient-rice", name: "Arroz", quantity: 3, unit: "tazas" },
      { id: "ingredient-salt", name: "Sal", quantity: 0.5, unit: "cucharada" },
      { id: "ingredient-oil", name: "Aceite", quantity: 1, unit: "cucharón" },
      { id: "ingredient-water", name: "Agua", quantity: 3, unit: "tazas" },
      { id: "ingredient-eggs", name: "Huevos", quantity: 4, unit: "unidades" }
    ],
    steps: [
      {
        id: "step-1",
        order: 1,
        title: "Medir arroz",
        detail: "Mide 3 tazas de arroz y resérvalas.",
        ingredientIds: ["ingredient-rice"],
        utensilIds: ["utensil-bowl"]
      },
      {
        id: "step-2",
        order: 2,
        title: "Medir agua",
        detail: "Mide 3 tazas de agua y resérvalas.",
        ingredientIds: ["ingredient-water"],
        utensilIds: ["utensil-bowl"]
      },
      {
        id: "step-3",
        order: 3,
        title: "Calentar aceite",
        detail: "Calienta 1 cucharón de aceite en el caldero a fuego medio.",
        ingredientIds: ["ingredient-oil"],
        utensilIds: ["utensil-pot"],
        timerSeconds: 60,
        timerCompletionMessage: "El aceite debería estar caliente. Verificá que no esté humeando antes de continuar."
      },
      {
        id: "step-4",
        order: 4,
        title: "Agregar sal",
        detail: "Agrega la sal al aceite caliente.",
        ingredientIds: ["ingredient-salt"],
        utensilIds: ["utensil-pot", "utensil-spoon"]
      },
      {
        id: "step-5",
        order: 5,
        title: "Agregar arroz",
        detail: "Añade el arroz al caldero y remueve para mezclarlo con el aceite.",
        ingredientIds: ["ingredient-rice"],
        utensilIds: ["utensil-pot", "utensil-spoon"],
        timerSeconds: 60,
        timerCompletionMessage: "El arroz debería estar brillando con el aceite. Ya podés agregar el agua."
      },
      {
        id: "step-6",
        order: 6,
        title: "Agregar agua",
        detail: "Vierte el agua en el caldero.",
        ingredientIds: ["ingredient-water"],
        utensilIds: ["utensil-pot"]
      },
      {
        id: "step-7",
        order: 7,
        title: "Cocinar destapado",
        detail: "Remueve el arroz hasta que absorba el agua.",
        ingredientIds: [],
        utensilIds: ["utensil-pot", "utensil-spoon"],
        timerSeconds: 300,
        timerCompletionMessage: "El arroz ya debería haber absorvido casi toda el agua. Verificá que no se haya secado demás.",
        note: "El tiempo puede variar según la intensidad del fuego."
      },
      {
        id: "step-8",
        order: 8,
        title: "Tapar el arroz",
        detail: "Tapa el caldero y baja el fuego.",
        ingredientIds: [],
        utensilIds: ["utensil-pot", "utensil-lid"]
      },
      {
        id: "step-9",
        order: 9,
        title: "Cocinar tapado",
        detail: "Cocina el arroz tapado hasta que el grano esté blando.",
        ingredientIds: [],
        utensilIds: ["utensil-pot", "utensil-lid"],
        timerSeconds: 900,
        timerCompletionMessage: "El arroz ya debería estar listo, verificá que esté correctamente cocido y apagá el fuego antes de reservarlo."
      },
      {
        id: "step-10",
        order: 10,
        title: "Batir huevos",
        detail: "Bate los 4 huevos en un bowl.",
        ingredientIds: ["ingredient-eggs"],
        utensilIds: ["utensil-bowl"],
        timerSeconds: 60,
        timerCompletionMessage: "Los huevos ya deberían estar bien batidos. Podés proseguir con el siguiente paso.",
        note: "Este paso puede hacerse mientras el arroz termina de cocinarse."
      },
      {
        id: "step-11",
        order: 11,
        title: "Agregar huevo",
        detail: "Vierte el huevo batido sobre el arroz caliente.",
        ingredientIds: ["ingredient-eggs"],
        utensilIds: ["utensil-pot"]
      },
      {
        id: "step-12",
        order: 12,
        title: "Mezclar huevo y arroz",
        detail: "Mezcla hasta que el huevo se cocine y se integre con el arroz.",
        ingredientIds: ["ingredient-eggs"],
        utensilIds: ["utensil-pot", "utensil-spoon"],
        timerSeconds: 120
      }
    ],
    sourceUrl: "https://elfogoncito.net/2013/06/19/arroz-con-huevo/"
  },
  {
    id: "recipe-sopa-de-lentejas",
    title: "Sopa de lentejas",
    promotionalTitle: "Una sopa ligera, casera y reconfortante",
    description:
      "Una sopa de lentejas con verduras y sofrito suave, inspirada en la versión mediterránea compartida por Bon Viveur.",
    promotionalDescription:
      "Con verduras sencillas, buen caldo y pasos claros para cocinarla sin perder el hilo.",
    mainImage: "https://imag.bonviveur.com/sopa-de-lentejas.jpg",
    categories: ["Sopas", "Plato principal", "Mediterránea", "Vegana"],
    servings: 4,
    prepTime: 15,
    cookTime: 40,
    difficulty: "easy",
    utensils: [
      { id: "utensil-pot-lentils", name: "Olla" },
      { id: "utensil-pan-lentils", name: "Sartén" },
      { id: "utensil-knife-lentils", name: "Cuchillo" },
      { id: "utensil-board-lentils", name: "Tabla de cortar" },
      { id: "utensil-spoon-lentils", name: "Cuchara para remover" },
      { id: "utensil-lid-lentils", name: "Tapa" },
      { id: "utensil-ladle-lentils", name: "Espumadera o cuchara" },
      { id: "utensil-bowl-lentils", name: "Bowl" }
    ],
    ingredients: [
      { id: "ingredient-lentils", name: "Lentejas", quantity: 200, unit: "g" },
      { id: "ingredient-broth", name: "Caldo de verduras", quantity: 1.5, unit: "l" },
      { id: "ingredient-leek", name: "Puerro", quantity: 1, unit: "trozo" },
      { id: "ingredient-potatoes", name: "Patatas medianas", quantity: 2, unit: "unidades" },
      { id: "ingredient-green-pepper", name: "Pimiento verde italiano", quantity: 0.5, unit: "unidad" },
      { id: "ingredient-red-pepper", name: "Pimiento rojo", quantity: 0.5, unit: "unidad" },
      { id: "ingredient-carrot", name: "Zanahoria", quantity: 1, unit: "unidad" },
      { id: "ingredient-green-beans", name: "Judías verdes", quantity: 100, unit: "g" },
      { id: "ingredient-bay-leaf", name: "Hoja de laurel", quantity: 1, unit: "unidad" },
      { id: "ingredient-tomato", name: "Tomate triturado", quantity: 150, unit: "g" },
      { id: "ingredient-onion", name: "Cebolla", quantity: 1, unit: "unidad" },
      { id: "ingredient-garlic", name: "Ajo", quantity: 3, unit: "dientes" },
      { id: "ingredient-olive-oil", name: "Aceite de oliva", quantity: 3, unit: "cucharadas" },
      { id: "ingredient-paprika", name: "Pimentón dulce", quantity: 0.5, unit: "cucharadita" },
      { id: "ingredient-black-pepper", name: "Pimienta negra molida", quantity: 0.25, unit: "cucharadita" },
      { id: "ingredient-salt-lentils", name: "Sal", quantity: 1, unit: "cucharadita" }
    ],
    steps: [
      {
        id: "step-lentils-1",
        order: 1,
        title: "Medir lentejas",
        detail: "Mide 200 g de lentejas y resérvalas.",
        ingredientIds: ["ingredient-lentils"],
        utensilIds: ["utensil-bowl-lentils"]
      },
      {
        id: "step-lentils-2",
        order: 2,
        title: "Medir caldo",
        detail: "Mide 1,5 l de caldo de verduras y resérvalo.",
        ingredientIds: ["ingredient-broth"],
        utensilIds: ["utensil-bowl-lentils"]
      },
      {
        id: "step-lentils-3",
        order: 3,
        title: "Pelar patatas",
        detail: "Pela las patatas.",
        ingredientIds: ["ingredient-potatoes"],
        utensilIds: ["utensil-knife-lentils", "utensil-board-lentils"]
      },
      {
        id: "step-lentils-4",
        order: 4,
        title: "Trocear patatas",
        detail: "Corta las patatas en trozos medianos.",
        ingredientIds: ["ingredient-potatoes"],
        utensilIds: ["utensil-knife-lentils", "utensil-board-lentils"]
      },
      {
        id: "step-lentils-5",
        order: 5,
        title: "Picar ajo",
        detail: "Pica los dientes de ajo.",
        ingredientIds: ["ingredient-garlic"],
        utensilIds: ["utensil-knife-lentils", "utensil-board-lentils"]
      },
      {
        id: "step-lentils-6",
        order: 6,
        title: "Picar cebolla",
        detail: "Pica la cebolla.",
        ingredientIds: ["ingredient-onion"],
        utensilIds: ["utensil-knife-lentils", "utensil-board-lentils"]
      },
      {
        id: "step-lentils-7",
        order: 7,
        title: "Picar puerro",
        detail: "Pica el puerro.",
        ingredientIds: ["ingredient-leek"],
        utensilIds: ["utensil-knife-lentils", "utensil-board-lentils"]
      },
      {
        id: "step-lentils-8",
        order: 8,
        title: "Cortar zanahoria",
        detail: "Corta la zanahoria en trozos pequeños.",
        ingredientIds: ["ingredient-carrot"],
        utensilIds: ["utensil-knife-lentils", "utensil-board-lentils"]
      },
      {
        id: "step-lentils-9",
        order: 9,
        title: "Cortar pimiento verde",
        detail: "Corta el pimiento verde en dados.",
        ingredientIds: ["ingredient-green-pepper"],
        utensilIds: ["utensil-knife-lentils", "utensil-board-lentils"]
      },
      {
        id: "step-lentils-10",
        order: 10,
        title: "Cortar pimiento rojo",
        detail: "Corta el pimiento rojo en dados.",
        ingredientIds: ["ingredient-red-pepper"],
        utensilIds: ["utensil-knife-lentils", "utensil-board-lentils"]
      },
      {
        id: "step-lentils-11",
        order: 11,
        title: "Trocear judías verdes",
        detail: "Corta las judías verdes en trozos de unos 2 cm.",
        ingredientIds: ["ingredient-green-beans"],
        utensilIds: ["utensil-knife-lentils", "utensil-board-lentils"]
      },
      {
        id: "step-lentils-12",
        order: 12,
        title: "Medir tomate",
        detail: "Mide el tomate triturado y resérvalo.",
        ingredientIds: ["ingredient-tomato"],
        utensilIds: ["utensil-bowl-lentils"]
      },
      {
        id: "step-lentils-13",
        order: 13,
        title: "Poner lentejas en la olla",
        detail: "Coloca las lentejas en la olla.",
        ingredientIds: ["ingredient-lentils"],
        utensilIds: ["utensil-pot-lentils"]
      },
      {
        id: "step-lentils-14",
        order: 14,
        title: "Añadir patatas",
        detail: "Añade las patatas troceadas a la olla.",
        ingredientIds: ["ingredient-potatoes"],
        utensilIds: ["utensil-pot-lentils"]
      },
      {
        id: "step-lentils-15",
        order: 15,
        title: "Añadir judías verdes",
        detail: "Añade las judías verdes a la olla.",
        ingredientIds: ["ingredient-green-beans"],
        utensilIds: ["utensil-pot-lentils"]
      },
      {
        id: "step-lentils-16",
        order: 16,
        title: "Añadir puerro",
        detail: "Añade el puerro picado a la olla.",
        ingredientIds: ["ingredient-leek"],
        utensilIds: ["utensil-pot-lentils"]
      },
      {
        id: "step-lentils-17",
        order: 17,
        title: "Añadir pimientos",
        detail: "Añade los pimientos a la olla.",
        ingredientIds: ["ingredient-green-pepper", "ingredient-red-pepper"],
        utensilIds: ["utensil-pot-lentils"]
      },
      {
        id: "step-lentils-18",
        order: 18,
        title: "Añadir zanahoria",
        detail: "Añade la zanahoria a la olla.",
        ingredientIds: ["ingredient-carrot"],
        utensilIds: ["utensil-pot-lentils"]
      },
      {
        id: "step-lentils-19",
        order: 19,
        title: "Añadir laurel",
        detail: "Añade la hoja de laurel a la olla.",
        ingredientIds: ["ingredient-bay-leaf"],
        utensilIds: ["utensil-pot-lentils"]
      },
      {
        id: "step-lentils-20",
        order: 20,
        title: "Cubrir con caldo",
        detail: "Vierte el caldo de verduras en la olla hasta cubrir los ingredientes.",
        ingredientIds: ["ingredient-broth"],
        utensilIds: ["utensil-pot-lentils"]
      },
      {
        id: "step-lentils-21",
        order: 21,
        title: "Llevar a ebullición",
        detail: "Calienta la olla a fuego fuerte hasta que el caldo hierva.",
        ingredientIds: [],
        utensilIds: ["utensil-pot-lentils"],
        timerSeconds: 600,
        timerCompletionMessage: "El caldo debería estar hirviendo. Retirá la espuma que pueda haber quedado en la superficie."
      },
      {
        id: "step-lentils-22",
        order: 22,
        title: "Desespumar",
        detail: "Retira la espuma que se acumule en la superficie.",
        ingredientIds: [],
        utensilIds: ["utensil-pot-lentils", "utensil-ladle-lentils"]
      },
      {
        id: "step-lentils-23",
        order: 23,
        title: "Cocer lentejas",
        detail: "Cuece las lentejas a fuego suave con la olla medio tapada hasta que estén casi tiernas.",
        ingredientIds: [],
        utensilIds: ["utensil-pot-lentils", "utensil-lid-lentils"],
        timerSeconds: 1800,
        timerCompletionMessage: "Las lentejas ya deberían estar casi tiernas. Si estás preparando el sofrito en paralelo, verificá que no se te haya quemado nada.",
        note: "Mientras esta cocción avanza, puedes preparar el sofrito en paralelo. Si tu variedad de lenteja requiere remojo o más tiempo, sigue las indicaciones del paquete."
      },
      {
        id: "step-lentils-24",
        order: 24,
        title: "Calentar aceite",
        detail: "Calienta el aceite de oliva en la sartén a fuego medio.",
        ingredientIds: ["ingredient-olive-oil"],
        utensilIds: ["utensil-pan-lentils"],
        timerSeconds: 60
      },
      {
        id: "step-lentils-25",
        order: 25,
        title: "Pochar cebolla",
        detail: "Sofríe la cebolla hasta que quede tierna.",
        ingredientIds: ["ingredient-onion"],
        utensilIds: ["utensil-pan-lentils", "utensil-spoon-lentils"],
        timerSeconds: 300
      },
      {
        id: "step-lentils-26",
        order: 26,
        title: "Añadir ajo",
        detail: "Añade el ajo picado a la sartén.",
        ingredientIds: ["ingredient-garlic"],
        utensilIds: ["utensil-pan-lentils", "utensil-spoon-lentils"]
      },
      {
        id: "step-lentils-27",
        order: 27,
        title: "Rehogar ajo",
        detail: "Rehoga el ajo durante 1 minuto.",
        ingredientIds: [],
        utensilIds: ["utensil-pan-lentils", "utensil-spoon-lentils"],
        timerSeconds: 60
      },
      {
        id: "step-lentils-28",
        order: 28,
        title: "Añadir tomate y pimentón",
        detail: "Incorpora el tomate triturado y el pimentón a la sartén.",
        ingredientIds: ["ingredient-tomato", "ingredient-paprika"],
        utensilIds: ["utensil-pan-lentils", "utensil-spoon-lentils"]
      },
      {
        id: "step-lentils-29",
        order: 29,
        title: "Reducir sofrito",
        detail: "Cocina el sofrito a fuego medio hasta que reduzca.",
        ingredientIds: [],
        utensilIds: ["utensil-pan-lentils", "utensil-spoon-lentils"],
        timerSeconds: 300
      },
      {
        id: "step-lentils-30",
        order: 30,
        title: "Añadir sofrito a la olla",
        detail: "Pasa el sofrito a la olla de las lentejas.",
        ingredientIds: [],
        utensilIds: ["utensil-pan-lentils", "utensil-pot-lentils", "utensil-spoon-lentils"]
      },
      {
        id: "step-lentils-31",
        order: 31,
        title: "Salpimentar",
        detail: "Ajusta la sopa con sal y pimienta negra molida.",
        ingredientIds: ["ingredient-salt-lentils", "ingredient-black-pepper"],
        utensilIds: ["utensil-pot-lentils", "utensil-spoon-lentils"]
      },
      {
        id: "step-lentils-32",
        order: 32,
        title: "Reposar",
        detail: "Deja reposar la sopa 10 minutos antes de servir.",
        ingredientIds: [],
        utensilIds: ["utensil-pot-lentils"],
        timerSeconds: 600
      }
    ],
    sourceUrl: "https://bonviveur.com/es/recetas/sopa-de-lentejas"
  },
  {
    id: "recipe-jugo-de-limon",
    title: "Jugo de limón",
    promotionalTitle: "Limonada dominicana fresca y rápida",
    description:
      "Una limonada dominicana sencilla y refrescante preparada con jugo de limón, agua, azúcar y hielo.",
    promotionalDescription:
      "Solo tres ingredientes principales y unos minutos para servir una bebida cítrica bien fría.",
    mainImage: "https://www.cocinadominicana.com/wp-content/uploads/2026/05/jugo-de-limon-tia-clara-pin.jpg",
    categories: ["Bebidas", "Jugos", "Dominicana", "Refrescante"],
    servings: 6,
    prepTime: 5,
    difficulty: "easy",
    utensils: [
      { id: "utensil-juicer-lemon", name: "Exprimidor" },
      { id: "utensil-pitcher-lemon", name: "Jarra" },
      { id: "utensil-spoon-lemon", name: "Cuchara" },
      { id: "utensil-knife-lemon", name: "Cuchillo" },
      { id: "utensil-board-lemon", name: "Tabla de cortar" },
      { id: "utensil-glass-lemon", name: "Vaso medidor" },
      { id: "utensil-strainer-lemon", name: "Colador" },
      { id: "utensil-serving-glass-lemon", name: "Vasos altos" }
    ],
    ingredients: [
      { id: "ingredient-lime-juice", name: "Jugo de limón", quantity: 0.5, unit: "taza" },
      { id: "ingredient-limes", name: "Limones", quantity: 8, unit: "unidades" },
      { id: "ingredient-water-lemon", name: "Agua", quantity: 6, unit: "tazas" },
      { id: "ingredient-sugar-lemon", name: "Azúcar blanca granulada", quantity: 0.5, unit: "taza" },
      { id: "ingredient-ice-lemon", name: "Cubitos de hielo", quantity: 4, unit: "tazas" },
      { id: "ingredient-garnish-lemon", name: "Limón para decorar", quantity: 1, unit: "unidad" }
    ],
    steps: [
      {
        id: "step-lemon-1",
        order: 1,
        title: "Lavar limones",
        detail: "Lava los limones.",
        ingredientIds: ["ingredient-limes", "ingredient-garnish-lemon"],
        utensilIds: []
      },
      {
        id: "step-lemon-2",
        order: 2,
        title: "Medir agua",
        detail: "Mide 6 tazas de agua y resérvalas.",
        ingredientIds: ["ingredient-water-lemon"],
        utensilIds: ["utensil-glass-lemon"]
      },
      {
        id: "step-lemon-3",
        order: 3,
        title: "Cortar limones",
        detail: "Corta los limones por la mitad.",
        ingredientIds: ["ingredient-limes"],
        utensilIds: ["utensil-knife-lemon", "utensil-board-lemon"]
      },
      {
        id: "step-lemon-4",
        order: 4,
        title: "Exprimir limones",
        detail: "Exprime los limones para obtener su jugo.",
        ingredientIds: ["ingredient-limes", "ingredient-lime-juice"],
        utensilIds: ["utensil-juicer-lemon"]
      },
      {
        id: "step-lemon-5",
        order: 5,
        title: "Colar jugo",
        detail: "Cuela el jugo para retirar las semillas.",
        ingredientIds: ["ingredient-lime-juice"],
        utensilIds: ["utensil-strainer-lemon"]
      },
      {
        id: "step-lemon-6",
        order: 6,
        title: "Verter jugo",
        detail: "Vierte el jugo colado en la jarra.",
        ingredientIds: ["ingredient-lime-juice"],
        utensilIds: ["utensil-pitcher-lemon"]
      },
      {
        id: "step-lemon-7",
        order: 7,
        title: "Añadir agua",
        detail: "Vierte el agua en la jarra.",
        ingredientIds: ["ingredient-water-lemon"],
        utensilIds: ["utensil-pitcher-lemon"]
      },
      {
        id: "step-lemon-8",
        order: 8,
        title: "Añadir azúcar",
        detail: "Añade el azúcar a la jarra.",
        ingredientIds: ["ingredient-sugar-lemon"],
        utensilIds: ["utensil-pitcher-lemon"]
      },
      {
        id: "step-lemon-9",
        order: 9,
        title: "Mezclar bebida",
        detail: "Remueve la mezcla hasta disolver el azúcar.",
        ingredientIds: ["ingredient-sugar-lemon"],
        utensilIds: ["utensil-pitcher-lemon", "utensil-spoon-lemon"],
        timerSeconds: 30
      },
      {
        id: "step-lemon-10",
        order: 10,
        title: "Probar limonada",
        detail: "Prueba la limonada.",
        ingredientIds: [],
        utensilIds: ["utensil-spoon-lemon"]
      },
      {
        id: "step-lemon-11",
        order: 11,
        title: "Ajustar sabor",
        detail: "Ajusta la cantidad de agua o azúcar al gusto.",
        ingredientIds: ["ingredient-water-lemon", "ingredient-sugar-lemon"],
        utensilIds: ["utensil-pitcher-lemon"]
      },
      {
        id: "step-lemon-12",
        order: 12,
        title: "Poner hielo en los vasos",
        detail: "Reparte el hielo en los vasos altos.",
        ingredientIds: ["ingredient-ice-lemon"],
        utensilIds: ["utensil-serving-glass-lemon"]
      },
      {
        id: "step-lemon-13",
        order: 13,
        title: "Servir",
        detail: "Vierte la limonada en los vasos y sírvela fría.",
        ingredientIds: [],
        utensilIds: ["utensil-pitcher-lemon", "utensil-serving-glass-lemon"]
      },
      {
        id: "step-lemon-14",
        order: 14,
        title: "Decorar",
        detail: "Decora los vasos con una rodaja o un gajo de limón si lo deseas.",
        ingredientIds: ["ingredient-garnish-lemon"],
        utensilIds: ["utensil-knife-lemon", "utensil-board-lemon"],
        note: "La receta original indica que el azúcar es opcional y que el equilibrio final debe quedar ácido pero agradable de tomar."
      }
    ],
    sourceUrl: "https://www.cocinadominicana.com/jugo-limon-limonada-dominicana"
  },
  {
    id: "recipe-jugo-verde",
    title: "Jugo verde",
    promotionalTitle: "Bebida verde fresca, saludable y saciante",
    description:
      "Un jugo verde preparado con pepino, manzana verde, apio, piña, lima, espinacas y agua fría, inspirado en la receta de Bon Viveur.",
    promotionalDescription:
      "Una combinación de frutas y verduras verdes para una bebida fresca y lista en pocos minutos.",
    mainImage: "https://imag.bonviveur.com/jugo-verde.jpg",
    categories: ["Bebidas", "Jugos", "Saludable", "Sin cocción"],
    servings: 4,
    prepTime: 15,
    difficulty: "easy",
    utensils: [
      { id: "utensil-knife-green-juice", name: "Cuchillo" },
      { id: "utensil-board-green-juice", name: "Tabla de cortar" },
      { id: "utensil-juicer-green-juice", name: "Exprimidor" },
      { id: "utensil-blender-green-juice", name: "Batidora" },
      { id: "utensil-blender-cup-green-juice", name: "Vaso de batidora" },
      { id: "utensil-pitcher-green-juice", name: "Jarra" },
      { id: "utensil-glass-green-juice", name: "Vasos" }
    ],
    ingredients: [
      { id: "ingredient-cucumber-green-juice", name: "Pepino", quantity: 1, unit: "unidad" },
      { id: "ingredient-apple-green-juice", name: "Manzana verde", quantity: 1, unit: "unidad" },
      { id: "ingredient-celery-green-juice", name: "Rama de apio", quantity: 1, unit: "unidad" },
      { id: "ingredient-pineapple-green-juice", name: "Piña en lata", quantity: 135, unit: "g" },
      { id: "ingredient-pineapple-juice-green-juice", name: "Jugo de la piña en lata", quantity: 1, unit: "porción" },
      { id: "ingredient-lime-green-juice", name: "Lima", quantity: 1, unit: "unidad" },
      { id: "ingredient-spinach-green-juice", name: "Hojas de espinaca", quantity: 65, unit: "g" },
      { id: "ingredient-water-green-juice", name: "Agua fría", quantity: 350, unit: "ml" },
      { id: "ingredient-ice-green-juice", name: "Hielo", quantity: 2, unit: "cubos" }
    ],
    steps: [
      {
        id: "step-green-juice-1",
        order: 1,
        title: "Lavar pepino",
        detail: "Lava el pepino.",
        ingredientIds: ["ingredient-cucumber-green-juice"],
        utensilIds: []
      },
      {
        id: "step-green-juice-2",
        order: 2,
        title: "Lavar manzana",
        detail: "Lava la manzana verde.",
        ingredientIds: ["ingredient-apple-green-juice"],
        utensilIds: []
      },
      {
        id: "step-green-juice-3",
        order: 3,
        title: "Lavar apio",
        detail: "Lava la rama de apio.",
        ingredientIds: ["ingredient-celery-green-juice"],
        utensilIds: []
      },
      {
        id: "step-green-juice-4",
        order: 4,
        title: "Trocear pepino",
        detail: "Corta el pepino en trozos pequeños.",
        ingredientIds: ["ingredient-cucumber-green-juice"],
        utensilIds: ["utensil-knife-green-juice", "utensil-board-green-juice"]
      },
      {
        id: "step-green-juice-5",
        order: 5,
        title: "Retirar corazón de la manzana",
        detail: "Retira el corazón de la manzana.",
        ingredientIds: ["ingredient-apple-green-juice"],
        utensilIds: ["utensil-knife-green-juice", "utensil-board-green-juice"]
      },
      {
        id: "step-green-juice-6",
        order: 6,
        title: "Trocear manzana",
        detail: "Corta la manzana en trozos pequeños.",
        ingredientIds: ["ingredient-apple-green-juice"],
        utensilIds: ["utensil-knife-green-juice", "utensil-board-green-juice"]
      },
      {
        id: "step-green-juice-7",
        order: 7,
        title: "Pelar apio",
        detail: "Pela la rama de apio.",
        ingredientIds: ["ingredient-celery-green-juice"],
        utensilIds: ["utensil-knife-green-juice", "utensil-board-green-juice"]
      },
      {
        id: "step-green-juice-8",
        order: 8,
        title: "Retirar filamentos del apio",
        detail: "Retira los filamentos de la rama de apio.",
        ingredientIds: ["ingredient-celery-green-juice"],
        utensilIds: ["utensil-knife-green-juice", "utensil-board-green-juice"]
      },
      {
        id: "step-green-juice-9",
        order: 9,
        title: "Cortar apio",
        detail: "Corta el apio en rodajas.",
        ingredientIds: ["ingredient-celery-green-juice"],
        utensilIds: ["utensil-knife-green-juice", "utensil-board-green-juice"]
      },
      {
        id: "step-green-juice-10",
        order: 10,
        title: "Trocear piña",
        detail: "Corta la piña en trozos pequeños.",
        ingredientIds: ["ingredient-pineapple-green-juice"],
        utensilIds: ["utensil-knife-green-juice", "utensil-board-green-juice"]
      },
      {
        id: "step-green-juice-11",
        order: 11,
        title: "Reservar jugo de piña",
        detail: "Reserva el jugo de la piña en lata.",
        ingredientIds: ["ingredient-pineapple-juice-green-juice"],
        utensilIds: []
      },
      {
        id: "step-green-juice-12",
        order: 12,
        title: "Exprimir lima",
        detail: "Exprime la lima para obtener su jugo.",
        ingredientIds: ["ingredient-lime-green-juice"],
        utensilIds: ["utensil-juicer-green-juice"]
      },
      {
        id: "step-green-juice-13",
        order: 13,
        title: "Poner pepino en la batidora",
        detail: "Introduce el pepino en el vaso de la batidora.",
        ingredientIds: ["ingredient-cucumber-green-juice"],
        utensilIds: ["utensil-blender-cup-green-juice"]
      },
      {
        id: "step-green-juice-14",
        order: 14,
        title: "Añadir manzana",
        detail: "Introduce la manzana en el vaso de la batidora.",
        ingredientIds: ["ingredient-apple-green-juice"],
        utensilIds: ["utensil-blender-cup-green-juice"]
      },
      {
        id: "step-green-juice-15",
        order: 15,
        title: "Añadir apio",
        detail: "Introduce el apio en el vaso de la batidora.",
        ingredientIds: ["ingredient-celery-green-juice"],
        utensilIds: ["utensil-blender-cup-green-juice"]
      },
      {
        id: "step-green-juice-16",
        order: 16,
        title: "Añadir piña",
        detail: "Introduce la piña en el vaso de la batidora.",
        ingredientIds: ["ingredient-pineapple-green-juice"],
        utensilIds: ["utensil-blender-cup-green-juice"]
      },
      {
        id: "step-green-juice-17",
        order: 17,
        title: "Añadir jugo de piña",
        detail: "Vierte el jugo de la piña en el vaso de la batidora.",
        ingredientIds: ["ingredient-pineapple-juice-green-juice"],
        utensilIds: ["utensil-blender-cup-green-juice"]
      },
      {
        id: "step-green-juice-18",
        order: 18,
        title: "Añadir jugo de lima",
        detail: "Vierte el jugo de lima en el vaso de la batidora.",
        ingredientIds: ["ingredient-lime-green-juice"],
        utensilIds: ["utensil-blender-cup-green-juice"]
      },
      {
        id: "step-green-juice-19",
        order: 19,
        title: "Añadir espinacas",
        detail: "Introduce las hojas de espinaca en el vaso de la batidora.",
        ingredientIds: ["ingredient-spinach-green-juice"],
        utensilIds: ["utensil-blender-cup-green-juice"]
      },
      {
        id: "step-green-juice-20",
        order: 20,
        title: "Añadir agua",
        detail: "Vierte el agua fría en el vaso de la batidora.",
        ingredientIds: ["ingredient-water-green-juice"],
        utensilIds: ["utensil-blender-cup-green-juice"]
      },
      {
        id: "step-green-juice-21",
        order: 21,
        title: "Triturar",
        detail: "Tritura todos los ingredientes hasta obtener una mezcla homogénea y sin grumos.",
        ingredientIds: [],
        utensilIds: ["utensil-blender-green-juice", "utensil-blender-cup-green-juice"],
        timerSeconds: 60
      },
      {
        id: "step-green-juice-22",
        order: 22,
        title: "Pasar a una jarra",
        detail: "Pasa el jugo verde a una jarra.",
        ingredientIds: [],
        utensilIds: ["utensil-pitcher-green-juice"]
      },
      {
        id: "step-green-juice-23",
        order: 23,
        title: "Refrigerar",
        detail: "Refrigera el jugo verde hasta que esté bien frío.",
        ingredientIds: [],
        utensilIds: ["utensil-pitcher-green-juice"],
        timerSeconds: 7200,
        note: "Si prefieres tomarlo en el momento, puedes omitir este paso y servirlo con hielo."
      },
      {
        id: "step-green-juice-24",
        order: 24,
        title: "Añadir hielo",
        detail: "Añade hielo a los vasos si lo vas a servir recién hecho.",
        ingredientIds: ["ingredient-ice-green-juice"],
        utensilIds: ["utensil-glass-green-juice"]
      },
      {
        id: "step-green-juice-25",
        order: 25,
        title: "Servir",
        detail: "Sirve el jugo verde en los vasos.",
        ingredientIds: [],
        utensilIds: ["utensil-pitcher-green-juice", "utensil-glass-green-juice"]
      }
    ],
    sourceUrl: "https://bonviveur.com/es/recetas/jugo-verde"
  }
];

export const homeRecipeCards = recipeMocks.map((recipe) => ({
  id: recipe.id,
  title: recipe.title,
  description: recipe.promotionalDescription ?? recipe.description,
  difficulty:
    recipe.difficulty === "easy"
      ? "Fácil"
      : recipe.difficulty === "medium"
        ? "Media"
        : "Difícil",
  time: `${(recipe.prepTime ?? 0) + (recipe.cookTime ?? 0)} min`,
  image: recipe.mainImage ?? "",
  category: recipe.categories[0] ?? "Recetas"
}));
