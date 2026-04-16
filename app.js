const stateKey = "collin-recomp-coach-state-v2";

const targets = {
  protein: 165,
  fatLow: 65,
  fatHigh: 75,
  caloriesLow: 2460,
  caloriesHigh: 2560,
  carbsByDayType: {
    strength:     { low: 200, high: 230 },
    conditioning: { low: 170, high: 200 },
    recovery:     { low: 130, high: 170 }
  }
};

const LEGACY_PROGRAM_START = new Date("2026-04-07");

const workoutWeeks = Array.from({ length: 12 }, (_, index) => `week-${index + 1}`);

const proteinOptions = {
  "chicken breast": {
    defaultAmount: 6,
    defaultUnit: "oz",
    cookedOrRaw: "cooked",
    perUnit: {
      oz: { protein: 8.8, carbs: 0, fat: 1.1, calories: 46 },
      grams: { protein: 0.31, carbs: 0, fat: 0.04, calories: 1.65 }
    }
  },
  "chicken thigh": {
    defaultAmount: 6,
    defaultUnit: "oz",
    cookedOrRaw: "cooked",
    perUnit: {
      oz: { protein: 7.2, carbs: 0, fat: 3.2, calories: 60 },
      grams: { protein: 0.25, carbs: 0, fat: 0.11, calories: 2.12 }
    }
  },
  "ground chicken": {
    defaultAmount: 6,
    defaultUnit: "oz",
    cookedOrRaw: "cooked",
    perUnit: {
      oz: { protein: 7, carbs: 0, fat: 2.6, calories: 53 },
      grams: { protein: 0.25, carbs: 0, fat: 0.09, calories: 1.88 }
    }
  },
  "ground beef": {
    defaultAmount: 6,
    defaultUnit: "oz",
    cookedOrRaw: "cooked",
    perUnit: {
      oz: { protein: 6.8, carbs: 0, fat: 5.7, calories: 79 },
      grams: { protein: 0.24, carbs: 0, fat: 0.2, calories: 2.78 }
    }
  },
  ribeye: {
    defaultAmount: 10,
    defaultUnit: "oz",
    cookedOrRaw: "cooked",
    perUnit: {
      oz: { protein: 7, carbs: 0, fat: 8.4, calories: 104 },
      grams: { protein: 0.25, carbs: 0, fat: 0.3, calories: 3.67 }
    }
  },
  "flank steak": {
    defaultAmount: 8,
    defaultUnit: "oz",
    cookedOrRaw: "cooked",
    perUnit: {
      oz: { protein: 7.6, carbs: 0, fat: 3, calories: 61 },
      grams: { protein: 0.27, carbs: 0, fat: 0.11, calories: 2.15 }
    }
  },
  "lean ground turkey": {
    defaultAmount: 6,
    defaultUnit: "oz",
    cookedOrRaw: "cooked",
    perUnit: {
      oz: { protein: 8, carbs: 0, fat: 2.2, calories: 52 },
      grams: { protein: 0.28, carbs: 0, fat: 0.08, calories: 1.83 }
    }
  },
  salmon: {
    defaultAmount: 6,
    defaultUnit: "oz",
    cookedOrRaw: "cooked",
    perUnit: {
      oz: { protein: 6.4, carbs: 0, fat: 3.8, calories: 61 },
      grams: { protein: 0.23, carbs: 0, fat: 0.13, calories: 2.15 }
    }
  },
  cod: {
    defaultAmount: 6,
    defaultUnit: "oz",
    cookedOrRaw: "cooked",
    perUnit: {
      oz: { protein: 6.7, carbs: 0, fat: 0.7, calories: 33 },
      grams: { protein: 0.24, carbs: 0, fat: 0.03, calories: 1.17 }
    }
  },
  eggs: {
    defaultAmount: 3,
    defaultUnit: "count",
    cookedOrRaw: "cooked",
    perUnit: {
      count: { protein: 6, carbs: 0.5, fat: 5, calories: 70 }
    }
  },
  "Greek yogurt": {
    defaultAmount: 1,
    defaultUnit: "count",
    cookedOrRaw: "cooked",
    perUnit: {
      count: { protein: 20, carbs: 8, fat: 0, calories: 120 },
      grams: { protein: 0.1, carbs: 0.04, fat: 0, calories: 0.6 }
    }
  },
  "cottage cheese": {
    defaultAmount: 1,
    defaultUnit: "count",
    cookedOrRaw: "cooked",
    perUnit: {
      count: { protein: 24, carbs: 8, fat: 5, calories: 180 },
      grams: { protein: 0.11, carbs: 0.04, fat: 0.02, calories: 0.82 }
    }
  },
  whey: {
    defaultAmount: 1,
    defaultUnit: "scoops",
    cookedOrRaw: "cooked",
    perUnit: {
      scoops: { protein: 25, carbs: 3, fat: 2, calories: 130 }
    }
  }
};

const carbOptions = {
  "white rice": {
    defaultAmount: 1,
    defaultUnit: "cups",
    perUnit: {
      cups: { protein: 4, carbs: 45, fat: 0, calories: 205 },
      oz: { protein: 0.7, carbs: 8, fat: 0, calories: 36 },
      grams: { protein: 0.03, carbs: 0.28, fat: 0, calories: 1.3 }
    }
  },
  "brown rice": {
    defaultAmount: 1,
    defaultUnit: "cups",
    perUnit: {
      cups: { protein: 5, carbs: 45, fat: 1.8, calories: 218 },
      oz: { protein: 0.9, carbs: 8, fat: 0.3, calories: 39 },
      grams: { protein: 0.04, carbs: 0.28, fat: 0.01, calories: 1.39 }
    }
  },
  potato: {
    defaultAmount: 1,
    defaultUnit: "pieces",
    perUnit: {
      pieces: { protein: 4, carbs: 37, fat: 0, calories: 160 },
      oz: { protein: 0.6, carbs: 8, fat: 0, calories: 35 },
      grams: { protein: 0.02, carbs: 0.17, fat: 0, calories: 0.77 }
    }
  },
  "sweet potato": {
    defaultAmount: 1,
    defaultUnit: "pieces",
    perUnit: {
      pieces: { protein: 4, carbs: 41, fat: 0, calories: 180 },
      oz: { protein: 0.5, carbs: 7, fat: 0, calories: 30 },
      grams: { protein: 0.02, carbs: 0.16, fat: 0, calories: 0.75 }
    }
  },
  quinoa: {
    defaultAmount: 1,
    defaultUnit: "cups",
    perUnit: {
      cups: { protein: 8, carbs: 39, fat: 4, calories: 220 },
      oz: { protein: 1.1, carbs: 6, fat: 0.6, calories: 31 },
      grams: { protein: 0.04, carbs: 0.21, fat: 0.02, calories: 1.2 }
    }
  },
  sourdough: {
    defaultAmount: 2,
    defaultUnit: "pieces",
    perUnit: {
      pieces: { protein: 4, carbs: 28, fat: 1, calories: 140 }
    }
  },
  pretzels: {
    defaultAmount: 1,
    defaultUnit: "pieces",
    perUnit: {
      pieces: { protein: 3, carbs: 23, fat: 1, calories: 110 },
      oz: { protein: 3, carbs: 24, fat: 1, calories: 110 },
      grams: { protein: 0.11, carbs: 0.86, fat: 0.04, calories: 3.9 }
    }
  },
  fruit: {
    defaultAmount: 1,
    defaultUnit: "pieces",
    perUnit: {
      pieces: { protein: 1, carbs: 25, fat: 0, calories: 100 },
      grams: { protein: 0.01, carbs: 0.14, fat: 0, calories: 0.57 }
    }
  },
  oats: {
    defaultAmount: 0.5,
    defaultUnit: "cups",
    perUnit: {
      cups: { protein: 10, carbs: 54, fat: 5, calories: 300 },
      grams: { protein: 0.17, carbs: 0.66, fat: 0.07, calories: 3.89 },
      oz: { protein: 4.8, carbs: 18.7, fat: 2.3, calories: 108 }
    }
  }
};

const veggieOptions = [
  "spinach",
  "broccoli",
  "carrots",
  "cucumber",
  "beets",
  "lettuce",
  "onion",
  "tomato",
  "peppers",
  "greens",
  "mixed vegetables"
];

const micronutrientTargets = {
  fiber: { label: "Fiber", target: 30, unit: "g" },
  potassium: { label: "Potassium", target: 3500, unit: "mg" },
  calcium: { label: "Calcium", target: 1000, unit: "mg" },
  iron: { label: "Iron", target: 8, unit: "mg" },
  omega3: { label: "Omega-3", target: 1600, unit: "mg" },
  vitaminC: { label: "Vitamin C", target: 90, unit: "mg" }
};

const mealCategoryOptions = ["breakfast", "lunch", "dinner", "snack", "drink"];

const FOOD_INDEX = {
  eggs: { unit: "count", protein: 6, fat: 5, carbs: 0.5, calories: 70 },
  "chicken breast": { unit: "oz", protein: 7, fat: 1, carbs: 0, calories: 45 },
  "white rice": { unit: "cup", protein: 4, fat: 0.5, carbs: 45, calories: 205 },
  oats: { unit: "cup", protein: 10, fat: 5, carbs: 55, calories: 300 },
  "greek yogurt": { unit: "cup", protein: 20, fat: 0, carbs: 10, calories: 120 },
  banana: { unit: "each", protein: 1, fat: 0, carbs: 27, calories: 105 }
};

const QUICK_FOOD_PICKS = [
  { id: "pick-chicken-breast", source: "quick", sourceId: "chicken-breast", name: "chicken breast", servingAmount: 4, servingUnit: "oz", servingLabel: "4 oz", servingGrams: 112, calories: 187, protein: 35, carbs: 0, fat: 4, fiber: 0 },
  { id: "pick-chicken-thigh", source: "quick", sourceId: "chicken-thigh", name: "chicken thigh", servingAmount: 4, servingUnit: "oz", servingLabel: "4 oz", servingGrams: 112, calories: 209, protein: 29, carbs: 0, fat: 9, fiber: 0 },
  { id: "pick-eggs", source: "quick", sourceId: "eggs", name: "eggs", servingAmount: 2, servingUnit: "count", servingLabel: "2 eggs", servingGrams: 100, calories: 140, protein: 12, carbs: 1, fat: 10, fiber: 0 },
  { id: "pick-greek-yogurt", source: "quick", sourceId: "greek-yogurt", name: "greek yogurt", servingAmount: 1, servingUnit: "cup", servingLabel: "1 cup", servingGrams: 227, calories: 120, protein: 20, carbs: 8, fat: 0, fiber: 0 },
  { id: "pick-white-rice", source: "quick", sourceId: "white-rice", name: "white rice", servingAmount: 1, servingUnit: "cup", servingLabel: "1 cup", servingGrams: 158, calories: 205, protein: 4, carbs: 45, fat: 1, fiber: 1 },
  { id: "pick-oatmeal", source: "quick", sourceId: "oatmeal", name: "oatmeal", servingAmount: 1, servingUnit: "cup", servingLabel: "1 cup", servingGrams: 234, calories: 150, protein: 6, carbs: 28, fat: 3, fiber: 4 },
  { id: "pick-banana", source: "quick", sourceId: "banana", name: "banana", servingAmount: 1, servingUnit: "each", servingLabel: "1 banana", servingGrams: 118, calories: 105, protein: 1, carbs: 27, fat: 0, fiber: 3 },
  { id: "pick-steak", source: "quick", sourceId: "steak", name: "steak", servingAmount: 6, servingUnit: "oz", servingLabel: "6 oz", servingGrams: 170, calories: 310, protein: 42, carbs: 0, fat: 16, fiber: 0 }
];

const FOOD_AUTOCORRECT_RULES = [
  [/\bspagetti\b/g, "spaghetti"],
  [/\bspghetti\b/g, "spaghetti"],
  [/\bspaghitti\b/g, "spaghetti"],
  [/\bomelett\b/g, "omelet"],
  [/\bomlett\b/g, "omelet"],
  [/\bomelete\b/g, "omelet"],
  [/\bomelette\b/g, "omelet"],
  [/\bavacado\b/g, "avocado"],
  [/\bburitto\b/g, "burrito"],
  [/\bburritoe\b/g, "burrito"],
  [/\bsweet[\s-]?green\b/g, "sweetgreen"],
  [/\bgreek yogart\b/g, "greek yogurt"],
  [/\byogart\b/g, "yogurt"],
  [/\bchedder\b/g, "cheddar"],
  [/\bmozerella\b/g, "mozzarella"],
  [/\bmozarella\b/g, "mozzarella"],
  [/\bcabbagee\b/g, "cabbage"],
  [/\bpotatos\b/g, "potato"],
  [/\bbeens\b/g, "beans"]
];

const INGREDIENT_PRESETS = {
  eggs: { label: "eggs", defaultAmount: 3, defaultUnit: "count", perUnit: { count: { protein: 6, carbs: 0.5, fat: 5, calories: 70, fiber: 0 } } },
  ham: { label: "ham", defaultAmount: 2, defaultUnit: "oz", perUnit: { oz: { protein: 5, carbs: 1, fat: 2, calories: 45, fiber: 0 } } },
  cheese: { label: "cheese", defaultAmount: 1, defaultUnit: "oz", perUnit: { oz: { protein: 7, carbs: 1, fat: 9, calories: 110, fiber: 0 } } },
  avocado: { label: "avocado", defaultAmount: 0.5, defaultUnit: "each", perUnit: { each: { protein: 4, carbs: 18, fat: 30, calories: 320, fiber: 14 } } },
  spinach: { label: "spinach", defaultAmount: 1, defaultUnit: "cup", perUnit: { cup: { protein: 1, carbs: 1, fat: 0, calories: 7, fiber: 1 } } },
  onion: { label: "onion", defaultAmount: 0.25, defaultUnit: "cup", perUnit: { cup: { protein: 1, carbs: 15, fat: 0, calories: 64, fiber: 3 } } },
  peppers: { label: "peppers", defaultAmount: 0.5, defaultUnit: "cup", perUnit: { cup: { protein: 1, carbs: 7, fat: 0, calories: 30, fiber: 2 } } },
  "turkey meatballs": { label: "turkey meatballs", defaultAmount: 6, defaultUnit: "oz", perUnit: { oz: { protein: 7, carbs: 1, fat: 3, calories: 55, fiber: 0 } } },
  "chicken meatballs": { label: "chicken meatballs", defaultAmount: 6, defaultUnit: "oz", perUnit: { oz: { protein: 7, carbs: 1, fat: 2.5, calories: 50, fiber: 0 } } },
  "meat sauce": { label: "meat sauce", defaultAmount: 1, defaultUnit: "cup", perUnit: { cup: { protein: 13, carbs: 13, fat: 8, calories: 190, fiber: 2 } } },
  spaghetti: { label: "spaghetti", defaultAmount: 1.5, defaultUnit: "cup", perUnit: { cup: { protein: 8, carbs: 43, fat: 1.3, calories: 220, fiber: 2.5 } } },
  pasta: { label: "pasta", defaultAmount: 1.5, defaultUnit: "cup", perUnit: { cup: { protein: 8, carbs: 43, fat: 1.3, calories: 220, fiber: 2.5 } } },
  berries: { label: "berries", defaultAmount: 0.5, defaultUnit: "cup", perUnit: { cup: { protein: 1, carbs: 20, fat: 0, calories: 84, fiber: 6 } } },
  granola: { label: "granola", defaultAmount: 0.25, defaultUnit: "cup", perUnit: { cup: { protein: 12, carbs: 80, fat: 20, calories: 560, fiber: 8 } } },
  honey: { label: "honey", defaultAmount: 1, defaultUnit: "tbsp", perUnit: { tbsp: { protein: 0, carbs: 17, fat: 0, calories: 64, fiber: 0 } } }
};

const MEAL_COMPONENTS = [
  { key: "eggs", aliases: ["egg omelett", "egg omelet", "omelett", "omelet", "eggs", "egg"] },
  { key: "ham", aliases: ["ham"] },
  { key: "cheese", aliases: ["cheese", "cheddar", "swiss", "mozzarella", "goat cheese", "feta"] },
  { key: "avocado", aliases: ["avocado"] },
  { key: "spinach", aliases: ["spinach"] },
  { key: "onion", aliases: ["onions", "onion"] },
  { key: "peppers", aliases: ["bell peppers", "peppers", "pepper"] },
  { key: "turkey meatballs", aliases: ["turkey meatballs", "turkey meatball"] },
  { key: "chicken meatballs", aliases: ["chicken meatballs", "chicken meatball"] },
  { key: "spaghetti", aliases: ["spaghetti"] },
  { key: "pasta", aliases: ["pasta"] },
  { key: "meat sauce", aliases: ["meat sauce", "bolognese", "marinara"] }
];

function buildIngredient(ingredient_name, amount, unit, macro_estimate, optional_flag = false, enabled = true) {
  return {
    ingredient_name,
    amount,
    unit,
    macro_estimate,
    optional_flag,
    enabled,
    source: "auto"
  };
}

function applyFoodAutocorrect(value) {
  return FOOD_AUTOCORRECT_RULES.reduce(
    (current, [pattern, replacement]) => current.replace(pattern, replacement),
    String(value || "").toLowerCase()
  );
}

const templateDefinitions = [
  {
    template_id: "omelet-sausage",
    id: "omelet-sausage",
    meal_name: "Omelet + sausage",
    label: "Omelet + sausage",
    meal_category: "breakfast",
    text: "3 egg omelet and 2 turkey sausage patties",
    portion_multiplier: 1,
    proteins: [
      { proteinType: "eggs", proteinAmount: 3, proteinUnit: "count", cookedOrRaw: "cooked" }
    ],
    carbs: [
      { carbType: "sourdough", carbAmount: 1, carbUnit: "pieces" }
    ],
    ingredients: [
      buildIngredient("eggs", 3, "count", { protein: 0, carbs: 0, fat: 0, calories: 0 }),
      buildIngredient("turkey sausage patties", 2, "count", { protein: 16, carbs: 2, fat: 12, calories: 190 }),
      buildIngredient("spinach", 1, "serving", { protein: 1, carbs: 1, fat: 0, calories: 10, fiber: 1 }, true, true),
      buildIngredient("goat cheddar", 1, "serving", { protein: 4, carbs: 0, fat: 6, calories: 70 }, true, false)
    ],
    notes: "Great breakfast anchor. Easy place to move carbs up with sourdough.",
    is_favorite: true,
    last_logged_at: "",
    times_logged: 0,
    veggieServings: 1,
    veggieType: "spinach",
    estimated_macros: { protein: 0, carbs: 0, fat: 0, calories: 0, fiber: 1 }
  },
  {
    template_id: "smoothie",
    id: "smoothie",
    meal_name: "Smoothie",
    label: "Smoothie",
    meal_category: "drink",
    text: "Smoothie with whey, berries, half banana, acai, sprouts",
    portion_multiplier: 1,
    proteins: [
      { proteinType: "whey", proteinAmount: 1, proteinUnit: "scoops", cookedOrRaw: "cooked" }
    ],
    carbs: [
      { carbType: "fruit", carbAmount: 1, carbUnit: "pieces" }
    ],
    ingredients: [
      buildIngredient("mixed berries", 1, "cup", { protein: 1, carbs: 15, fat: 0, calories: 65, fiber: 6 }),
      buildIngredient("acai", 0.5, "packet", { protein: 1, carbs: 6, fat: 3, calories: 70, fiber: 2 }),
      buildIngredient("broccoli sprouts", 1, "serving", { protein: 1, carbs: 2, fat: 0, calories: 10, vitaminC: 12 }, true, true),
      buildIngredient("collagen", 1, "scoop", { protein: 10, carbs: 0, fat: 0, calories: 40 }, true, false)
    ],
    notes: "Training day version can scale to 1.5x or add oats.",
    is_favorite: true,
    last_logged_at: "",
    times_logged: 0,
    veggieServings: 0,
    veggieType: "",
    estimated_macros: { protein: 0, carbs: 0, fat: 0, calories: 0, fiber: 8 }
  },
  {
    template_id: "post-workout",
    id: "post-workout",
    meal_name: "Post workout meal",
    label: "Post workout meal",
    meal_category: "lunch",
    text: "Chicken, rice, curry",
    portion_multiplier: 1,
    proteins: [
      { proteinType: "chicken breast", proteinAmount: 6, proteinUnit: "oz", cookedOrRaw: "cooked" }
    ],
    carbs: [
      { carbType: "white rice", carbAmount: 1, carbUnit: "cups" }
    ],
    ingredients: [
      buildIngredient("curry sauce", 1, "serving", { protein: 2, carbs: 8, fat: 9, calories: 120 }),
      buildIngredient("greens", 1, "serving", { protein: 1, carbs: 3, fat: 0, calories: 15, fiber: 1 }, true, false)
    ],
    notes: "Locked post-workout meal. If performance dips, bring rice up first.",
    is_favorite: true,
    last_logged_at: "",
    times_logged: 0,
    veggieServings: 0,
    veggieType: "",
    estimated_macros: { protein: 0, carbs: 0, fat: 0, calories: 0, fiber: 1 }
  },
  {
    template_id: "greek-yogurt",
    id: "greek-yogurt",
    meal_name: "Greek yogurt",
    label: "Greek yogurt",
    meal_category: "snack",
    text: "Greek yogurt",
    portion_multiplier: 1,
    proteins: [
      { proteinType: "Greek yogurt", proteinAmount: 1, proteinUnit: "count", cookedOrRaw: "cooked" }
    ],
    carbs: [
      { carbType: "fruit", carbAmount: 0, carbUnit: "pieces" }
    ],
    ingredients: [
      buildIngredient("berries", 0.5, "cup", { protein: 0, carbs: 8, fat: 0, calories: 35, fiber: 3 }, true, true),
      buildIngredient("chia seeds", 1, "tbsp", { protein: 2, carbs: 5, fat: 3, calories: 60, fiber: 4 }, true, false)
    ],
    notes: "Easy bridge snack to close the protein gap.",
    is_favorite: true,
    last_logged_at: "",
    times_logged: 0,
    veggieServings: 0,
    veggieType: "",
    estimated_macros: { protein: 0, carbs: 0, fat: 0, calories: 0, fiber: 3 }
  },
  {
    template_id: "flank-steak-salad",
    id: "flank-steak-salad",
    meal_name: "Flank steak salad",
    label: "Flank steak salad",
    meal_category: "dinner",
    text: "Flank steak salad with cucumbers, carrots, lettuce, peanuts, quinoa",
    portion_multiplier: 1,
    proteins: [
      { proteinType: "flank steak", proteinAmount: 8, proteinUnit: "oz", cookedOrRaw: "cooked" }
    ],
    carbs: [
      { carbType: "quinoa", carbAmount: 0.5, carbUnit: "cups" }
    ],
    ingredients: [
      buildIngredient("salad base", 1, "serving", { protein: 3, carbs: 14, fat: 5, calories: 110, fiber: 5 }),
      buildIngredient("peanuts", 1, "serving", { protein: 7, carbs: 6, fat: 14, calories: 170, fiber: 2 }, true, true),
      buildIngredient("avocado", 0.5, "serving", { protein: 1, carbs: 4, fat: 8, calories: 80, fiber: 3 }, true, false)
    ],
    notes: "Looks clean already. Protein portion still matters.",
    is_favorite: false,
    last_logged_at: "",
    times_logged: 0,
    veggieServings: 2,
    veggieType: "greens",
    estimated_macros: { protein: 0, carbs: 0, fat: 0, calories: 0, fiber: 10 }
  },
  {
    template_id: "rge-meal",
    id: "rge-meal",
    meal_name: "RGE meal",
    label: "RGE meal",
    meal_category: "dinner",
    text: "Rachael Good Eats meal",
    portion_multiplier: 1,
    proteins: [
      { proteinType: "chicken breast", proteinAmount: 6, proteinUnit: "oz", cookedOrRaw: "cooked" }
    ],
    carbs: [
      { carbType: "potato", carbAmount: 1, carbUnit: "pieces" }
    ],
    ingredients: [
      buildIngredient("RGE whole-food baseline", 1, "serving", { protein: 0, carbs: 0, fat: 12, calories: 160 }),
      buildIngredient("extra olive oil", 1, "serving", { protein: 0, carbs: 0, fat: 5, calories: 45 }, true, false)
    ],
    notes: "Start from the quality baseline, then confirm protein and carb portions.",
    is_favorite: false,
    last_logged_at: "",
    times_logged: 0,
    veggieServings: 1,
    veggieType: "mixed vegetables",
    estimated_macros: { protein: 0, carbs: 0, fat: 0, calories: 0, fiber: 2 }
  }
];

const baseFoodMatches = [
  { terms: ["turkey sausage"], macros: { protein: 16, carbs: 2, fat: 12, calories: 190 }, label: "2 turkey sausage patties" },
  { terms: ["berries"], macros: { protein: 1, carbs: 15, fat: 0, calories: 65 }, label: "berries" },
  { terms: ["half banana"], macros: { protein: 1, carbs: 14, fat: 0, calories: 55 }, label: "half banana" },
  { terms: ["banana"], macros: { protein: 1, carbs: 27, fat: 0, calories: 105 }, label: "banana" },
  { terms: ["acai"], macros: { protein: 1, carbs: 6, fat: 3, calories: 70 }, label: "half acai packet" },
  { terms: ["sprouts"], macros: { protein: 1, carbs: 2, fat: 0, calories: 10 }, label: "broccoli sprouts" },
  { terms: ["curry"], macros: { protein: 2, carbs: 8, fat: 9, calories: 120 }, label: "curry sauce" },
  { terms: ["salad"], macros: { protein: 3, carbs: 14, fat: 5, calories: 110 }, label: "salad base" },
  { terms: ["avocado"], macros: { protein: 2, carbs: 8, fat: 15, calories: 160 }, label: "avocado" },
  { terms: ["peanuts"], macros: { protein: 7, carbs: 6, fat: 14, calories: 170 }, label: "peanuts" },
  { terms: ["muffin"], macros: { protein: 6, carbs: 48, fat: 16, calories: 360 }, label: "banana chocolate muffin" },
  { terms: ["rachael good eats meal", "rachael good eats", "rge meal"], macros: { protein: 0, carbs: 0, fat: 12, calories: 160 }, label: "RGE whole-food baseline" }
];

function rirTargetForType(exerciseType) {
  if (exerciseType === "isolation") return { min: 0, max: 1, label: "0-1" };
  return { min: 1, max: 2, label: "1-2" };
}

function buildExerciseConfig(name, exerciseType, min, max, defaultSets) {
  return {
    name,
    exercise_type: exerciseType,
    repRange: { min, max, label: `${min}-${max}` },
    defaultSets,
    targetRir: rirTargetForType(exerciseType)
  };
}

const trainingPlan = {
  day1: {
    label: "Day 1 - Push (Chest / Shoulders / Triceps)",
    type: "strength",
    focus: "chest / shoulders / triceps",
    primary_lifts: ["Barbell / DB Bench Press"],
    accessory_lifts: ["Incline DB Press", "OHP DB", "Cable / DB Lateral Raises", "DB Front Raises", "Tricep Rope Pushdowns", "Overhead Tricep Extension"],
    core_block: true,
    exercises: [
      buildExerciseConfig("Barbell / DB Bench Press",     "primary",   6, 8,  4),
      buildExerciseConfig("Incline DB Press",             "secondary", 8, 10, 3),
      buildExerciseConfig("OHP DB Shoulder Press",        "secondary", 8, 10, 3),
      buildExerciseConfig("Cable / DB Lateral Raises",    "isolation", 12, 15, 3),
      buildExerciseConfig("DB Front Raises",              "isolation", 12, 12, 2),
      buildExerciseConfig("Tricep Rope Pushdowns",        "isolation", 10, 12, 3),
      buildExerciseConfig("Overhead Tricep Extension",    "isolation", 10, 15, 2),
      buildExerciseConfig("Weighted Cable Crunch",        "secondary", 10, 15, 3),
      buildExerciseConfig("Hanging Leg Raises",           "secondary", 10, 15, 3)
    ]
  },
  day2: {
    label: "Day 2 - Lower 1 (Squat / Quads)",
    type: "strength",
    focus: "quads / calves",
    primary_lifts: ["Barbell Back Squat"],
    accessory_lifts: ["Bulgarian Split Squat", "Leg Extension", "Leg Curl", "Calf Raises (Leg Press Machine)"],
    core_block: true,
    exercises: [
      buildExerciseConfig("Barbell Back Squat", "primary", 5, 6, 4),
      buildExerciseConfig("Bulgarian Split Squat", "secondary", 8, 8, 3),
      buildExerciseConfig("Leg Extension", "isolation", 10, 10, 4),
      buildExerciseConfig("Leg Curl", "isolation", 10, 10, 4),
      buildExerciseConfig("Calf Raises (Leg Press Machine)", "isolation", 15, 15, 4),
      buildExerciseConfig("Isometric Crunches + Seated Twists", "secondary", 1, 1, 3),
      buildExerciseConfig("Ab Wheel", "secondary", 8, 12, 3)
    ]
  },
  day3: {
    label: "Day 3 - Pull (Back / Biceps)",
    type: "strength",
    focus: "back / biceps",
    primary_lifts: ["Pull-Ups / Lat Pulldown", "Bent Over Barbell Row"],
    accessory_lifts: ["Seated Cable Row", "Face Pulls", "Barbell 21s Ladder", "Cable Curls"],
    core_block: true,
    exercises: [
      buildExerciseConfig("Pull-Ups / Lat Pulldown", "primary", 6, 8, 4),
      buildExerciseConfig("Bent Over Barbell Row", "primary", 8, 8, 4),
      buildExerciseConfig("Seated Cable Row", "secondary", 10, 10, 3),
      buildExerciseConfig("Face Pulls", "isolation", 12, 12, 3),
      buildExerciseConfig("Barbell 21s Ladder", "isolation", 21, 21, 3),
      buildExerciseConfig("Cable Curls", "isolation", 10, 10, 3),
      buildExerciseConfig("Cable Crunch", "secondary", 10, 15, 3),
      buildExerciseConfig("Hanging Leg Raise", "secondary", 10, 15, 3)
    ]
  },
  day4: {
    label: "Day 4 - Recovery / Reset",
    type: "recovery",
    focus: "recovery",
    primary_lifts: [],
    accessory_lifts: ["Walk", "Mobility Reset", "Light cardio"],
    core_block: true,
    exercises: [
      buildExerciseConfig("Walk", "secondary", 1, 1, 1),
      buildExerciseConfig("Mobility Reset", "secondary", 1, 1, 1),
      buildExerciseConfig("Light cardio", "secondary", 1, 1, 1),
      buildExerciseConfig("Cable Crunch", "secondary", 10, 15, 2),
      buildExerciseConfig("Ab Wheel", "secondary", 8, 12, 2)
    ]
  },
  day5: {
    label: "Day 5 - Upper Balance (Delts / Arms)",
    type: "strength",
    focus: "delts / arms",
    primary_lifts: ["OHP DB Shoulder Press", "Chest-supported row"],
    accessory_lifts: ["Incline DB Press", "Cable Chest Flys", "Rear delt fly", "Cable / DB Lateral Raises", "Tricep Rope Pushdowns", "Cable Curls"],
    core_block: true,
    exercises: [
      buildExerciseConfig("OHP DB Shoulder Press",        "primary",   6, 8,  4),
      buildExerciseConfig("Chest-supported row",          "primary",   8, 10, 4),
      buildExerciseConfig("Incline DB Press",             "secondary", 8, 10, 3),
      buildExerciseConfig("Cable Chest Flys",             "isolation", 12, 15, 2),
      buildExerciseConfig("Rear delt fly",                "isolation", 12, 15, 3),
      buildExerciseConfig("Cable / DB Lateral Raises",    "isolation", 12, 15, 3),
      buildExerciseConfig("Tricep Rope Pushdowns",        "isolation", 10, 12, 3),
      buildExerciseConfig("Cable Curls",                  "isolation", 10, 12, 3),
      buildExerciseConfig("Weighted Cable Crunch",        "secondary", 10, 15, 3),
      buildExerciseConfig("Hanging Leg Raises",           "secondary", 10, 15, 2)
    ]
  },
  day6: {
    label: "Day 6 - Conditioning + Core",
    type: "conditioning",
    focus: "conditioning / engine",
    primary_lifts: ["Bike Intervals"],
    accessory_lifts: ["Goblet Squat", "Push-Up", "Row Erg"],
    core_block: true,
    exercises: [
      buildExerciseConfig("Bike Intervals", "primary", 8, 10, 1),
      buildExerciseConfig("Goblet Squat", "secondary", 10, 12, 3),
      buildExerciseConfig("Push-Up", "secondary", 10, 15, 3),
      buildExerciseConfig("Row Erg", "secondary", 10, 12, 1),
      buildExerciseConfig("Cable Crunch", "secondary", 10, 15, 3),
      buildExerciseConfig("Ab Wheel", "secondary", 8, 12, 3)
    ]
  },
  day7: {
    label: "Day 7 - Rest",
    type: "recovery",
    focus: "full reset",
    primary_lifts: [],
    accessory_lifts: ["Walk", "Mobility Reset"],
    core_block: true,
    exercises: [
      buildExerciseConfig("Walk", "secondary", 1, 1, 1),
      buildExerciseConfig("Mobility Reset", "secondary", 1, 1, 1),
      buildExerciseConfig("Decline Sit-Up", "secondary", 10, 15, 2),
      buildExerciseConfig("Hanging Leg Raise", "secondary", 10, 15, 2)
    ]
  },
  day8: {
    label: "Day 8 - Lower 2 (Hinge / Glutes)",
    type: "strength",
    focus: "hamstrings / glutes",
    primary_lifts: ["Romanian Deadlift", "Hip Thrust"],
    accessory_lifts: ["Walking Lunges", "Leg Curl", "Calf Raises (Leg Press Machine)"],
    core_block: true,
    exercises: [
      buildExerciseConfig("Romanian Deadlift",             "primary",   6,  8,  4),
      buildExerciseConfig("Hip Thrust",                    "primary",   8, 10,  4),
      buildExerciseConfig("Walking Lunges",                "secondary", 8,  8,  3),
      buildExerciseConfig("Leg Curl",                      "isolation", 10, 12, 4),
      buildExerciseConfig("Calf Raises (Leg Press Machine)","isolation",15, 15, 4),
      buildExerciseConfig("Isometric Crunches + Seated Twists", "secondary", 1, 1, 3)
    ]
  }
};

const weekSessionSeeds = {};

const exerciseLibrary = [
  "Barbell Back Squat",
  "Leg Extension",
  "Calf Raises (Leg Press Machine)",
  "Isometric Crunches + Seated Twists",
  "Pull-Ups / Lat Pulldown",
  "Bent Over Barbell Row",
  "Seated Cable Row",
  "Barbell 21s Ladder",
  "Cable Curls",
  "Barbell / DB Bench Press",
  "Incline DB Press",
  "OHP DB Shoulder Press",
  "Cable / DB Lateral Raises",
  "DB Front Raises",
  "Cable Chest Flys",
  "Tricep Rope Pushdowns",
  "Overhead Tricep Extension",
  "Weighted Cable Crunch",
  "Hanging Leg Raises",
  "Bench press",
  "Incline dumbbell press",
  "Overhead press",
  "Lateral raises",
  "Cable lateral raises",
  "Cable fly",
  "Machine chest press",
  "Chest-supported row",
  "Pull ups",
  "Lat pulldown",
  "Barbell row",
  "Dumbbell row",
  "Cable row",
  "Face pulls",
  "Hammer curls",
  "Incline curls",
  "EZ-bar curls",
  "Tricep pushdowns",
  "Overhead tricep extensions",
  "Skull crushers",
  "Back squat",
  "Front squat",
  "Hack squat",
  "Bulgarian split squat",
  "Leg press",
  "Romanian Deadlift",
  "Hip Thrust",
  "Walking Lunges",
  "Romanian deadlift",
  "Deadlift",
  "Hip thrust",
  "Walking lunges",
  "Leg curl",
  "Leg extension",
  "Calf raises",
  "Ab wheel",
  "Hanging leg raises",
  "Cable crunch",
  "Plank",
  "Dead bug",
  "Cable pull through",
  "Glute bridge",
  "Step up",
  "Goblet squat",
  "Dips",
  "Machine shoulder press",
  "Rear delt fly",
  "Preacher curl",
  "Seated hamstring curl",
  "Smith incline press",
  "Pickleball",
  "Bike intervals",
  "Treadmill walk",
  "Row erg",
  "Mobility reset",
  "Sauna",
  "Flat dumbbell press",
  "Machine chest press",
  "Pec deck fly",
  "Arnold press",
  "Cable upright row",
  "JM press",
  "Assisted dips",
  "Hack squat",
  "Front squat",
  "Leg press calf raise",
  "Reverse lunge",
  "Single-leg leg press",
  "Chest-supported T-bar row",
  "Single-arm cable row",
  "Straight-arm pulldown",
  "Bayesian curl",
  "Preacher curl machine",
  "Kettlebell swing",
  "Sled push",
  "Farmer carry",
  "Glute ham raise",
  "45-degree back extension",
  "Reverse hyper",
  "Cable wood chop"
];

const dayExercisePools = {
  day1: {
    primary: ["Barbell / DB Bench Press", "Bench press", "Flat dumbbell press"],
    secondary: ["Incline DB Press", "Machine chest press", "Smith incline press", "OHP DB Shoulder Press", "Machine shoulder press", "Overhead press"],
    isolation: ["Cable / DB Lateral Raises", "Cable lateral raises", "Lateral raises", "Cable Chest Flys", "Cable fly", "Pec deck fly", "DB Front Raises", "Arnold press", "Tricep Rope Pushdowns", "Tricep pushdowns", "Overhead Tricep Extension", "Overhead tricep extensions", "JM press", "Skull crushers", "Assisted dips"],
    core: ["Weighted Cable Crunch", "Cable crunch", "Hanging Leg Raises", "Ab wheel", "Cable wood chop", "Dead bug"]
  },
  day2: {
    primary: ["Barbell Back Squat", "Back squat", "Front squat", "Hack squat"],
    secondary: ["Bulgarian Split Squat", "Leg press", "Step up", "Reverse lunge", "Walking Lunges", "Single-leg leg press"],
    isolation: ["Leg Extension", "Leg extension", "Leg Curl", "Seated hamstring curl", "Calf Raises (Leg Press Machine)", "Calf raises", "Leg press calf raise"],
    core: ["Isometric Crunches + Seated Twists", "Ab wheel", "Cable crunch", "Cable wood chop", "Dead bug"]
  },
  day3: {
    primary: ["Pull-Ups / Lat Pulldown", "Pull ups", "Lat pulldown", "Bent Over Barbell Row", "Barbell row", "Chest-supported row", "Chest-supported T-bar row"],
    secondary: ["Seated Cable Row", "Cable row", "Dumbbell row", "Single-arm cable row", "Straight-arm pulldown"],
    isolation: ["Face Pulls", "Rear delt fly", "Barbell 21s Ladder", "Cable Curls", "Hammer curls", "Incline curls", "EZ-bar curls", "Preacher curl", "Preacher curl machine", "Bayesian curl"],
    core: ["Cable Crunch", "Cable crunch", "Hanging Leg Raise", "Hanging Leg Raises", "Ab wheel", "Cable wood chop"]
  },
  day4: {
    primary: ["Walk", "Treadmill walk", "Pickleball"],
    secondary: ["Mobility Reset", "Sauna", "Row Erg"],
    isolation: [],
    core: ["Cable Crunch", "Ab wheel", "Dead bug", "Cable wood chop"]
  },
  day5: {
    primary: ["OHP DB Shoulder Press", "Machine shoulder press", "Overhead press", "Chest-supported row", "Dumbbell row"],
    secondary: ["Incline DB Press", "Machine chest press", "Smith incline press", "Seated Cable Row", "Cable row", "Machine row"],
    isolation: ["Cable Chest Flys", "Cable fly", "Pec deck fly", "Rear delt fly", "Cable / DB Lateral Raises", "Cable lateral raises", "Lateral raises", "Arnold press", "Tricep Rope Pushdowns", "Tricep pushdowns", "Cable Curls", "Hammer curls", "Incline curls", "Overhead Tricep Extension", "Overhead tricep extensions", "JM press", "Skull crushers", "Assisted dips"],
    core: ["Weighted Cable Crunch", "Cable crunch", "Hanging Leg Raises", "Ab wheel", "Cable wood chop"]
  },
  day6: {
    primary: ["Bike Intervals", "Row Erg", "Treadmill walk", "Sled push"],
    secondary: ["Goblet Squat", "Push-Up", "Dips", "Kettlebell swing", "Farmer carry"],
    isolation: [],
    core: ["Cable Crunch", "Ab wheel", "Dead bug", "Cable wood chop"]
  },
  day7: {
    primary: ["Walk", "Treadmill walk", "Pickleball"],
    secondary: ["Mobility Reset", "Sauna"],
    isolation: [],
    core: ["Decline Sit-Up", "Hanging Leg Raise", "Cable wood chop", "Dead bug"]
  },
  day8: {
    primary: ["Romanian Deadlift", "Deadlift", "Hip Thrust", "Hip thrust"],
    secondary: ["Walking Lunges", "Walking lunges", "Reverse lunge", "Step up", "Cable pull through", "Glute bridge", "45-degree back extension", "Reverse hyper"],
    isolation: ["Leg Curl", "Seated hamstring curl", "Calf Raises (Leg Press Machine)", "Calf raises", "Glute ham raise"],
    core: ["Isometric Crunches + Seated Twists", "Cable wood chop", "Ab wheel", "Dead bug"]
  }
};

const exerciseDescriptions = {
  "Romanian Deadlift": "Stand with feet about hip-width and take the bar just outside your thighs with your hands. Start tall with the bar touching the front of your legs, soften the knees slightly, then push your hips straight back while the bar slides down your thighs and shins. Keep your shoulders pulled back, chest proud, and neck neutral. Stop when your hamstrings feel loaded and your back still feels flat, then drive your hips forward to stand. You should feel hamstrings and glutes doing the work, not your lower back.",
  "Deadlift": "Walk up so the bar starts over the middle of your foot, about where your laces tie. Hinge down and grab the bar just outside your legs, then bring your shins to the bar without letting it roll away. Take a big breath, brace your stomach like someone is about to punch you, flatten your back, and pull the slack out of the bar before it leaves the floor. Push the floor away, keep the bar close to your legs, and stand tall without leaning back at the top. Reset before each rep instead of yanking it.",
  "Hip Thrust": "Set your upper back on the bench so the bench edge sits just below the shoulder blades. Place your feet about hip-width so your shins are nearly vertical at the top, and pad the bar so it sits comfortably across the hip crease, not the stomach. Tuck your ribs slightly, brace your core, and drive through your heels until your hips are fully extended. At the top, squeeze your glutes hard for a beat without over-arching your back. Think glutes first, low back second.",
  "Chest-supported row": "Set an incline bench around 30 to 45 degrees or use the chest pad on the row machine. Lie with your chest firmly supported, feet planted wide enough that you feel stable, and let the arms hang long under the shoulders before the first rep. Stay glued to the pad the whole time so this is a supported row, not a standing heave. Row the elbows back toward your hips, pause when the hands reach the lower ribs, then lower under control until the shoulder blades can stretch forward again. If your chest keeps popping off the pad, the weight is too heavy.",
  "Seated cable row": "Sit tall with your feet braced on the platform and knees slightly bent, not locked out. Grab the handle, scoot back until the cable has tension, and stack your ribs over your hips so your torso stays mostly upright instead of swinging. Start each rep by letting the shoulders reach forward a little, then pull the handle toward the lower ribs while driving the elbows back. Pause for a beat with a proud chest, then return slowly without letting the stack slam. Think seated and stable, not rocking backward to create momentum.",
  "One-arm dumbbell row": "Plant one hand and the same-side knee on the bench, with the other foot wide on the floor so your torso feels locked in. Keep your spine long and square your chest to the floor instead of opening up toward the ceiling. Let the dumbbell hang straight down under the shoulder, then pull the elbow back toward the hip pocket while the shoulder blade glides in. Lower all the way to a full stretch before the next rep. If you have to twist your whole body to finish the rep, back the load down.",
  "Lat pulldown": "Sit down and lock your thighs firmly under the pads before you start so the seat holds you in place. Take a grip just outside shoulder width unless the attachment tells you otherwise, lean back only a few degrees, and keep your ribs stacked instead of turning it into a row. Pull the bar or handles toward the upper chest by driving the elbows down and slightly in front of you. Pause briefly, then let the arms straighten all the way overhead under control. You should feel lats and upper back working more than biceps or lower back.",
  "Pull-up": "Grab the bar just outside shoulder width, hang with straight arms, and pull your shoulders down away from your ears before the first rep. Keep legs quiet, ribs down, and think about driving your elbows toward your sides as your chest rises to the bar. At the top, avoid craning your chin; instead bring the upper chest up proudly. Lower all the way to a dead hang under control before starting again. If strict reps are not there yet, use a band or assisted machine and keep the same body position.",
  "Face pull": "Set the cable around upper-chest to face height and use the rope attachment. Step back until the cable has tension, stand tall with a soft bend in the knees, and keep ribs down so the low back stays quiet. Pull the rope toward the bridge of your nose or forehead while letting the hands separate and the elbows travel high and wide. Finish with upper arms around shoulder height and forearms vertical, then return slowly. It should feel like rear delts and upper back, not a shrug.",
  "Rear delt fly": "Set up seated on the pec deck or hinged over with dumbbells so the chest is supported if possible. Keep a soft elbow bend and raise the arms out and slightly back in line with the shoulders, not up into a shrug. Stay long through the neck and let the rear shoulder do the work. Pause briefly at the top, then lower slowly until you feel the rear delt stretch again.",
  "Walking Lunges": "Stand tall and step forward far enough that the front heel stays heavy. Lower with control until the back knee nearly touches, then push through the front foot to bring the back leg through. Keep your torso stacked and your balance quiet. If you wobble a lot, shorten the stride slightly and slow down.",
  "Reverse lunge": "Start tall, step one foot back, and lower straight down instead of pitching forward. Keep most of your weight on the front leg, let the front knee track over the toes, and drive through the front heel to stand. Reverse lunges should feel stable and controlled, not rushed.",
  "Bulgarian split squat": "Stand a couple feet in front of a bench and place the top of your back foot on it. Keep most of your weight on the front leg, let your torso lean slightly forward, and lower straight down so the front knee can travel naturally over the toes while the heel stays planted. Drive up through the whole front foot and keep the hips square. Think long stance, front leg loaded, back leg just helping with balance.",
  "Step up": "Choose a box height that lets you keep the whole working foot planted. Lean slightly forward, push through that full foot, and stand all the way up without bouncing off the trail leg. Lower slowly. The goal is to make the top leg do the work, not turn it into a jump.",
  "Leg Extension": "Set the seat so your knee lines up with the machine pivot and the pad rests just above the front of the ankles. Sit all the way back, grip the handles, and keep your hips pinned to the seat. Extend the knees until the quads are fully shortened without snapping hard into lockout, then lower slowly until the knees bend through a comfortable stretch. Stay seated and still instead of kicking the weight up with momentum.",
  "Cable pull through": "Face away from the cable and hold the rope between your legs. Step out far enough to feel tension, then hinge by reaching your hips back while your spine stays long. Drive your hips through and squeeze the glutes to finish. Keep your arms relaxed and let the hips create the movement.",
  "Glute bridge": "Lie on your back with feet close enough that your heels feel powerful. Brace lightly, tuck your ribs down, and lift your hips until your body forms a straight line from shoulders to knees. Squeeze the glutes at the top and lower under control. If you feel hamstrings more than glutes, bring your feet a touch closer.",
  "45-degree back extension": "Set the pad so you can fold from the hips instead of the stomach. Cross your arms or hug a plate, hinge down while keeping a neutral spine, then lift by squeezing glutes and hamstrings. Stop when your body is in a straight line. Do not whip the torso high and turn it into a low-back swing.",
  "Reverse hyper": "Let your legs hang, brace your torso, and lift your legs by squeezing glutes and hamstrings. Move smoothly, not explosively, and control the return instead of letting the machine swing you. Think of it as a glute-driven lift with a calm torso.",
  "Leg Curl": "Set the machine so the pad sits comfortably against the lower leg and your knees line up with the machine’s pivot. Brace your hips into the pad, curl through a full range, and lower slowly. Try not to let the weight slam down or your hips lift off the seat.",
  "Calf Raises (Leg Press Machine)": "Place the balls of your feet on the platform so your heels can drop into a full stretch. Lower slowly, pause at the bottom, then press through the big toe and second toe to rise. Finish high on the calf without bouncing. Controlled reps beat rushed reps here.",
  "Barbell / DB Bench Press": "Set your eyes under the bar, plant your feet hard, and pull your shoulder blades back and down into the bench. Grip the bar evenly so your wrists stay stacked over your forearms, then unrack and hold the bar over the mid-chest. Lower with control to the lower chest or sternum area, keeping elbows slightly tucked, then press up and slightly back toward the shoulders. Stay tight through your upper back the whole time.",
  "Incline DB Press": "Set the bench to a mild incline and keep your feet planted. Bring the dumbbells down to the upper chest with elbows slightly tucked, then press up and in without clanking them together. Stay stable through your shoulders and keep the rib cage from flaring.",
  "OHP DB Shoulder Press": "Sit or stand tall with the dumbbells starting around shoulder height and forearms vertical. Brace your glutes and abs first so the ribs stay down, keep wrists stacked over elbows, and press up in a smooth path until the biceps finish by the ears. Lower with control back to shoulder level. Avoid turning it into a leaning back chest press.",
  "Cable / DB Lateral Raises": "Start with a soft bend in the elbows and lift out to the side until the hands are about shoulder height. Lead with the elbows, stay smooth, and lower slowly. Think side delts, not shrugging the traps up to the ears.",
  "DB Front Raises": "Stand tall, keep the rib cage down, and raise the dumbbells forward only to shoulder height. Control both directions and avoid swinging. This should feel like a front-delt lift, not a momentum drill.",
  "Tricep Rope Pushdowns": "Pin your elbows near your sides and start with the rope near chest height. Push down until the elbows are fully straight and gently spread the rope at the bottom. Bring it back up with control without letting the elbows drift forward.",
  "Overhead Tricep Extension": "Set the cable or dumbbell so the arms start overhead with elbows pointing mostly forward. Lower behind the head under control, then extend by squeezing the triceps without flaring the ribs. Keep upper arms as still as you can.",
  "Weighted Cable Crunch": "Set the rope at a high pulley and kneel far enough away to create tension. Curl your ribs toward your pelvis instead of just bending at the hips. Exhale as you crunch, then return slowly. Think abs shortening, not just pulling with the arms.",
  "Hanging Leg Raises": "Hang from the bar with your hands just outside shoulder width and actively pull the shoulders down away from the ears. Keep ribs down, brace lightly, and lift the legs by curling the pelvis up, not by just swinging the feet. Control the way down and keep the torso as still as possible. Start with bent knees if strict straight-leg reps are too hard.",
  "Barbell Back Squat": "Set the bar across the upper traps or rear delts, whichever lets you stay tight and pain-free. Grip the bar evenly, squeeze your upper back hard, and take two calm steps back. Set your feet around shoulder width with toes slightly turned out, take a big breath into your stomach, and sit down between your hips while keeping the whole foot planted. Drive up by pushing the floor away and keeping the chest and hips rising together.",
  "Front squat": "Rest the bar on the front of the shoulders, not in the hands, with elbows lifted high. Keep your chest tall, brace hard, and sit straight down while the knees travel forward naturally. Stay balanced over the whole foot and drive up without letting the elbows drop.",
  "Back squat": "Set the bar across the upper traps or rear delts, whichever lets you stay tight and pain-free. Grip the bar evenly, squeeze your upper back hard, and take two calm steps back. Set your feet around shoulder width with toes slightly turned out, take a big breath into your stomach, and sit down between your hips while keeping the whole foot planted. Drive up by pushing the floor away and keeping the chest and hips rising together."
};

const exerciseDescriptionAliases = {
  "bench press": "Barbell / DB Bench Press",
  "flat dumbbell press": "Barbell / DB Bench Press",
  "machine chest press": "Barbell / DB Bench Press",
  "dumbbell bench press": "Barbell / DB Bench Press",
  "smith incline press": "Incline DB Press",
  "incline dumbbell press": "Incline DB Press",
  "overhead press": "OHP DB Shoulder Press",
  "machine shoulder press": "OHP DB Shoulder Press",
  "chest supported row": "Chest-supported row",
  "chest-supported row": "Chest-supported row",
  "incline chest supported row": "Chest-supported row",
  "seal row": "Chest-supported row",
  "machine row": "Chest-supported row",
  "seated cable row": "Seated cable row",
  "cable row": "Seated cable row",
  "single arm cable row": "Seated cable row",
  "one arm dumbbell row": "One-arm dumbbell row",
  "single arm dumbbell row": "One-arm dumbbell row",
  "dumbbell row": "One-arm dumbbell row",
  "lat pulldown": "Lat pulldown",
  "pull down": "Lat pulldown",
  "pullup": "Pull-up",
  "pull up": "Pull-up",
  "pull-up": "Pull-up",
  "assisted pull-up": "Pull-up",
  "chin-up": "Pull-up",
  "face pulls": "Face pull",
  "rear delt fly": "Rear delt fly",
  "rear delt machine": "Rear delt fly",
  "lateral raises": "Cable / DB Lateral Raises",
  "cable lateral raises": "Cable / DB Lateral Raises",
  "tricep pushdowns": "Tricep Rope Pushdowns",
  "overhead tricep extensions": "Overhead Tricep Extension",
  "back squat": "Barbell Back Squat",
  "front squat": "Front squat",
  "walking lunges": "Walking Lunges",
  "hip thrust": "Hip Thrust",
  "romanian deadlift": "Romanian Deadlift",
  "leg extension": "Leg Extension",
  "leg curl": "Leg Curl",
  "seated hamstring curl": "Leg Curl",
  "bulgarian split squat": "Bulgarian split squat",
  "split squat": "Bulgarian split squat",
  "calf raises": "Calf Raises (Leg Press Machine)",
  "cable crunch": "Weighted Cable Crunch",
  "hanging leg raise": "Hanging Leg Raises"
};

function getPatternExerciseHowTo(normalizedName = "") {
  if (!normalizedName) return "";

  if (/(chest supported|supported row|seal row|machine row)/.test(normalizedName)) {
    return exerciseDescriptions["Chest-supported row"];
  }
  if (/(seated cable row|cable row|low row)/.test(normalizedName)) {
    return exerciseDescriptions["Seated cable row"];
  }
  if (/(dumbbell row|one arm row|single arm row)/.test(normalizedName)) {
    return exerciseDescriptions["One-arm dumbbell row"];
  }
  if (/(lat pulldown|pull down)/.test(normalizedName)) {
    return exerciseDescriptions["Lat pulldown"];
  }
  if (/(pullup|pull up|pull-up|chin up|chin-up)/.test(normalizedName)) {
    return exerciseDescriptions["Pull-up"];
  }
  if (/(face pull)/.test(normalizedName)) {
    return exerciseDescriptions["Face pull"];
  }
  if (/(rear delt)/.test(normalizedName)) {
    return exerciseDescriptions["Rear delt fly"];
  }
  if (/(split squat|bulgarian)/.test(normalizedName)) {
    return exerciseDescriptions["Bulgarian split squat"];
  }
  if (/(leg extension)/.test(normalizedName)) {
    return exerciseDescriptions["Leg Extension"];
  }
  if (/(leg curl|hamstring curl)/.test(normalizedName)) {
    return exerciseDescriptions["Leg Curl"];
  }
  if (/(bench|chest press)/.test(normalizedName)) {
    return exerciseDescriptions["Barbell / DB Bench Press"];
  }
  if (/(incline press)/.test(normalizedName)) {
    return exerciseDescriptions["Incline DB Press"];
  }
  if (/(overhead press|shoulder press|ohp)/.test(normalizedName)) {
    return exerciseDescriptions["OHP DB Shoulder Press"];
  }
  if (/(lateral raise)/.test(normalizedName)) {
    return exerciseDescriptions["Cable / DB Lateral Raises"];
  }
  if (/(tricep pushdown|pushdown)/.test(normalizedName)) {
    return exerciseDescriptions["Tricep Rope Pushdowns"];
  }
  if (/(overhead tricep|tricep extension)/.test(normalizedName)) {
    return exerciseDescriptions["Overhead Tricep Extension"];
  }
  if (/(cable crunch|ab crunch)/.test(normalizedName)) {
    return exerciseDescriptions["Weighted Cable Crunch"];
  }
  if (/(leg raise)/.test(normalizedName)) {
    return exerciseDescriptions["Hanging Leg Raises"];
  }

  return "";
}

function getExerciseHowTo(exercise) {
  const name = exercise?.name || "";
  if (exerciseDescriptions[name]) return exerciseDescriptions[name];
  const normalizedName = normalizeQuery(name);
  const aliasName = exerciseDescriptionAliases[normalizedName];
  if (aliasName && exerciseDescriptions[aliasName]) return exerciseDescriptions[aliasName];
  const patternHowTo = getPatternExerciseHowTo(normalizedName);
  if (patternHowTo) return patternHowTo;

  const type = exercise?.exercise_type || inferExerciseTypeFromName(name);
  if (type === "primary") {
    return "Set up carefully before the first rep: get your feet where you can stay balanced, grip the bar or handles evenly, and brace your trunk before the weight moves. Keep the weight path close to your center, stay tight through the torso, and move with control through the full range. On big lifts, positioning, balance, and tension matter more than forcing extra reps.";
  }
  if (type === "isolation") {
    return "Set the machine or implement so the moving joint lines up cleanly with the machine’s pivot or the cable path. Lock in the body position first, then move through a smooth full range and lower slower than you lift. The target muscle should feel the work more than momentum, and the rest of the body should stay quiet.";
  }
  return "Start in a stable position with your feet and hips set before the first rep. Keep your ribs down, own the lowering phase, and make every rep look the same. If the movement feels sloppy, slow it down, shorten the range a little, and rebuild good positioning before you add speed or load.";
}

function getExerciseMuscleGroups(exerciseName = "") {
  const name = String(exerciseName).toLowerCase();
  const groups = [];
  const add = value => {
    if (!groups.includes(value)) groups.push(value);
  };

  if (/(bench|chest press|incline|fly|pec deck|push-up|dip)/.test(name)) add("chest");
  if (/(shoulder|ohp|overhead|lateral|front raise|rear delt|upright row|arnold)/.test(name)) add("shoulders");
  if (/(row|pull-up|pull up|pulldown|lat|face pull|rear delt)/.test(name)) add("back");
  if (/(curl|preacher|bayesian|hammer|21s)/.test(name)) add("biceps");
  if (/(tricep|pushdown|extension|skull crusher|jm press|dip)/.test(name)) add("triceps");
  if (/(squat|leg press|lunge|split squat|step up|leg extension|bike|sled push|goblet)/.test(name)) add("quads");
  if (/(deadlift|rdl|romanian|leg curl|hamstring|glute ham|reverse hyper|back extension)/.test(name)) add("hamstrings");
  if (/(hip thrust|glute|bridge|reverse hyper|pull through|lunge|step up|squat)/.test(name)) add("glutes");
  if (/(calf)/.test(name)) add("calves");
  if (/(crunch|leg raise|ab wheel|dead bug|plank|twist|wood chop)/.test(name)) add("core");
  if (/(walk|sauna|mobility|pickleball|row erg|treadmill)/.test(name)) add("conditioning");

  return groups.length ? groups : ["general"];
}

function summarizeWorkoutCoverage(session) {
  const counts = new Map();
  (session?.exercises || []).forEach(exercise => {
    getExerciseMuscleGroups(exercise.name).forEach(group => {
      counts.set(group, (counts.get(group) || 0) + 1);
    });
  });

  const ordered = [...counts.entries()].sort((left, right) => right[1] - left[1]);
  const topGroups = ordered.slice(0, 4).map(([group]) => group);
  const lowerDay = /lower|hinge|squat/i.test(session?.label || "") || /lower|posterior/i.test(session?.focus || "");
  const upperDay = /upper|push|pull/i.test(session?.label || "") || /chest|back|shoulder/i.test(session?.focus || "");
  const coreCovered = counts.has("core");

  let assessment = "Balanced session";
  if (lowerDay) {
    const lowerCovered = counts.has("quads") || counts.has("hamstrings") || counts.has("glutes");
    assessment = lowerCovered ? "Lower body covered well" : "Lower body coverage looks light";
  } else if (upperDay) {
    const upperCovered = counts.has("chest") || counts.has("back") || counts.has("shoulders");
    assessment = upperCovered ? "Upper body covered well" : "Upper body coverage looks light";
  }
  if (coreCovered) assessment += " • core included";

  return {
    topGroups,
    assessment,
    detail: ordered.length
      ? ordered.map(([group, count]) => `${group} ${count}x`).slice(0, 5).join(" • ")
      : "Coverage builds as you add exercises."
  };
}

function getExerciseMovementPatterns(exerciseName = "") {
  const name = String(exerciseName).toLowerCase();
  const patterns = [];
  const add = value => {
    if (!patterns.includes(value)) patterns.push(value);
  };

  if (/(bench|chest press|fly|push-up|dip)/.test(name)) add("horizontal push");
  if (/(row|cable row|chest supported|face pull)/.test(name)) add("horizontal pull");
  if (/(overhead|shoulder press|ohp|arnold)/.test(name)) add("vertical push");
  if (/(pull-up|pull up|pulldown|lat)/.test(name)) add("vertical pull");
  if (/(squat|leg press|goblet|hack squat|leg extension)/.test(name)) add("squat");
  if (/(deadlift|romanian|rdl|hip thrust|leg curl|pull through|back extension|reverse hyper)/.test(name)) add("hinge");
  if (/(lunge|split squat|step up)/.test(name)) add("single-leg");
  if (/(curl|preacher|hammer|bayesian|21s)/.test(name)) add("biceps");
  if (/(tricep|pushdown|skull crusher|extension|jm press)/.test(name)) add("triceps");
  if (/(calf)/.test(name)) add("calves");
  if (/(crunch|leg raise|ab wheel|dead bug|plank|twist|wood chop)/.test(name)) add("core");
  if (/(bike|row erg|walk|mobility|sauna|light cardio|sled|interval)/.test(name)) add("conditioning");

  return patterns;
}

function getSessionExercisesForCoverage(weekKey, dayKey) {
  const storedSession = appState.workoutSessions?.[weekKey]?.[dayKey];
  if (storedSession?.exercises?.length) return storedSession.exercises;
  if (trainingPlan[dayKey]?.exercises?.length) return trainingPlan[dayKey].exercises;
  return [];
}

function summarizeWeekCoverage(weekKey) {
  const dayKeys = getAvailableSessionIds();
  const muscleCounts = new Map();
  const patternCounts = new Map();

  dayKeys.forEach(dayKey => {
    getSessionExercisesForCoverage(weekKey, dayKey).forEach(exercise => {
      getExerciseMuscleGroups(exercise.name).forEach(group => {
        muscleCounts.set(group, (muscleCounts.get(group) || 0) + 1);
      });
      getExerciseMovementPatterns(exercise.name).forEach(pattern => {
        patternCounts.set(pattern, (patternCounts.get(pattern) || 0) + 1);
      });
    });
  });

  const mustHavePatterns = ["horizontal push", "horizontal pull", "vertical push", "vertical pull", "squat", "hinge", "core"];
  const usefulPatterns = ["single-leg", "biceps", "triceps", "calves", "conditioning"];
  const missingMustHaves = mustHavePatterns.filter(pattern => !patternCounts.has(pattern));
  const missingUseful = usefulPatterns.filter(pattern => !patternCounts.has(pattern));
  const topMuscleGroups = [...muscleCounts.entries()]
    .sort((left, right) => right[1] - left[1])
    .slice(0, 5)
    .map(([group, count]) => `${group} ${count}x`);
  const coveredPatterns = [...patternCounts.keys()];

  let status = "Week looks balanced";
  if (missingMustHaves.length) {
    status = "Week has some gaps";
  } else if (missingUseful.length > 2) {
    status = "Week covers the basics";
  }

  const warningParts = [];
  if (missingMustHaves.length) {
    warningParts.push(`Missing key patterns: ${missingMustHaves.join(", ")}`);
  }
  if (!missingMustHaves.length && missingUseful.length) {
    warningParts.push(`Could still add: ${missingUseful.slice(0, 3).join(", ")}`);
  }

  return {
    status,
    summary: topMuscleGroups.length ? topMuscleGroups.join(" • ") : "Coverage builds as the week fills out.",
    detail: coveredPatterns.length ? coveredPatterns.join(" • ") : "No weekly movement patterns found yet.",
    warnings: warningParts.length ? warningParts.join(" • ") : "All major movement patterns are covered this week."
  };
}

const exerciseVariantPools = {
  "Incline DB Press": [
    buildExerciseConfig("Incline DB Press", "secondary", 8, 10, 3),
    buildExerciseConfig("Machine Chest Press", "secondary", 8, 10, 3),
    buildExerciseConfig("Smith Incline Press", "secondary", 8, 10, 3)
  ],
  "OHP DB Shoulder Press": [
    buildExerciseConfig("OHP DB Shoulder Press", "secondary", 8, 10, 3),
    buildExerciseConfig("Machine shoulder press", "secondary", 8, 10, 3),
    buildExerciseConfig("Overhead press", "secondary", 6, 8, 3)
  ],
  "Cable / DB Lateral Raises": [
    buildExerciseConfig("Cable / DB Lateral Raises", "isolation", 12, 15, 3),
    buildExerciseConfig("Cable lateral raises", "isolation", 12, 15, 3),
    buildExerciseConfig("Lateral raises", "isolation", 12, 15, 3)
  ],
  "DB Front Raises": [
    buildExerciseConfig("DB Front Raises", "isolation", 12, 15, 2),
    buildExerciseConfig("Rear delt fly", "isolation", 12, 15, 3)
  ],
  "Tricep Rope Pushdowns": [
    buildExerciseConfig("Tricep Rope Pushdowns", "isolation", 10, 12, 3),
    buildExerciseConfig("Tricep pushdowns", "isolation", 10, 12, 3),
    buildExerciseConfig("Skull crushers", "isolation", 8, 10, 3)
  ],
  "Overhead Tricep Extension": [
    buildExerciseConfig("Overhead Tricep Extension", "isolation", 10, 15, 2),
    buildExerciseConfig("Overhead tricep extensions", "isolation", 10, 15, 3),
    buildExerciseConfig("Skull crushers", "isolation", 8, 10, 3)
  ],
  "Weighted Cable Crunch": [
    buildExerciseConfig("Weighted Cable Crunch", "secondary", 10, 15, 3),
    buildExerciseConfig("Cable crunch", "secondary", 10, 15, 3),
    buildExerciseConfig("Plank", "secondary", 1, 1, 3)
  ],
  "Hanging Leg Raises": [
    buildExerciseConfig("Hanging Leg Raises", "secondary", 10, 15, 3),
    buildExerciseConfig("Ab wheel", "secondary", 8, 12, 3),
    buildExerciseConfig("Dead bug", "secondary", 10, 12, 3)
  ],
  "Bulgarian Split Squat": [
    buildExerciseConfig("Bulgarian Split Squat", "secondary", 8, 10, 3),
    buildExerciseConfig("Leg press", "secondary", 10, 12, 3),
    buildExerciseConfig("Step up", "secondary", 8, 10, 3)
  ],
  "Leg Extension": [
    buildExerciseConfig("Leg Extension", "isolation", 10, 12, 4),
    buildExerciseConfig("Leg extension", "isolation", 10, 12, 4)
  ],
  "Leg Curl": [
    buildExerciseConfig("Leg Curl", "isolation", 10, 12, 4),
    buildExerciseConfig("Seated hamstring curl", "isolation", 10, 12, 4)
  ],
  "Calf Raises (Leg Press Machine)": [
    buildExerciseConfig("Calf Raises (Leg Press Machine)", "isolation", 12, 15, 4),
    buildExerciseConfig("Calf raises", "isolation", 12, 15, 4)
  ],
  "Pull-Ups / Lat Pulldown": [
    buildExerciseConfig("Pull-Ups / Lat Pulldown", "primary", 6, 8, 4),
    buildExerciseConfig("Pull ups", "primary", 6, 8, 4),
    buildExerciseConfig("Lat pulldown", "primary", 8, 10, 4)
  ],
  "Bent Over Barbell Row": [
    buildExerciseConfig("Bent Over Barbell Row", "primary", 6, 8, 4),
    buildExerciseConfig("Chest-supported row", "primary", 8, 10, 4),
    buildExerciseConfig("Dumbbell row", "primary", 8, 10, 4)
  ],
  "Seated Cable Row": [
    buildExerciseConfig("Seated Cable Row", "secondary", 10, 12, 3),
    buildExerciseConfig("Cable row", "secondary", 10, 12, 3),
    buildExerciseConfig("Chest-supported row", "secondary", 8, 10, 3)
  ],
  "Face Pulls": [
    buildExerciseConfig("Face Pulls", "isolation", 12, 15, 3),
    buildExerciseConfig("Rear delt fly", "isolation", 12, 15, 3)
  ],
  "Barbell 21s Ladder": [
    buildExerciseConfig("Barbell 21s Ladder", "isolation", 21, 21, 3),
    buildExerciseConfig("EZ-bar curls", "isolation", 10, 12, 3),
    buildExerciseConfig("Preacher curl", "isolation", 10, 12, 3)
  ],
  "Cable Curls": [
    buildExerciseConfig("Cable Curls", "isolation", 10, 12, 3),
    buildExerciseConfig("Hammer curls", "isolation", 10, 12, 3),
    buildExerciseConfig("Incline curls", "isolation", 10, 12, 3)
  ],
  "Bike Intervals": [
    buildExerciseConfig("Bike Intervals", "primary", 8, 10, 1),
    buildExerciseConfig("Row Erg", "primary", 8, 10, 1),
    buildExerciseConfig("Treadmill walk", "primary", 10, 15, 1)
  ],
  "Goblet Squat": [
    buildExerciseConfig("Goblet squat", "secondary", 10, 12, 3),
    buildExerciseConfig("Step up", "secondary", 8, 10, 3)
  ],
  "Push-Up": [
    buildExerciseConfig("Push-Up", "secondary", 10, 15, 3),
    buildExerciseConfig("Dips", "secondary", 8, 12, 3)
  ],
  "Romanian Deadlift": [
    buildExerciseConfig("Romanian Deadlift", "primary", 6, 8, 4),
    buildExerciseConfig("Deadlift", "primary", 4, 6, 4),
    buildExerciseConfig("Cable pull through", "secondary", 10, 12, 3)
  ],
  "Hip Thrust": [
    buildExerciseConfig("Hip Thrust", "primary", 8, 10, 4),
    buildExerciseConfig("Glute bridge", "secondary", 10, 12, 3),
    buildExerciseConfig("Hip thrust", "primary", 8, 10, 4)
  ],
  "Walking Lunges": [
    buildExerciseConfig("Walking Lunges", "secondary", 8, 10, 3),
    buildExerciseConfig("Walking lunges", "secondary", 8, 10, 3),
    buildExerciseConfig("Step up", "secondary", 8, 10, 3)
  ],
  "Walk": [
    buildExerciseConfig("Walk", "secondary", 1, 1, 1),
    buildExerciseConfig("Treadmill walk", "secondary", 1, 1, 1),
    buildExerciseConfig("Pickleball", "secondary", 1, 1, 1)
  ],
  "Mobility Reset": [
    buildExerciseConfig("Mobility Reset", "secondary", 1, 1, 1),
    buildExerciseConfig("Sauna", "secondary", 1, 1, 1)
  ]
};

const exerciseTemplateIndex = new Map(
  [
    ...Object.values(trainingPlan).flatMap(plan => plan.exercises || []),
    ...Object.values(exerciseVariantPools).flatMap(pool => pool || [])
  ].map(exercise => [exercise.name, exercise])
);

const defaults = {
  meals: [],
  draftMeal: createEmptyDraftMeal(),
  savedTemplates: createInitialTemplates(),
  learnedMeals: [],
  recentFoods: [],
  favoriteFoods: [],
  userId: "",
  authMode: "local",
  foodSearchState: {
    query: "",
    mode: "home_cooked",
    restaurantName: "",
    menuItem: "",
    status: "idle",
    results: [],
    mealBreakdown: null,
    mealBreakdownDraft: null,
    mealBreakdownReviewOpen: false,
    error: ""
  },
  trainingDay: "day1",
  selectedFoodDateKey: getLocalDateKey(),
  selectedWeek: "week-1",
  workoutSessions: {},
  recoveryLog: {
    energy: 7,
    fullness: "normal",
    hydrated: false,
    sauna: false,
    nightStack: false,
    dailyNote: "",
    completed: false
  }
};

let appState = loadState();
let draftSaveTimer = null;
let activeWorkoutSetInput = null;
let activeTypingTarget = null;
let expandedWorkoutExerciseId = "";
let workoutAddPanelOpen = false;
let workoutAddQuery = "";
let workoutAddInsertMode = "after_current";
let workoutAddSupersetWithCurrent = false;
let pendingWorkoutScrollId = "";
let foodSearchTimer = null;
let foodSearchRequestId = 0;
let foodToastTimer = null;
let lastFoodLogUndo = null;
let workoutRestTimer = { endAt: 0, label: "", seconds: 0 };
let workoutRestTimerHandle = null;
const backendService = window.GainTrainSupabase || null;

function getFoodSearchService() {
  return window.appServices?.foodService || window.GainTrainFoodSearchService || null;
}

const elements = {
  coachHeadline: document.querySelector("#coachHeadline"),
  coachMessage: document.querySelector("#coachMessage"),
  scoreValue: document.querySelector("#scoreValue"),
  scoreRing: document.querySelector(".score-ring"),
  scoreDetails: document.querySelector("#scoreDetails"),
  proteinOutput: document.querySelector("#proteinOutput"),
  carbOutput: document.querySelector("#carbOutput"),
  fatOutput: document.querySelector("#fatOutput"),
  calorieOutput: document.querySelector("#calorieOutput"),
  proteinRemain: document.querySelector("#proteinRemain"),
  carbRemain: document.querySelector("#carbRemain"),
  fatRemain: document.querySelector("#fatRemain"),
  calorieRemain: document.querySelector("#calorieRemain"),
  scoreLabel: document.querySelector("#scoreLabel"),
  dayType: document.querySelector("#dayType"),
  veggieCount: document.querySelector("#veggieCount"),
  proteinBar: document.querySelector("#proteinBar"),
  carbBar: document.querySelector("#carbBar"),
  fatBar: document.querySelector("#fatBar"),
  calorieBar: document.querySelector("#calorieBar"),
  proteinText: document.querySelector("#proteinText"),
  carbText: document.querySelector("#carbText"),
  fatText: document.querySelector("#fatText"),
  calorieText: document.querySelector("#calorieText"),
  foodSearchInput: document.querySelector("#foodSearchInput"),
  eatShortcutBar: document.querySelector("#eatShortcutBar"),
  restaurantSearchGrid: document.querySelector("#restaurantSearchGrid"),
  restaurantSearchInput: document.querySelector("#restaurantSearchInput"),
  restaurantItemInput: document.querySelector("#restaurantItemInput"),
  foodSearchModeToggle: document.querySelector("#foodSearchModeToggle"),
  eatSecondaryShell: document.querySelector("#eatSecondaryShell"),
  mealEntry: document.querySelector("#mealEntry"),
  mealList: document.querySelector("#mealList"),
  mealRefine: document.querySelector("#mealRefine"),
  foodSearchResults: document.querySelector("#foodSearchResults"),
  foodSearchToast: document.querySelector("#foodSearchToast"),
  microList: document.querySelector("#microList"),
  templateList: document.querySelector("#templateList"),
  templateStatus: document.querySelector("#templateStatus"),
  latestMealBreakdown: document.querySelector("#latestMealBreakdown"),
  recentMeals: document.querySelector("#recentMeals"),
  repeatActions: document.querySelector("#repeatActions"),
  todaySummaryStatus: document.querySelector("#todaySummaryStatus"),
  foodDayPrev: document.querySelector("#foodDayPrev"),
  foodDayLabel: document.querySelector("#foodDayLabel"),
  foodDayNext: document.querySelector("#foodDayNext"),
  todayMealCount: document.querySelector("#todayMealCount"),
  todayMealNote: document.querySelector("#todayMealNote"),
  todayEmptyNote: document.querySelector("#todayEmptyNote"),
  todayProteinNote: document.querySelector("#todayProteinNote"),
  todayCalorieNote: document.querySelector("#todayCalorieNote"),
  saveMealTemplate: document.querySelector("#saveMealTemplate"),
  saveTemplateDefaults: document.querySelector("#saveTemplateDefaults"),
  trainingDay: document.querySelector("#trainingDay"),
  workoutWeek: document.querySelector("#workoutWeek"),
  trainingPill: document.querySelector("#trainingPill"),
  sessionPills: document.querySelector("#sessionPills"),
  sessionExplainer: document.querySelector("#sessionExplainer"),
  weekPills: document.querySelector("#weekPills"),
  workoutSnapshot: document.querySelector("#workoutSnapshot"),
  workoutList: document.querySelector("#workoutList"),
  workoutSummary: document.querySelector("#workoutSummary"),
  workoutHistory: document.querySelector("#workoutHistory"),
  insightList: document.querySelector("#insightList"),
  energy: document.querySelector("#energy"),
  energyValue: document.querySelector("#energyValue"),
  fullness: document.querySelector("#fullness"),
  hydrated: document.querySelector("#hydrated"),
  sauna: document.querySelector("#sauna"),
  nightStack: document.querySelector("#nightStack"),
  dailyNote: document.querySelector("#dailyNote"),
  savedNote: document.querySelector("#savedNote"),
  weddingCountdown: document.querySelector("#weddingCountdown")
};
elements.authStatus = document.querySelector("#authStatus");

function createEmptyDraftMeal() {
  return {
    editingMealId: "",
    editingLoggedAt: "",
    text: "",
    templateId: "",
    mealName: "",
    mealCategory: "breakfast",
    notes: "",
    portionMultiplier: 1,
    quickAdd: null,
    showAdvanced: false,
    ingredients: [],
    proteins: [createEmptyProteinEntry()],
    carbs: [createEmptyCarbEntry()],
    veggieServings: 0,
    veggieType: ""
  };
}

function normalizeLearnedMeals(items) {
  if (!Array.isArray(items)) return [];
  return items
    .map(item => ({
      id: String(item.id || createAppId("learned-meal")),
      query: String(item.query || "").trim(),
      normalizedQuery: normalizeMealSearchText(item.normalizedQuery || item.query || ""),
      label: String(item.label || item.query || "Learned meal").trim(),
      items: Array.isArray(item.items) ? item.items.map(food => ({ ...food })) : [],
      createdAt: item.createdAt || new Date().toISOString()
    }))
    .filter(item => item.normalizedQuery && item.items.length);
}

function createEmptyProteinEntry() {
  return {
    proteinType: "",
    proteinAmount: "",
    proteinUnit: "oz",
    cookedOrRaw: "cooked"
  };
}

function createEmptyCarbEntry() {
  return {
    carbType: "",
    carbAmount: "",
    carbUnit: "cups"
  };
}

function cloneData(value) {
  return JSON.parse(JSON.stringify(value));
}

function createAppId(prefix) {
  return window.crypto?.randomUUID?.() || `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function renderAuthStatus() {
  if (!elements.authStatus) return;
  const mode = appState.authMode || "local";
  if (mode === "authenticated") {
    elements.authStatus.textContent = "Signed in";
    elements.authStatus.classList.add("is-live");
    return;
  }
  if (mode === "anonymous") {
    elements.authStatus.textContent = "Sync on";
    elements.authStatus.classList.add("is-live");
    return;
  }
  elements.authStatus.textContent = backendService?.isConfigured?.()
    ? "Local fallback"
    : "Local mode";
  elements.authStatus.classList.remove("is-live");
}

function createInitialTemplates() {
  return templateDefinitions.map(template => normalizeTemplate(template));
}

function currentTrainingDay() {
  const keys = ["day7", "day1", "day2", "day3", "day4", "day5", "day6"];
  return keys[new Date().getDay()];
}

function getProgramStartDate() {
  const stored = String(appState.programStartDate || "").trim();
  if (stored) {
    const parsed = new Date(stored);
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }
  return new Date(LEGACY_PROGRAM_START);
}

function currentWeekKey() {
  const now   = new Date();
  const start = getProgramStartDate();
  start.setHours(0, 0, 0, 0);
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  const diffDays = Math.floor((today - start) / 86400000);
  const weekNum  = Math.max(1, Math.min(12, Math.floor(diffDays / 7) + 1));
  return `week-${weekNum}`;
}

function getCurrentWeekNumber() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = getProgramStartDate();
  start.setHours(0, 0, 0, 0);
  const diffDays = Math.floor((today - start) / 86400000);
  return Math.max(1, Math.min(12, Math.floor(diffDays / 7) + 1));
}

function getSessionDisplayLabel(dayKey) {
  const labelMap = {
    day1: "Push",
    day2: "Lower 1",
    day3: "Pull",
    day4: "Rest / Active Recovery",
    day5: "Upper Balance",
    day6: "Conditioning",
    day7: "Rest",
    day8: "Lower 2"
  };
  return labelMap[dayKey] || trainingPlan[dayKey]?.label || "Workout";
}

function getCompletedSetCount(exercise) {
  return (exercise?.sets || []).filter(set => {
    const reps = Number(set?.reps || 0);
    const weight = getNumericWeight(set?.weight);
    return reps > 0 || weight > 0 || String(set?.weight || "").trim() !== "";
  }).length;
}

function getBestSetSummaryText(exercise) {
  const best = getBestSet(exercise);
  return best ? formatBestSet(best) : "No best set yet";
}

function queueWorkoutScroll(exerciseId) {
  pendingWorkoutScrollId = exerciseId || "";
}

function scrollWorkoutCardIntoView(exerciseId) {
  if (!exerciseId || !elements.workoutList) return;
  const card = elements.workoutList.querySelector(`[data-exercise-card-id="${exerciseId}"]`);
  if (!card) return;
  card.scrollIntoView({ behavior: "smooth", block: "start" });
}

function getNextUnfinishedExercise(session, currentExerciseId = "") {
  const exercises = session?.exercises || [];
  const currentIndex = exercises.findIndex(exercise => exercise.id === currentExerciseId);
  if (currentIndex >= 0) {
    for (let index = currentIndex + 1; index < exercises.length; index += 1) {
      if (!exercises[index].completed) return exercises[index];
    }
  }
  return exercises.find(exercise => !exercise.completed) || null;
}

function syncActiveWorkoutExercise(session) {
  const exercises = session?.exercises || [];
  if (!exercises.length) {
    expandedWorkoutExerciseId = "";
    return "";
  }
  const current = exercises.find(exercise => exercise.id === expandedWorkoutExerciseId);
  if (current && !current.completed) return current.id;
  const next = getNextUnfinishedExercise(session, current?.id || "");
  expandedWorkoutExerciseId = next?.id || "__none";
  return expandedWorkoutExerciseId;
}

function createSupersetGroupId() {
  return `superset-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function getSupersetDisplayMap(exercises) {
  const orderedIds = [];
  (exercises || []).forEach(exercise => {
    if (exercise.supersetGroupId && !orderedIds.includes(exercise.supersetGroupId)) {
      orderedIds.push(exercise.supersetGroupId);
    }
  });
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return new Map(orderedIds.map((groupId, index) => [groupId, alphabet[index] || `S${index + 1}`]));
}

function buildWorkoutRenderGroups(exercises) {
  const groups = [];
  (exercises || []).forEach(exercise => {
    const lastGroup = groups[groups.length - 1];
    if (exercise.supersetGroupId && lastGroup?.groupId === exercise.supersetGroupId) {
      lastGroup.exercises.push(exercise);
      return;
    }
    groups.push({
      groupId: exercise.supersetGroupId || "",
      exercises: [exercise]
    });
  });
  return groups;
}

function getWorkoutExecutionCoaching(exercise, suggestion) {
  const completedSets = (exercise?.sets || []).filter(set => getCompletedSetCount({ sets: [set] }) > 0);
  const latestSet = completedSets[completedSets.length - 1];
  const min = parseBottomOfRange(exercise.repRange);
  const max = parseTopOfRange(exercise.repRange);
  const target = exercise.targetRir || rirTargetForType(exercise.exercise_type || "secondary");

  if (!latestSet) {
    return {
      tone: "neutral",
      text: `Open with ${suggestion.suggested_weight_text} x ${suggestion.suggested_reps_target} and adjust after the first clean set.`
    };
  }

  const reps = Number(latestSet.reps || 0);
  const weight = getNumericWeight(latestSet.weight);
  const rir = latestSet.rir === "" ? null : Number(latestSet.rir);

  if (Number.isFinite(rir)) {
    if (rir > target.max) {
      return { tone: "push", text: "That looked comfortable. Increase weight next set." };
    }
    if (rir < target.min) {
      return { tone: "pullback", text: "That was close to the limit. Stay here or reduce weight slightly." };
    }
  }

  if (reps >= max && weight >= Number(suggestion.suggested_weight || 0)) {
    return { tone: "push", text: "Top of the range. Increase weight next set." };
  }
  if (reps >= min && reps < max) {
    return { tone: "steady", text: "Stay here and own the next set." };
  }
  if (reps > 0 && reps < min) {
    return { tone: "pullback", text: "Below target. Reduce weight slightly or match the reps cleanly." };
  }
  return { tone: "neutral", text: "Move with control and keep the next set crisp." };
}

function filterExerciseLibrary(query, dayKey) {
  const normalizedQuery = normalizeQuery(query);
  const dayScoped = getDayExerciseOptions(dayKey, "secondary");
  const scopedLibrary = [...dayScoped, ...exerciseLibrary].filter((name, index, list) => list.indexOf(name) === index);
  if (!normalizedQuery) return scopedLibrary.slice(0, 12);
  const tokenized = normalizedQuery.split(/\s+/).filter(Boolean);
  return scopedLibrary
    .map(name => {
      const normalizedName = normalizeQuery(name);
      const exactPrefix = normalizedName.startsWith(normalizedQuery) ? 5 : 0;
      const contains = normalizedName.includes(normalizedQuery) ? 3 : 0;
      const tokenScore = tokenized.reduce((score, token) => score + (normalizedName.includes(token) ? 1 : 0), 0);
      return { name, score: exactPrefix + contains + tokenScore };
    })
    .filter(item => item.score > 0)
    .sort((left, right) => right.score - left.score || left.name.localeCompare(right.name))
    .slice(0, 12)
    .map(item => item.name);
}

function renderWorkoutAddResultsMarkup(query, dayKey) {
  const suggestions = filterExerciseLibrary(query, dayKey);
  return suggestions.length
    ? suggestions.map(name => `<button class="workout-add-option" type="button" data-add-exercise="${name}">${name}</button>`).join("")
    : `<p class="saved-note">No matches yet. Try a shorter search.</p>`;
}

function getSessionExplainer(dayKey) {
  const explainerMap = {
    day1: {
      title: "Push",
      summary: "Chest, shoulders, triceps",
      note: "Heavy pressing plus delt and lockout work."
    },
    day2: {
      title: "Lower 1",
      summary: "Quads, calves, core",
      note: "Squat pattern and knee-dominant leg work."
    },
    day3: {
      title: "Pull",
      summary: "Back, biceps, core",
      note: "Rows, pulldowns, and upper-back support."
    },
    day5: {
      title: "Upper Balance",
      summary: "Delts, upper back, arms",
      note: "Balances the week with shoulder and arm volume."
    },
    day6: {
      title: "Conditioning",
      summary: "Engine, core, work capacity",
      note: "Keeps fitness and recovery moving together."
    },
    day8: {
      title: "Lower 2",
      summary: "Hamstrings, glutes, calves",
      note: "Hinge pattern and posterior-chain emphasis."
    }
  };
  return explainerMap[dayKey] || {
    title: getSessionDisplayLabel(dayKey),
    summary: "Balanced session",
    note: "Covers the main movement patterns for the day."
  };
}

function formatWeekLabel(weekKey) {
  return weekKey.replace("week-", "Week ");
}

function getKnownWeekKeys() {
  const stored = Object.keys(appState.workoutSessions || {});
  return [...new Set([...workoutWeeks, ...stored])]
    .sort((left, right) => Number(left.replace("week-", "")) - Number(right.replace("week-", "")));
}

function loadState() {
  const saved = localStorage.getItem(stateKey);
  if (!saved) return cloneData(defaults);

  try {
    return { ...cloneData(defaults), ...JSON.parse(saved) };
  } catch {
    return cloneData(defaults);
  }
}

function normalizeFoodMemoryItems(items) {
  if (!Array.isArray(items)) return [];
  return items.map(item => ({
    id: String(item.id || item.external_food_id || createAppId("food-memory")),
    source: item.source || "local",
    external_food_id: String(item.external_food_id || item.food_id || item.id || item.food_name || ""),
    food_name: item.food_name || item.name || "",
    brand: item.brand || "",
    default_serving_json: item.default_serving_json || item.defaultServing || {},
    last_used_at: item.last_used_at || "",
    times_used: Number(item.times_used || 0)
  }));
}

function ensureWorkoutEntityIds() {
  Object.entries(appState.workoutSessions || {}).forEach(([weekKey, weekSessions]) => {
    Object.entries(weekSessions || {}).forEach(([dayKey, session]) => {
      session.id = String(session.id || `session-${weekKey}-${dayKey}`);
      session.dayKey = session.dayKey || dayKey;
      session.weekKey = session.weekKey || weekKey;
      session.exercises = (session.exercises || []).map((exercise, exerciseIndex) =>
        normalizeWorkoutExercise(session, exercise, exerciseIndex)
      );
    });
  });
}

function inferExerciseTypeFromName(name = "") {
  const template = getExerciseTemplate(name);
  if (template?.exercise_type) return template.exercise_type;
  const lower = String(name).toLowerCase();
  if (/(squat|deadlift|press|row|pull-up|pulldown|hip thrust|sled push)/.test(lower)) return "primary";
  if (/(curl|raise|fly|pushdown|extension|rear delt|lateral|preacher|calf|leg curl|leg extension)/.test(lower)) return "isolation";
  return "secondary";
}

function normalizeWorkoutExercise(session, exercise, exerciseIndex) {
  const safeExercise = exercise || {};
  const inferredType = safeExercise.exercise_type || inferExerciseTypeFromName(safeExercise.name);
  const template = getExerciseTemplate(safeExercise.name, buildExerciseConfig(
    safeExercise.name || `Exercise ${exerciseIndex + 1}`,
    inferredType,
    8,
    12,
    3
  ));
  const repRange = safeExercise.repRange && typeof safeExercise.repRange === "object"
    ? {
        min: Number(safeExercise.repRange.min || template?.repRange?.min || 8),
        max: Number(safeExercise.repRange.max || template?.repRange?.max || 12),
        label: safeExercise.repRange.label || template?.repRange?.label || `${safeExercise.repRange.min || 8}-${safeExercise.repRange.max || 12}`
      }
    : template?.repRange || { min: 8, max: 12, label: "8-12" };
  const setCount = Math.max(
    1,
    Number(safeExercise.sets?.length || template?.defaultSets || 3)
  );

  return {
    ...safeExercise,
    id: String(safeExercise.id || `${session.id}-exercise-${exerciseIndex}`),
    name: safeExercise.name || template?.name || `Exercise ${exerciseIndex + 1}`,
    exercise_type: inferredType,
    adHoc: Boolean(safeExercise.adHoc),
    supersetGroupId: String(safeExercise.supersetGroupId || ""),
    repRange,
    targetRir: safeExercise.targetRir || template?.targetRir || rirTargetForType(inferredType),
    completed: Boolean(safeExercise.completed),
    sets: Array.from({ length: setCount }, (_, setIndex) => {
      const set = safeExercise.sets?.[setIndex] || {};
      return {
        ...set,
        id: String(set.id || `${session.id}-exercise-${exerciseIndex}-set-${setIndex}`),
        reps: set.reps ?? "",
        weight: set.weight ?? "",
        rir: set.rir ?? ""
      };
    })
  };
}

function mergeById(localItems, remoteItems, keySelector) {
  const map = new Map();
  (localItems || []).forEach(item => map.set(keySelector(item), item));
  (remoteItems || []).forEach(item => map.set(keySelector(item), item));
  return [...map.values()];
}

function mergeRemoteState(remoteState) {
  if (!remoteState) return;
  appState.userId = remoteState.userId || appState.userId;
  appState.meals = mergeById(appState.meals || [], remoteState.meals || [], item => String(item.id));
  appState.savedTemplates = mergeById(appState.savedTemplates || [], remoteState.savedTemplates || [], item => String(item.template_id || item.id));
  appState.recentFoods = mergeById(appState.recentFoods || [], remoteState.recentFoods || [], item => String(item.id));
  appState.favoriteFoods = mergeById(appState.favoriteFoods || [], remoteState.favoriteFoods || [], item => String(item.id));
  Object.entries(remoteState.workoutSessions || {}).forEach(([weekKey, sessions]) => {
    appState.workoutSessions[weekKey] = {
      ...(appState.workoutSessions[weekKey] || {}),
      ...sessions
    };
  });
}

function hydrateState() {
  appState.userId = appState.userId || backendService?.getOrCreateUserId?.() || createAppId("profile");
  appState.authMode = appState.authMode || backendService?.getStoredAuthMode?.() || "local";
  appState.draftMeal = { ...createEmptyDraftMeal(), ...(appState.draftMeal || {}) };
  appState.draftMeal.templateId = appState.draftMeal.templateId || "";
  appState.draftMeal.mealName = appState.draftMeal.mealName || "";
  appState.draftMeal.mealCategory = appState.draftMeal.mealCategory || "breakfast";
  appState.draftMeal.notes = appState.draftMeal.notes || "";
  appState.draftMeal.quickAdd = appState.draftMeal.quickAdd || null;
  appState.draftMeal.showAdvanced = Boolean(appState.draftMeal.showAdvanced);
  appState.draftMeal.portionMultiplier = Number(appState.draftMeal.portionMultiplier || 1);
  appState.draftMeal.ingredients = normalizeIngredients(appState.draftMeal.ingredients || []);
  appState.draftMeal.proteins = normalizeProteinEntries(appState.draftMeal);
  appState.draftMeal.carbs = normalizeCarbEntries(appState.draftMeal);
  appState.draftMeal.veggieServings = Number(appState.draftMeal.veggieServings || 0);
  appState.draftMeal.veggieType = appState.draftMeal.veggieType || "";
  appState.foodSearchState = {
    query: "",
    mode: "home_cooked",
    restaurantName: "",
    menuItem: "",
    selectedFood: null,
    selectedPortionPreset: "serving",
    selectedCustomAmount: "",
    selectedCustomUnit: "",
    status: "idle",
    results: [],
    mealBreakdown: null,
    mealBreakdownDraft: null,
    mealBreakdownReviewOpen: false,
    error: "",
    ...(appState.foodSearchState || {})
  };
  appState.foodSearchState.query = "";
  appState.foodSearchState.restaurantName = "";
  appState.foodSearchState.menuItem = "";
  appState.foodSearchState.status = "idle";
  appState.foodSearchState.results = [];
  appState.foodSearchState.mealBreakdown = null;
  appState.foodSearchState.mealBreakdownDraft = null;
  appState.foodSearchState.mealBreakdownReviewOpen = false;
  appState.foodSearchState.error = "";
  appState.foodSearchState.selectedFood = null;
  appState.foodSearchState.selectedPortionPreset = "serving";
  appState.foodSearchState.selectedCustomAmount = "";
  appState.foodSearchState.selectedCustomUnit = "";
  if (!["home_cooked", "eating_out"].includes(appState.foodSearchState.mode)) {
    appState.foodSearchState.mode = "home_cooked";
  }
  const hasExistingProgramData = Boolean(
    Object.keys(appState.workoutSessions || {}).length ||
    (appState.meals || []).length
  );
  appState.programStartDate = String(
    appState.programStartDate ||
    (hasExistingProgramData ? getLocalDateKey(LEGACY_PROGRAM_START) : getLocalDateKey())
  );
  appState.selectedFoodDateKey = String(appState.selectedFoodDateKey || getLocalDateKey());
  if (appState.selectedFoodDateKey > getLocalDateKey()) {
    appState.selectedFoodDateKey = getLocalDateKey();
  }
  appState.savedTemplates = mergeTemplates(appState.savedTemplates || []);
  appState.learnedMeals = normalizeLearnedMeals(appState.learnedMeals || []);
  appState.recentFoods = normalizeFoodMemoryItems(appState.recentFoods || []);
  appState.favoriteFoods = normalizeFoodMemoryItems(appState.favoriteFoods || []);
  appState.workoutSessions = appState.workoutSessions || {};
  if (!appState.trainingDay) {
    appState.trainingDay = "day1";
  }
  if (!appState.selectedWeek) {
    appState.selectedWeek = "week-1";
  }
  appState.selectedWeek = appState.selectedWeek || currentWeekKey();
  appState.recoveryLog = { ...defaults.recoveryLog, ...(appState.recoveryLog || {}) };
  appState.meals = (appState.meals || []).map(meal => ({
    ...meal,
    id: String(meal.id || createAppId("meal")),
    loggedAt: meal.loggedAt || new Date().toISOString(),
    meal_name: meal.meal_name || meal.text,
    meal_category: meal.meal_category || "meal",
    portion_multiplier: Number(meal.portion_multiplier || 1),
    notes: meal.notes || "",
    templateId: meal.templateId || meal.template_id || "",
    structured: {
      ...meal.structured,
      ingredients: normalizeIngredients((meal.structured || {}).ingredients || []),
      proteins: normalizeProteinEntries(meal.structured || {}),
      carbs: normalizeCarbEntries(meal.structured || {}),
      veggieServings: Number((meal.structured || {}).veggieServings || 0),
      veggieType: (meal.structured || {}).veggieType || ""
    }
  }));
  migrateLegacyWorkoutSessions();
  ensureTwelveWeekScaffold();
  ensureWorkoutEntityIds();
  normalizeWorkoutSelections();
}

function mergeTemplates(savedTemplates) {
  const definitionIds = new Set(templateDefinitions.map(template => template.template_id || template.id));
  const byId = new Map(savedTemplates.map(template => [template.template_id || template.id, template]));
  const mergedDefinitions = templateDefinitions.map(template => {
    const merged = { ...template, ...(byId.get(template.template_id || template.id) || {}) };
    return normalizeTemplate(merged);
  });
  const customTemplates = savedTemplates
    .filter(template => !definitionIds.has(template.template_id || template.id))
    .map(template => normalizeTemplate(template));
  return [...mergedDefinitions, ...customTemplates];
}

function normalizeIngredients(ingredients) {
  if (!Array.isArray(ingredients)) return [];
  return ingredients.map(ingredient => ({
    ingredient_name: ingredient.ingredient_name || ingredient.name || "",
    amount: ingredient.amount ?? "",
    unit: ingredient.unit || "serving",
    macro_estimate: {
      protein: Number(ingredient.macro_estimate?.protein || 0),
      carbs: Number(ingredient.macro_estimate?.carbs || 0),
      fat: Number(ingredient.macro_estimate?.fat || 0),
      calories: Number(ingredient.macro_estimate?.calories || 0),
      fiber: Number(ingredient.macro_estimate?.fiber || 0),
      potassium: Number(ingredient.macro_estimate?.potassium || 0),
      calcium: Number(ingredient.macro_estimate?.calcium || 0),
      iron: Number(ingredient.macro_estimate?.iron || 0),
      omega3: Number(ingredient.macro_estimate?.omega3 || 0),
      vitaminC: Number(ingredient.macro_estimate?.vitaminC || 0)
    },
    optional_flag: Boolean(ingredient.optional_flag),
    enabled: typeof ingredient.enabled === "boolean" ? ingredient.enabled : true,
    source: ingredient.source === "manual"
      ? "manual"
      : (resolveIngredientFoodKey(ingredient.ingredient_name || ingredient.name || "") ? "auto" : "manual")
  }));
}

function normalizeTemplate(template) {
  const generatedId = template.template_id || template.id || `template-${Date.now()}`;
  const normalized = {
    ...template,
    template_id: generatedId,
    id: generatedId,
    meal_name: template.meal_name || template.label || template.text || "Saved meal",
    label: template.label || template.meal_name || template.text || "Saved meal",
    meal_category: template.meal_category || "breakfast",
    portion_multiplier: Number(template.portion_multiplier || 1),
    notes: template.notes || "",
    is_favorite: Boolean(template.is_favorite),
    last_logged_at: template.last_logged_at || "",
    times_logged: Number(template.times_logged || 0),
    estimated_macros: {
      protein: Number(template.estimated_macros?.protein || 0),
      carbs: Number(template.estimated_macros?.carbs || 0),
      fat: Number(template.estimated_macros?.fat || 0),
      calories: Number(template.estimated_macros?.calories || 0),
      fiber: Number(template.estimated_macros?.fiber || 0)
    }
  };
  normalized.ingredients = normalizeIngredients(template.ingredients || []);
  normalized.proteins = normalizeProteinEntries(normalized);
  normalized.carbs = normalizeCarbEntries(normalized);
  normalized.veggieServings = Number(normalized.veggieServings || 0);
  normalized.veggieType = normalized.veggieType || "";
  return normalized;
}

function normalizeProteinEntries(source) {
  if (Array.isArray(source.proteins) && source.proteins.length) {
    return source.proteins.map(entry => ({ ...createEmptyProteinEntry(), ...entry }));
  }

  if (source.proteinType || source.proteinAmount) {
    return [{
      proteinType: source.proteinType || "",
      proteinAmount: source.proteinAmount || "",
      proteinUnit: source.proteinUnit || "oz",
      cookedOrRaw: source.cookedOrRaw || "cooked"
    }];
  }

  return [createEmptyProteinEntry()];
}

function normalizeCarbEntries(source) {
  if (Array.isArray(source.carbs) && source.carbs.length) {
    return source.carbs.map(entry => ({ ...createEmptyCarbEntry(), ...entry }));
  }

  if (source.carbType || source.carbAmount) {
    return [{
      carbType: source.carbType || "",
      carbAmount: source.carbAmount || "",
      carbUnit: source.carbUnit || "cups"
    }];
  }

  return [createEmptyCarbEntry()];
}

function saveState() {
  localStorage.setItem(stateKey, JSON.stringify(appState));
  backendService?.scheduleSync?.(cloneData(appState));
}

function scheduleDraftSave() {
  window.clearTimeout(draftSaveTimer);
  draftSaveTimer = window.setTimeout(() => {
    saveState();
  }, 250);
}

function flushDraftSave() {
  window.clearTimeout(draftSaveTimer);
  saveState();
}

function setInputValueSafely(input, value) {
  if (!input || document.activeElement === input) return;
  input.value = value ?? "";
}

function hasActiveFoodSearchState() {
  return Boolean(
    String(appState.foodSearchState?.query || "").trim() ||
    String(appState.foodSearchState?.restaurantName || "").trim() ||
    String(appState.foodSearchState?.menuItem || "").trim() ||
    appState.foodSearchState?.selectedFood ||
    (appState.foodSearchState?.results || []).length ||
    appState.foodSearchState?.mealBreakdown
  );
}

function clearFoodSearchDomInputs() {
  if (elements.foodSearchInput && document.activeElement !== elements.foodSearchInput) {
    elements.foodSearchInput.value = "";
  }
  if (elements.restaurantSearchInput && document.activeElement !== elements.restaurantSearchInput) {
    elements.restaurantSearchInput.value = "";
  }
  if (elements.restaurantItemInput && document.activeElement !== elements.restaurantItemInput) {
    elements.restaurantItemInput.value = "";
  }
}

function isTypingField(target) {
  if (!target) return false;
  const tag = target.tagName;
  const type = target.type;
  return tag === "TEXTAREA" || (tag === "INPUT" && type !== "checkbox" && type !== "range");
}

function beginTypingSession(target) {
  if (!isTypingField(target)) return;
  activeTypingTarget = {
    id: target.id || "",
    name: target.name || "",
    type: target.type || "",
    dataset: { ...target.dataset }
  };
}

function endTypingSession() {
  activeTypingTarget = null;
}

function shouldPreserveTypingFocus() {
  return Boolean(activeTypingTarget);
}

function rememberWorkoutSetInput(target) {
  if (!target?.dataset) return;
  activeWorkoutSetInput = {
    exerciseIndex: target.dataset.exerciseIndex,
    setIndex: target.dataset.set,
    field: target.dataset.setField,
    selectionStart: typeof target.selectionStart === "number" ? target.selectionStart : null,
    selectionEnd: typeof target.selectionEnd === "number" ? target.selectionEnd : null
  };
}

function restoreWorkoutSetInputFocus() {
  if (!activeWorkoutSetInput) return;
  const selector = `[data-exercise-index="${activeWorkoutSetInput.exerciseIndex}"][data-set="${activeWorkoutSetInput.setIndex}"][data-set-field="${activeWorkoutSetInput.field}"]`;
  const input = elements.workoutList.querySelector(selector);
  if (!input) return;
  requestAnimationFrame(() => {
    input.focus({ preventScroll: true });
    if (typeof activeWorkoutSetInput.selectionStart === "number" && typeof input.setSelectionRange === "function") {
      input.setSelectionRange(activeWorkoutSetInput.selectionStart, activeWorkoutSetInput.selectionEnd ?? activeWorkoutSetInput.selectionStart);
    }
  });
}

function migrateLegacyWorkoutSessions() {
  const weekKeys = Object.keys(appState.workoutSessions || {});
  const alreadyNested = weekKeys.some(key => /^(\d{4}-W\d{2}|week-\d+)$/.test(key));
  if (alreadyNested) return;

  const legacy = appState.workoutSessions;
  appState.workoutSessions = {
    [appState.selectedWeek]: legacy
  };
}

function ensureTwelveWeekScaffold() {
  const previousWeek = appState.selectedWeek;
  workoutWeeks.forEach(weekKey => {
    if (!appState.workoutSessions[weekKey]) appState.workoutSessions[weekKey] = {};
  });

  Object.entries(weekSessionSeeds).forEach(([weekKey, sessions]) => {
    Object.entries(sessions).forEach(([dayKey, sessionSeed]) => {
      if (!appState.workoutSessions[weekKey][dayKey]) {
        appState.workoutSessions[weekKey][dayKey] = cloneData({
          dayKey,
          weekKey,
          label: sessionSeed.label,
          type: sessionSeed.type,
          focus: trainingPlan[dayKey]?.focus || "strength",
          primary_lifts: [...(trainingPlan[dayKey]?.primary_lifts || [])],
          accessory_lifts: [...(trainingPlan[dayKey]?.accessory_lifts || [])],
          core_block: trainingPlan[dayKey]?.core_block ?? true,
          createdAt: new Date().toISOString(),
          exercises: sessionSeed.exercises
        });
      }
    });
  });
  appState.selectedWeek = previousWeek;
}

function getAvailableWeekKeys() {
  const stored = Object.keys(appState.workoutSessions || {});
  const merged = [...new Set([...workoutWeeks, ...stored])];
  return merged.length ? merged.sort((left, right) => Number(left.replace("week-", "")) - Number(right.replace("week-", ""))) : ["week-1"];
}

function getAvailableSessionIds() {
  const visibleSessionIds = ["day1", "day2", "day3", "day5", "day6", "day8"];
  const weekKey = appState.selectedWeek && appState.workoutSessions?.[appState.selectedWeek]
    ? appState.selectedWeek
    : getAvailableWeekKeys()[0];
  const weekSessions = appState.workoutSessions?.[weekKey] || {};
  const ids = visibleSessionIds.filter(dayKey => trainingPlan[dayKey] || weekSessions[dayKey]);
  return ids.length ? ids : ["day1"];
}

function normalizeWorkoutSelections() {
  const weekKeys = getAvailableWeekKeys();
  if (!weekKeys.length) {
    appState.workoutSessions["week-1"] = appState.workoutSessions["week-1"] || {};
  }

  if (!appState.selectedWeek || !weekKeys.includes(appState.selectedWeek)) {
    appState.selectedWeek = weekKeys.includes(currentWeekKey()) ? currentWeekKey() : (weekKeys[0] || "week-1");
  }

  appState.workoutSessions[appState.selectedWeek] = appState.workoutSessions[appState.selectedWeek] || {};

  const validSessions = getAvailableSessionIds();
  if (!appState.trainingDay || !validSessions.includes(appState.trainingDay)) {
    appState.trainingDay = validSessions[0];
  }

  if (!appState.workoutSessions[appState.selectedWeek][appState.trainingDay] && trainingPlan[appState.trainingDay]) {
    appState.workoutSessions[appState.selectedWeek][appState.trainingDay] = createWorkoutSession(appState.trainingDay);
  }
}

function roundMacro(value) {
  return Math.max(0, Math.round(value));
}

function addMacros(total, macros) {
  total.protein += macros.protein;
  total.carbs += macros.carbs;
  total.fat += macros.fat;
  total.calories += macros.calories;
}

function macroBundle(protein, carbs, fat, calories) {
  return {
    protein: roundMacro(protein),
    carbs: roundMacro(carbs),
    fat: roundMacro(fat),
    calories: roundMacro(calories)
  };
}

function calculateStructuredProtein(proteinType, amount, unit, cookedOrRaw) {
  const protein = proteinOptions[proteinType];
  const quantity = Number(amount);
  if (!protein || !quantity || !protein.perUnit[unit]) return macroBundle(0, 0, 0, 0);
  const unitMacros = protein.perUnit[unit];
  const meatTypes = ["chicken breast", "chicken thigh", "ground chicken", "ground beef", "ribeye", "flank steak", "lean ground turkey", "salmon", "cod"];
  const rawScale = cookedOrRaw === "raw" && meatTypes.includes(proteinType) ? 0.75 : 1;
  return macroBundle(
    unitMacros.protein * quantity * rawScale,
    unitMacros.carbs * quantity,
    unitMacros.fat * quantity * rawScale,
    unitMacros.calories * quantity * rawScale
  );
}

function calculateStructuredCarb(carbType, amount, unit) {
  const carb = carbOptions[carbType];
  const quantity = Number(amount);
  if (!carb || !quantity || !carb.perUnit[unit]) return macroBundle(0, 0, 0, 0);
  const unitMacros = carb.perUnit[unit];
  return macroBundle(
    unitMacros.protein * quantity,
    unitMacros.carbs * quantity,
    unitMacros.fat * quantity,
    unitMacros.calories * quantity
  );
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeProteinUnit(unit) {
  const normalized = String(unit || "").trim().toLowerCase();
  const map = {
    oz: "oz",
    ounce: "oz",
    ounces: "oz",
    g: "grams",
    gram: "grams",
    grams: "grams",
    egg: "count",
    eggs: "count",
    count: "count",
    counts: "count",
    scoop: "scoops",
    scoops: "scoops"
  };
  return map[normalized] || "";
}

function normalizeCarbUnit(unit) {
  const normalized = String(unit || "").trim().toLowerCase();
  const map = {
    cup: "cups",
    cups: "cups",
    oz: "oz",
    ounce: "oz",
    ounces: "oz",
    g: "grams",
    gram: "grams",
    grams: "grams",
    piece: "pieces",
    pieces: "pieces",
    slice: "pieces",
    slices: "pieces"
  };
  return map[normalized] || "";
}

function normalizeMealSearchText(value) {
  return applyFoodAutocorrect(value)
    .replace(/\bw\/\b/g, " with ")
    .replace(/&/g, " and ")
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeQuery(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeIngredientUnit(unit) {
  const normalized = String(unit || "").trim().toLowerCase();
  return (
    normalizeProteinUnit(normalized) ||
    normalizeCarbUnit(normalized) ||
    ({
      each: "each",
      cup: "cup",
      cups: "cup",
      tbsp: "tbsp",
      tablespoon: "tbsp",
      tablespoons: "tbsp",
      serving: "serving",
      servings: "serving",
      packet: "packet",
      packets: "packet"
    }[normalized] || "")
  );
}

function scaleIngredientPresetMacros(preset, amount, unit) {
  const quantity = Number(amount);
  const normalizedUnit = normalizeIngredientUnit(unit) || preset.defaultUnit;
  const unitMacros = preset.perUnit[normalizedUnit] || preset.perUnit[preset.defaultUnit];
  if (!unitMacros || !quantity) {
    return { protein: 0, carbs: 0, fat: 0, calories: 0, fiber: 0 };
  }
  return {
    protein: Number((unitMacros.protein || 0) * quantity),
    carbs: Number((unitMacros.carbs || 0) * quantity),
    fat: Number((unitMacros.fat || 0) * quantity),
    calories: Number((unitMacros.calories || 0) * quantity),
    fiber: Number((unitMacros.fiber || 0) * quantity)
  };
}

function extractAmountForAlias(query, aliases, defaultUnit) {
  for (const alias of aliases) {
    const escaped = escapeRegExp(alias);
    const match = query.match(new RegExp(`(\\d+(?:\\.\\d+)?)\\s*(oz|ounces|grams|g|count|counts|egg|eggs|scoop|scoops|cup|cups|piece|pieces|slice|slices|each)?\\s*(?:of\\s+)?${escaped}\\b`));
    if (match) {
      return {
        amount: match[1],
        unit: normalizeIngredientUnit(match[2]) || defaultUnit
      };
    }
  }
  return null;
}

function buildPresetIngredient(key, amountOverride = "", unitOverride = "") {
  const preset = INGREDIENT_PRESETS[key];
  if (!preset) return null;
  const amount = amountOverride !== "" ? amountOverride : preset.defaultAmount;
  const unit = unitOverride || preset.defaultUnit;
  return buildIngredient(
    preset.label,
    String(amount),
    unit,
    scaleIngredientPresetMacros(preset, amount, unit),
    false,
    true
  );
}

function detectComposedMeal(query) {
  const normalized = normalizeMealSearchText(query);
  if (normalized.length < 4) return null;

  const matches = MEAL_COMPONENTS.map(component => {
    const positions = component.aliases
      .map(alias => normalized.indexOf(alias))
      .filter(position => position >= 0);
    if (!positions.length) return null;
    const foundAlias = component.aliases.find(alias => normalized.includes(alias)) || component.aliases[0];
    return {
      key: component.key,
      alias: foundAlias,
      index: Math.min(...positions)
    };
  }).filter(Boolean);

  const deduped = [];
  const seen = new Set();
  matches
    .sort((left, right) => left.index - right.index)
    .forEach(match => {
      if (seen.has(match.key)) return;
      seen.add(match.key);
      deduped.push(match);
    });

  if (deduped.length < 2) return null;

  const ingredients = deduped
    .map(match => {
      const preset = INGREDIENT_PRESETS[match.key];
      if (!preset) return null;
      const parsedAmount = extractAmountForAlias(normalized, MEAL_COMPONENTS.find(component => component.key === match.key)?.aliases || [match.alias], preset.defaultUnit);
      return buildPresetIngredient(match.key, parsedAmount?.amount || "", parsedAmount?.unit || "");
    })
    .filter(Boolean);

  if (ingredients.length < 2) return null;

  return {
    label: query.trim(),
    ingredients,
    hints: ingredients.map(ingredient => `${ingredient.amount} ${ingredient.unit} ${ingredient.ingredient_name}`.trim())
  };
}

function buildIngredientFromFoodItem(food) {
  if (!food) return null;
  const ingredientName = food.brand && !String(food.name || "").toLowerCase().includes(String(food.brand || "").toLowerCase())
    ? `${food.brand} ${food.name}`.trim()
    : food.name;
  return buildIngredient(
    ingredientName,
    String(food.servingAmount || 1),
    food.servingUnit || "serving",
    {
      protein: Number(food.protein || 0),
      carbs: Number(food.carbs || 0),
      fat: Number(food.fat || 0),
      calories: Number(food.calories || 0),
      fiber: Number(food.fiber || 0)
    },
    false,
    true
  );
}

function scaleReviewedFoodItem(food, nextAmount, nextUnit = "") {
  if (!food) return null;
  const amount = String(nextAmount ?? food.servingAmount ?? "").trim();
  const unit = String(nextUnit || food.servingUnit || "serving").trim();
  const quantity = Number(amount);
  const baseAmount = Number(food._baseServingAmount || food.servingAmount || 1) || 1;
  const baseUnit = String(food._baseServingUnit || food.servingUnit || unit);
  const baseMacros = food._baseMacros || {
    calories: Number(food.calories || 0),
    protein: Number(food.protein || 0),
    carbs: Number(food.carbs || 0),
    fat: Number(food.fat || 0),
    fiber: Number(food.fiber || 0)
  };

  if (!quantity) {
    return {
      ...food,
      servingAmount: amount,
      servingUnit: unit,
      servingLabel: `${amount} ${unit}`.trim(),
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0
    };
  }

  if (unit !== baseUnit) {
    return {
      ...food,
      servingAmount: amount,
      servingUnit: unit,
      servingLabel: `${amount} ${unit}`.trim()
    };
  }

  const scale = quantity / baseAmount;
  return {
    ...food,
    servingAmount: amount,
    servingUnit: unit,
    servingLabel: `${amount} ${unit}`.trim(),
    calories: Number((baseMacros.calories || 0) * scale),
    protein: Number((baseMacros.protein || 0) * scale),
    carbs: Number((baseMacros.carbs || 0) * scale),
    fat: Number((baseMacros.fat || 0) * scale),
    fiber: Number((baseMacros.fiber || 0) * scale)
  };
}

function getMealBreakdownUnitOptions(food) {
  const preferred = [
    food?.servingUnit,
    food?._baseServingUnit
  ].filter(Boolean);
  const generic = ["oz", "grams", "cups", "count", "each", "pieces", "bowl", "salad", "sandwich", "order"];
  return [...new Set([...preferred, ...generic])];
}

function getMealBreakdownAmountChips(food) {
  const unit = String(food?.servingUnit || food?._baseServingUnit || "").toLowerCase();
  if (["oz", "grams"].includes(unit)) return [4, 6, 8, 10];
  if (["cup", "cups"].includes(unit)) return [0.5, 1, 1.5, 2];
  if (["count", "each", "pieces", "piece"].includes(unit)) return [1, 2, 3, 4];
  return [0.5, 1, 1.5, 2];
}

function getMealBreakdownAlternatives(composedMeal, index) {
  const alternatives = composedMeal?.alternatives?.[index]?.options || [];
  return alternatives.length ? alternatives : [];
}

function dedupeMealBreakdownDraftItems(items) {
  const seen = new Set();
  return (Array.isArray(items) ? items : []).filter(item => {
    const key = `${String(item?.sourceId || item?.id || "").toLowerCase()}::${String(item?.name || "").toLowerCase()}`;
    if (!key.trim() || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function resolveMealBreakdownUnmatchedIngredient(unmatchedIndex, optionIndex) {
  const composedMeal = appState.foodSearchState.mealBreakdown;
  const unmatched = composedMeal?.unmatched?.[unmatchedIndex];
  const choice = unmatched?.suggestions?.[optionIndex];
  if (!composedMeal || !unmatched || !choice) return;

  const draft = dedupeMealBreakdownDraftItems([
    ...(appState.foodSearchState.mealBreakdownDraft || composedMeal.items || []),
    {
      ...choice,
      _originalQuery: unmatched.query,
      _mealRole: unmatched.role
    }
  ]);

  composedMeal.items = dedupeMealBreakdownDraftItems([
    ...(composedMeal.items || []),
    {
      ...choice,
      _originalQuery: unmatched.query,
      _mealRole: unmatched.role
    }
  ]);
  composedMeal.alternatives = [
    ...(composedMeal.alternatives || []),
    {
      query: unmatched.query,
      role: unmatched.role,
      chosen: choice,
      confidence: "resolved",
      options: unmatched.suggestions || []
    }
  ];
  composedMeal.unmatched = (composedMeal.unmatched || []).filter((_, index) => index !== unmatchedIndex);
  composedMeal.hints = (composedMeal.items || []).map(item => `${item.servingAmount || 1} ${item.servingUnit || "serving"} ${item.name}`.trim());
  composedMeal.matchSummary = {
    matchedCount: (composedMeal.items || []).length,
    totalCount: Math.max((composedMeal.items || []).length + (composedMeal.unmatched || []).length, composedMeal.matchSummary?.totalCount || 0)
  };
  appState.foodSearchState.mealBreakdownDraft = draft;
  renderFoodSearch();
}

async function addUnmatchedMealBreakdownIngredient(unmatchedIndex) {
  const composedMeal = appState.foodSearchState.mealBreakdown;
  const unmatched = composedMeal?.unmatched?.[unmatchedIndex];
  if (!composedMeal || !unmatched?.query) return;

  const added = await addMealBreakdownDraftItem(unmatched.query);
  if (!added) {
    showFoodToast(`Couldn't add ${unmatched.query}`);
    return;
  }

  const resolved = {
    ...added,
    _originalQuery: unmatched.query,
    _mealRole: unmatched.role
  };

  const draft = dedupeMealBreakdownDraftItems([
    ...(appState.foodSearchState.mealBreakdownDraft || composedMeal.items || []),
    resolved
  ]);

  composedMeal.items = dedupeMealBreakdownDraftItems([
    ...(composedMeal.items || []),
    resolved
  ]);
  composedMeal.alternatives = [
    ...(composedMeal.alternatives || []),
    {
      query: unmatched.query,
      role: unmatched.role,
      chosen: resolved,
      confidence: "resolved",
      options: [resolved]
    }
  ];
  composedMeal.unmatched = (composedMeal.unmatched || []).filter((_, index) => index !== unmatchedIndex);
  composedMeal.hints = (composedMeal.items || []).map(item => `${item.servingAmount || 1} ${item.servingUnit || "serving"} ${item.name}`.trim());
  composedMeal.matchSummary = {
    matchedCount: (composedMeal.items || []).length,
    totalCount: Math.max((composedMeal.items || []).length + (composedMeal.unmatched || []).length, composedMeal.matchSummary?.totalCount || 0)
  };
  appState.foodSearchState.mealBreakdownDraft = draft;
  renderFoodSearch();
}

function getCustomizationFoodPreset(name) {
  const key = String(name || "").trim().toLowerCase();
  const presets = {
    avocado: { servingAmount: 0.5, servingUnit: "each", calories: 160, protein: 2, carbs: 9, fat: 15, fiber: 7 },
    cheese: { servingAmount: 1, servingUnit: "oz", calories: 110, protein: 7, carbs: 1, fat: 9, fiber: 0 },
    "white rice": { servingAmount: 1, servingUnit: "cup", calories: 205, protein: 4, carbs: 45, fat: 0.5, fiber: 0.6 },
    "black beans": { servingAmount: 0.5, servingUnit: "cup", calories: 114, protein: 8, carbs: 20, fat: 0.5, fiber: 8 },
    "sweet potato": { servingAmount: 1, servingUnit: "each", calories: 112, protein: 2, carbs: 26, fat: 0, fiber: 4 },
    onion: { servingAmount: 0.25, servingUnit: "cup", calories: 16, protein: 0.5, carbs: 4, fat: 0, fiber: 1 },
    "chicken breast": { servingAmount: 4, servingUnit: "oz", calories: 187, protein: 35, carbs: 0, fat: 4, fiber: 0 },
    steak: { servingAmount: 6, servingUnit: "oz", calories: 310, protein: 42, carbs: 0, fat: 16, fiber: 0 }
  };
  const preset = presets[key];
  if (!preset) return null;
  return {
    id: `customization-${key.replace(/\s+/g, "-")}`,
    source: "customization",
    sourceId: key.replace(/\s+/g, "-"),
    name: key,
    brand: "",
    servingAmount: preset.servingAmount,
    servingUnit: preset.servingUnit,
    servingLabel: `${preset.servingAmount} ${preset.servingUnit}`,
    servingGrams: 0,
    calories: preset.calories,
    protein: preset.protein,
    carbs: preset.carbs,
    fat: preset.fat,
    fiber: preset.fiber,
    _baseServingAmount: preset.servingAmount,
    _baseServingUnit: preset.servingUnit,
    _baseMacros: {
      calories: preset.calories,
      protein: preset.protein,
      carbs: preset.carbs,
      fat: preset.fat,
      fiber: preset.fiber
    }
  };
}

function getMealBreakdownCustomizationChips(composedMeal, draftItems) {
  if (composedMeal?.source !== "restaurant") return [];
  const items = Array.isArray(draftItems) ? draftItems : [];
  const chips = [];
  const seen = new Set();
  const addChip = chip => {
    const key = `${chip.type}:${chip.value}`;
    if (seen.has(key)) return;
    seen.add(key);
    chips.push(chip);
  };

  const proteinIndex = items.reduce((bestIndex, item, index, array) => {
    if (!item) return bestIndex;
    const bestProtein = bestIndex >= 0 ? Number(array[bestIndex]?.protein || 0) : -1;
    const currentProtein = Number(item.protein || 0);
    return currentProtein > bestProtein ? index : bestIndex;
  }, -1);

  if (proteinIndex >= 0) {
    addChip({
      type: "boost",
      value: String(proteinIndex),
      label: `Extra ${items[proteinIndex].name}`
    });
  }

  items.slice(0, 5).forEach((item, index) => {
    addChip({
      type: "remove",
      value: String(index),
      label: `No ${item.name}`
    });
  });

  const presentNames = new Set(items.map(item => String(item?.name || "").toLowerCase()));
  ["avocado", "white rice", "black beans", "cheese", "sweet potato", "onion"].forEach(name => {
    if (presentNames.has(name)) return;
    addChip({
      type: "add",
      value: name,
      label: `Add ${name}`
    });
  });

  return chips.slice(0, 8);
}

function appendMealCustomizationNote(note) {
  if (!note || !appState.foodSearchState.mealBreakdown) return;
  const current = Array.isArray(appState.foodSearchState.mealBreakdown.customizations)
    ? appState.foodSearchState.mealBreakdown.customizations
    : [];
  if (current.includes(note)) return;
  appState.foodSearchState.mealBreakdown.customizations = [...current, note];
}

async function addMealBreakdownDraftItem(name) {
  const directPreset = getCustomizationFoodPreset(name);
  if (directPreset) {
    return directPreset;
  }
  const searchService = getFoodSearchService();
  if (!searchService?.searchFoods) return null;
  const results = await searchService.searchFoods(name, {
    localIndex: FOOD_INDEX,
    recentFoods: appState.recentFoods,
    favoriteFoods: appState.favoriteFoods
  });
  const choice = (results || []).find(item => item.source !== "restaurant") || results?.[0];
  if (!choice) return null;
  return {
    ...choice,
    _baseServingAmount: Number(choice._baseServingAmount || choice.servingAmount || 1) || 1,
    _baseServingUnit: choice._baseServingUnit || choice.servingUnit,
    _baseMacros: choice._baseMacros || {
      calories: Number(choice.calories || 0),
      protein: Number(choice.protein || 0),
      carbs: Number(choice.carbs || 0),
      fat: Number(choice.fat || 0),
      fiber: Number(choice.fiber || 0)
    }
  };
}

async function applyMealBreakdownCustomizationChip(type, value) {
  const draft = Array.isArray(appState.foodSearchState.mealBreakdownDraft)
    ? [...appState.foodSearchState.mealBreakdownDraft]
    : [];
  if (!draft.length && type !== "add") return;

  if (type === "remove") {
    const index = Number(value);
    const current = draft[index];
    if (!current) return;
    draft.splice(index, 1);
    appState.foodSearchState.mealBreakdownDraft = draft;
    appendMealCustomizationNote(`no ${current.name}`);
    renderFoodSearch();
    return;
  }

  if (type === "boost") {
    const index = Number(value);
    const current = draft[index];
    if (!current) return;
    const baseAmount = Number(current.servingAmount || current._baseServingAmount || 1) || 1;
    draft[index] = scaleReviewedFoodItem(current, Number((baseAmount * 1.5).toFixed(2)), current.servingUnit);
    appState.foodSearchState.mealBreakdownDraft = draft;
    appendMealCustomizationNote(`extra ${current.name}`);
    renderFoodSearch();
    return;
  }

  if (type === "add") {
    const added = await addMealBreakdownDraftItem(value);
    if (!added) {
      showFoodToast(`Couldn't add ${value}`);
      return;
    }
    appState.foodSearchState.mealBreakdownDraft = [...draft, added];
    appendMealCustomizationNote(`add ${added.name}`);
    renderFoodSearch();
  }
}

function saveLearnedMealFromBreakdown(composedMeal, query) {
  if (!composedMeal) return;
  const items = (appState.foodSearchState.mealBreakdownDraft || composedMeal.items || []).map(item => ({ ...item }));
  const normalizedQuery = normalizeMealSearchText(query || composedMeal.label || "");
  if (!normalizedQuery || !items.length) return;

  const nextLearnedMeal = {
    id: createAppId("learned-meal"),
    query: query || composedMeal.label || "",
    normalizedQuery,
    label: composedMeal.label || query || "Learned meal",
    items,
    createdAt: new Date().toISOString()
  };

  appState.learnedMeals = [
    nextLearnedMeal,
    ...appState.learnedMeals.filter(item => item.normalizedQuery !== normalizedQuery)
  ].slice(0, 30);

  saveState();
  showFoodToast("Saved as learned meal");
}

function applyMealBreakdownToDraft(mealBreakdown, query) {
  if (!mealBreakdown) return;
  const items = (appState.foodSearchState.mealBreakdownDraft || mealBreakdown.items || []).map(item => ({ ...item }));
  appState.draftMeal.showAdvanced = true;
  appState.draftMeal.mealName = mealBreakdown.label || query;
  appState.draftMeal.text = query;
  appState.draftMeal.ingredients = items.map(buildIngredientFromFoodItem).filter(Boolean);
  appState.draftMeal.proteins = [createEmptyProteinEntry()];
  appState.draftMeal.carbs = [createEmptyCarbEntry()];
  if (elements.eatSecondaryShell) elements.eatSecondaryShell.open = true;
  saveState();
  render();
}

function inferMealCategoryFromBreakdown(mealBreakdown, query = "") {
  const haystack = normalizeMealSearchText(`${mealBreakdown?.label || ""} ${query}`);
  if (/\b(breakfast|egg|eggs|sausage|bacon|croissant|bagel|english muffin|oatmeal|yogurt)\b/.test(haystack)) {
    return "breakfast";
  }
  if (/\b(salad|sandwich|wrap|bowl|burger|taco|lunch)\b/.test(haystack)) {
    return "lunch";
  }
  if (/\b(dinner|steak|salmon|pasta|rice bowl)\b/.test(haystack)) {
    return "dinner";
  }
  return appState.draftMeal.mealCategory || "meal";
}

function logMealBreakdownQuick(mealBreakdown, query) {
  if (!mealBreakdown) return;
  const items = dedupeMealBreakdownDraftItems(
    (appState.foodSearchState.mealBreakdownDraft || mealBreakdown.items || []).map(item => ({ ...item }))
  );
  if (!items.length) return;

  const previousRecentFoods = cloneData(appState.recentFoods || []);
  const meal = {
    id: createAppId("meal"),
    loggedAt: new Date().toISOString(),
    text: query || mealBreakdown.label || "Meal",
    meal_name: mealBreakdown.label || query || "Meal",
    meal_category: inferMealCategoryFromBreakdown(mealBreakdown, query),
    portion_multiplier: 1,
    notes: "",
    templateId: "",
    structured: {
      ingredients: items.map(buildIngredientFromFoodItem).filter(Boolean),
      proteins: [],
      carbs: [],
      veggieServings: 0,
      veggieType: ""
    },
    matches: items.map(item => item.name).filter(Boolean),
    cues: { proteinUnclear: false, carbUnclear: false, rge: false },
    macros: macroBundle(
      items.reduce((sum, item) => sum + Number(item.protein || 0), 0),
      items.reduce((sum, item) => sum + Number(item.carbs || 0), 0),
      items.reduce((sum, item) => sum + Number(item.fat || 0), 0),
      items.reduce((sum, item) => sum + Number(item.calories || 0), 0)
    ),
    fiber_grams: items.reduce((sum, item) => sum + Number(item.fiber || 0), 0)
  };

  logMealObject(meal);
  items.forEach(trackFoodUsage);
  lastFoodLogUndo = {
    mealId: meal.id,
    foodName: meal.meal_name,
    previousRecentFoods
  };
  clearSelectedFoodSearch();
  appState.foodSearchState.mealBreakdown = null;
  appState.foodSearchState.mealBreakdownDraft = null;
  appState.foodSearchState.mealBreakdownReviewOpen = false;
  elements.templateStatus.textContent = `${meal.meal_name} logged.`;
  saveState();
  renderDashboard();
  renderMicronutrients();
  renderFoodSearch();
  renderRecentMeals();
  renderMeals();
  renderRepeatActions();
  renderCoach();
  showFoodToast(`${meal.meal_name} logged`, {
    actionLabel: "Undo",
    onAction: undoLastFoodLog
  });
}

function resolveIngredientFoodKey(name) {
  const normalized = String(name || "").trim().toLowerCase();
  const aliases = {
    egg: "eggs",
    eggs: "eggs",
    "greek yogurt": "Greek yogurt",
    yogurt: "Greek yogurt",
    "plain yogurt": "Greek yogurt",
    "siggi's plain yogurt": "Greek yogurt",
    "siggis plain yogurt": "Greek yogurt",
    cottage: "cottage cheese",
    "cottage cheese": "cottage cheese",
    whey: "whey",
    chicken: "chicken breast",
    "chicken breast": "chicken breast",
    "chicken thigh": "chicken thigh",
    "ground chicken": "ground chicken",
    beef: "ground beef",
    "ground beef": "ground beef",
    ribeye: "ribeye",
    steak: "flank steak",
    "flank steak": "flank steak",
    turkey: "lean ground turkey",
    "ground turkey": "lean ground turkey",
    "lean ground turkey": "lean ground turkey",
    salmon: "salmon",
    cod: "cod",
    rice: "white rice",
    "white rice": "white rice",
    "brown rice": "brown rice",
    potato: "potato",
    "sweet potato": "sweet potato",
    quinoa: "quinoa",
    sourdough: "sourdough",
    pretzels: "pretzels",
    fruit: "fruit",
    banana: "fruit",
    berries: "berries",
    "mixed berries": "berries",
    granola: "granola",
    honey: "honey",
    oats: "oats",
    ham: "ham",
    cheese: "cheese",
    cheddar: "cheese",
    mozzarella: "cheese",
    swiss: "cheese",
    avocado: "avocado",
    spinach: "spinach",
    onions: "onion",
    onion: "onion",
    peppers: "peppers",
    pepper: "peppers",
    "turkey meatballs": "turkey meatballs",
    "chicken meatballs": "chicken meatballs",
    spaghetti: "spaghetti",
    pasta: "pasta",
    "meat sauce": "meat sauce",
    bolognese: "meat sauce",
    marinara: "meat sauce"
  };

  if (aliases[normalized]) return aliases[normalized];
  const aliasEntry = Object.entries(aliases).find(([alias]) => normalized.includes(alias));
  return aliasEntry ? aliasEntry[1] : "";
}

function getAutoIngredientMacros(ingredient) {
  const key = resolveIngredientFoodKey(ingredient.ingredient_name);
  if (!key) return null;

  if (proteinOptions[key]) {
    const unit = normalizeProteinUnit(ingredient.unit) || proteinOptions[key].defaultUnit;
    if (ingredient.amount === "") return { key, unit, macros: macroBundle(0, 0, 0, 0) };
    return {
      key,
      unit,
      macros: calculateStructuredProtein(key, ingredient.amount, unit, "cooked")
    };
  }

  if (carbOptions[key]) {
    const unit = normalizeCarbUnit(ingredient.unit) || carbOptions[key].defaultUnit;
    if (ingredient.amount === "") return { key, unit, macros: macroBundle(0, 0, 0, 0) };
    return {
      key,
      unit,
      macros: calculateStructuredCarb(key, ingredient.amount, unit)
    };
  }

  if (INGREDIENT_PRESETS[key]) {
    const preset = INGREDIENT_PRESETS[key];
    const unit = normalizeIngredientUnit(ingredient.unit) || preset.defaultUnit;
    if (ingredient.amount === "") return { key, unit, macros: macroBundle(0, 0, 0, 0), fiber: 0 };
    const macros = scaleIngredientPresetMacros(preset, ingredient.amount, unit);
    return {
      key,
      unit,
      macros: macroBundle(macros.protein, macros.carbs, macros.fat, macros.calories),
      fiber: macros.fiber || 0
    };
  }

  return null;
}

function syncIngredientAutoMacros(index, updateDom = false) {
  const ingredient = appState.draftMeal.ingredients[index];
  if (!ingredient || ingredient.source === "manual") return;
  const autoMatch = getAutoIngredientMacros(ingredient);
  if (!autoMatch) return;

  ingredient.source = "auto";
  ingredient.unit = autoMatch.unit || ingredient.unit;
  ingredient.macro_estimate = {
    ...ingredient.macro_estimate,
    protein: autoMatch.macros.protein,
    carbs: autoMatch.macros.carbs,
    fat: autoMatch.macros.fat,
    calories: autoMatch.macros.calories,
    fiber: Number(autoMatch.fiber || ingredient.macro_estimate?.fiber || 0)
  };

  if (updateDom) updateIngredientMacroFields(index);
}

function updateIngredientMacroFields(index) {
  const ingredient = appState.draftMeal.ingredients[index];
  if (!ingredient) return;
  ["protein", "carbs", "fat", "calories", "fiber"].forEach(field => {
    const input = elements.mealRefine.querySelector(`[data-ingredient-macro="${field}"][data-ingredient-index="${index}"]`);
    setInputValueSafely(input, ingredient.macro_estimate[field] ?? "");
  });
  const unitInput = elements.mealRefine.querySelector(`[data-ingredient-field="unit"][data-ingredient-index="${index}"]`);
  setInputValueSafely(unitInput, ingredient.unit ?? "");
}

function updateMealDraftSummaryUI() {
  if (!elements.mealRefine.childElementCount) return;
  const computed = calculateMealFromDraft(appState.draftMeal);
  const parsed = computed.parsed;
  const note = elements.mealRefine.querySelector("[data-draft-note]");
  const totals = elements.mealRefine.querySelector("[data-draft-totals]");
  if (note) note.textContent = buildRefineNote(parsed, computed);
  if (totals) totals.textContent = `${computed.macros.protein}P / ${computed.macros.carbs}C / ${computed.macros.fat}F / ${computed.macros.calories} kcal | ${Math.round(computed.fiber)}g fiber`;
}

function findStructuredMatch(text, entries, defaultUnits) {
  const lower = String(text || "").toLowerCase();
  const sorted = entries.slice().sort((left, right) => right.term.length - left.term.length);

  for (const entry of sorted) {
    const escaped = escapeRegExp(entry.term);
    const explicit = lower.match(new RegExp(`(\\d+(?:\\.\\d+)?)\\s*(oz|ounces|grams|g|count|counts|egg|eggs|scoop|scoops|cup|cups|piece|pieces|slice|slices)?\\s*(?:of\\s+)?${escaped}\\b`));
    if (explicit) {
      return {
        key: entry.key,
        amount: explicit[1],
        unit: entry.kind === "protein"
          ? (normalizeProteinUnit(explicit[2]) || defaultUnits[entry.key])
          : (normalizeCarbUnit(explicit[2]) || defaultUnits[entry.key])
      };
    }

    if (entry.kind === "protein" && entry.key === "eggs") {
      const eggMatch = lower.match(/(\d+(?:\.\d+)?)\s*(egg|eggs)\b/);
      if (eggMatch) return { key: entry.key, amount: eggMatch[1], unit: "count" };
    }
  }

  return null;
}

function parseFreeText(text) {
  const lower = applyFoodAutocorrect(text);
  const base = macroBundle(0, 0, 0, 0);
  const matches = [];

  baseFoodMatches.forEach(rule => {
    const skipWholeBanana = rule.label === "banana" && lower.includes("half banana");
    if (skipWholeBanana) return;
    if (rule.terms.some(term => lower.includes(term))) {
      addMacros(base, rule.macros);
      matches.push(rule.label);
    }
  });

  const cues = {
    proteinUnclear: false,
    carbUnclear: false,
    rge: /rge meal|rachael good eats meal|rachael good eats/i.test(lower)
  };

  const proteinCueMap = [
    ["chicken breast", "chicken breast"],
    ["chicken thigh", "chicken thigh"],
    ["ground chicken", "ground chicken"],
    ["ground beef", "ground beef"],
    ["ribeye", "ribeye"],
    ["flank steak", "flank steak"],
    ["lean ground turkey", "lean ground turkey"],
    ["salmon", "salmon"],
    ["cod", "cod"],
    ["egg", "eggs"],
    ["greek yogurt", "Greek yogurt"],
    ["cottage cheese", "cottage cheese"],
    ["whey", "whey"]
  ];

  const carbCueMap = [
    ["white rice", "white rice"],
    ["brown rice", "brown rice"],
    ["rice", "white rice"],
    ["potato", "potato"],
    ["sweet potato", "sweet potato"],
    ["quinoa", "quinoa"],
    ["sourdough", "sourdough"],
    ["pretzel", "pretzels"],
    ["fruit", "fruit"],
    ["banana", "fruit"],
    ["berries", "fruit"],
    ["oats", "oats"]
  ];

  const suggestedProteinType = proteinCueMap.find(([term]) => lower.includes(term))?.[1] || "";
  const suggestedCarbType = carbCueMap.find(([term]) => lower.includes(term))?.[1] || "";

  const proteinMatch = findStructuredMatch(
    lower,
    proteinCueMap.map(([term, key]) => ({ term, key, kind: "protein" })),
    Object.fromEntries(Object.entries(proteinOptions).map(([key, value]) => [key, value.defaultUnit]))
  );
  const carbMatch = findStructuredMatch(
    lower,
    carbCueMap.map(([term, key]) => ({ term, key, kind: "carb" })),
    Object.fromEntries(Object.entries(carbOptions).map(([key, value]) => [key, value.defaultUnit]))
  );

  cues.proteinUnclear = !proteinMatch || !suggestedProteinType;
  cues.carbUnclear = !carbMatch || !suggestedCarbType;

  return {
    baseMacros: base,
    matches,
    cues,
    suggestedProteinType,
    suggestedCarbType,
    suggestedProteinAmount: proteinMatch?.amount || "",
    suggestedProteinUnit: proteinMatch?.unit || "",
    suggestedCarbAmount: carbMatch?.amount || "",
    suggestedCarbUnit: carbMatch?.unit || ""
  };
}

function scaleMacros(macros, multiplier) {
  return macroBundle(
    (macros.protein || 0) * multiplier,
    (macros.carbs || 0) * multiplier,
    (macros.fat || 0) * multiplier,
    (macros.calories || 0) * multiplier
  );
}

function calculateIngredientMacros(ingredients, multiplier = 1) {
  return ingredients.reduce((total, ingredient) => {
    if (ingredient.optional_flag && !ingredient.enabled) return total;
    addMacros(total, scaleMacros(ingredient.macro_estimate || {}, multiplier));
    return total;
  }, macroBundle(0, 0, 0, 0));
}

function calculateIngredientFiber(ingredients, multiplier = 1) {
  return ingredients.reduce((sum, ingredient) => {
    if (ingredient.optional_flag && !ingredient.enabled) return sum;
    return sum + Number(ingredient.macro_estimate?.fiber || 0) * multiplier;
  }, 0);
}

function calculateMealFromDraft(draft) {
  const parsed = parseFreeText(draft.text);
  const multiplier = Number(draft.portionMultiplier || 1);
  const useSavedMealMath = Boolean(draft.templateId) || Boolean((draft.ingredients || []).length);
  const baseMacros = useSavedMealMath ? macroBundle(0, 0, 0, 0) : parsed.baseMacros;
  const structuredProtein = draft.proteins.reduce((total, proteinEntry) => {
    addMacros(total, calculateStructuredProtein(
      proteinEntry.proteinType,
      proteinEntry.proteinAmount,
      proteinEntry.proteinUnit,
      proteinEntry.cookedOrRaw
    ));
    return total;
  }, macroBundle(0, 0, 0, 0));
  const structuredCarb = draft.carbs.reduce((total, carbEntry) => {
    addMacros(total, calculateStructuredCarb(
      carbEntry.carbType,
      carbEntry.carbAmount,
      carbEntry.carbUnit
    ));
    return total;
  }, macroBundle(0, 0, 0, 0));
  const ingredientMacros = calculateIngredientMacros(draft.ingredients || [], multiplier);
  const total = macroBundle(
    baseMacros.protein + structuredProtein.protein * multiplier + structuredCarb.protein * multiplier + ingredientMacros.protein,
    baseMacros.carbs + structuredProtein.carbs * multiplier + structuredCarb.carbs * multiplier + ingredientMacros.carbs,
    baseMacros.fat + structuredProtein.fat * multiplier + structuredCarb.fat * multiplier + ingredientMacros.fat,
    baseMacros.calories + structuredProtein.calories * multiplier + structuredCarb.calories * multiplier + ingredientMacros.calories
  );

  return {
    macros: total,
    parsed,
    fiber: calculateIngredientFiber(draft.ingredients || [], multiplier),
    needsProteinRefinement: parsed.cues.rge || parsed.cues.proteinUnclear,
    needsCarbRefinement: parsed.cues.rge || parsed.cues.carbUnclear
  };
}

function createMealFromDraft() {
  const draft = appState.draftMeal;
  const computed = calculateMealFromDraft(draft);

  return {
    id: draft.editingMealId || createAppId("meal"),
    loggedAt: draft.editingLoggedAt || new Date().toISOString(),
    text: draft.text,
    meal_name: draft.mealName || draft.text,
    meal_category: draft.mealCategory || "meal",
    portion_multiplier: Number(draft.portionMultiplier || 1),
    notes: draft.notes || "",
    templateId: draft.templateId || "",
    structured: {
      ingredients: normalizeIngredients(draft.ingredients || []),
      proteins: draft.proteins.map(entry => ({ ...entry })),
      carbs: draft.carbs.map(entry => ({ ...entry })),
      veggieServings: Number(draft.veggieServings || 0),
      veggieType: draft.veggieType || ""
    },
    matches: computed.parsed.matches,
    cues: computed.parsed.cues,
    macros: computed.macros,
    fiber_grams: computed.fiber
  };
}

function buildTemplateFromDraft(existingTemplateId = "") {
  const draft = appState.draftMeal;
  const computed = calculateMealFromDraft(draft);
  const templateId = existingTemplateId || draft.templateId || `custom-${Date.now()}`;
  return normalizeTemplate({
    template_id: templateId,
    id: templateId,
    meal_name: draft.mealName || draft.text || "Saved meal",
    label: draft.mealName || draft.text || "Saved meal",
    meal_category: draft.mealCategory || "breakfast",
    text: draft.text || draft.mealName || "Saved meal",
    portion_multiplier: Number(draft.portionMultiplier || 1),
    ingredients: normalizeIngredients(draft.ingredients || []),
    proteins: draft.proteins.map(entry => ({ ...entry })),
    carbs: draft.carbs.map(entry => ({ ...entry })),
    veggieServings: Number(draft.veggieServings || 0),
    veggieType: draft.veggieType || "",
    notes: draft.notes || "",
    is_favorite: false,
    last_logged_at: "",
    times_logged: 0,
    estimated_macros: {
      ...computed.macros,
      fiber: computed.fiber
    }
  });
}

function applyTemplateToDraft(template, shouldAutoLog = false) {
  appState.draftMeal = {
    templateId: template.template_id,
    mealName: template.meal_name,
    mealCategory: template.meal_category,
    text: template.text,
    notes: template.notes || "",
    portionMultiplier: Number(template.portion_multiplier || 1),
    ingredients: normalizeIngredients(template.ingredients || []),
    proteins: normalizeProteinEntries(template).map(entry => ({ ...entry })),
    carbs: normalizeCarbEntries(template).map(entry => ({ ...entry })),
    veggieServings: Number(template.veggieServings || 0),
    veggieType: template.veggieType || ""
  };
  elements.templateStatus.textContent = shouldAutoLog
    ? `${template.meal_name} loaded and ready to log.`
    : `${template.meal_name} loaded. Adjust the fields, then log it.`;
  saveState();
}

function getCurrentDayPlan() {
  normalizeWorkoutSelections();
  const session = ensureWorkoutSession(appState.trainingDay);
  const basePlan = trainingPlan[appState.trainingDay] || {
    label: "Workout",
    type: "strength",
    focus: "strength",
    primary_lifts: [],
    accessory_lifts: [],
    core_block: true
  };
  return {
    ...basePlan,
    label: session.label || basePlan.label,
    type: session.type || basePlan.type,
    focus: session.focus || basePlan.focus,
    primary_lifts: session.primary_lifts || basePlan.primary_lifts,
    accessory_lifts: session.accessory_lifts || basePlan.accessory_lifts,
    core_block: typeof session.core_block === "boolean" ? session.core_block : basePlan.core_block
  };
}

function getCurrentCarbTargets() {
  return targets.carbsByDayType[getCurrentDayPlan().type];
}

function getTotals() {
  return getSelectedFoodMeals().reduce((total, meal) => {
    addMacros(total, meal.macros);
    return total;
  }, macroBundle(0, 0, 0, 0));
}

function getVeggieServingsTotal() {
  return getSelectedFoodMeals().reduce((sum, meal) => sum + Number(meal.structured?.veggieServings || 0), 0);
}

function formatLoggedDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getMealDateKey(meal) {
  return getLocalDateKey(new Date(meal.loggedAt));
}

function getSelectedFoodDateKey() {
  return String(appState.selectedFoodDateKey || getLocalDateKey());
}

function isViewingTodayFood() {
  return getSelectedFoodDateKey() === getLocalDateKey();
}

function parseDateKey(dateKey) {
  const [year, month, day] = String(dateKey).split("-").map(Number);
  return new Date(year, (month || 1) - 1, day || 1);
}

function formatFoodDateLabel(dateKey = getSelectedFoodDateKey()) {
  if (dateKey === getLocalDateKey()) return "Today";
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (dateKey === getLocalDateKey(yesterday)) return "Yesterday";
  return parseDateKey(dateKey).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function getMealsForDateKey(dateKey = getSelectedFoodDateKey()) {
  return appState.meals.filter(meal => getMealDateKey(meal) === dateKey);
}

function getSelectedFoodMeals() {
  return getMealsForDateKey(getSelectedFoodDateKey());
}

function setSelectedFoodDateKey(dateKey) {
  const clamped = String(dateKey || getLocalDateKey());
  appState.selectedFoodDateKey = clamped > getLocalDateKey() ? getLocalDateKey() : clamped;
}

function shiftSelectedFoodDate(days) {
  const nextDate = parseDateKey(getSelectedFoodDateKey());
  nextDate.setDate(nextDate.getDate() + Number(days || 0));
  setSelectedFoodDateKey(getLocalDateKey(nextDate));
}

function getRecentMeals(limit = 6, meals = appState.meals) {
  return [...meals]
    .sort((left, right) => new Date(right.loggedAt) - new Date(left.loggedAt))
    .slice(0, limit);
}

function getYesterdayMeals() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const targetKey = getLocalDateKey(yesterday);
  return appState.meals.filter(meal => getLocalDateKey(new Date(meal.loggedAt)) === targetKey);
}

function getFrequentTemplates(limit = 4) {
  return [...appState.savedTemplates]
    .sort((left, right) => {
      if (Number(right.times_logged || 0) !== Number(left.times_logged || 0)) {
        return Number(right.times_logged || 0) - Number(left.times_logged || 0);
      }
      return String(left.meal_name).localeCompare(String(right.meal_name));
    })
    .slice(0, limit);
}

function logMealObject(meal) {
  meal.id = String(meal.id || createAppId("meal"));
  appState.meals.push(meal);
  setSelectedFoodDateKey(getLocalDateKey());
  if (meal.templateId) {
    appState.savedTemplates = appState.savedTemplates.map(template => {
      if ((template.template_id || template.id) !== meal.templateId) return template;
      return normalizeTemplate({
        ...template,
        text: meal.text,
        proteins: meal.structured.proteins.map(entry => ({ ...entry })),
        carbs: meal.structured.carbs.map(entry => ({ ...entry })),
        ingredients: normalizeIngredients(meal.structured.ingredients || []),
        veggieServings: meal.structured.veggieServings,
        veggieType: meal.structured.veggieType,
        portion_multiplier: meal.portion_multiplier,
        meal_category: meal.meal_category,
        meal_name: meal.meal_name,
        label: meal.meal_name,
        notes: meal.notes || template.notes,
        estimated_macros: { ...meal.macros, fiber: Number(meal.fiber_grams || 0) },
        last_logged_at: meal.loggedAt,
        times_logged: Number(template.times_logged || 0) + 1
      });
    });
  }
}

function duplicateMealToDraft(meal) {
  appState.draftMeal = {
    editingMealId: meal.id || "",
    editingLoggedAt: meal.loggedAt || "",
    templateId: meal.templateId || "",
    mealName: meal.meal_name || meal.text,
    mealCategory: meal.meal_category || "breakfast",
    text: meal.text,
    notes: meal.notes || "",
    portionMultiplier: Number(meal.portion_multiplier || 1),
    ingredients: normalizeIngredients(meal.structured?.ingredients || []),
    proteins: normalizeProteinEntries(meal.structured || {}).map(entry => ({ ...entry })),
    carbs: normalizeCarbEntries(meal.structured || {}).map(entry => ({ ...entry })),
    veggieServings: Number(meal.structured?.veggieServings || 0),
    veggieType: meal.structured?.veggieType || ""
  };
  elements.templateStatus.textContent = `${meal.meal_name || meal.text} loaded from recent meals.`;
  saveState();
  render();
}

function beginMealEdit(meal) {
  if (!meal) return;
  duplicateMealToDraft(meal);
  if (elements.eatSecondaryShell) elements.eatSecondaryShell.open = true;
  elements.templateStatus.textContent = `Editing ${meal.meal_name || meal.text}`;
  window.setTimeout(() => {
    elements.mealEntry?.scrollIntoView({ behavior: "smooth", block: "center" });
    elements.mealEntry?.focus();
  }, 40);
}

function buildSetLog(weight, reps, rir = "") {
  return {
    reps: reps === "" ? "" : String(reps),
    weight: weight === "" ? "" : String(weight),
    rir: rir === "" ? "" : String(rir)
  };
}

function buildLoggedExercise(name, repRangeLabel, setTuples, completed = true, exerciseType = "secondary") {
  const [min, max] = String(repRangeLabel).includes("-")
    ? String(repRangeLabel).split("-").map(value => Number(value))
    : [Number(repRangeLabel) || 1, Number(repRangeLabel) || 1];
  return {
    name,
    exercise_type: exerciseType,
    repRange: { min, max, label: String(repRangeLabel) },
    targetRir: rirTargetForType(exerciseType),
    completed,
    sets: setTuples.map(([weight, reps, rir]) => buildSetLog(weight, reps, rir))
  };
}

function getWeekNumberFromKey(weekKey) {
  const match = String(weekKey || "").match(/week-(\d+)/);
  return match ? Number(match[1]) : 1;
}

function getWorkoutWeekProfile(weekKey) {
  const weekNumber = getWeekNumberFromKey(weekKey);
  if (weekNumber <= 4) {
    return {
      label: "Base build",
      note: "Stable primaries, clean volume, and familiar accessories to build rhythm."
    };
  }
  if (weekNumber <= 8) {
    return {
      label: "Progress push",
      note: "Same main patterns with slightly fresher accessories to keep progress moving."
    };
  }
  return {
    label: "Variation block",
    note: "Keep the main intent, rotate the support work, and stay mentally fresh."
  };
}

function getExerciseTemplate(name, fallback = null) {
  if (exerciseTemplateIndex.has(name)) return exerciseTemplateIndex.get(name);
  const normalized = String(name || "").toLowerCase();
  const infer = (exerciseType, min, max, defaultSets) => buildExerciseConfig(name, exerciseType, min, max, defaultSets);
  if (/(bench|press|squat|deadlift|row|pull-up|pulldown|hip thrust|sled push)/.test(normalized)) return infer("primary", 6, 8, 4);
  if (/(curl|raise|fly|pushdown|extension|rear delt|lateral|preacher|calf|leg extension|leg curl)/.test(normalized)) return infer("isolation", 10, 15, 3);
  if (/(walk|sauna|light cardio|mobility|pickleball)/.test(normalized)) return infer("secondary", 1, 1, 1);
  if (/(crunch|leg raise|ab wheel|dead bug|wood chop|plank)/.test(normalized)) return infer("secondary", 10, 15, 3);
  return fallback || null;
}

function cloneSessionExercise(exercise, sessionId, exerciseIndex) {
  return {
    id: `${sessionId}-exercise-${exerciseIndex}`,
    name: exercise.name,
    exercise_type: exercise.exercise_type,
    adHoc: Boolean(exercise.adHoc),
    supersetGroupId: String(exercise.supersetGroupId || ""),
    repRange: exercise.repRange,
    targetRir: exercise.targetRir,
    completed: false,
    sets: Array.from({ length: exercise.defaultSets }, (_, setIndex) => ({
      id: `${sessionId}-exercise-${exerciseIndex}-set-${setIndex}`,
      reps: "",
      weight: "",
      rir: ""
    }))
  };
}

function isWorkoutSetBlank(set) {
  return String(set?.reps ?? "").trim() === ""
    && String(set?.weight ?? "").trim() === ""
    && String(set?.rir ?? "").trim() === "";
}

function getSuggestedRirValue(exercise) {
  const target = exercise?.targetRir;
  if (!target) return "";
  if (Number.isFinite(target.max)) return String(target.max);
  if (Number.isFinite(target.min)) return String(target.min);
  return "";
}

function getSuggestedWeightValue(exercise, suggestion, previousExerciseLog, setIndex) {
  const previousSetWeight = String(previousExerciseLog?.sets?.[setIndex]?.weight ?? "").trim();
  if (previousSetWeight) return previousSetWeight;

  const suggestionWeight = Number(suggestion?.suggested_weight || 0);
  if (suggestionWeight > 0) {
    if (exercise.exercise_type === "primary" && setIndex > 0) {
      const step = getWeightStep(exercise.name);
      const rawBackoff = suggestionWeight * 0.9;
      return String(Math.max(step, Math.round(rawBackoff / step) * step));
    }
    return String(suggestionWeight);
  }

  return "";
}

function getSuggestedRepValue(exercise, setIndex) {
  const min = parseBottomOfRange(exercise.repRange);
  const max = parseTopOfRange(exercise.repRange);
  if (!min && !max) return "";
  if (exercise.exercise_type === "primary") {
    const topSetReps = min || max || "";
    const backoffReps = Math.min(max || min || 0, (min || max || 0) + 1);
    return String(setIndex === 0 ? topSetReps : backoffReps);
  }
  const midpoint = min && max ? Math.round((min + max) / 2) : (min || max || "");
  return String(midpoint);
}

function autofillWorkoutExerciseSets(exercise, options = {}) {
  const force = Boolean(options.force);
  if (!Array.isArray(exercise?.sets) || !exercise.sets.length) return false;
  const hasAnySetValues = exercise.sets.some(set => !isWorkoutSetBlank(set));
  if (hasAnySetValues && !force) return false;

  const previous = getPreviousPerformance(exercise.name);
  const previousExerciseLog = getPreviousExerciseLog(exercise.name);
  const suggestion = getProgressionSuggestion(exercise, previous);
  const suggestedRir = getSuggestedRirValue(exercise);

  exercise.sets = exercise.sets.map((set, setIndex) => ({
    ...set,
    weight: getSuggestedWeightValue(exercise, suggestion, previousExerciseLog, setIndex),
    reps: String(previousExerciseLog?.sets?.[setIndex]?.reps ?? "").trim() || getSuggestedRepValue(exercise, setIndex),
    rir: String(previousExerciseLog?.sets?.[setIndex]?.rir ?? "").trim() || suggestedRir
  }));

  return true;
}

function resolveWeekExerciseVariant(exercise, weekKey, exerciseIndex) {
  if (!exercise || exercise.exercise_type === "primary") return exercise;
  const pool = exerciseVariantPools[exercise.name];
  if (!Array.isArray(pool) || !pool.length) return exercise;
  const blockIndex = Math.floor((getWeekNumberFromKey(weekKey) - 1) / 4);
  const variantIndex = Math.min(pool.length - 1, blockIndex);
  return pool[(variantIndex + (exerciseIndex % pool.length)) % pool.length] || exercise;
}

function deriveSessionLiftLists(exercises) {
  const names = (exercises || []).map(exercise => exercise.name).filter(Boolean);
  return {
    primary_lifts: (exercises || [])
      .filter(exercise => exercise.exercise_type === "primary")
      .map(exercise => exercise.name),
    accessory_lifts: names.filter((name, index) => {
      const exercise = exercises[index];
      return exercise && exercise.exercise_type !== "primary";
    })
  };
}

function estimateWorkoutMinutes(session) {
  const exercises = session?.exercises || [];
  const totalSets = exercises.reduce((sum, exercise) => sum + (exercise.sets?.length || 0), 0);
  return Math.max(20, Math.round(totalSets * 2.5 + exercises.length * 2));
}

function getDayExerciseOptions(dayKey, exerciseType = "secondary") {
  const pool = dayExercisePools[dayKey] || {};
  const options = [
    ...(pool.primary || []),
    ...(pool.secondary || []),
    ...(pool.isolation || []),
    ...(pool.core || [])
  ];
  const typeSpecific = exerciseType === "primary"
    ? [...(pool.primary || []), ...(pool.secondary || [])]
    : exerciseType === "isolation"
      ? [...(pool.isolation || []), ...(pool.secondary || [])]
      : exerciseType === "secondary"
        ? [...(pool.secondary || []), ...(pool.core || []), ...(pool.isolation || [])]
        : options;
  const seen = new Set();
  return (typeSpecific.length ? typeSpecific : options).filter(name => {
    const normalized = normalizeQuery(name);
    if (!normalized || seen.has(normalized)) return false;
    seen.add(normalized);
    return true;
  });
}

function addWorkoutExercise() {
  workoutAddPanelOpen = !workoutAddPanelOpen;
  if (workoutAddPanelOpen) {
    workoutAddQuery = "";
    workoutAddInsertMode = expandedWorkoutExerciseId && expandedWorkoutExerciseId !== "__none" ? "after_current" : "end";
    workoutAddSupersetWithCurrent = false;
  }
  renderWorkout();
}

function insertWorkoutExerciseByName(name, options = {}) {
  const session = ensureWorkoutSession(appState.trainingDay);
  const template = getExerciseTemplate(name, buildExerciseConfig(name, "secondary", 8, 12, 3));
  const nextExercise = cloneSessionExercise({
    ...template,
    name,
    adHoc: true,
    supersetGroupId: options.supersetGroupId || ""
  }, session.id, session.exercises.length);
  autofillWorkoutExerciseSets(nextExercise);

  const currentIndex = session.exercises.findIndex(exercise => exercise.id === options.afterExerciseId);
  const insertIndex = options.mode === "after_current" && currentIndex >= 0
    ? currentIndex + 1
    : session.exercises.length;

  const nextExercises = [...session.exercises];
  nextExercises.splice(insertIndex, 0, nextExercise);
  session.exercises = nextExercises.map((exercise, exerciseIndex) => ({
    ...exercise,
    id: `${session.id}-exercise-${exerciseIndex}`,
    sets: (exercise.sets || []).map((set, setIndex) => ({
      ...set,
      id: `${session.id}-exercise-${exerciseIndex}-set-${setIndex}`
    }))
  }));

  const insertedExercise = session.exercises[insertIndex];
  const liftLists = deriveSessionLiftLists(session.exercises);
  session.primary_lifts = liftLists.primary_lifts;
  session.accessory_lifts = liftLists.accessory_lifts;
  expandedWorkoutExerciseId = insertedExercise.id;
  workoutAddPanelOpen = false;
  workoutAddQuery = "";
  workoutAddSupersetWithCurrent = false;
  queueWorkoutScroll(insertedExercise.id);
  finalizeWorkoutDay();
  saveState();
  renderWorkout();
  renderDashboard();
  renderCoach();
}

function autofillWorkoutExercise(exerciseId) {
  const session = ensureWorkoutSession(appState.trainingDay);
  const exercise = (session.exercises || []).find(item => item.id === exerciseId);
  if (!exercise) return;
  autofillWorkoutExerciseSets(exercise, { force: true });
  expandedWorkoutExerciseId = exercise.id;
  finalizeWorkoutDay();
  saveState();
  renderWorkout();
  renderDashboard();
  renderCoach();
}

function rebuildExerciseSetIds(session, exercise, exerciseIndex) {
  exercise.sets = (exercise.sets || []).map((set, setIndex) => ({
    ...set,
    id: `${session.id}-exercise-${exerciseIndex}-set-${setIndex}`
  }));
}

function addWorkoutSet(exerciseId) {
  const session = ensureWorkoutSession(appState.trainingDay);
  const exerciseIndex = (session.exercises || []).findIndex(item => item.id === exerciseId);
  if (exerciseIndex < 0) return;
  const exercise = session.exercises[exerciseIndex];
  const lastSet = exercise.sets?.[exercise.sets.length - 1] || { reps: "", weight: "", rir: "" };
  exercise.sets = [...(exercise.sets || []), {
    ...lastSet,
    reps: String(lastSet.reps ?? "").trim(),
    weight: String(lastSet.weight ?? "").trim(),
    rir: String(lastSet.rir ?? "").trim()
  }];
  rebuildExerciseSetIds(session, exercise, exerciseIndex);
  expandedWorkoutExerciseId = exercise.id;
  finalizeWorkoutDay();
  saveState();
  renderWorkout();
  renderDashboard();
  renderCoach();
}

function duplicateWorkoutSet(exerciseId, setIndex) {
  const session = ensureWorkoutSession(appState.trainingDay);
  const exerciseIndex = (session.exercises || []).findIndex(item => item.id === exerciseId);
  if (exerciseIndex < 0) return;
  const exercise = session.exercises[exerciseIndex];
  const sourceSet = exercise.sets?.[setIndex];
  if (!sourceSet) return;
  const nextSets = [...exercise.sets];
  nextSets.splice(setIndex + 1, 0, {
    ...sourceSet,
    reps: String(sourceSet.reps ?? "").trim(),
    weight: String(sourceSet.weight ?? "").trim(),
    rir: String(sourceSet.rir ?? "").trim()
  });
  exercise.sets = nextSets;
  rebuildExerciseSetIds(session, exercise, exerciseIndex);
  expandedWorkoutExerciseId = exercise.id;
  finalizeWorkoutDay();
  saveState();
  renderWorkout();
  renderDashboard();
  renderCoach();
}

function removeWorkoutSet(exerciseId, setIndex) {
  const session = ensureWorkoutSession(appState.trainingDay);
  const exerciseIndex = (session.exercises || []).findIndex(item => item.id === exerciseId);
  if (exerciseIndex < 0) return;
  const exercise = session.exercises[exerciseIndex];
  if ((exercise.sets || []).length <= 1) return;
  exercise.sets = exercise.sets.filter((_, index) => index !== setIndex);
  rebuildExerciseSetIds(session, exercise, exerciseIndex);
  expandedWorkoutExerciseId = exercise.id;
  finalizeWorkoutDay();
  saveState();
  renderWorkout();
  renderDashboard();
  renderCoach();
}

function removeWorkoutExercise(exerciseId) {
  const session = ensureWorkoutSession(appState.trainingDay);
  if (!session?.exercises?.length) return;
  const nextExercises = session.exercises.filter(exercise => exercise.id !== exerciseId);
  if (!nextExercises.length) return;
  session.exercises = nextExercises.map((exercise, exerciseIndex) => ({
    ...exercise,
    id: `${session.id}-exercise-${exerciseIndex}`,
    sets: (exercise.sets || []).map((set, setIndex) => ({
      ...set,
      id: `${session.id}-exercise-${exerciseIndex}-set-${setIndex}`
    }))
  }));
  const remainingSupersetMembers = session.exercises.filter(exercise => exercise.supersetGroupId);
  const groupedCounts = remainingSupersetMembers.reduce((map, exercise) => {
    map.set(exercise.supersetGroupId, (map.get(exercise.supersetGroupId) || 0) + 1);
    return map;
  }, new Map());
  session.exercises = session.exercises.map(exercise => ({
    ...exercise,
    supersetGroupId: exercise.supersetGroupId && groupedCounts.get(exercise.supersetGroupId) > 1
      ? exercise.supersetGroupId
      : ""
  }));
  const liftLists = deriveSessionLiftLists(session.exercises);
  session.primary_lifts = liftLists.primary_lifts;
  session.accessory_lifts = liftLists.accessory_lifts;
  expandedWorkoutExerciseId = session.exercises[0]?.id || "__none";
  finalizeWorkoutDay();
  saveState();
  renderWorkout();
  renderDashboard();
  renderCoach();
}

function resetWorkoutSession() {
  const dayKey = appState.trainingDay;
  const weekKey = appState.selectedWeek;
  const sessionLabel = getSessionDisplayLabel(dayKey);
  if (!confirm(`Reset ${sessionLabel} back to the default workout for ${formatWeekLabel(weekKey)}? Current exercise swaps and set entries for this session will be replaced.`)) return;

  appState.workoutSessions[weekKey] = appState.workoutSessions[weekKey] || {};
  appState.workoutSessions[weekKey][dayKey] = createWorkoutSession(dayKey);
  expandedWorkoutExerciseId = appState.workoutSessions[weekKey][dayKey]?.exercises?.[0]?.id || "";
  activeWorkoutSetInput = null;
  finalizeWorkoutDay();
  saveState();
  renderWorkout();
  renderDashboard();
  renderCoach();
}

function emptyMicros() {
  return {
    fiber: 0,
    potassium: 0,
    calcium: 0,
    iron: 0,
    omega3: 0,
    vitaminC: 0
  };
}

function addMicros(total, addition) {
  Object.keys(total).forEach(key => {
    total[key] += addition[key] || 0;
  });
}

function getProteinMicros(entry) {
  const amount = Number(entry.proteinAmount || 0);
  if (!amount || !entry.proteinType) return emptyMicros();
  const factor = entry.proteinUnit === "oz" ? amount
    : entry.proteinUnit === "grams" ? amount / 28.35
    : amount;

  const map = {
    eggs: { calcium: 28, iron: 0.9 },
    "Greek yogurt": { calcium: 120, potassium: 140 },
    "cottage cheese": { calcium: 110, potassium: 90 },
    whey: { calcium: 120, potassium: 160 },
    salmon: { omega3: 500, potassium: 120, vitaminC: 0 },
    cod: { potassium: 120 },
    "flank steak": { iron: 0.35, potassium: 90 },
    ribeye: { iron: 0.45, potassium: 95 },
    "ground beef": { iron: 0.4, potassium: 85 },
    "chicken breast": { potassium: 75 },
    "chicken thigh": { potassium: 70 },
    "ground chicken": { potassium: 70 },
    "lean ground turkey": { potassium: 80 }
  };

  const base = map[entry.proteinType] || {};
  const multiplier = entry.proteinUnit === "count" || entry.proteinUnit === "scoops" ? amount : factor;
  return {
    fiber: 0,
    potassium: (base.potassium || 0) * multiplier,
    calcium: (base.calcium || 0) * multiplier,
    iron: (base.iron || 0) * multiplier,
    omega3: (base.omega3 || 0) * multiplier,
    vitaminC: 0
  };
}

function getCarbMicros(entry) {
  const amount = Number(entry.carbAmount || 0);
  if (!amount || !entry.carbType) return emptyMicros();
  const multiplier = amount;
  const map = {
    "white rice": { potassium: 55 },
    "brown rice": { fiber: 3.5, magnesium: 0, potassium: 80 },
    potato: { potassium: 900, fiber: 4 },
    "sweet potato": { potassium: 540, fiber: 4, vitaminC: 20 },
    quinoa: { fiber: 5, iron: 1.4, potassium: 320 },
    sourdough: { fiber: 1.5, potassium: 40, iron: 0.7 },
    pretzels: { iron: 1, potassium: 70 },
    fruit: { fiber: 4, potassium: 250, vitaminC: 35 },
    oats: { fiber: 8, iron: 2.2, potassium: 300 }
  };
  const base = map[entry.carbType] || {};
  return {
    fiber: (base.fiber || 0) * multiplier,
    potassium: (base.potassium || 0) * multiplier,
    calcium: 0,
    iron: (base.iron || 0) * multiplier,
    omega3: 0,
    vitaminC: (base.vitaminC || 0) * multiplier
  };
}

function getVeggieMicros(type, servings) {
  const amount = Number(servings || 0);
  if (!amount) return emptyMicros();
  const map = {
    spinach: { fiber: 2, potassium: 420, calcium: 120, iron: 1.2, vitaminC: 14 },
    broccoli: { fiber: 4, potassium: 460, calcium: 62, vitaminC: 80 },
    carrots: { fiber: 3, potassium: 320, vitaminC: 8 },
    cucumber: { fiber: 1, potassium: 180, vitaminC: 4 },
    beets: { fiber: 4, potassium: 260, vitaminC: 6, iron: 0.8 },
    lettuce: { fiber: 1, potassium: 140, vitaminC: 5 },
    onion: { fiber: 2, potassium: 140, vitaminC: 8 },
    tomato: { fiber: 2, potassium: 290, vitaminC: 17 },
    peppers: { fiber: 2, potassium: 210, vitaminC: 95 },
    greens: { fiber: 3, potassium: 300, calcium: 100, iron: 1, vitaminC: 30 },
    "mixed vegetables": { fiber: 3, potassium: 260, vitaminC: 18 }
  };
  const base = map[type] || map["mixed vegetables"];
  return {
    fiber: (base.fiber || 0) * amount,
    potassium: (base.potassium || 0) * amount,
    calcium: (base.calcium || 0) * amount,
    iron: (base.iron || 0) * amount,
    omega3: 0,
    vitaminC: (base.vitaminC || 0) * amount
  };
}

function getMicronutrientTotals() {
  return getSelectedFoodMeals().reduce((totals, meal) => {
    normalizeProteinEntries(meal.structured || {}).forEach(entry => addMicros(totals, getProteinMicros(entry)));
    normalizeCarbEntries(meal.structured || {}).forEach(entry => addMicros(totals, getCarbMicros(entry)));
    normalizeIngredients(meal.structured?.ingredients || []).forEach(ingredient => {
      if (ingredient.optional_flag && !ingredient.enabled) return;
      addMicros(totals, {
        fiber: Number(ingredient.macro_estimate?.fiber || 0) * Number(meal.portion_multiplier || 1),
        potassium: Number(ingredient.macro_estimate?.potassium || 0) * Number(meal.portion_multiplier || 1),
        calcium: Number(ingredient.macro_estimate?.calcium || 0) * Number(meal.portion_multiplier || 1),
        iron: Number(ingredient.macro_estimate?.iron || 0) * Number(meal.portion_multiplier || 1),
        omega3: Number(ingredient.macro_estimate?.omega3 || 0) * Number(meal.portion_multiplier || 1),
        vitaminC: Number(ingredient.macro_estimate?.vitaminC || 0) * Number(meal.portion_multiplier || 1)
      });
    });
    addMicros(totals, getVeggieMicros(meal.structured?.veggieType, meal.structured?.veggieServings));
    return totals;
  }, emptyMicros());
}

function createWorkoutSession(dayKey) {
  const plan = trainingPlan[dayKey];
  if (!plan) {
    return {
      id: `session-${appState.selectedWeek}-${dayKey}`,
      dayKey,
      weekKey: appState.selectedWeek,
      label: "Workout",
      type: "strength",
      focus: "strength",
      primary_lifts: [],
      accessory_lifts: [],
      core_block: true,
      createdAt: new Date().toISOString(),
      exercises: []
    };
  }
  const sessionId = `session-${appState.selectedWeek}-${dayKey}`;
  const generatedExercises = plan.exercises.map((exercise, exerciseIndex) =>
    resolveWeekExerciseVariant(exercise, appState.selectedWeek, exerciseIndex)
  );
  const liftLists = deriveSessionLiftLists(generatedExercises);
  const weekProfile = getWorkoutWeekProfile(appState.selectedWeek);
  return {
    id: sessionId,
    dayKey,
    weekKey: appState.selectedWeek,
    label: plan.label,
    type: plan.type,
    focus: plan.focus,
    primary_lifts: liftLists.primary_lifts,
    accessory_lifts: liftLists.accessory_lifts,
    core_block: plan.core_block,
    generatorLabel: weekProfile.label,
    generatorNote: weekProfile.note,
    createdAt: new Date().toISOString(),
    exercises: generatedExercises.map((exercise, exerciseIndex) => {
      const clonedExercise = cloneSessionExercise(exercise, sessionId, exerciseIndex);
      autofillWorkoutExerciseSets(clonedExercise);
      return clonedExercise;
    })
  };
}

function ensureWorkoutSession(dayKey) {
  normalizeWorkoutSelections();
  if (!appState.workoutSessions[appState.selectedWeek]) {
    appState.workoutSessions[appState.selectedWeek] = {};
  }
  if (!appState.workoutSessions[appState.selectedWeek][dayKey]) {
    appState.workoutSessions[appState.selectedWeek][dayKey] = createWorkoutSession(dayKey);
  }
  return appState.workoutSessions[appState.selectedWeek][dayKey];
}

function getAllExerciseEntries(exerciseName) {
  return Object.entries(appState.workoutSessions || {})
    .flatMap(([weekKey, weekSessions]) => Object.values(weekSessions || {}).map(session => ({ weekKey, session })))
    .flatMap(({ weekKey, session }) => (session.exercises || [])
      .filter(exercise => exercise.name === exerciseName)
      .map(exercise => ({
        weekKey,
        sessionDay: session.dayKey,
        best: getBestSet(exercise)
      })))
    .filter(entry => entry.best && (entry.best.bestWeight > 0 || entry.best.bestReps > 0))
    .sort((left, right) => Number(left.weekKey.replace("week-", "")) - Number(right.weekKey.replace("week-", "")));
}

function getPreviousPerformance(exerciseName) {
  const history = getAllExerciseEntries(exerciseName).filter(entry => entry.weekKey !== appState.selectedWeek);
  return history[history.length - 1]?.best || null;
}

function getPreviousExerciseLog(exerciseName) {
  const entries = Object.entries(appState.workoutSessions || {})
    .flatMap(([weekKey, weekSessions]) => Object.values(weekSessions || {}).map(session => ({ weekKey, session })))
    .flatMap(({ weekKey, session }) => (session.exercises || []).map(exercise => ({
      weekKey,
      sessionDay: session.dayKey,
      exercise
    })))
    .filter(entry => entry.exercise?.name === exerciseName)
    .filter(entry => !(entry.weekKey === appState.selectedWeek && entry.sessionDay === appState.trainingDay))
    .filter(entry => {
      const best = getBestSet(entry.exercise);
      return entry.exercise?.completed || (best && (best.bestWeight > 0 || best.bestReps > 0));
    })
    .sort((left, right) => {
      const leftWeek = Number(String(left.weekKey).replace("week-", ""));
      const rightWeek = Number(String(right.weekKey).replace("week-", ""));
      return leftWeek - rightWeek;
    });
  return entries[entries.length - 1]?.exercise || null;
}

function formatSetPreview(set) {
  const reps = String(set?.reps ?? "").trim();
  const weight = String(set?.weight ?? "").trim();
  const rir = String(set?.rir ?? "").trim();
  const base = weight && reps ? `${weight} x ${reps}` : weight || reps || "";
  if (!base) return "";
  return rir ? `${base} @ ${rir} RIR` : base;
}

function formatExerciseSetPreview(exercise, limit = 4) {
  const previews = (exercise?.sets || [])
    .map(formatSetPreview)
    .filter(Boolean)
    .slice(0, limit);
  return previews.length ? previews.join(" • ") : "No prior working sets logged";
}

function copyPreviousWorkoutExercise(exerciseId) {
  const session = ensureWorkoutSession(appState.trainingDay);
  const exerciseIndex = session.exercises.findIndex(exercise => exercise.id === exerciseId);
  if (exerciseIndex < 0) return;
  const currentExercise = session.exercises[exerciseIndex];
  const previousExercise = getPreviousExerciseLog(currentExercise.name);
  if (!previousExercise) return;

  const nextSetCount = Math.max(currentExercise.sets.length, previousExercise.sets?.length || 0);
  currentExercise.sets = Array.from({ length: nextSetCount }, (_, setIndex) => {
    const previousSet = previousExercise.sets?.[setIndex] || {};
    const currentSet = currentExercise.sets?.[setIndex] || {};
    return {
      ...currentSet,
      id: currentSet.id || `${session.id}-exercise-${exerciseIndex}-set-${setIndex}`,
      reps: previousSet.reps ?? currentSet.reps ?? "",
      weight: previousSet.weight ?? currentSet.weight ?? "",
      rir: previousSet.rir ?? currentSet.rir ?? ""
    };
  });

  expandedWorkoutExerciseId = currentExercise.id;
  finalizeWorkoutDay();
  saveState();
  renderWorkout();
  renderDashboard();
  renderCoach();
}

function getWorkoutReadiness() {
  const recovery = appState.recoveryLog || defaults.recoveryLog;
  let score = Number(recovery.energy || 0);
  if (recovery.hydrated) score += 1;
  if (recovery.nightStack) score += 0.5;
  if (recovery.sauna) score -= 0.25;
  if (recovery.fullness === "stuffed") score -= 1;
  if (recovery.fullness === "flat") score -= 0.5;

  if (score >= 8.5) {
    return {
      label: "ready to push",
      note: "Recovery looks strong. Push the top set if warm-ups feel sharp."
    };
  }
  if (score >= 6.5) {
    return {
      label: "solid",
      note: "Normal green-light day. Hit the plan and earn progression."
    };
  }
  if (score >= 5) {
    return {
      label: "hold steady",
      note: "Keep quality high and let great reps beat forced load jumps."
    };
  }
  return {
    label: "pull back slightly",
    note: "Treat today like a quality day. Match last week cleanly before adding stress."
  };
}

function getTopSetBackoffPlan(exercise, suggestion, lastExerciseLog) {
  const repLabel = formatRepRange(exercise.repRange);
  const previousTopSet = lastExerciseLog ? formatExerciseSetPreview(lastExerciseLog, 1) : "";
  if (exercise.exercise_type === "primary") {
    const topWeight = Number(suggestion.suggested_weight || 0);
    if (topWeight > 0) {
      const backoff = Math.max(0, Math.round((topWeight * 0.9) / 5) * 5);
      return {
        headline: `Top set: ${topWeight} x ${repLabel}`,
        detail: `Then 2 backoff sets around ${backoff} for clean, repeatable reps.`
      };
    }
    return {
      headline: `Top set: build to a solid ${repLabel}`,
      detail: previousTopSet
        ? `Use ${previousTopSet} as your reference, then add load only if bar speed feels good.`
        : "Take 2-3 warm-up jumps, then find a smooth working top set you can own."
    };
  }

  return {
    headline: `Working sets: ${repLabel}`,
    detail: previousTopSet
      ? `Start near ${previousTopSet}, then keep the next sets matched and controlled.`
      : "Find a working weight that lets you own the full range and keep every set clean."
  };
}

function getDefaultRestSeconds(exerciseType = "secondary") {
  if (exerciseType === "primary") return 150;
  if (exerciseType === "isolation") return 75;
  return 105;
}

function formatRestCountdown(totalSeconds) {
  const seconds = Math.max(0, Math.round(totalSeconds));
  const minutes = Math.floor(seconds / 60);
  const remaining = String(seconds % 60).padStart(2, "0");
  return `${minutes}:${remaining}`;
}

function renderWorkoutRestTimerState() {
  const remainingMs = workoutRestTimer.endAt - Date.now();
  const states = [
    ...(elements.workoutSnapshot?.querySelectorAll("[data-rest-timer-state]") || []),
    ...(elements.workoutList?.querySelectorAll("[data-rest-timer-state]") || [])
  ];
  if (!states.length) return;
  if (remainingMs <= 0) {
    states.forEach(state => {
      state.textContent = "Rest ready";
      state.dataset.active = "false";
    });
    return;
  }
  const label = `${workoutRestTimer.label || "Rest"} • ${formatRestCountdown(remainingMs / 1000)}`;
  states.forEach(state => {
    state.textContent = label;
    state.dataset.active = "true";
  });
}

function stopWorkoutRestTimer() {
  workoutRestTimer = { endAt: 0, label: "", seconds: 0 };
  if (workoutRestTimerHandle) {
    window.clearInterval(workoutRestTimerHandle);
    workoutRestTimerHandle = null;
  }
  renderWorkoutRestTimerState();
}

function startWorkoutRestTimer(seconds, label = "Rest") {
  workoutRestTimer = {
    endAt: Date.now() + seconds * 1000,
    label,
    seconds
  };
  if (workoutRestTimerHandle) window.clearInterval(workoutRestTimerHandle);
  renderWorkoutRestTimerState();
  workoutRestTimerHandle = window.setInterval(() => {
    if (workoutRestTimer.endAt <= Date.now()) {
      stopWorkoutRestTimer();
      return;
    }
    renderWorkoutRestTimerState();
  }, 1000);
}

function parseTopOfRange(repRange) {
  if (typeof repRange === "object" && repRange) return repRange.max;
  const match = String(repRange).match(/(\d+)\s*-\s*(\d+)/);
  if (match) return Number(match[2]);
  const single = String(repRange).match(/(\d+)/);
  return single ? Number(single[1]) : null;
}

function parseBottomOfRange(repRange) {
  if (typeof repRange === "object" && repRange) return repRange.min;
  const match = String(repRange).match(/(\d+)\s*-\s*(\d+)/);
  if (match) return Number(match[1]);
  const single = String(repRange).match(/(\d+)/);
  return single ? Number(single[1]) : null;
}

function formatRepRange(repRange) {
  if (typeof repRange === "object" && repRange) return repRange.label;
  return String(repRange);
}

function getWeightStep(exerciseName) {
  const lowerKeywords = ["squat", "deadlift", "hip thrust", "leg press", "lunge", "row"];
  return lowerKeywords.some(keyword => exerciseName.toLowerCase().includes(keyword)) ? 10 : 5;
}

function getNumericWeight(value) {
  return parseFloat(value || 0) || 0;
}

function getProgressionSuggestion(exercise, lastSession) {
  const repRange = exercise.repRange;
  const min = parseBottomOfRange(repRange);
  const max = parseTopOfRange(repRange);
  const lastWeight = lastSession?.bestWeight || 0;
  const lastReps = lastSession?.bestReps || 0;
  const repLabel = formatRepRange(repRange);

  if (!lastSession || !lastWeight) {
    return {
      suggested_weight: 0,
      suggested_weight_text: "log baseline",
      suggested_reps_target: repLabel,
      progression_status: "maintain"
    };
  }

  if (lastReps >= max) {
    return {
      suggested_weight: lastWeight + getWeightStep(exercise.name),
      suggested_weight_text: String(lastWeight + getWeightStep(exercise.name)),
      suggested_reps_target: repLabel,
      progression_status: "progress"
    };
  }

  if (lastReps >= min) {
    return {
      suggested_weight: lastWeight,
      suggested_weight_text: String(lastWeight),
      suggested_reps_target: repLabel,
      progression_status: "maintain"
    };
  }

  const drop = Math.max(5, getWeightStep(exercise.name));
  return {
    suggested_weight: Math.max(lastWeight - drop, 0),
    suggested_weight_text: String(Math.max(lastWeight - drop, 0)),
    suggested_reps_target: repLabel,
    progression_status: "regress"
  };
}

function getRirAccuracy(exercise) {
  const target = exercise.targetRir || rirTargetForType(exercise.exercise_type || "secondary");
  const setsWithRir = exercise.sets.filter(set => set.rir !== "" && !Number.isNaN(Number(set.rir)));
  if (!setsWithRir.length) return { ratio: 0, text: `Target RIR ${target.label}` };
  const hits = setsWithRir.filter(set => {
    const rir = Number(set.rir);
    return rir >= target.min && rir <= target.max;
  }).length;
  return {
    ratio: hits / setsWithRir.length,
    text: `${hits}/${setsWithRir.length} sets on target`
  };
}

function getProgressionHint(exerciseName, repRange) {
  const history = getAllExerciseEntries(exerciseName).map(entry => entry.best);
  const top = parseTopOfRange(repRange);
  if (!top || history.length < 2) return "Log today's sets to build progression history.";

  const recent = history.slice(-2);
  const hitTopTwice = recent.every(entry => entry.bestReps >= top && entry.bestWeight > 0);
  if (hitTopTwice) return "Top of range hit twice, consider adding load.";
  return "Build reps first. Add load after two strong top-range sessions.";
}

function finalizeWorkoutDay() {
  const session = ensureWorkoutSession(appState.trainingDay);
  session.updatedAt = new Date().toISOString();
}

function getBestSet(exercise) {
  const completedSets = (exercise.sets || []).filter(set => Number(set.reps) > 0 || Number(set.weight) > 0);
  if (!completedSets.length) return null;

  const bestSet = completedSets.reduce((best, set) => {
    const currentWeight = parseFloat(set.weight || 0) || 0;
    const bestWeight = parseFloat(best.weight || 0) || 0;
    const currentScore = currentWeight * 100 + Number(set.reps || 0);
    const bestScore = bestWeight * 100 + Number(best.reps || 0);
    return currentScore > bestScore ? set : best;
  }, completedSets[0]);

  return {
    bestWeight: parseFloat(bestSet.weight || 0) || 0,
    bestWeightText: String(bestSet.weight || ""),
    bestReps: Number(bestSet.reps || 0)
  };
}

function formatBestSet(bestSet) {
  if (!bestSet) return "completed";
  const weightText = bestSet.bestWeightText || (bestSet.bestWeight ? String(bestSet.bestWeight) : "-");
  return `${weightText} x ${bestSet.bestReps}`;
}

function getPreviousWeekPerformance(exerciseName) {
  const weeks = getKnownWeekKeys();
  const currentIndex = weeks.indexOf(appState.selectedWeek);
  if (currentIndex <= 0) return null;
  const priorWeek = weeks[currentIndex - 1];
  const weekSessionGroup = appState.workoutSessions[priorWeek] || {};
  const exercise = Object.values(weekSessionGroup)
    .flatMap(session => session.exercises || [])
    .find(item => item.name === exerciseName);
  return exercise ? getBestSet(exercise) : null;
}

function formatWeekChange(current, previous) {
  if (!current || !previous) return "No prior week data yet.";
  if (!current.bestWeight || !previous.bestWeight) {
    const repDiff = current.bestReps - previous.bestReps;
    return `Vs last week: ${repDiff >= 0 ? "+" : ""}${repDiff} reps`;
  }
  const weightDiff = current.bestWeight - previous.bestWeight;
  const repDiff = current.bestReps - previous.bestReps;
  const weightText = `${weightDiff >= 0 ? "+" : ""}${weightDiff} lb`;
  const repText = `${repDiff >= 0 ? "+" : ""}${repDiff} reps`;
  return `Vs last week: ${weightText}, ${repText}`;
}

function getWorkoutCompletionScore() {
  const session = ensureWorkoutSession(appState.trainingDay);
  const completed = session.exercises.filter(exercise => exercise.completed).length;
  return session.exercises.length ? completed / session.exercises.length : 0;
}

function getSetCompletionScore(session) {
  const sets = session.exercises.flatMap(exercise => exercise.sets);
  const completed = sets.filter(set => Number(set.reps) > 0 || getNumericWeight(set.weight) > 0 || String(set.weight || "").trim() !== "").length;
  return sets.length ? completed / sets.length : 0;
}

function getProgressAchievedScore(session) {
  const primaryExercises = session.exercises.filter(exercise => exercise.exercise_type === "primary");
  if (!primaryExercises.length) return 0;
  const achieved = primaryExercises.filter(exercise => {
    const last = getPreviousPerformance(exercise.name);
    const current = getBestSet(exercise);
    if (!last || !current) return false;
    if (current.bestWeight > last.bestWeight) return true;
    if (current.bestWeight === last.bestWeight && current.bestReps > last.bestReps) return true;
    return false;
  }).length;
  return achieved / primaryExercises.length;
}

function getRirAccuracyScore(session) {
  const exercisesWithTargets = session.exercises.filter(exercise => (exercise.sets || []).some(set => set.rir !== ""));
  if (!exercisesWithTargets.length) return 0;
  const ratios = exercisesWithTargets.map(exercise => getRirAccuracy(exercise).ratio);
  return ratios.reduce((sum, ratio) => sum + ratio, 0) / ratios.length;
}

function getRecoveryCompleted() {
  return appState.recoveryLog.completed;
}

function computeScore() {
  const totals = getTotals();
  const carbTargets = getCurrentCarbTargets();
  const proteinProgress = Math.min(totals.protein / targets.protein, 1);
  const calorieAlignment = totals.calories >= targets.caloriesLow && totals.calories <= targets.caloriesHigh
    ? 1
    : Math.max(0, 1 - Math.abs(totals.calories - midpoint(targets.caloriesLow, targets.caloriesHigh)) / 700);
  const carbMid = midpoint(carbTargets.low, carbTargets.high);
  const carbAlignment = totals.carbs >= carbTargets.low && totals.carbs <= carbTargets.high
    ? 1
    : Math.max(0, 1 - Math.abs(totals.carbs - carbMid) / 80);
  const workoutCompleted = getWorkoutCompletionScore();
  const recoveryCompleted = getRecoveryCompleted() ? 1 : 0;

  const components = [
    { label: "Protein progress", weight: 35, value: proteinProgress },
    { label: "Calorie alignment", weight: 20, value: calorieAlignment },
    { label: "Carb alignment", weight: 20, value: carbAlignment },
    { label: "Workout completed", weight: 15, value: workoutCompleted },
    { label: "Recovery check-in", weight: 10, value: recoveryCompleted }
  ];

  const percentage = Math.round(components.reduce((sum, item) => sum + item.weight * item.value, 0));
  return { percentage, components };
}

function computeWorkoutScore() {
  const session = ensureWorkoutSession(appState.trainingDay);
  const exerciseCompletion = getWorkoutCompletionScore();
  const setCompletion = getSetCompletionScore(session);
  const progressionAchieved = getProgressAchievedScore(session);
  const rirAccuracy = getRirAccuracyScore(session);
  const percent = Math.round(
    exerciseCompletion * 35 +
    setCompletion * 25 +
    progressionAchieved * 20 +
    rirAccuracy * 20
  );
  return {
    score_percent: percent,
    label: percent >= 85 ? "dialed" : percent >= 60 ? "partial" : "missed",
    components: {
      exerciseCompletion,
      setCompletion,
      progressionAchieved,
      rirAccuracy
    }
  };
}

function calculateWorkoutScore() {
  return computeWorkoutScore();
}

function midpoint(low, high) {
  return (low + high) / 2;
}

function formatLeft(value, suffix = "g") {
  const amount = Math.max(value, 0);
  return `${amount}${suffix} left`;
}

function renderDashboard() {
  const selectedDateKey = getSelectedFoodDateKey();
  const selectedDateLabel = formatFoodDateLabel(selectedDateKey);
  const totals = getTotals();
  const carbTargets = getCurrentCarbTargets();
  const plan = getCurrentDayPlan();
  const score = computeScore();
  const veggieTotal = getVeggieServingsTotal();
  const mealsLogged = getSelectedFoodMeals().length;
  const hasMeals = mealsLogged > 0;
  const hasWorkoutProgress = getWorkoutCompletionScore() > 0;
  const hasRecoveryProgress = getRecoveryCompleted();
  const showLiveScore = isViewingTodayFood()
    ? hasMeals || hasWorkoutProgress || hasRecoveryProgress
    : hasMeals;

  elements.proteinOutput.value = hasMeals ? `${totals.protein}g` : "Ready";
  elements.carbOutput.value = hasMeals ? `${totals.carbs}g` : "Ready";
  elements.fatOutput.value = hasMeals ? `${totals.fat}g` : "Ready";
  elements.calorieOutput.value = hasMeals ? totals.calories.toLocaleString() : "Ready";
  if (elements.proteinRemain) {
    elements.proteinRemain.textContent = hasMeals ? formatLeft(targets.protein - totals.protein) : "Protein target set";
  }
  if (elements.carbRemain) {
    elements.carbRemain.textContent = hasMeals ? formatLeft(carbTargets.low - totals.carbs) : "Fuel target set";
  }
  if (elements.fatRemain) {
    elements.fatRemain.textContent = hasMeals ? `${Math.max(targets.fatLow - totals.fat, 0)}g left` : "Fat target set";
  }
  if (elements.calorieRemain) {
    elements.calorieRemain.textContent = hasMeals ? formatLeft(targets.caloriesLow - totals.calories, " kcal") : "Energy target set";
  }
  elements.dayType.textContent = showLiveScore
    ? (isViewingTodayFood() ? `${plan.type} day` : `${selectedDateLabel} meals`)
    : (isViewingTodayFood() ? "No activity yet today" : `No meals on ${selectedDateLabel}`);
  elements.veggieCount.textContent = hasMeals
    ? `${veggieTotal} veggie servings`
    : (isViewingTodayFood() ? "Start your first workout or meal" : "Browse another day or log today");

  if (elements.proteinBar) {
    elements.proteinBar.style.width = `${Math.min((totals.protein / targets.protein) * 100, 100)}%`;
  }
  if (elements.carbBar) {
    elements.carbBar.style.width = `${Math.min((totals.carbs / carbTargets.low) * 100, 100)}%`;
  }
  if (elements.fatBar) {
    elements.fatBar.style.width = `${Math.min((totals.fat / targets.fatLow) * 100, 100)}%`;
  }
  if (elements.calorieBar) {
    elements.calorieBar.style.width = `${Math.min((totals.calories / targets.caloriesLow) * 100, 100)}%`;
  }
  if (elements.proteinText) {
    elements.proteinText.textContent = hasMeals ? `${totals.protein}/${targets.protein}g` : "Target ready";
  }
  if (elements.carbText) {
    elements.carbText.textContent = hasMeals ? `${totals.carbs}/${carbTargets.low}g` : "Target ready";
  }
  if (elements.fatText) {
    elements.fatText.textContent = hasMeals ? `${totals.fat}/${targets.fatLow}g` : "Target ready";
  }
  if (elements.calorieText) {
    elements.calorieText.textContent = hasMeals ? `${totals.calories}/${targets.caloriesLow}` : "Target ready";
  }
  if (elements.todayProteinNote) {
    elements.todayProteinNote.textContent = hasMeals ? formatLeft(targets.protein - totals.protein) : "Your targets are ready.";
  }
  if (elements.todayCalorieNote) {
    elements.todayCalorieNote.textContent = hasMeals ? formatLeft(targets.caloriesLow - totals.calories, " kcal") : "Your targets are ready.";
  }
  if (elements.todayMealCount) {
    elements.todayMealCount.textContent = String(mealsLogged);
  }
  if (elements.todayMealNote) {
    elements.todayMealNote.textContent = hasMeals
      ? `${mealsLogged === 1 ? "Meal" : "Meals"} logged${isViewingTodayFood() ? " today" : ""}`
      : (isViewingTodayFood() ? "Start with your first meal." : `No meals on ${selectedDateLabel}.`);
  }
  if (elements.todaySummaryStatus) {
    elements.todaySummaryStatus.textContent = hasMeals
      ? `${selectedDateLabel} • ${totals.protein}g protein • ${totals.calories} kcal`
      : (isViewingTodayFood() ? "Your targets are ready." : `${selectedDateLabel} is ready to review.`);
  }
  if (elements.foodDayLabel) {
    elements.foodDayLabel.textContent = selectedDateLabel;
  }
  if (elements.foodDayNext) {
    elements.foodDayNext.disabled = isViewingTodayFood();
  }
  if (elements.todayEmptyNote) {
    elements.todayEmptyNote.hidden = hasMeals;
    elements.todayEmptyNote.textContent = hasMeals
      ? ""
      : (isViewingTodayFood() ? "No meals logged yet. Start with your first meal." : `No meals logged on ${selectedDateLabel}.`);
  }

  if (showLiveScore) {
    elements.scoreValue.textContent = `${score.percentage}%`;
    if (elements.scoreLabel) elements.scoreLabel.textContent = score.percentage >= 85 ? "dialed" : score.percentage >= 60 ? "building" : "today";
    elements.scoreRing.style.setProperty("--progress", `${score.percentage * 3.6}deg`);
    elements.scoreDetails.innerHTML = score.components
      .map(component => `<span>${component.label}: ${Math.round(component.weight * component.value)}/${component.weight}</span>`)
      .join("");
  } else {
    elements.scoreValue.textContent = "Ready";
    if (elements.scoreLabel) elements.scoreLabel.textContent = "to start";
    elements.scoreRing.style.setProperty("--progress", "0deg");
    elements.scoreDetails.innerHTML = `
      <span>${isViewingTodayFood() ? "No activity yet today." : `No meals logged on ${selectedDateLabel}.`}</span>
      <span>${isViewingTodayFood() ? "Your targets are ready." : "Use the arrows to browse days."}</span>
    `;
  }

  // Training cycle summary
  if (elements.weddingCountdown) {
    const weekNum    = getCurrentWeekNumber();
    const weekKey = currentWeekKey();
    const sessionIds = getAvailableSessionIds();
    const completedSessions = sessionIds.filter(dayKey => {
      const session = appState.workoutSessions?.[weekKey]?.[dayKey];
      return Boolean(session?.exercises?.length && session.exercises.every(exercise => exercise.completed));
    }).length;
    const nextSession = getSessionDisplayLabel(currentTrainingDay());
    const startLabel = getProgramStartDate().toLocaleDateString(undefined, { month: "short", day: "numeric" });
    elements.weddingCountdown.innerHTML = `
      <div class="countdown-stat"><strong>Week ${weekNum}</strong><span>of 12</span></div>
      <div class="countdown-stat"><strong>${completedSessions}/${sessionIds.length}</strong><span>sessions done</span></div>
      <div class="countdown-stat"><strong>${nextSession}</strong><span>next up</span></div>
      <div class="countdown-stat"><span>Training cycle started ${startLabel}</span></div>
    `;
  }
}

function buildMealLoggedFeedback(meal) {
  const proteinAdded = Math.round(Number(meal?.macros?.protein || 0));
  const caloriesAdded = Math.round(Number(meal?.macros?.calories || 0));
  const totals = getTotals();
  const proteinPercent = Math.round(Math.min((Number(totals.protein || 0) / Math.max(Number(targets.protein || 1), 1)) * 100, 999));
  return `Logged • ${proteinAdded}P • ${caloriesAdded} kcal • ${proteinPercent}% protein`;
}

function renderMicronutrients() {
  const totals = getMicronutrientTotals();
  elements.microList.innerHTML = "";
  Object.entries(micronutrientTargets).forEach(([key, config]) => {
    const current = Math.round(totals[key] || 0);
    const percent = Math.min(Math.round((current / config.target) * 100), 100);
    const card = document.createElement("article");
    card.className = "micro-card";
    card.innerHTML = `
      <div class="micro-head">
        <strong>${config.label}</strong>
        <span>${current}/${config.target}${config.unit}</span>
      </div>
      <div class="bar micro-bar"><i style="width:${percent}%"></i></div>
      <small>${percent >= 100 ? "covered" : percent >= 65 ? "solid" : "light"}</small>
    `;
    elements.microList.appendChild(card);
  });
}

function renderMealDraft() {
  if (!appState.draftMeal.showAdvanced) {
    elements.mealRefine.innerHTML = "";
    return;
  }
  appState.draftMeal.ingredients.forEach((_, index) => syncIngredientAutoMacros(index));
  setInputValueSafely(elements.mealEntry, appState.draftMeal.text);
  const computed = calculateMealFromDraft(appState.draftMeal);
  const parsed = computed.parsed;
  const proteinPrompt = computed.needsProteinRefinement ? "Protein detail would improve this estimate." : "Protein detail locked in.";
  const carbPrompt = computed.needsCarbRefinement ? "Carb portion is worth refining." : "Carb detail looks covered.";
  const portionOptions = [0.5, 1, 1.5, 2];

  elements.mealRefine.innerHTML = `
    <div class="refine-card">
      <div class="refine-head">
        <strong>Optional refine</strong>
        <small>${proteinPrompt} ${carbPrompt}</small>
      </div>
      <div class="refine-grid meal-meta-grid">
        <label>
          Meal name
          <input data-field="mealName" type="text" value="${appState.draftMeal.mealName}">
        </label>
        <label>
          Category
          <select data-field="mealCategory">
            ${mealCategoryOptions.map(option => `<option value="${option}"${option === appState.draftMeal.mealCategory ? " selected" : ""}>${option}</option>`).join("")}
          </select>
        </label>
        <label>
          Portion
          <select data-field="portionMultiplier">
            ${portionOptions.map(option => `<option value="${option}"${Number(option) === Number(appState.draftMeal.portionMultiplier) ? " selected" : ""}>${option}x</option>`).join("")}
            <option value="custom"${!portionOptions.includes(Number(appState.draftMeal.portionMultiplier)) ? " selected" : ""}>custom</option>
          </select>
        </label>
        <label>
          Custom scale
          <input data-field="portionMultiplierCustom" type="text" inputmode="decimal" value="${appState.draftMeal.portionMultiplier}">
        </label>
      </div>
      <div class="protein-stack">
        <div class="protein-stack-head">
          <strong>Protein entries</strong>
          <button class="ghost-button compact" type="button" id="addProteinEntry">Add protein</button>
        </div>
        ${appState.draftMeal.proteins.map((proteinEntry, index) => `
          <div class="protein-entry">
            <div class="protein-entry-grid">
              <label>
                Protein type
                <select data-protein-field="proteinType" data-protein-index="${index}">
                  ${renderOptions(proteinOptions, proteinEntry.proteinType, "Protein type")}
                </select>
              </label>
              <label>
                Protein amount
                <input data-protein-field="proteinAmount" data-protein-index="${index}" type="text" inputmode="${proteinEntry.proteinUnit === "count" || proteinEntry.proteinUnit === "scoops" ? "numeric" : "decimal"}" value="${proteinEntry.proteinAmount}">
              </label>
              <label>
                Protein unit
                <select data-protein-field="proteinUnit" data-protein-index="${index}">
                  ${renderUnitOptions(["oz", "grams", "count", "scoops"], proteinEntry.proteinUnit)}
                </select>
              </label>
              <label>
                Cooked or raw
                <select data-protein-field="cookedOrRaw" data-protein-index="${index}">
                  ${renderUnitOptions(["cooked", "raw"], proteinEntry.cookedOrRaw)}
                </select>
              </label>
            </div>
            ${appState.draftMeal.proteins.length > 1 ? `<button class="ghost-button compact remove-protein-button" type="button" data-remove-protein="${index}">Remove</button>` : ""}
          </div>
        `).join("")}
      </div>
      <div class="protein-stack">
        <div class="protein-stack-head">
          <strong>Carb entries</strong>
          <button class="ghost-button compact" type="button" id="addCarbEntry">Add carb</button>
        </div>
        ${appState.draftMeal.carbs.map((carbEntry, index) => `
          <div class="protein-entry">
            <div class="protein-entry-grid carb-entry-grid">
              <label>
                Carb type
                <select data-carb-field="carbType" data-carb-index="${index}">
                  ${renderOptions(carbOptions, carbEntry.carbType, "Carb type")}
                </select>
              </label>
              <label>
                Carb amount
                <input data-carb-field="carbAmount" data-carb-index="${index}" type="text" inputmode="${carbEntry.carbUnit === "pieces" ? "numeric" : "decimal"}" value="${carbEntry.carbAmount}">
              </label>
              <label>
                Carb unit
                <select data-carb-field="carbUnit" data-carb-index="${index}">
                  ${renderUnitOptions(["cups", "oz", "grams", "pieces"], carbEntry.carbUnit)}
                </select>
              </label>
            </div>
            ${appState.draftMeal.carbs.length > 1 ? `<button class="ghost-button compact remove-protein-button" type="button" data-remove-carb="${index}">Remove</button>` : ""}
          </div>
        `).join("")}
      </div>
      <div class="protein-stack">
        <div class="protein-stack-head">
          <strong>Ingredients</strong>
          <button class="ghost-button compact" type="button" id="addIngredientEntry">Add ingredient</button>
        </div>
        ${(appState.draftMeal.ingredients || []).map((ingredient, index) => `
          <div class="protein-entry">
            <div class="ingredient-entry-grid">
              <label>
                Ingredient
                <input data-ingredient-field="ingredient_name" data-ingredient-index="${index}" type="text" value="${ingredient.ingredient_name}">
              </label>
              <label>
                Amount
                <input data-ingredient-field="amount" data-ingredient-index="${index}" type="text" inputmode="decimal" value="${ingredient.amount}">
              </label>
              <label>
                Unit
                <input data-ingredient-field="unit" data-ingredient-index="${index}" type="text" value="${ingredient.unit}">
              </label>
              <label class="checkbox-label">
                <span>Optional</span>
                <input data-ingredient-field="optional_flag" data-ingredient-index="${index}" type="checkbox"${ingredient.optional_flag ? " checked" : ""}>
              </label>
              <label class="checkbox-label">
                <span>Use today</span>
                <input data-ingredient-field="enabled" data-ingredient-index="${index}" type="checkbox"${ingredient.enabled ? " checked" : ""}>
              </label>
            </div>
            <div class="ingredient-macro-grid">
              <label>
                Protein
                <input data-ingredient-macro="protein" data-ingredient-index="${index}" type="text" inputmode="decimal" value="${ingredient.macro_estimate.protein}">
              </label>
              <label>
                Carbs
                <input data-ingredient-macro="carbs" data-ingredient-index="${index}" type="text" inputmode="decimal" value="${ingredient.macro_estimate.carbs}">
              </label>
              <label>
                Fat
                <input data-ingredient-macro="fat" data-ingredient-index="${index}" type="text" inputmode="decimal" value="${ingredient.macro_estimate.fat}">
              </label>
              <label>
                Calories
                <input data-ingredient-macro="calories" data-ingredient-index="${index}" type="text" inputmode="numeric" value="${ingredient.macro_estimate.calories}">
              </label>
              <label>
                Fiber
                <input data-ingredient-macro="fiber" data-ingredient-index="${index}" type="text" inputmode="decimal" value="${ingredient.macro_estimate.fiber}">
              </label>
            </div>
            <button class="ghost-button compact remove-protein-button" type="button" data-remove-ingredient="${index}">Remove</button>
          </div>
        `).join("") || `<p class="refine-note">No ingredient defaults yet. Add only the extras that meaningfully change the meal.</p>`}
      </div>
      <div class="refine-grid">
        <label>
          Veggie servings
          <input data-field="veggieServings" type="text" inputmode="numeric" value="${appState.draftMeal.veggieServings}">
        </label>
        <label>
          Veggie type
          <select data-field="veggieType">
            <option value="">Veggie type</option>
            ${veggieOptions.map(option => `<option value="${option}"${option === appState.draftMeal.veggieType ? " selected" : ""}>${option}</option>`).join("")}
          </select>
        </label>
        <label class="notes-span">
          Notes
          <input data-field="notes" type="text" value="${appState.draftMeal.notes}" placeholder="Lighter day, training day version, extra oil...">
        </label>
      </div>
      <p class="refine-note" data-draft-note>${buildRefineNote(parsed, computed)}</p>
      <p class="refine-totals" data-draft-totals>${computed.macros.protein}P / ${computed.macros.carbs}C / ${computed.macros.fat}F / ${computed.macros.calories} kcal | ${Math.round(computed.fiber)}g fiber</p>
    </div>
  `;

  elements.saveTemplateDefaults.disabled = !appState.draftMeal.templateId;

  function bindDraftControl(control, handler, { rerenderOnChange = false } = {}) {
    if (!control) return;
    const tag = control.tagName;
    const type = control.type;
    const isTypingField = tag === "TEXTAREA" || (tag === "INPUT" && type !== "checkbox");
    const isSelect = tag === "SELECT";
    const isCheckbox = type === "checkbox";

    if (isTypingField) {
      control.addEventListener("input", handler);
      control.addEventListener("blur", handler);
      return;
    }

    if (isSelect || isCheckbox || rerenderOnChange) {
      control.addEventListener("change", handler);
    }
  }

  elements.mealRefine.querySelectorAll("[data-field]").forEach(control => {
    bindDraftControl(control, handleDraftFieldChange);
  });
  elements.mealRefine.querySelectorAll("[data-protein-field]").forEach(control => {
    bindDraftControl(control, handleProteinFieldChange, { rerenderOnChange: control.tagName === "SELECT" });
  });
  elements.mealRefine.querySelectorAll("[data-carb-field]").forEach(control => {
    bindDraftControl(control, handleCarbFieldChange, { rerenderOnChange: control.tagName === "SELECT" });
  });
  elements.mealRefine.querySelectorAll("[data-ingredient-field]").forEach(control => {
    bindDraftControl(control, handleIngredientFieldChange);
  });
  elements.mealRefine.querySelectorAll("[data-ingredient-macro]").forEach(control => {
    bindDraftControl(control, handleIngredientMacroChange);
  });
  elements.mealRefine.querySelector("#addProteinEntry").addEventListener("click", () => {
    appState.draftMeal.proteins.push(createEmptyProteinEntry());
    saveState();
    renderMealDraft();
  });
  elements.mealRefine.querySelector("#addCarbEntry").addEventListener("click", () => {
    appState.draftMeal.carbs.push(createEmptyCarbEntry());
    saveState();
    renderMealDraft();
  });
  elements.mealRefine.querySelector("#addIngredientEntry").addEventListener("click", () => {
    appState.draftMeal.ingredients.push(buildIngredient("", "", "serving", { protein: 0, carbs: 0, fat: 0, calories: 0, fiber: 0 }, false, true));
    saveState();
    renderMealDraft();
  });
  elements.mealRefine.querySelectorAll("[data-remove-protein]").forEach(button => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.removeProtein);
      appState.draftMeal.proteins = appState.draftMeal.proteins.filter((_, proteinIndex) => proteinIndex !== index);
      if (!appState.draftMeal.proteins.length) appState.draftMeal.proteins = [createEmptyProteinEntry()];
      saveState();
      renderMealDraft();
    });
  });
  elements.mealRefine.querySelectorAll("[data-remove-carb]").forEach(button => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.removeCarb);
      appState.draftMeal.carbs = appState.draftMeal.carbs.filter((_, carbIndex) => carbIndex !== index);
      if (!appState.draftMeal.carbs.length) appState.draftMeal.carbs = [createEmptyCarbEntry()];
      saveState();
      renderMealDraft();
    });
  });
  elements.mealRefine.querySelectorAll("[data-remove-ingredient]").forEach(button => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.removeIngredient);
      appState.draftMeal.ingredients = appState.draftMeal.ingredients.filter((_, ingredientIndex) => ingredientIndex !== index);
      saveState();
      renderMealDraft();
    });
  });
}

function renderOptions(optionMap, selected, label) {
  const entries = Object.keys(optionMap);
  return [`<option value="">${label}</option>`]
    .concat(entries.map(key => `<option value="${key}"${key === selected ? " selected" : ""}>${key}</option>`))
    .join("");
}

function renderUnitOptions(options, selected) {
  return options.map(option => `<option value="${option}"${option === selected ? " selected" : ""}>${option}</option>`).join("");
}

function buildRefineNote(parsed, computed) {
  const notes = [];
  if (parsed.cues.rge) notes.push("RGE meal: keep the quality baseline, but confirm protein and carb portion.");
  if (computed.needsProteinRefinement) notes.push("Protein is still the biggest lever.");
  if (computed.needsCarbRefinement && getCurrentDayPlan().type === "strength") notes.push("Carb detail matters more on lifting days.");
  if (!notes.length) notes.push("Free text worked well. Only refine if you want a tighter estimate.");
  return notes.join(" ");
}

function normalizeFoodSearchKey(value) {
  return String(value || "").trim().toLowerCase();
}

function parseFoodSearchQuery(text) {
  const trimmed = String(text || "").trim();
  const match = trimmed.match(/^(\d+(?:\.\d+)?)?\s*(.*)$/);
  const amount = match?.[1] || "";
  const query = normalizeFoodSearchKey(match?.[2] || trimmed);
  return { amount, query, raw: trimmed };
}

function normalizeMealIntentQuery(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/\bw\/\b/g, " with ")
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function detectSmartFoodIntent(text) {
  const normalized = normalizeMealIntentQuery(text);
  if (!normalized || normalized.length < 3) return null;
  const amountMatch = normalized.match(/(\d+(?:\.\d+)?)\s*(oz|ounce|ounces|g|gram|grams|count|each|cups?|cup)?/);
  const amount = amountMatch?.[1] || "";
  const rawUnit = amountMatch?.[2] || "";
  const normalizedUnit = rawUnit.startsWith("oz") || rawUnit.startsWith("ounce")
    ? "oz"
    : rawUnit.startsWith("g")
      ? "grams"
      : rawUnit.startsWith("cup")
        ? "cups"
        : rawUnit === "count" || rawUnit === "each"
          ? "count"
          : "";

  const intents = [
    { pattern: /\bturkey meatballs?\b/, label: "Turkey meatballs", proteinType: "lean ground turkey", unit: "oz", defaultAmount: 6 },
    { pattern: /\bchicken meatballs?\b/, label: "Chicken meatballs", proteinType: "ground chicken", unit: "oz", defaultAmount: 6 },
    { pattern: /\bbeef meatballs?\b/, label: "Beef meatballs", proteinType: "ground beef", unit: "oz", defaultAmount: 6 },
    { pattern: /\bturkey burger\b/, label: "Turkey burger", proteinType: "lean ground turkey", unit: "oz", defaultAmount: 6 },
    { pattern: /\bchicken burger\b/, label: "Chicken burger", proteinType: "ground chicken", unit: "oz", defaultAmount: 6 },
    { pattern: /\bground turkey\b/, label: "Ground turkey", proteinType: "lean ground turkey", unit: "oz", defaultAmount: 6 },
    { pattern: /\bground chicken\b/, label: "Ground chicken", proteinType: "ground chicken", unit: "oz", defaultAmount: 6 },
    { pattern: /\bchicken thigh\b/, label: "Chicken thigh", proteinType: "chicken thigh", unit: "oz", defaultAmount: 6 },
    { pattern: /\bchicken breast\b/, label: "Chicken breast", proteinType: "chicken breast", unit: "oz", defaultAmount: 6 },
    { pattern: /\bflank steak\b/, label: "Flank steak", proteinType: "flank steak", unit: "oz", defaultAmount: 8 },
    { pattern: /\bribeye\b/, label: "Ribeye", proteinType: "ribeye", unit: "oz", defaultAmount: 10 },
    { pattern: /\bsalmon\b/, label: "Salmon", proteinType: "salmon", unit: "oz", defaultAmount: 6 },
    { pattern: /\bcod\b/, label: "Cod", proteinType: "cod", unit: "oz", defaultAmount: 6 }
  ];

  const match = intents.find(intent => intent.pattern.test(normalized));
  if (!match) return null;

  return {
    ...match,
    amount: amount || "",
    parsedUnit: normalizedUnit
  };
}

function buildIntentFood(intent, amountOverride = "", unitOverride = "") {
  if (!intent) return null;
  const amount = Number(amountOverride || intent.amount || intent.defaultAmount || 0);
  const unit = unitOverride || intent.parsedUnit || intent.unit;
  const macros = calculateStructuredProtein(intent.proteinType, amount, unit, "cooked");
  return {
    id: `intent-${intent.proteinType}-${amount}-${unit}`,
    source: "smart",
    sourceId: intent.proteinType,
    name: intent.label,
    brand: "",
    servingAmount: amount,
    servingUnit: unit,
    servingLabel: `${amount} ${unit}`,
    calories: Math.round(macros.calories),
    protein: Math.round(macros.protein),
    carbs: Math.round(macros.carbs),
    fat: Math.round(macros.fat),
    fiber: 0,
    micros: {},
    intent
  };
}

function searchFoodIndex(query) {
  const normalized = normalizeFoodSearchKey(query);
  if (!normalized) return [];
  return Object.entries(FOOD_INDEX)
    .filter(([key]) => key.includes(normalized) || normalized.includes(key))
    .sort((left, right) => {
      const leftExact = left[0] === normalized ? 1 : 0;
      const rightExact = right[0] === normalized ? 1 : 0;
      if (leftExact !== rightExact) return rightExact - leftExact;
      return left[0].length - right[0].length;
    })
    .slice(0, 5)
    .map(([key, macros]) => ({ key, ...macros }));
}

function getQuickAddAmount() {
  return Number(appState.draftMeal.quickAdd?.amount || 0) || 0;
}

function getQuickAddResult() {
  const quickAdd = appState.draftMeal.quickAdd;
  if (!quickAdd) return null;
  if (quickAdd.result) return quickAdd.result;
  if (!FOOD_INDEX[quickAdd.foodKey]) return null;
  const local = FOOD_INDEX[quickAdd.foodKey];
  return {
    id: `local-${quickAdd.foodKey}`,
    source: "local",
    name: quickAdd.foodKey,
    brand: "",
    servingAmount: 1,
    servingUnit: local.unit,
    calories: local.calories,
    protein: local.protein,
    carbs: local.carbs,
    fat: local.fat,
    micros: {},
    isBranded: false
  };
}

function getQuickAddMacros() {
  const quickAdd = appState.draftMeal.quickAdd;
  const result = getQuickAddResult();
  if (!quickAdd || !result) return macroBundle(0, 0, 0, 0);
  const amount = Number(quickAdd.amount || result.servingAmount || 0);
  const baseAmount = Number(result.servingAmount || 1) || 1;
  const multiplier = amount / baseAmount;
  return macroBundle(
    result.protein * multiplier,
    result.carbs * multiplier,
    result.fat * multiplier,
    result.calories * multiplier
  );
}

function applyQuickAddToAdvanced() {
  const quickAdd = appState.draftMeal.quickAdd;
  const result = getQuickAddResult();
  if (!quickAdd || !result) return;
  const foodKey = normalizeFoodSearchKey(result.name);
  const amount = quickAdd.amount;
  const unit = quickAdd.unit;

  if (proteinOptions[foodKey] || proteinOptions[foodKey === "greek yogurt" ? "Greek yogurt" : foodKey]) {
    const proteinKey = foodKey === "greek yogurt" ? "Greek yogurt" : foodKey;
    appState.draftMeal.proteins = [{
      proteinType: proteinKey,
      proteinAmount: amount,
      proteinUnit: unit === "cup" ? "count" : unit,
      cookedOrRaw: "cooked"
    }];
    appState.draftMeal.carbs = [createEmptyCarbEntry()];
    appState.draftMeal.ingredients = [];
  } else if (carbOptions[foodKey] || carbOptions[foodKey === "cup" ? "white rice" : foodKey]) {
    appState.draftMeal.carbs = [{
      carbType: foodKey,
      carbAmount: amount,
      carbUnit: unit === "cup" ? "cups" : unit === "each" ? "pieces" : unit
    }];
    appState.draftMeal.proteins = [createEmptyProteinEntry()];
    appState.draftMeal.ingredients = [];
  } else {
    const macros = getQuickAddMacros();
    appState.draftMeal.ingredients = [
      buildIngredient(result.name, amount, unit, { ...macros, ...(result.micros || {}), fiber: Number(result.micros?.fiber || 0) }, false, true)
    ];
    appState.draftMeal.proteins = [createEmptyProteinEntry()];
    appState.draftMeal.carbs = [createEmptyCarbEntry()];
  }
  appState.draftMeal.showAdvanced = true;
}

function trackFoodUsage(foodResult) {
  if (!foodResult) return;
  const id = `${foodResult.source}-${foodResult.id}`;
  const existing = appState.recentFoods.find(item => item.id === id);
  const payload = {
    id,
    source: foodResult.source,
    external_food_id: String(foodResult.id),
    food_name: foodResult.name,
    brand: foodResult.brand || "",
    default_serving_json: {
      servingAmount: Number(foodResult.servingAmount || 1),
      servingUnit: foodResult.servingUnit || "serving",
      calories: Number(foodResult.calories || 0),
      protein: Number(foodResult.protein || 0),
      carbs: Number(foodResult.carbs || 0),
      fat: Number(foodResult.fat || 0),
      micros: foodResult.micros || {}
    },
    last_used_at: new Date().toISOString(),
    times_used: Number(existing?.times_used || 0) + 1
  };
  appState.recentFoods = [payload, ...appState.recentFoods.filter(item => item.id !== id)].slice(0, 10);
}

function showFoodToast(message, options = {}) {
  if (!elements.foodSearchToast) return;
  window.clearTimeout(foodToastTimer);
  const actionMarkup = options.actionLabel
    ? `<button class="food-toast-action" type="button" id="foodToastAction">${options.actionLabel}</button>`
    : "";
  elements.foodSearchToast.innerHTML = `
    <div class="food-toast-row">
      <span>${message}</span>
      ${actionMarkup}
    </div>
  `;
  elements.foodSearchToast.classList.add("visible");
  const action = document.querySelector("#foodToastAction");
  if (action && typeof options.onAction === "function") {
    action.addEventListener("click", () => {
      window.clearTimeout(foodToastTimer);
      elements.foodSearchToast.classList.remove("visible");
      options.onAction();
    }, { once: true });
  }
  foodToastTimer = window.setTimeout(() => {
    elements.foodSearchToast.classList.remove("visible");
  }, 1400);
}

function undoLastFoodLog() {
  if (!lastFoodLogUndo) return;
  appState.meals = appState.meals.filter(meal => meal.id !== lastFoodLogUndo.mealId);
  appState.recentFoods = cloneData(lastFoodLogUndo.previousRecentFoods || []);
  elements.templateStatus.textContent = `${lastFoodLogUndo.foodName} removed.`;
  lastFoodLogUndo = null;
  saveState();
  renderDashboard();
  renderMicronutrients();
  renderFoodSearch();
  renderRecentMeals();
  renderMeals();
  renderRepeatActions();
  renderCoach();
}

function normalizeRecentFoodForSearch(item) {
  const serving = item.default_serving_json || {};
  return {
    id: item.id,
    source: item.source || "local",
    sourceId: item.external_food_id || item.id,
    name: item.food_name || "",
    brand: item.brand || "",
    servingLabel: `${serving.servingAmount || 1} ${serving.servingUnit || "serving"}`,
    servingGrams: Number(serving.servingGrams || 0),
    servingAmount: Number(serving.servingAmount || 1),
    servingUnit: serving.servingUnit || "serving",
    calories: Number(serving.calories || 0),
    protein: Number(serving.protein || 0),
    carbs: Number(serving.carbs || 0),
    fat: Number(serving.fat || 0),
    fiber: Number(serving.micros?.fiber || serving.fiber || 0),
    micros: serving.micros || { fiber: Number(serving.fiber || 0) }
  };
}

function getRecentFoodResults(limit = 10) {
  return (appState.recentFoods || [])
    .slice()
    .sort((left, right) => new Date(right.last_used_at || 0) - new Date(left.last_used_at || 0))
    .slice(0, limit)
    .map(normalizeRecentFoodForSearch)
    .filter(food => food.name);
}

function getQuickPickResults(limit = 8) {
  return QUICK_FOOD_PICKS.slice(0, limit).map(food => ({ ...food }));
}

function formatFoodAmount(value) {
  const amount = Number(value || 0);
  if (!Number.isFinite(amount)) return String(value || "");
  if (Math.abs(amount - Math.round(amount)) < 0.001) return String(Math.round(amount));
  return amount.toFixed(2).replace(/\.?0+$/, "");
}

function getFoodSelectionUnitOptions(food) {
  const baseUnit = food?.servingUnit || "serving";
  return Array.from(new Set([baseUnit, "serving", "oz", "g", "cup", "item", "pieces"]));
}

function buildScaledFoodResult(food, amount, unit) {
  if (!food) return null;
  const baseAmount = Math.max(Number(food.servingAmount || 1), 0.01);
  const nextAmount = Math.max(Number(amount || baseAmount), 0.01);
  const ratio = nextAmount / baseAmount;
  const nextUnit = unit || food.servingUnit || "serving";
  const nextMicros = Object.fromEntries(
    Object.entries(food.micros || {}).map(([key, value]) => [key, Number(value || 0) * ratio])
  );
  return {
    ...cloneData(food),
    servingAmount: Number(nextAmount.toFixed(2)),
    servingUnit: nextUnit,
    servingLabel: `${formatFoodAmount(nextAmount)} ${nextUnit}`.trim(),
    calories: Math.round(Number(food.calories || 0) * ratio),
    protein: Number((Number(food.protein || 0) * ratio).toFixed(1)),
    carbs: Number((Number(food.carbs || 0) * ratio).toFixed(1)),
    fat: Number((Number(food.fat || 0) * ratio).toFixed(1)),
    fiber: Number((Number(food.fiber || 0) * ratio).toFixed(1)),
    micros: nextMicros
  };
}

function clearSelectedFoodSearch() {
  appState.foodSearchState.selectedFood = null;
  appState.foodSearchState.selectedPortionPreset = "serving";
  appState.foodSearchState.selectedCustomAmount = "";
  appState.foodSearchState.selectedCustomUnit = "";
}

function selectFoodForLogging(food, options = {}) {
  if (!food) return;
  appState.foodSearchState.selectedFood = cloneData(food);
  appState.foodSearchState.selectedPortionPreset = options.preset || "serving";
  appState.foodSearchState.selectedCustomAmount = options.customAmount ?? food.servingAmount ?? 1;
  appState.foodSearchState.selectedCustomUnit = options.customUnit || food.servingUnit || "serving";
  renderFoodSearch();
}

function getSelectedFoodLogPreview() {
  const selectedFood = appState.foodSearchState.selectedFood;
  if (!selectedFood) return null;
  const preset = appState.foodSearchState.selectedPortionPreset || "serving";
  const baseAmount = Number(selectedFood.servingAmount || 1) || 1;
  const baseUnit = selectedFood.servingUnit || "serving";
  let nextAmount = baseAmount;
  let nextUnit = baseUnit;
  let label = "1 serving";
  if (preset === "half") {
    nextAmount = baseAmount * 0.5;
    label = "Half";
  } else if (preset === "double") {
    nextAmount = baseAmount * 2;
    label = "Double";
  } else if (preset === "custom") {
    nextAmount = Number(appState.foodSearchState.selectedCustomAmount || baseAmount) || baseAmount;
    nextUnit = appState.foodSearchState.selectedCustomUnit || baseUnit;
    label = "Custom";
  }
  return {
    preset,
    label,
    food: buildScaledFoodResult(selectedFood, nextAmount, nextUnit)
  };
}

function updateSelectedFoodPreviewDom() {
  const preview = getSelectedFoodLogPreview();
  if (!preview?.food || !elements.foodSearchResults) return;
  const root = elements.foodSearchResults;
  const serving = root.querySelector("[data-selected-serving-label]");
  const kcal = root.querySelector("[data-selected-kcal]");
  const protein = root.querySelector("[data-selected-protein]");
  const carbs = root.querySelector("[data-selected-carbs]");
  const fat = root.querySelector("[data-selected-fat]");
  const fiber = root.querySelector("[data-selected-fiber]");
  if (serving) serving.textContent = preview.food.servingLabel;
  if (kcal) kcal.textContent = `${Math.round(preview.food.calories || 0)} kcal`;
  if (protein) protein.textContent = `${Math.round(preview.food.protein || 0)}P`;
  if (carbs) carbs.textContent = `${Math.round(preview.food.carbs || 0)}C`;
  if (fat) fat.textContent = `${Math.round(preview.food.fat || 0)}F`;
  if (fiber) fiber.textContent = `${Math.round(preview.food.fiber || 0)} fiber`;
}

function logFoodSearchResult(food) {
  if (!food) return;
  const previousRecentFoods = cloneData(appState.recentFoods || []);
  const amount = Number(food.servingAmount || 1);
  const unit = food.servingUnit || "serving";
  const meal = {
    id: createAppId("meal"),
    loggedAt: new Date().toISOString(),
    text: `${amount} ${unit} ${food.name}`.trim(),
    meal_name: food.name,
    meal_category: "meal",
    portion_multiplier: 1,
    notes: "",
    templateId: "",
    structured: {
      ingredients: [
        buildIngredient(food.name, amount, unit, {
          protein: Number(food.protein || 0),
          carbs: Number(food.carbs || 0),
          fat: Number(food.fat || 0),
          calories: Number(food.calories || 0),
          fiber: Number(food.fiber || 0)
        }, false, true)
      ],
      proteins: [],
      carbs: [],
      veggieServings: 0,
      veggieType: ""
    },
    matches: [food.name],
    cues: { proteinUnclear: false, carbUnclear: false, rge: false },
    macros: macroBundle(
      Number(food.protein || 0),
      Number(food.carbs || 0),
      Number(food.fat || 0),
      Number(food.calories || 0)
    ),
    fiber_grams: Number(food.fiber || 0)
  };

  logMealObject(meal);
  trackFoodUsage(food);
  lastFoodLogUndo = {
    mealId: meal.id,
    foodName: food.name,
    previousRecentFoods
  };
  const preservedMode = appState.foodSearchState.mode || "home_cooked";
  appState.foodSearchState = {
    query: "",
    mode: preservedMode,
    restaurantName: preservedMode === "eating_out" ? String(appState.foodSearchState.restaurantName || "") : "",
    menuItem: preservedMode === "eating_out" ? "" : "",
    selectedFood: null,
    selectedPortionPreset: "serving",
    selectedCustomAmount: "",
    selectedCustomUnit: "",
    status: "idle",
    results: [],
    mealBreakdown: null,
    mealBreakdownDraft: null,
    mealBreakdownReviewOpen: false,
    error: ""
  };
  if (elements.foodSearchInput) {
    elements.foodSearchInput.value = "";
  }
  elements.templateStatus.textContent = `${food.name} logged.`;
  saveState();
  renderDashboard();
  renderMicronutrients();
  renderFoodSearch();
  renderRecentMeals();
  renderMeals();
  renderRepeatActions();
  renderCoach();
  showFoodToast(buildMealLoggedFeedback(meal), {
    actionLabel: "Undo",
    onAction: undoLastFoodLog
  });
}

function logQuickAddMeal() {
  const quickAdd = appState.draftMeal.quickAdd;
  const result = getQuickAddResult();
  if (!quickAdd || !result) return;
  const macros = getQuickAddMacros();
  const meal = {
    id: createAppId("meal"),
    loggedAt: new Date().toISOString(),
    text: `${quickAdd.amount} ${quickAdd.unit} ${result.name}`.trim(),
    meal_name: `${quickAdd.amount} ${result.name}`.trim(),
    meal_category: appState.draftMeal.mealCategory || "meal",
    portion_multiplier: 1,
    notes: "",
    templateId: "",
    structured: {
      ingredients: [buildIngredient(result.name, quickAdd.amount, quickAdd.unit, { ...macros, ...(result.micros || {}), fiber: Number(result.micros?.fiber || 0) }, false, true)],
      proteins: [],
      carbs: [],
      veggieServings: 0,
      veggieType: ""
    },
    matches: [result.name],
    cues: { proteinUnclear: false, carbUnclear: false, rge: false },
    macros,
    fiber_grams: Number(result.micros?.fiber || 0)
  };
  logMealObject(meal);
  trackFoodUsage(result);
  appState.draftMeal = createEmptyDraftMeal();
  elements.templateStatus.textContent = `${meal.meal_name} logged.`;
  saveState();
  render();
  showFoodToast(buildMealLoggedFeedback(meal));
}

function quickFoodSummary(food) {
  return `${food.servingAmount || 1} ${food.servingUnit || "serving"} | ${Math.round(food.protein || 0)}P / ${Math.round(food.carbs || 0)}C / ${Math.round(food.fat || 0)}F / ${Math.round(food.calories || 0)} kcal`;
}

function quickFoodMicros(food) {
  const micros = food.micros || {};
  return `Fiber ${Math.round(micros.fiber || 0)}g | Potassium ${Math.round(micros.potassium || 0)}mg | Calcium ${Math.round(micros.calcium || 0)}mg`;
}

function buildActiveFoodSearchQuery() {
  const mode = appState.foodSearchState.mode || "home_cooked";
  if (mode !== "eating_out") {
    return String(appState.foodSearchState.query || "").trim();
  }

  const restaurantName = String(appState.foodSearchState.restaurantName || "").trim();
  const menuItem = String(appState.foodSearchState.menuItem || "").trim();
  if (restaurantName && menuItem) return `${menuItem} from ${restaurantName}`;
  if (menuItem) return menuItem;
  return "";
}

async function performFoodSearch(query) {
  const requestId = ++foodSearchRequestId;
  const normalizedQuery = normalizeMealSearchText(query);
  const mode = appState.foodSearchState.mode || "home_cooked";
  appState.foodSearchState.query = mode === "eating_out"
    ? String(appState.foodSearchState.menuItem || "").trim()
    : query;
  appState.foodSearchState.status = "loading";
  appState.foodSearchState.error = "";
  appState.foodSearchState.mealBreakdown = null;
  appState.foodSearchState.mealBreakdownDraft = null;
  appState.foodSearchState.mealBreakdownReviewOpen = false;
  renderFoodSearch();
  let mealBreakdown = null;
  try {
    const learnedMeal = appState.learnedMeals.find(item => item.normalizedQuery === normalizedQuery);
    if (learnedMeal) {
      if (requestId !== foodSearchRequestId) return;
      appState.foodSearchState.results = [];
      appState.foodSearchState.mealBreakdown = {
        label: learnedMeal.label,
        items: learnedMeal.items.map(item => ({ ...item })),
        hints: learnedMeal.items.map(item => `${item.servingAmount || 1} ${item.servingUnit || "serving"} ${item.name}`.trim()),
        alternatives: learnedMeal.items.map(item => ({
          query: item.name,
          chosen: { ...item },
          confidence: "high",
          options: [{ ...item }]
        })),
        source: "learned"
      };
      appState.foodSearchState.mealBreakdownDraft = learnedMeal.items.map(item => ({ ...item }));
      appState.foodSearchState.mealBreakdownReviewOpen = false;
      appState.foodSearchState.status = "ready";
      appState.foodSearchState.query = query;
      renderFoodSearch();
      return;
    }
    const searchService = getFoodSearchService();
    const preferredRestaurantNames = [
      ...(appState.favoriteFoods || []).map(food => food?.brand).filter(Boolean),
      ...(appState.recentFoods || []).map(food => food?.brand).filter(Boolean)
    ];
    mealBreakdown = searchService && typeof searchService.decomposeMealQuery === "function"
      ? await searchService.decomposeMealQuery(query, {
          mode,
          restaurantName: appState.foodSearchState.restaurantName,
          menuItem: appState.foodSearchState.menuItem,
          preferredRestaurantNames
        })
      : null;
    const results = searchService
      ? await searchService.searchFoods(query, {
          mode,
          restaurantName: appState.foodSearchState.restaurantName,
          menuItem: appState.foodSearchState.menuItem,
          localIndex: FOOD_INDEX,
          recentFoods: appState.recentFoods,
          favoriteFoods: appState.favoriteFoods,
          mealBreakdown
        })
      : searchFoodIndex(query).map(food => ({
          id: `local-${food.key}`,
          source: "local",
          name: food.key,
          brand: "",
          servingAmount: 1,
          servingUnit: food.unit,
          calories: food.calories,
          protein: food.protein,
          carbs: food.carbs,
          fat: food.fat,
          micros: {},
          isBranded: false
        }));
    if (requestId !== foodSearchRequestId) return;
    appState.foodSearchState.results = results;
    appState.foodSearchState.mealBreakdown = mealBreakdown;
    appState.foodSearchState.mealBreakdownDraft = mealBreakdown?.items
      ? mealBreakdown.items.map(item => ({ ...item }))
      : null;
    appState.foodSearchState.mealBreakdownReviewOpen = false;
    appState.foodSearchState.status = "ready";
    renderFoodSearch();
  } catch (error) {
    if (requestId !== foodSearchRequestId) return;
    appState.foodSearchState.results = [];
    appState.foodSearchState.mealBreakdown = mealBreakdown || null;
    appState.foodSearchState.mealBreakdownDraft = mealBreakdown?.items
      ? mealBreakdown.items.map(item => ({ ...item }))
      : null;
    appState.foodSearchState.mealBreakdownReviewOpen = false;
    appState.foodSearchState.status = "error";
    appState.foodSearchState.error = error.message || "Search failed";
    renderFoodSearch();
  }
}

function scheduleFoodSearch(text) {
  const mode = appState.foodSearchState.mode || "home_cooked";
  const restaurantName = String(appState.foodSearchState.restaurantName || "").trim();
  const query = mode === "eating_out"
    ? buildActiveFoodSearchQuery()
    : String(text || "").trim();
  window.clearTimeout(foodSearchTimer);
  clearSelectedFoodSearch();
  const hasRestaurantOnlySearch = mode === "eating_out" && restaurantName.length > 2;
  if (query.length <= 2 && !hasRestaurantOnlySearch) {
    if (mode !== "eating_out") {
      appState.foodSearchState.query = query;
    }
    appState.foodSearchState.results = [];
    appState.foodSearchState.mealBreakdown = null;
    appState.foodSearchState.mealBreakdownDraft = null;
    appState.foodSearchState.mealBreakdownReviewOpen = false;
    appState.foodSearchState.status = "idle";
    appState.foodSearchState.error = "";
    renderFoodSearch();
    return;
  }
  if (mode !== "eating_out") {
    appState.foodSearchState.query = query;
  }
  appState.foodSearchState.status = "loading";
  appState.foodSearchState.error = "";
  appState.foodSearchState.results = [];
  appState.foodSearchState.mealBreakdown = null;
  appState.foodSearchState.mealBreakdownDraft = null;
  appState.foodSearchState.mealBreakdownReviewOpen = false;
  renderFoodSearch();
  const searchText = mode === "eating_out" && !query ? restaurantName : query;
  foodSearchTimer = window.setTimeout(() => {
    performFoodSearch(searchText);
  }, 220);
}

function renderFoodSearch() {
  if (!elements.foodSearchResults) return;
  const searchMode = appState.foodSearchState.mode || "home_cooked";
  const restaurantName = String(appState.foodSearchState.restaurantName || "").trim();
  const menuItem = String(appState.foodSearchState.menuItem || "").trim();
  if (elements.restaurantSearchGrid) {
    elements.restaurantSearchGrid.hidden = searchMode !== "eating_out";
  }
  if (elements.foodSearchInput) {
    elements.foodSearchInput.placeholder = searchMode === "eating_out"
      ? "Search food..."
      : "Search food...";
  }
  setInputValueSafely(elements.foodSearchInput, appState.foodSearchState.query || "");
  setInputValueSafely(elements.restaurantSearchInput, restaurantName);
  setInputValueSafely(elements.restaurantItemInput, menuItem);
  const query = searchMode === "eating_out"
    ? (buildActiveFoodSearchQuery() || restaurantName)
    : String(elements.foodSearchInput?.value || appState.foodSearchState.query || "").trim();
  if (elements.foodSearchModeToggle) {
    elements.foodSearchModeToggle.querySelectorAll("[data-food-mode]").forEach(button => {
      const active = button.dataset.foodMode === searchMode;
      button.classList.toggle("active", active);
      button.setAttribute("aria-selected", String(active));
    });
  }
  const smartIntent = searchMode === "home_cooked" ? detectSmartFoodIntent(query) : null;
  const composedMeal = appState.foodSearchState.mealBreakdown || (searchMode === "home_cooked" ? detectComposedMeal(query) : null);
  const composedMealDraft = appState.foodSearchState.mealBreakdownDraft || composedMeal?.items || [];
  const composedMealReviewOpen = Boolean(appState.foodSearchState.mealBreakdownReviewOpen);
  const mealCustomizationChips = getMealBreakdownCustomizationChips(composedMeal, composedMealDraft);
  const selectedPreview = getSelectedFoodLogPreview();
  const suggestions = appState.foodSearchState.results || [];
  const hasSearchSignal = query.length > 2 || (searchMode === "eating_out" && restaurantName.length > 2);

  const sourceLabel = food => {
    if (food.source === "recent") return "Recent";
    if (food.source === "quick") return "Quick pick";
    if (food.source === "usda") return "USDA";
    if (food.source === "restaurant") return "Menu item";
    if (food.source === "restaurant-web") return "Web menu";
    if (food.source === "estimated") return "Estimated";
    if (food.source === "ai") return "AI";
    if (food.source === "ai-web") return "AI + web";
    if (food.brand) return "Branded";
    if (food.source === "mock") return "Fallback";
    return "Food";
  };

  const renderRow = (food, index, bucket, { highlighted = false } = {}) => `
    <button class="food-search-row${highlighted ? " featured" : ""}" type="button" data-food-pick="${bucket}-${index}">
      <div class="food-search-main${highlighted ? " highlighted" : ""}">
        <div class="food-search-labels">
          <strong>${food.name}</strong>
          <span class="food-source-pill">${sourceLabel(food)}</span>
        </div>
        <div class="food-search-meta-line">
          ${food.brand ? `<small>${food.brand}</small>` : ""}
          <span class="food-serving-pill">${food.servingLabel || `${food.servingAmount || 1} ${food.servingUnit || "serving"}`}</span>
        </div>
        ${food.ingredientsSummary ? `<p class="food-search-detail">${food.ingredientsSummary}</p>` : ""}
        ${highlighted ? `<p class="food-search-subtext">Tap to check the portion and log.</p>` : ""}
      </div>
      <div class="food-search-side">
        <div class="food-search-macros">
          <span>${Math.round(food.calories || 0)} kcal</span>
          <span>${Math.round(food.protein || 0)}P</span>
          <span>${Math.round(food.carbs || 0)}C</span>
          <span>${Math.round(food.fat || 0)}F</span>
        </div>
        <span class="food-search-action">Choose</span>
      </div>
    </button>
  `;

  const selectedFoodSection = selectedPreview
    ? `
      <div class="food-search-selected">
        <div class="food-search-selected-card">
          <div class="food-search-selected-top">
            <div>
              <strong>${selectedPreview.food.name}</strong>
              <small>${sourceLabel(selectedPreview.food)}${selectedPreview.food.brand ? ` • ${selectedPreview.food.brand}` : ""}</small>
            </div>
            <button class="food-search-selected-close" type="button" data-food-log-close="true">Clear</button>
          </div>
          <div class="panel-subhead">
            <strong>Portion</strong>
            <small>Adjust if needed.</small>
          </div>
          <div class="portion-preset-row">
            <button class="portion-preset-chip${selectedPreview.preset === "serving" ? " active" : ""}" type="button" data-portion-preset="serving">1 serving</button>
            <button class="portion-preset-chip${selectedPreview.preset === "half" ? " active" : ""}" type="button" data-portion-preset="half">Half</button>
            <button class="portion-preset-chip${selectedPreview.preset === "double" ? " active" : ""}" type="button" data-portion-preset="double">Double</button>
            <button class="portion-preset-chip${selectedPreview.preset === "custom" ? " active" : ""}" type="button" data-portion-preset="custom">Custom</button>
          </div>
          ${selectedPreview.preset === "custom" ? `
            <div class="food-log-custom-row">
              <label>
                Amount
                <input type="text" inputmode="decimal" value="${formatFoodAmount(appState.foodSearchState.selectedCustomAmount || selectedPreview.food.servingAmount || 1)}" data-portion-custom-amount="true">
              </label>
              <label>
                Unit
                <select data-portion-custom-unit="true">
                  ${getFoodSelectionUnitOptions(selectedPreview.food).map(option => `
                    <option value="${option}"${option === (appState.foodSearchState.selectedCustomUnit || selectedPreview.food.servingUnit) ? " selected" : ""}>${option}</option>
                  `).join("")}
                </select>
              </label>
            </div>
          ` : ""}
          <div class="food-log-preview">
            <div class="food-log-preview-top">
              <div>
                <strong data-selected-serving-label="true">${selectedPreview.food.servingLabel}</strong>
                <small>Live preview</small>
              </div>
              <span class="meal-row-kcal" data-selected-kcal="true">${Math.round(selectedPreview.food.calories || 0)} kcal</span>
            </div>
            <div class="food-log-preview-macros">
              <span data-selected-protein="true">${Math.round(selectedPreview.food.protein || 0)}P</span>
              <span data-selected-carbs="true">${Math.round(selectedPreview.food.carbs || 0)}C</span>
              <span data-selected-fat="true">${Math.round(selectedPreview.food.fat || 0)}F</span>
              <span data-selected-fiber="true">${Math.round(selectedPreview.food.fiber || 0)} fiber</span>
            </div>
          </div>
          <div class="form-actions">
            <button class="primary-button" type="button" data-food-log-confirm="true">Log meal</button>
            <button class="ghost-button compact" type="button" data-food-log-close="true">Back</button>
          </div>
        </div>
      </div>
    `
    : "";

  const smartIntentSection = smartIntent
    ? (() => {
        const previewFood = buildIntentFood(smartIntent);
        const options = [4, 6, 8, 10];
        if (smartIntent.amount) {
          return `
            <div class="panel-subhead">
              <strong>Smart log</strong>
              <small>Recognized and ready to log.</small>
            </div>
            <div class="smart-intent-card">
              <div class="food-search-labels">
                <strong>${smartIntent.label}</strong>
                <span class="food-source-pill">Smart</span>
              </div>
              <p>${previewFood.servingLabel} | ${previewFood.protein}P / ${previewFood.carbs}C / ${previewFood.fat}F / ${previewFood.calories} kcal</p>
              <div class="form-actions">
                <button class="primary-button compact" type="button" data-intent-log="${smartIntent.amount}">Review ${previewFood.servingLabel}</button>
                <button class="ghost-button compact" type="button" data-intent-advanced="true">Advanced</button>
              </div>
            </div>
          `;
        }

        return `
          <div class="panel-subhead">
            <strong>Smart log</strong>
            <small>Pick the amount, then review.</small>
          </div>
          <div class="smart-intent-card">
            <div class="food-search-labels">
              <strong>${smartIntent.label}</strong>
              <span class="food-source-pill">Smart</span>
            </div>
            <p>How many oz did you have?</p>
            <div class="smart-intent-actions">
              ${options.map(option => `<button class="ghost-button compact" type="button" data-intent-amount="${option}">${option} oz</button>`).join("")}
              <button class="ghost-button compact" type="button" data-intent-advanced="true">Custom</button>
            </div>
          </div>
        `;
      })()
    : "";

  const composedMealSection = composedMeal
    ? `
      <div class="panel-subhead">
        <strong>Smart meal breakdown</strong>
        <small>Ready to log.</small>
      </div>
      <div class="smart-intent-card">
        <div class="food-search-labels">
          <strong>${composedMeal.label}</strong>
          <span class="food-source-pill">${
            composedMeal.source === "learned"
              ? "Learned"
              : composedMeal.source === "estimated"
                ? "Estimated"
              : composedMeal.source === "ai-web"
                ? "AI + web"
                : composedMeal.source === "ai"
                  ? "AI"
              : composedMeal.source === "restaurant"
                ? "Menu"
                : "Meal"
          }</span>
        </div>
        ${composedMeal.baseMenuItem ? `
          <p class="food-search-detail"><strong>Based on:</strong> ${composedMeal.baseMenuItem.brand} ${composedMeal.baseMenuItem.name} • ${composedMeal.baseMenuItem.servingLabel}</p>
        ` : ""}
        ${composedMeal.confidence ? `
          <p class="food-search-detail"><strong>Confidence:</strong> ${String(composedMeal.confidence).charAt(0).toUpperCase()}${String(composedMeal.confidence).slice(1)}</p>
        ` : ""}
        ${composedMeal.source === "estimated" ? `
          <p class="food-search-detail"><strong>Estimate:</strong> ${composedMeal.confidence === "low" ? "Rough estimate from the meal description." : "Inferred from the meal description."}</p>
        ` : ""}
        ${composedMeal.restaurantRequested && !composedMeal.baseMenuItem ? `
          <p class="food-search-detail"><strong>Restaurant:</strong> ${composedMeal.restaurantRequested} not found. Logging as an estimated meal.</p>
        ` : ""}
        ${Array.isArray(composedMeal.customizations) && composedMeal.customizations.length ? `
          <div class="food-search-helper">
            ${composedMeal.customizations.map(item => `<span>${item}</span>`).join("")}
          </div>
        ` : ""}
        ${composedMeal.followupQuestion ? `
          <p class="food-search-detail"><strong>AI note:</strong> ${composedMeal.followupQuestion}</p>
        ` : ""}
        ${composedMeal.matchSummary?.totalCount ? `
          <p class="food-search-detail"><strong>Matched:</strong> ${composedMeal.matchSummary.matchedCount || 0} of ${composedMeal.matchSummary.totalCount} ingredients</p>
        ` : ""}
        ${mealCustomizationChips.length ? `
          <div class="panel-subhead">
            <strong>Quick customizations</strong>
            <small>tap to tailor the order</small>
          </div>
          <div class="meal-customization-chip-row">
            ${mealCustomizationChips.map(chip => `
              <button class="ghost-button compact" type="button" data-meal-customization-type="${chip.type}" data-meal-customization-value="${chip.value}">${chip.label}</button>
            `).join("")}
          </div>
        ` : ""}
        <p>${composedMeal.hints.join(" • ")}</p>
        ${Array.isArray(composedMeal.alternatives) && composedMeal.alternatives.length ? `
          <div class="meal-breakdown-list">
            ${composedMeal.alternatives.map(item => `
              <div class="meal-breakdown-row">
                <strong>${item.role ? `${item.role}: ` : ""}${item.query}</strong>
                <span>${item.chosen?.name || "match"}</span>
                <small>${item.confidence} confidence${item.note ? ` • ${item.note}` : ""}</small>
              </div>
            `).join("")}
          </div>
        ` : ""}
        ${Array.isArray(composedMeal.unmatched) && composedMeal.unmatched.length ? `
          <div class="panel-subhead">
            <strong>Needs review</strong>
            <small>Add the missing parts.</small>
          </div>
          <div class="meal-breakdown-list">
            ${composedMeal.unmatched.map((item, unmatchedIndex) => `
              <div class="meal-breakdown-row">
                <strong>${item.role ? `${item.role}: ` : ""}${item.query}</strong>
                <span>Not matched yet</span>
                <small>${item.core ? "core ingredient" : "possible ingredient"}${item.confidence ? ` • ${item.confidence} confidence` : ""}</small>
                <div class="meal-breakdown-chip-row">
                  ${Array.isArray(item.suggestions) && item.suggestions.length
                    ? item.suggestions.slice(0, 3).map((suggestion, optionIndex) => `
                        <button class="ghost-button compact" type="button" data-breakdown-unmatched="${unmatchedIndex}" data-breakdown-unmatched-option="${optionIndex}">${suggestion.name}</button>
                      `).join("")
                    : ""}
                  <button class="ghost-button compact" type="button" data-breakdown-unmatched-add="${unmatchedIndex}">Add as entered</button>
                </div>
              </div>
            `).join("")}
          </div>
        ` : ""}
        ${Array.isArray(composedMeal.sources) && composedMeal.sources.length ? `
          <div class="panel-subhead">
            <strong>Sources</strong>
            <small>used for restaurant or menu context</small>
          </div>
          <div class="food-search-helper">
            ${composedMeal.sources.slice(0, 3).map(source => `<a href="${source.url}" target="_blank" rel="noreferrer">${source.title || source.url}</a>`).join("")}
          </div>
        ` : ""}
        ${composedMealReviewOpen ? `
          <div class="meal-breakdown-editor">
            ${(composedMealDraft || []).map((item, index) => `
              <div class="meal-breakdown-edit-row">
                <div class="meal-breakdown-edit-head">
                  <strong>${item.name}</strong>
                  <small>${Math.round(item.protein || 0)}P / ${Math.round(item.carbs || 0)}C / ${Math.round(item.fat || 0)}F / ${Math.round(item.calories || 0)} kcal</small>
                </div>
                <div class="meal-breakdown-chip-row">
                  ${getMealBreakdownAmountChips(item).map(amount => `
                    <button class="ghost-button compact" type="button" data-breakdown-chip="${index}" data-breakdown-chip-value="${amount}">${amount}</button>
                  `).join("")}
                </div>
                <div class="meal-breakdown-edit-fields">
                  <label>
                    Amount
                    <input type="text" inputmode="decimal" value="${item.servingAmount || ""}" data-breakdown-amount="${index}">
                  </label>
                  <label>
                    Unit
                    <select data-breakdown-unit="${index}">
                      ${getMealBreakdownUnitOptions(item).map(option => `
                        <option value="${option}"${option === (item.servingUnit || "serving") ? " selected" : ""}>${option}</option>
                      `).join("")}
                    </select>
                  </label>
                  <label>
                    Match
                    <select data-breakdown-match="${index}">
                      <option value="">Keep current</option>
                      ${getMealBreakdownAlternatives(composedMeal, index).map((option, optionIndex) => `
                        <option value="${optionIndex}">${option.name}</option>
                      `).join("")}
                    </select>
                  </label>
                </div>
              </div>
            `).join("")}
          </div>
        ` : ""}
        <div class="form-actions">
          <button class="primary-button compact" type="button" data-composed-meal-log-now="true">Log meal</button>
          <button class="ghost-button compact" type="button" data-composed-meal-review="${composedMealReviewOpen ? "close" : "open"}">${composedMealReviewOpen ? "Hide review" : "Review ingredients"}</button>
          ${composedMealReviewOpen ? `<button class="ghost-button compact" type="button" data-composed-meal-apply="true">Use reviewed amounts</button>` : ""}
          ${composedMealReviewOpen ? `<button class="ghost-button compact" type="button" data-composed-meal-save="true">Remember this meal</button>` : ""}
          <button class="ghost-button compact" type="button" data-composed-meal-log="true">Open full editor</button>
        </div>
      </div>
    `
    : "";

  let resultSection = "";
  if (hasSearchSignal) {
    if (appState.foodSearchState.status === "loading") {
      resultSection = `<p class="saved-note">Searching...</p>`;
    } else if (suggestions.length) {
      const [topMatch, ...otherMatches] = suggestions;
      resultSection = `
        <div class="panel-subhead">
          <strong>Best match</strong>
          <small>${searchMode === "eating_out" ? "restaurant-aware result" : "fastest option right now"}</small>
        </div>
        <div class="food-search-list">
          ${renderRow(topMatch, 0, "search", { highlighted: true })}
        </div>
        ${otherMatches.length ? `
          <div class="panel-subhead">
            <strong>More matches</strong>
            <small>similar options</small>
          </div>
          <div class="food-search-list">
            ${otherMatches.slice(0, 7).map((food, index) => renderRow(food, index + 1, "search")).join("")}
          </div>
        ` : ""}
      `;
    } else if (composedMeal) {
      resultSection = "";
    } else if (appState.foodSearchState.status === "error") {
      resultSection = `<p class="saved-note">${searchMode === "eating_out" ? "No menu match yet. Try the item name or log an estimate." : "Search failed. Try again."}</p>`;
    } else {
      resultSection = `<p class="saved-note">${searchMode === "eating_out" ? "No menu matches yet. Try the item name." : "No match yet. Try another search."}</p>`;
    }
  } else if (!selectedPreview && !composedMeal && !smartIntent) {
    resultSection = `<p class="saved-note">${searchMode === "eating_out" ? "Add a restaurant and item." : "Search a food or meal."}</p>`;
  }

  elements.foodSearchResults.innerHTML = `${selectedFoodSection}${smartIntentSection}${composedMealSection}${resultSection}`;

  elements.foodSearchResults.querySelectorAll("[data-food-pick]").forEach(button => {
    button.addEventListener("click", () => {
      const [bucket, indexString] = String(button.dataset.foodPick || "").split("-");
      const index = Number(indexString);
      const selectedFood = suggestions[index];
      selectFoodForLogging(selectedFood);
    });
  });

  elements.foodSearchResults.querySelectorAll("[data-food-log-confirm]").forEach(button => {
    button.addEventListener("click", () => {
      const preview = getSelectedFoodLogPreview();
      if (!preview?.food) return;
      logFoodSearchResult(preview.food);
    });
  });

  elements.foodSearchResults.querySelectorAll("[data-food-log-close]").forEach(button => {
    button.addEventListener("click", () => {
      clearSelectedFoodSearch();
      renderFoodSearch();
    });
  });

  elements.foodSearchResults.querySelectorAll("[data-portion-preset]").forEach(button => {
    button.addEventListener("click", () => {
      appState.foodSearchState.selectedPortionPreset = button.dataset.portionPreset || "serving";
      if (appState.foodSearchState.selectedPortionPreset !== "custom" && appState.foodSearchState.selectedFood) {
        appState.foodSearchState.selectedCustomAmount = appState.foodSearchState.selectedFood.servingAmount || 1;
        appState.foodSearchState.selectedCustomUnit = appState.foodSearchState.selectedFood.servingUnit || "serving";
      }
      renderFoodSearch();
    });
  });

  elements.foodSearchResults.querySelectorAll("[data-portion-custom-amount]").forEach(input => {
    input.addEventListener("input", event => {
      appState.foodSearchState.selectedPortionPreset = "custom";
      appState.foodSearchState.selectedCustomAmount = event.target.value;
      updateSelectedFoodPreviewDom();
    });
  });

  elements.foodSearchResults.querySelectorAll("[data-portion-custom-unit]").forEach(select => {
    select.addEventListener("change", event => {
      appState.foodSearchState.selectedPortionPreset = "custom";
      appState.foodSearchState.selectedCustomUnit = event.target.value;
      updateSelectedFoodPreviewDom();
    });
  });

  elements.foodSearchResults.querySelectorAll("[data-intent-amount]").forEach(button => {
    button.addEventListener("click", () => {
      const amount = Number(button.dataset.intentAmount || 0);
      const food = buildIntentFood(smartIntent, amount, "oz");
      selectFoodForLogging(food, {
        preset: "custom",
        customAmount: food.servingAmount,
        customUnit: food.servingUnit
      });
    });
  });

  elements.foodSearchResults.querySelectorAll("[data-intent-log]").forEach(button => {
    button.addEventListener("click", () => {
      const amount = Number(button.dataset.intentLog || 0);
      const food = buildIntentFood(smartIntent, amount, smartIntent.parsedUnit || smartIntent.unit);
      selectFoodForLogging(food);
    });
  });

  elements.foodSearchResults.querySelectorAll("[data-intent-advanced]").forEach(button => {
    button.addEventListener("click", () => {
      if (!smartIntent) return;
      appState.draftMeal.showAdvanced = true;
      appState.draftMeal.mealName = smartIntent.label;
      appState.draftMeal.text = query;
      appState.draftMeal.proteins = [{
        proteinType: smartIntent.proteinType,
        proteinAmount: smartIntent.amount || smartIntent.defaultAmount,
        proteinUnit: smartIntent.parsedUnit || smartIntent.unit,
        cookedOrRaw: "cooked"
      }];
      appState.draftMeal.carbs = [createEmptyCarbEntry()];
      appState.draftMeal.ingredients = [];
      saveState();
      render();
    });
  });

  elements.foodSearchResults.querySelectorAll("[data-composed-meal-review], [data-composed-meal-log]").forEach(button => {
    button.addEventListener("click", () => {
      if (!composedMeal) return;
      if (button.dataset.composedMealReview) {
        appState.foodSearchState.mealBreakdownReviewOpen = button.dataset.composedMealReview === "open";
        renderFoodSearch();
        return;
      }
      applyMealBreakdownToDraft(composedMeal, query);
    });
  });

  elements.foodSearchResults.querySelectorAll("[data-composed-meal-log-now]").forEach(button => {
    button.addEventListener("click", () => {
      if (!composedMeal) return;
      logMealBreakdownQuick(composedMeal, query);
    });
  });

  elements.foodSearchResults.querySelectorAll("[data-breakdown-amount]").forEach(input => {
    input.addEventListener("input", event => {
      const index = Number(event.target.dataset.breakdownAmount);
      const current = appState.foodSearchState.mealBreakdownDraft?.[index];
      if (!current) return;
      appState.foodSearchState.mealBreakdownDraft[index] = scaleReviewedFoodItem(current, event.target.value, current.servingUnit);
      const row = event.target.closest(".meal-breakdown-edit-row");
      const meta = row?.querySelector(".meal-breakdown-edit-head small");
      if (meta) {
        const item = appState.foodSearchState.mealBreakdownDraft[index];
        meta.textContent = `${Math.round(item.protein || 0)}P / ${Math.round(item.carbs || 0)}C / ${Math.round(item.fat || 0)}F / ${Math.round(item.calories || 0)} kcal`;
      }
    });
  });

  elements.foodSearchResults.querySelectorAll("[data-breakdown-unit]").forEach(input => {
    input.addEventListener("change", event => {
      const index = Number(event.target.dataset.breakdownUnit);
      const current = appState.foodSearchState.mealBreakdownDraft?.[index];
      if (!current) return;
      appState.foodSearchState.mealBreakdownDraft[index] = scaleReviewedFoodItem(current, current.servingAmount, event.target.value);
    });
  });

  elements.foodSearchResults.querySelectorAll("[data-breakdown-chip]").forEach(button => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.breakdownChip);
      const amount = button.dataset.breakdownChipValue || "";
      const current = appState.foodSearchState.mealBreakdownDraft?.[index];
      if (!current) return;
      appState.foodSearchState.mealBreakdownDraft[index] = scaleReviewedFoodItem(current, amount, current.servingUnit);
      renderFoodSearch();
    });
  });

  elements.foodSearchResults.querySelectorAll("[data-breakdown-match]").forEach(select => {
    select.addEventListener("change", event => {
      const index = Number(event.target.dataset.breakdownMatch);
      if (event.target.value === "") return;
      const optionIndex = Number(event.target.value);
      if (!Number.isFinite(optionIndex)) return;
      const options = getMealBreakdownAlternatives(composedMeal, index);
      const nextOption = options[optionIndex];
      const current = appState.foodSearchState.mealBreakdownDraft?.[index];
      if (!nextOption || !current) return;
      const swapped = scaleReviewedFoodItem(
        { ...nextOption, _baseServingAmount: nextOption._baseServingAmount || nextOption.servingAmount, _baseServingUnit: nextOption._baseServingUnit || nextOption.servingUnit, _baseMacros: nextOption._baseMacros || { calories: nextOption.calories, protein: nextOption.protein, carbs: nextOption.carbs, fat: nextOption.fat, fiber: nextOption.fiber } },
        current.servingAmount,
        current.servingUnit
      );
      appState.foodSearchState.mealBreakdownDraft[index] = swapped;
      renderFoodSearch();
    });
  });

  elements.foodSearchResults.querySelectorAll("[data-breakdown-unmatched]").forEach(button => {
    button.addEventListener("click", () => {
      resolveMealBreakdownUnmatchedIngredient(
        Number(button.dataset.breakdownUnmatched),
        Number(button.dataset.breakdownUnmatchedOption)
      );
    });
  });

  elements.foodSearchResults.querySelectorAll("[data-breakdown-unmatched-add]").forEach(button => {
    button.addEventListener("click", () => {
      addUnmatchedMealBreakdownIngredient(Number(button.dataset.breakdownUnmatchedAdd));
    });
  });

  elements.foodSearchResults.querySelectorAll("[data-composed-meal-apply]").forEach(button => {
    button.addEventListener("click", () => {
      if (!composedMeal) return;
      applyMealBreakdownToDraft(composedMeal, query);
    });
  });

  elements.foodSearchResults.querySelectorAll("[data-composed-meal-save]").forEach(button => {
    button.addEventListener("click", () => {
      if (!composedMeal) return;
      saveLearnedMealFromBreakdown(composedMeal, query);
    });
  });

  elements.foodSearchResults.querySelectorAll("[data-meal-customization-type]").forEach(button => {
    button.addEventListener("click", async () => {
      await applyMealBreakdownCustomizationChip(
        button.dataset.mealCustomizationType,
        button.dataset.mealCustomizationValue
      );
    });
  });

  if (elements.foodSearchModeToggle && !elements.foodSearchModeToggle.dataset.bound) {
    elements.foodSearchModeToggle.dataset.bound = "true";
    elements.foodSearchModeToggle.addEventListener("click", event => {
      const button = event.target.closest("[data-food-mode]");
      if (!button) return;
      const nextMode = button.dataset.foodMode;
      if (!["home_cooked", "eating_out"].includes(nextMode)) return;
      if (appState.foodSearchState.mode === nextMode) return;
      appState.foodSearchState.mode = nextMode;
      if (nextMode === "home_cooked") {
        appState.foodSearchState.restaurantName = "";
        appState.foodSearchState.menuItem = "";
      } else {
        appState.foodSearchState.query = "";
      }
      saveState();
      scheduleFoodSearch(appState.foodSearchState.query || "");
    });
  }
}

function renderMeals() {
  const selectedMeals = getRecentMeals(1000, getSelectedFoodMeals());
  const selectedLabel = formatFoodDateLabel();
  elements.mealList.innerHTML = selectedMeals.length ? "" : `<p class="saved-note">No meals logged for ${selectedLabel}.<\/p>`;
  selectedMeals.forEach(meal => {
    const card = document.createElement("article");
    card.className = "meal-row";
    const { proteinAngle, carbAngle, fatAngle } = getMealMacroAngles(meal);
    const proteinDetail = normalizeProteinEntries(meal.structured || {})
      .filter(entry => entry.proteinType)
      .map(entry => `${entry.proteinAmount || ""} ${entry.proteinUnit} ${entry.proteinType}`.trim())
      .join(", ") || "protein not refined";
    const carbDetail = normalizeCarbEntries(meal.structured || {})
      .filter(entry => entry.carbType)
      .map(entry => `${entry.carbAmount || ""} ${entry.carbUnit} ${entry.carbType}`.trim())
      .join(", ") || "carbs not refined";
    const veggieDetail = Number(meal.structured?.veggieServings || 0)
      ? `${meal.structured.veggieServings} veggie servings${meal.structured.veggieType ? `, ${meal.structured.veggieType}` : ""}`
      : "no veggies logged";
    const timeLabel = new Date(meal.loggedAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    card.innerHTML = `
      <div class="meal-row-main">
        <div class="meal-row-top">
          <strong>${meal.meal_name || meal.text}</strong>
          <span class="meal-row-kcal">${meal.macros.calories} kcal</span>
        </div>
        <div class="meal-row-meta">
          <span>${meal.meal_category || "meal"}</span>
          <span>${formatLoggedDate(meal.loggedAt)}</span>
          <span>${timeLabel}</span>
        </div>
        <div class="meal-row-detail-grid">
          <div class="meal-row-detail">
            <span>Protein</span>
            <strong>${proteinDetail}</strong>
          </div>
          <div class="meal-row-detail">
            <span>Carbs</span>
            <strong>${carbDetail}</strong>
          </div>
          <div class="meal-row-detail">
            <span>Veggies</span>
            <strong>${veggieDetail}</strong>
          </div>
        </div>
      </div>
      <div class="meal-row-score">
        <div class="meal-macro-pie" style="--protein-angle:${proteinAngle}deg; --carb-angle:${carbAngle}deg; --fat-angle:${fatAngle}deg;" aria-label="Macro breakdown chart">
          <div class="meal-macro-pie-center">${meal.macros.calories}</div>
        </div>
        <div class="meal-macro-legend">
          <span class="macro-protein">${meal.macros.protein}P</span>
          <span class="macro-carb">${meal.macros.carbs}C</span>
          <span class="macro-fat">${meal.macros.fat}F</span>
        </div>
      </div>
      <div class="meal-actions">
        <button class="ghost-button compact" type="button" data-log-again="${meal.id}">Log again</button>
        <button class="ghost-button compact" type="button" data-edit-meal="${meal.id}">Edit</button>
        <button class="ghost-button compact" type="button" data-save-template="${meal.id}">Save as repeat meal</button>
        <button class="ghost-button compact" type="button" data-remove-meal="${meal.id}" aria-label="Remove meal">Remove</button>
      </div>
    `;
    card.querySelector(`[data-log-again="${meal.id}"]`).addEventListener("click", () => {
      const nextMeal = {
        ...cloneData(meal),
        id: Date.now() + Math.random(),
        loggedAt: new Date().toISOString()
      };
      logMealObject(nextMeal);
      elements.templateStatus.textContent = `${meal.meal_name || meal.text} logged again.`;
      saveState();
      render();
      showFoodToast(buildMealLoggedFeedback(nextMeal));
    });
    card.querySelector(`[data-save-template="${meal.id}"]`).addEventListener("click", () => {
      const template = normalizeTemplate({
        template_id: `saved-${meal.id}`,
        id: `saved-${meal.id}`,
        meal_name: meal.meal_name || meal.text,
        label: meal.meal_name || meal.text,
        meal_category: meal.meal_category || "breakfast",
        text: meal.text,
        portion_multiplier: meal.portion_multiplier || 1,
        ingredients: normalizeIngredients(meal.structured?.ingredients || []),
        proteins: normalizeProteinEntries(meal.structured || {}),
        carbs: normalizeCarbEntries(meal.structured || {}),
        veggieServings: Number(meal.structured?.veggieServings || 0),
        veggieType: meal.structured?.veggieType || "",
        notes: meal.notes || "",
        is_favorite: false,
        last_logged_at: meal.loggedAt,
        times_logged: 1,
        estimated_macros: { ...meal.macros, fiber: Number(meal.fiber_grams || 0) }
      });
      const existingIndex = appState.savedTemplates.findIndex(item => (item.template_id || item.id) === template.template_id);
      if (existingIndex >= 0) {
        appState.savedTemplates[existingIndex] = template;
      } else {
        appState.savedTemplates = [...appState.savedTemplates, template];
      }
      elements.templateStatus.textContent = `${template.meal_name} saved to repeat meals.`;
      saveState();
      render();
    });
    card.querySelector(`[data-edit-meal="${meal.id}"]`).addEventListener("click", () => {
      beginMealEdit(meal);
    });
    card.querySelector(`[data-remove-meal="${meal.id}"]`).addEventListener("click", () => {
      appState.meals = appState.meals.filter(item => item.id !== meal.id);
      saveState();
      render();
    });
    elements.mealList.appendChild(card);
  });
}

function getMealMacroAngles(meal) {
  const proteinCalories = Number(meal?.macros?.protein || 0) * 4;
  const carbCalories = Number(meal?.macros?.carbs || 0) * 4;
  const fatCalories = Number(meal?.macros?.fat || 0) * 9;
  const macroCalories = Math.max(proteinCalories + carbCalories + fatCalories, 1);
  const proteinAngle = Math.round((proteinCalories / macroCalories) * 360);
  const carbAngle = Math.round((carbCalories / macroCalories) * 360);
  const fatAngle = Math.max(0, 360 - proteinAngle - carbAngle);
  return { proteinAngle, carbAngle, fatAngle };
}

function getMealIngredientPreview(meal) {
  if (!meal) return [];
  const ingredientEntries = normalizeIngredients(meal.structured?.ingredients || [])
    .filter(item => item.enabled !== false)
    .map(item => `${item.amount || ""} ${item.unit || ""} ${item.ingredient_name || ""}`.replace(/\s+/g, " ").trim())
    .filter(Boolean);

  if (ingredientEntries.length) {
    return ingredientEntries;
  }

  const proteinEntries = normalizeProteinEntries(meal.structured || {})
    .filter(entry => entry.proteinType)
    .map(entry => `${entry.proteinAmount || ""} ${entry.proteinUnit || ""} ${entry.proteinType || ""}`.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  const carbEntries = normalizeCarbEntries(meal.structured || {})
    .filter(entry => entry.carbType)
    .map(entry => `${entry.carbAmount || ""} ${entry.carbUnit || ""} ${entry.carbType || ""}`.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  const veggieEntry = Number(meal.structured?.veggieServings || 0)
    ? [`${meal.structured.veggieServings} ${meal.structured?.veggieType || "veggie"} servings`.replace(/\s+/g, " ").trim()]
    : [];

  return [...proteinEntries, ...carbEntries, ...veggieEntry].filter(Boolean);
}

function renderLatestMealBreakdown() {
  if (!elements.latestMealBreakdown) return;
  const latestMeal = getRecentMeals(1, getSelectedFoodMeals())[0];
  if (!latestMeal) {
    elements.latestMealBreakdown.innerHTML = `<p class="saved-note">No meals logged for ${formatFoodDateLabel()}.<\/p>`;
    return;
  }

  const { proteinAngle, carbAngle, fatAngle } = getMealMacroAngles(latestMeal);
  const timeLabel = new Date(latestMeal.loggedAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  const ingredientPreview = getMealIngredientPreview(latestMeal);
  elements.latestMealBreakdown.innerHTML = `
    <div class="latest-meal-top">
      <div>
        <strong>${latestMeal.meal_name || latestMeal.text}</strong>
        <small>${formatLoggedDate(latestMeal.loggedAt)} • ${timeLabel}</small>
      </div>
      <span class="meal-row-kcal">${latestMeal.macros.calories} kcal</span>
    </div>
    <div class="latest-meal-score">
      <div class="meal-macro-pie latest-meal-pie" style="--protein-angle:${proteinAngle}deg; --carb-angle:${carbAngle}deg; --fat-angle:${fatAngle}deg;" aria-label="Latest meal macro breakdown chart">
        <div class="meal-macro-pie-center">${latestMeal.macros.calories}</div>
      </div>
        <div class="meal-macro-legend latest-meal-legend">
          <span class="macro-protein">${latestMeal.macros.protein}P</span>
          <span class="macro-carb">${latestMeal.macros.carbs}C</span>
          <span class="macro-fat">${latestMeal.macros.fat}F</span>
        </div>
      </div>
      ${ingredientPreview.length ? `
        <div class="latest-meal-ingredients">
          ${ingredientPreview.slice(0, 6).map(item => `<span>${item}</span>`).join("")}
        </div>
      ` : ""}
      <div class="meal-actions latest-meal-actions">
        <button class="ghost-button compact" type="button" data-latest-meal-review="${latestMeal.id}">Review & edit</button>
      </div>
  `;
  elements.latestMealBreakdown.querySelector("[data-latest-meal-review]")?.addEventListener("click", () => {
    beginMealEdit(latestMeal);
  });
}

function renderTemplates() {
  elements.templateList.innerHTML = "";
  const templates = [...appState.savedTemplates]
    .sort((left, right) => {
      if (Boolean(right.is_favorite) !== Boolean(left.is_favorite)) return Number(right.is_favorite) - Number(left.is_favorite);
      return Number(right.times_logged || 0) - Number(left.times_logged || 0);
    });

  if (!templates.length) {
    elements.templateList.innerHTML = "<p class=\"saved-note\">Saved meals show up here.</p>";
    return;
  }

  templates.slice(0, 2).forEach(template => {
    const estimated = calculateMealFromDraft({
      templateId: template.template_id,
      text: template.text,
      portionMultiplier: template.portion_multiplier,
      ingredients: normalizeIngredients(template.ingredients || []),
      proteins: normalizeProteinEntries(template),
      carbs: normalizeCarbEntries(template)
    });
    const card = document.createElement("article");
    card.className = "saved-meal-shortcut";
    card.innerHTML = `
      <div>
        <strong>${template.meal_name}</strong>
        <small>${estimated.macros.protein}P / ${estimated.macros.carbs}C / ${estimated.macros.fat}F / ${estimated.macros.calories} kcal${template.is_favorite ? " • pinned" : ""}</small>
      </div>
      <div class="saved-meal-shortcut-actions">
        <button class="ghost-button compact" type="button" data-template-load="${template.template_id}">Load</button>
        <button class="primary-button compact" type="button" data-template-log="${template.template_id}">Log</button>
      </div>
    `;
    card.querySelector("[data-template-load]").addEventListener("click", () => {
      applyTemplateToDraft(template);
      render();
    });
    card.querySelector("[data-template-log]").addEventListener("click", () => {
      applyTemplateToDraft(template, true);
      const meal = createMealFromDraft();
      logMealObject(meal);
      appState.draftMeal = createEmptyDraftMeal();
      elements.templateStatus.textContent = `${template.meal_name} logged.`;
      saveState();
      render();
      showFoodToast(buildMealLoggedFeedback(meal));
    });
    elements.templateList.appendChild(card);
  });
}

function renderRepeatActions() {
  const recentFoods = getRecentFoodResults(4);
  elements.repeatActions.innerHTML = "";
  if (!recentFoods.length) {
    elements.repeatActions.innerHTML = "<p class=\"saved-note\">No recent items yet.</p>";
    return;
  }

  recentFoods.forEach(food => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "recent-food-shortcut";
    button.innerHTML = `
      <div>
        <strong>${food.name}</strong>
        <small>${food.servingLabel || `${food.servingAmount || 1} ${food.servingUnit || "serving"}`}</small>
      </div>
      <div class="recent-food-shortcut-actions">
        <span class="food-source-pill">Recent</span>
      </div>
    `;
    button.addEventListener("click", () => {
      selectFoodForLogging(food);
      elements.foodSearchInput?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
    elements.repeatActions.appendChild(button);
  });
}

function renderRecentMeals() {
  const recentMeals = getRecentMeals(4);
  const frequentTemplates = getFrequentTemplates(4);
  renderLatestMealBreakdown();
  elements.recentMeals.innerHTML = "";

  if (!recentMeals.length && !frequentTemplates.length) {
    elements.recentMeals.innerHTML = "<p class=\"saved-note\">No recent meals yet.</p>";
    return;
  }

  recentMeals.forEach(meal => {
    const card = document.createElement("article");
    card.className = "history-card secondary-list";
    card.innerHTML = `
      <div class="history-head">
        <strong>${meal.meal_name || meal.text}</strong>
        <span>${formatLoggedDate(meal.loggedAt)}</span>
      </div>
      <p>${meal.macros.protein}P / ${meal.macros.carbs}C / ${meal.macros.fat}F / ${meal.macros.calories} kcal</p>
      <button class="ghost-button compact" type="button">Repeat</button>
    `;
    card.querySelector("button").addEventListener("click", () => {
      const nextMeal = {
        ...cloneData(meal),
        id: Date.now() + Math.random(),
        loggedAt: new Date().toISOString()
      };
      logMealObject(nextMeal);
      elements.templateStatus.textContent = `${meal.meal_name || meal.text} repeated.`;
      saveState();
      render();
      showFoodToast(buildMealLoggedFeedback(nextMeal));
    });
    elements.recentMeals.appendChild(card);
  });

  frequentTemplates.forEach(template => {
    const card = document.createElement("article");
    card.className = "history-card secondary-list";
    card.innerHTML = `
      <div class="history-head">
        <strong>${template.meal_name}</strong>
        <span>${Number(template.times_logged || 0)}x</span>
      </div>
      <p>${template.meal_category}${template.is_favorite ? " | pinned" : ""}</p>
      <button class="ghost-button compact" type="button">Load</button>
    `;
    card.querySelector("button").addEventListener("click", () => {
      applyTemplateToDraft(template);
      render();
    });
    elements.recentMeals.appendChild(card);
  });
}

function renderWorkoutSelectors() {
  const sessionIds = getAvailableSessionIds();
  const weekKeys = getAvailableWeekKeys();

  // Keep hidden selects in sync for any JS that reads them
  elements.trainingDay.innerHTML = sessionIds.length
    ? sessionIds.map(dayKey => `<option value="${dayKey}">${getSessionDisplayLabel(dayKey)}</option>`).join("")
    : `<option value="">No workout sessions available</option>`;

  elements.workoutWeek.innerHTML = weekKeys.length
    ? weekKeys.map(weekKey => `<option value="${weekKey}">${formatWeekLabel(weekKey)}</option>`).join("")
    : `<option value="week-1">Week 1</option>`;

  if (sessionIds.length) {
    elements.trainingDay.value = sessionIds.includes(appState.trainingDay)
      ? appState.trainingDay
      : sessionIds[0];
  } else {
    elements.trainingDay.value = "";
  }

  if (weekKeys.length) {
    elements.workoutWeek.value = weekKeys.includes(appState.selectedWeek)
      ? appState.selectedWeek
      : weekKeys[0];
  } else {
    elements.workoutWeek.value = "week-1";
  }

  renderSessionPills();
  renderSessionExplainer();
  renderWeekPills();
}

function renderSessionPills() {
  const container = elements.sessionPills;
  if (!container) return;
  const sessionIds = getAvailableSessionIds();
  container.innerHTML = sessionIds.map(dayKey =>
    `<button class="session-pill${appState.trainingDay === dayKey ? " active" : ""}" type="button" data-session="${dayKey}">${getSessionDisplayLabel(dayKey)}</button>`
  ).join("");
}

function renderSessionExplainer() {
  const container = elements.sessionExplainer;
  if (!container) return;
  const sessionIds = getAvailableSessionIds();
  container.innerHTML = sessionIds.map(dayKey => {
    const explainer = getSessionExplainer(dayKey);
    return `
      <button class="session-explainer-card${appState.trainingDay === dayKey ? " active" : ""}" type="button" data-session="${dayKey}">
        <span class="session-explainer-title">${explainer.title}</span>
        <span class="session-explainer-summary">${explainer.summary}</span>
        <span class="session-explainer-note">${explainer.note}</span>
      </button>
    `;
  }).join("");
}

function renderWeekPills() {
  const container = elements.weekPills;
  if (!container) return;
  const weekKeys = getAvailableWeekKeys();
  container.innerHTML = weekKeys.map(weekKey =>
    `<button class="week-pill${appState.selectedWeek === weekKey ? " active" : ""}" type="button" data-week="${weekKey}">${formatWeekLabel(weekKey)}</button>`
  ).join("");
}

function renderExerciseOptions(selected, session, exercise) {
  const dayOptions = getDayExerciseOptions(session?.dayKey, exercise?.exercise_type);
  const selectedExists = dayOptions.some(name => normalizeQuery(name) === normalizeQuery(selected));
  const options = selectedExists || !selected
    ? dayOptions
    : [selected, ...dayOptions];
  return options
    .map(name => `<option value="${name}"${name === selected ? " selected" : ""}>${name}</option>`)
    .join("");
}

function renderSessionHeader(session, plan) {
  if (!elements.workoutSnapshot) return;
  const exercises = session?.exercises || [];
  const totalSets = exercises.reduce((sum, exercise) => sum + (exercise.sets?.length || 0), 0);
  const primaryCount = exercises.filter(exercise => exercise.exercise_type === "primary").length;
  const accessoryCount = exercises.length - primaryCount;
  const weekProfile = getWorkoutWeekProfile(appState.selectedWeek);
  const coverage = summarizeWorkoutCoverage(session);
  const weeklyCoverage = summarizeWeekCoverage(appState.selectedWeek);
  const readiness = getWorkoutReadiness();

  elements.workoutSnapshot.innerHTML = `
    <div class="snapshot-hero">
      <div>
        <p class="eyebrow">Today's session</p>
        <h3>${plan.label}</h3>
        <p class="snapshot-note">${session.generatorNote || weekProfile.note}</p>
      </div>
    </div>
    <div class="snapshot-grid">
      <article class="snapshot-card">
        <span>Focus</span>
        <strong>${plan.focus}</strong>
        <small>${(session.primary_lifts || []).slice(0, 2).join(" • ") || "Technique and quality reps"}</small>
      </article>
      <article class="snapshot-card">
        <span>Structure</span>
        <strong>${exercises.length} exercises</strong>
        <small>${totalSets} total sets • ${primaryCount} primary • ${accessoryCount} support</small>
      </article>
      <article class="snapshot-card">
        <span>Today’s intent</span>
        <strong>${plan.type}</strong>
        <small>${plan.core_block ? "Core finisher included" : "No core finisher today"} • Tap any card below to open the log</small>
      </article>
      <article class="snapshot-card">
        <span>Coverage</span>
        <strong>${coverage.assessment}</strong>
        <small>${coverage.detail}</small>
      </article>
      <article class="snapshot-card">
        <span>Week coverage</span>
        <strong>${weeklyCoverage.status}</strong>
        <small>${weeklyCoverage.summary}</small>
      </article>
      <article class="snapshot-card">
        <span>Watchlist</span>
        <strong>${weeklyCoverage.warnings}</strong>
        <small>${weeklyCoverage.detail}</small>
      </article>
      <article class="snapshot-card">
        <span>Readiness</span>
        <strong>${readiness.label}</strong>
        <small>${readiness.note}</small>
      </article>
    </div>
  `;
  renderWorkoutRestTimerState();
}

function renderWorkoutEmptyState() {
  if (elements.trainingPill) elements.trainingPill.textContent = "strength";
  if (elements.workoutSummary) elements.workoutSummary.textContent = "No workout loaded";
  if (elements.workoutSnapshot) {
    elements.workoutSnapshot.innerHTML = `
      <div class="workout-empty-state">
        <strong>No workout snapshot yet</strong>
        <small>Pick a week and session to auto-build today's lineup.</small>
      </div>
    `;
  }
  elements.workoutList.innerHTML = `
    <li class="saved-note workout-empty-state">
      <strong>No workout loaded</strong>
      <small>Try another session or week, or rebuild the default workout plan.</small>
    </li>
  `;
  elements.workoutHistory.innerHTML = `
    <p class="saved-note">No workout history yet. Log this session to start tracking progress.</p>
  `;
}

function renderTodayTargets(_targetsList) {
  // Today targets panel removed from UI
}

function updateWorkoutSummaryUI() {
  renderWorkoutSummary();
}

function renderWorkoutList(session) {
  const plan = getCurrentDayPlan();
  if (elements.trainingPill) elements.trainingPill.textContent = plan.type;
  if (!elements.workoutList) return;
  elements.workoutList.innerHTML = "";
  renderSessionHeader(session, plan);

  const exercises = Array.isArray(session?.exercises) ? session.exercises : [];
  if (!exercises.length) {
    elements.workoutList.innerHTML = `
      <li class="saved-note workout-empty-state">
        <strong>No exercises loaded</strong>
        <small>Add an exercise to build today's session.</small>
      </li>
    `;
    return;
  }

  const actionBar = document.createElement("li");
  actionBar.className = "workout-action-bar";
  actionBar.innerHTML = `
    <div class="workout-action-bar__left">
      <span class="workout-action-badge">${formatWeekLabel(appState.selectedWeek)} • ${session.generatorLabel || getWorkoutWeekProfile(appState.selectedWeek).label}</span>
      <span class="workout-action-badge">${estimateWorkoutMinutes(session)} min target</span>
    </div>
    <div class="workout-action-bar__right">
      <span class="workout-action-rest" data-rest-timer-state>Rest ready</span>
      <div class="workout-action-buttons">
        <button class="ghost-button compact" type="button" data-rest-seconds="60">1:00</button>
        <button class="ghost-button compact" type="button" data-rest-seconds="90">1:30</button>
        <button class="ghost-button compact" type="button" data-rest-seconds="150">2:30</button>
        <button class="ghost-button compact" type="button" data-rest-stop="true">Stop</button>
        <button class="ghost-button compact" type="button" data-workout-add="true">+ Add exercise</button>
        <button class="ghost-button compact" type="button" data-workout-reset="true">Reset workout</button>
      </div>
    </div>
  `;
  elements.workoutList.appendChild(actionBar);
  actionBar.querySelector("[data-workout-add]")?.addEventListener("click", addWorkoutExercise);
  actionBar.querySelector("[data-workout-reset]")?.addEventListener("click", resetWorkoutSession);
  actionBar.querySelectorAll("[data-rest-seconds]").forEach(button => {
    button.addEventListener("click", () => {
      startWorkoutRestTimer(Number(button.dataset.restSeconds || 90));
    });
  });
  actionBar.querySelector("[data-rest-stop]")?.addEventListener("click", stopWorkoutRestTimer);

  const activeExerciseId = syncActiveWorkoutExercise(session);

  if (workoutAddPanelOpen) {
    const addPanel = document.createElement("li");
    addPanel.className = "workout-add-panel";
    addPanel.innerHTML = `
      <div class="workout-add-panel__head">
        <strong>Add exercise on the fly</strong>
        <button class="ghost-button compact" type="button" data-role="closeAddPanel">Close</button>
      </div>
      <div class="workout-add-panel__controls">
        <input type="text" inputmode="search" placeholder="Search exercise library..." value="${workoutAddQuery}">
        <div class="workout-add-panel__modes">
          <button class="ghost-button compact${workoutAddInsertMode === "after_current" ? " active" : ""}" type="button" data-insert-mode="after_current">After current</button>
          <button class="ghost-button compact${workoutAddInsertMode === "end" ? " active" : ""}" type="button" data-insert-mode="end">At end</button>
          ${activeExerciseId && activeExerciseId !== "__none" ? `<label class="workout-add-panel__superset"><input type="checkbox" ${workoutAddSupersetWithCurrent ? "checked" : ""} data-role="supersetToggle"> Add as superset with current</label>` : ""}
        </div>
      </div>
      <div class="workout-add-panel__results">
        ${renderWorkoutAddResultsMarkup(workoutAddQuery, session.dayKey)}
      </div>
    `;
    elements.workoutList.appendChild(addPanel);

    addPanel.querySelector("input")?.addEventListener("input", event => {
      workoutAddQuery = event.target.value;
      const results = addPanel.querySelector(".workout-add-panel__results");
      if (results) {
        results.innerHTML = renderWorkoutAddResultsMarkup(workoutAddQuery, session.dayKey);
        bindWorkoutAddOptionButtons(addPanel, session, activeExerciseId);
      }
    });
    addPanel.querySelector('[data-role="closeAddPanel"]')?.addEventListener("click", () => {
      workoutAddPanelOpen = false;
      renderWorkout();
    });
    addPanel.querySelectorAll("[data-insert-mode]").forEach(button => {
      button.addEventListener("click", () => {
        workoutAddInsertMode = button.dataset.insertMode;
        renderWorkout();
      });
    });
    addPanel.querySelector('[data-role="supersetToggle"]')?.addEventListener("change", event => {
      workoutAddSupersetWithCurrent = event.target.checked;
    });
    bindWorkoutAddOptionButtons(addPanel, session, activeExerciseId);
  }

  function bindWorkoutAddOptionButtons(addPanelNode, activeSession, currentActiveExerciseId) {
    addPanelNode.querySelectorAll("[data-add-exercise]").forEach(button => {
      button.addEventListener("click", () => {
        const currentExercise = activeSession.exercises.find(exercise => exercise.id === currentActiveExerciseId);
        const supersetGroupId = workoutAddSupersetWithCurrent && currentExercise
          ? (currentExercise.supersetGroupId || createSupersetGroupId())
          : "";
        if (supersetGroupId && currentExercise && !currentExercise.supersetGroupId) {
          currentExercise.supersetGroupId = supersetGroupId;
        }
        insertWorkoutExerciseByName(button.dataset.addExercise, {
          mode: workoutAddInsertMode,
          afterExerciseId: currentActiveExerciseId,
          supersetGroupId
        });
      });
    });
  }

  const groupedExercises = buildWorkoutRenderGroups(exercises);
  const supersetLabels = getSupersetDisplayMap(exercises);
  let runningExerciseIndex = 0;

  groupedExercises.forEach(group => {
    const groupContainer = document.createElement("li");
    groupContainer.className = group.groupId ? "superset-block" : "exercise-block";
    if (group.groupId) {
      groupContainer.innerHTML = `<div class="superset-block__label">Superset ${supersetLabels.get(group.groupId) || "A"}</div>`;
    }

    group.exercises.forEach((exercise, groupIndex) => {
      const exerciseIndex = runningExerciseIndex;
      runningExerciseIndex += 1;
    try {
      const previous = getPreviousPerformance(exercise.name);
      const previousExercise = getPreviousExerciseLog(exercise.name);
      const previousWeek = getPreviousWeekPerformance(exercise.name);
      const currentBest = getBestSet(exercise);
      const suggestion = getProgressionSuggestion(exercise, previous);
      const coaching = getWorkoutExecutionCoaching(exercise, suggestion);
      const setPlan = getTopSetBackoffPlan(exercise, suggestion, previousExercise);
      const hint = getProgressionHint(exercise.name, exercise.repRange);
      const summaryDelta = formatWeekChange(currentBest, previousWeek);
      const howTo = getExerciseHowTo(exercise);
      const isExpanded = activeExerciseId === exercise.id;
      const nextUnfinished = getNextUnfinishedExercise(session, activeExerciseId);
      const isNextPreview = nextUnfinished?.id === exercise.id && !isExpanded;
      const supersetPrefix = group.groupId ? `${supersetLabels.get(group.groupId) || "A"}${groupIndex + 1}` : "";
      const compactSummary = exercise.completed
        ? `<span><strong>Best:</strong> ${getBestSetSummaryText(exercise)}</span><span><strong>Sets:</strong> ${getCompletedSetCount(exercise)}/${exercise.sets.length} logged</span><span><strong>Status:</strong> done</span>`
        : `<span><strong>Last:</strong> ${previous ? formatBestSet(previous) : "No previous session"}</span><span><strong>Target:</strong> ${suggestion.suggested_weight_text} x ${suggestion.suggested_reps_target}</span><span><strong>Trend:</strong> ${summaryDelta}</span>`;

      const card = document.createElement("div");
      card.className = `exercise-card${isExpanded ? " expanded current" : " collapsed"}${exercise.completed ? " completed" : ""}${isNextPreview ? " next-preview" : ""}${!exercise.completed && !isExpanded && !isNextPreview ? " upcoming" : ""}`;
      card.dataset.exerciseCardId = exercise.id;

      const canRemove = exercises.length > 1;
      const setsHtml = (exercise.sets || []).map((set, setIndex) => `
        <div class="set-row" data-set="${setIndex}">
          <span>Set ${setIndex + 1}</span>
          <input data-role="reps" data-set="${setIndex}" data-exercise-index="${exerciseIndex}" data-set-field="reps" type="text" inputmode="numeric" placeholder="Reps" value="${set.reps}">
          <input data-role="weight" data-set="${setIndex}" data-exercise-index="${exerciseIndex}" data-set-field="weight" type="text" inputmode="decimal" placeholder="Weight" value="${set.weight}">
          <div class="set-row-actions">
            <button class="ghost-button compact" type="button" data-role="duplicateSet" data-set-index="${setIndex}">Copy</button>
            ${(exercise.sets || []).length > 1 ? `<button class="ghost-button compact destructive" type="button" data-role="removeSet" data-set-index="${setIndex}">Remove</button>` : ""}
          </div>
        </div>
      `).join("");

      card.innerHTML = `
        <div class="exercise-card-shell">
          <div class="exercise-summary-top">
            <div class="exercise-toggle" data-role="toggleExercise" aria-expanded="${isExpanded}" role="button" tabindex="0">
              <div class="exercise-summary-copy">
                <strong>${supersetPrefix ? `<span class="superset-exercise-prefix">${supersetPrefix}</span> ` : ""}${exercise.name}${exercise.adHoc ? ` <span class="exercise-ad-hoc-pill">ad hoc</span>` : ""}</strong>
                <small>${exercise.exercise_type} • ${formatRepRange(exercise.repRange)} • ${exercise.sets.length} sets${group.groupId ? " • superset" : ""}</small>
              </div>
              <div class="exercise-summary-side">
                <span class="exercise-summary-pill">${previous ? formatBestSet(previous) : "Fresh slot"}</span>
                <span class="exercise-summary-pill">${suggestion.suggested_weight_text} x ${suggestion.suggested_reps_target}</span>
                ${exercise.completed ? `<span class="exercise-summary-pill done">Done</span>` : ""}
                <span class="exercise-summary-chevron" aria-hidden="true">${isExpanded ? "−" : "+"}</span>
              </div>
            </div>
            <div class="exercise-summary-actions">
              <button class="ghost-button compact" type="button" data-role="autofillSets">Auto-fill</button>
              ${previousExercise ? `<button class="ghost-button compact" type="button" data-role="copyLast">Copy last</button>` : ""}
              <button class="ghost-button compact" type="button" data-role="swapExercise">Swap</button>
              ${canRemove ? `<button class="ghost-button compact destructive" type="button" data-role="removeExercise">Remove</button>` : ""}
            </div>
          </div>
          <div class="exercise-summary-meta${exercise.completed ? " compact-complete" : ""}">
            ${compactSummary}
          </div>
          <label class="exercise-complete">
            <input type="checkbox" ${exercise.completed ? "checked" : ""} data-role="complete">
            Done
          </label>
          <div class="exercise-detail-panel" ${isExpanded ? "" : "hidden"}>
            <div class="exercise-head">
              <div>
                <label class="exercise-picker">
                  <span>Exercise</span>
                  <select data-role="exerciseName">
                    ${renderExerciseOptions(exercise.name, session, exercise)}
                  </select>
                </label>
                <small>${exercise.exercise_type} | ${formatRepRange(exercise.repRange)}</small>
              </div>
              <details class="exercise-howto">
                <summary>How to</summary>
                <p>${howTo}</p>
              </details>
            </div>
            <div class="exercise-targets">
              <p><strong>Last Session:</strong> ${previous ? formatBestSet(previous) : "No previous session"}</p>
              <p><strong>Target:</strong> ${suggestion.suggested_weight_text} x ${suggestion.suggested_reps_target}</p>
              <p><strong>${setPlan.headline}</strong></p>
              <p>${setPlan.detail}</p>
              ${previousExercise ? `<p><strong>Last working sets:</strong> ${formatExerciseSetPreview(previousExercise)}</p>` : ""}
            </div>
            <p class="exercise-coaching ${coaching.tone}">${coaching.text}</p>
            <div class="exercise-rest-toolbar">
              <span class="exercise-rest-state" data-rest-timer-state>Rest ready</span>
              <div class="exercise-rest-buttons">
                <button class="ghost-button compact" type="button" data-rest-seconds="60">1:00</button>
                <button class="ghost-button compact" type="button" data-rest-seconds="90">1:30</button>
                <button class="ghost-button compact" type="button" data-rest-seconds="150">2:30</button>
                <button class="ghost-button compact" type="button" data-rest-stop="true">Stop</button>
              </div>
            </div>
            <div class="exercise-set-actions">
              <button class="ghost-button compact" type="button" data-role="addSet">+ Set</button>
            </div>
            <div class="set-grid">${setsHtml}</div>
            <p class="exercise-meta">${previous ? `Previous best: ${formatBestSet(previous)}` : "No previous performance yet."}</p>
            <p class="exercise-meta">${summaryDelta}</p>
            <p class="exercise-meta">Progression: ${suggestion.progression_status}</p>
            <p class="exercise-meta">${hint}</p>
          </div>
        </div>
      `;

      groupContainer.appendChild(card);

      const toggle = card.querySelector('[data-role="toggleExercise"]');
      toggle?.addEventListener("click", () => {
        expandedWorkoutExerciseId = isExpanded ? "__none" : exercise.id;
        renderWorkout();
      });
      toggle?.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          expandedWorkoutExerciseId = isExpanded ? "__none" : exercise.id;
          renderWorkout();
        }
      });

      card.querySelector('[data-role="swapExercise"]')?.addEventListener("click", () => {
        expandedWorkoutExerciseId = exercise.id;
        renderWorkout();
        window.requestAnimationFrame(() => {
          elements.workoutList
            ?.querySelector(`[data-exercise-card-id="${exercise.id}"] select[data-role="exerciseName"]`)
            ?.focus();
        });
      });

      card.querySelector('[data-role="removeExercise"]')?.addEventListener("click", () => {
        removeWorkoutExercise(exercise.id);
      });

      card.querySelector('[data-role="copyLast"]')?.addEventListener("click", () => {
        copyPreviousWorkoutExercise(exercise.id);
      });

      card.querySelector('[data-role="autofillSets"]')?.addEventListener("click", () => {
        autofillWorkoutExercise(exercise.id);
      });

      card.querySelector('[data-role="addSet"]')?.addEventListener("click", () => {
        addWorkoutSet(exercise.id);
      });

      card.querySelectorAll('[data-role="duplicateSet"]').forEach(button => {
        button.addEventListener("click", () => {
          duplicateWorkoutSet(exercise.id, Number(button.dataset.setIndex));
        });
      });

      card.querySelectorAll('[data-role="removeSet"]').forEach(button => {
        button.addEventListener("click", () => {
          removeWorkoutSet(exercise.id, Number(button.dataset.setIndex));
        });
      });

      card.querySelectorAll("[data-rest-seconds]").forEach(button => {
        button.addEventListener("click", () => {
          startWorkoutRestTimer(Number(button.dataset.restSeconds || 90), exercise.name);
        });
      });

      card.querySelector("[data-rest-stop]")?.addEventListener("click", stopWorkoutRestTimer);

      card.querySelector('[data-role="exerciseName"]')?.addEventListener("change", event => {
        const selectedName = event.target.value;
        const currentExercise = session.exercises[exerciseIndex];
        const nextTemplate = getExerciseTemplate(selectedName, currentExercise);
        currentExercise.name = selectedName;
        currentExercise.exercise_type = nextTemplate?.exercise_type || currentExercise.exercise_type;
        currentExercise.repRange = nextTemplate?.repRange || currentExercise.repRange;
        currentExercise.targetRir = nextTemplate?.targetRir || currentExercise.targetRir;
        const nextSetCount = nextTemplate?.defaultSets || currentExercise.sets.length;
        if (nextSetCount !== currentExercise.sets.length) {
          currentExercise.sets = Array.from({ length: nextSetCount }, (_, setIndex) => currentExercise.sets[setIndex] || {
            id: `${session.id}-exercise-${exerciseIndex}-set-${setIndex}`,
            reps: "",
            weight: "",
            rir: ""
          });
        }
        autofillWorkoutExerciseSets(currentExercise, { force: true });
        const liftLists = deriveSessionLiftLists(session.exercises);
        session.primary_lifts = liftLists.primary_lifts;
        session.accessory_lifts = liftLists.accessory_lifts;
        finalizeWorkoutDay();
        saveState();
        renderWorkout();
        renderCoach();
      });

      card.querySelector('[data-role="complete"]')?.addEventListener("change", event => {
        session.exercises[exerciseIndex].completed = event.target.checked;
        if (event.target.checked) {
          const nextExercise = getNextUnfinishedExercise(session, exercise.id);
          expandedWorkoutExerciseId = nextExercise?.id || "__none";
          queueWorkoutScroll(nextExercise?.id || "");
        } else {
          expandedWorkoutExerciseId = exercise.id;
        }
        finalizeWorkoutDay();
        saveState();
        renderDashboard();
        renderWorkout();
        renderCoach();
      });

      card.querySelectorAll('input[data-set]').forEach(input => {
        input.addEventListener("focus", event => {
          beginTypingSession(event.target);
          rememberWorkoutSetInput(event.target);
        });
        input.addEventListener("input", event => {
          beginTypingSession(event.target);
          rememberWorkoutSetInput(event.target);
        });
        input.addEventListener("blur", event => {
          const currentSession = ensureWorkoutSession(appState.trainingDay);
          const currentExerciseIndex = Number(event.target.dataset.exerciseIndex);
          const setIndex = Number(event.target.dataset.set);
          const field = event.target.dataset.setField;
          const currentExercise = currentSession.exercises[currentExerciseIndex];
          if (currentExercise && currentExercise.sets[setIndex]) {
            currentExercise.sets[setIndex][field] = event.target.value;
            finalizeWorkoutDay();
            saveState();
            renderWorkoutSummary();
            renderWorkoutHistory();
            renderDashboard();
            renderCoach();
            if ((field === "reps" || field === "weight") && String(event.target.value || "").trim() !== "") {
              startWorkoutRestTimer(getDefaultRestSeconds(currentExercise.exercise_type), currentExercise.name);
            }
          }
          endTypingSession();
        });
      });
    } catch (error) {
      console.error("Workout card render failed", exercise?.name, error);
      const fallbackCard = document.createElement("div");
      fallbackCard.className = "saved-note";
      fallbackCard.innerHTML = `
        <strong>${exercise?.name || "Exercise"}</strong>
        <small>Card failed to render, but the session is still loaded. Try swapping or removing this slot.</small>
      `;
      groupContainer.appendChild(fallbackCard);
    }
    });
    if (groupContainer.childNodes.length > 0) {
      elements.workoutList.appendChild(groupContainer);
    }
  });

  restoreWorkoutSetInputFocus();
  if (pendingWorkoutScrollId) {
    const nextId = pendingWorkoutScrollId;
    pendingWorkoutScrollId = "";
    window.requestAnimationFrame(() => scrollWorkoutCardIntoView(nextId));
  }
}

function renderWorkoutSession() {
  const session = ensureWorkoutSession(appState.trainingDay);
  if (!session || !Array.isArray(session.exercises) || !session.exercises.length) {
    renderWorkoutEmptyState();
    return null;
  }
  renderWorkoutList(session);
  return session;
}

function renderWorkout() {
  normalizeWorkoutSelections();
  const session = ensureWorkoutSession(appState.trainingDay);
  if (!session) return;
  renderWorkoutSession();
  renderWorkoutSummary();
  renderWorkoutHistory();
}

function renderWorkoutSummary() {
  if (!elements.workoutSummary) return;
  const session = appState.workoutSessions?.[appState.selectedWeek]?.[appState.trainingDay];
  if (!session || !session.exercises?.length) {
    elements.workoutSummary.textContent = "Session ready";
    return;
  }
  const completedCount = session.exercises.filter(exercise => exercise.completed).length;
  elements.workoutSummary.textContent = completedCount
    ? `${completedCount}/${session.exercises.length} complete`
    : "Session ready";
}

function renderWorkoutHistory() {
  const session = appState.workoutSessions?.[appState.selectedWeek]?.[appState.trainingDay];
  if (!session || !session.exercises?.length) {
    elements.workoutHistory.innerHTML = "<p class=\"saved-note\">No workout history yet. Log this session to start tracking progress.</p>";
    return;
  }
  const loggedExercises = session.exercises.filter(exercise => getBestSet(exercise) || exercise.completed);
  elements.workoutHistory.innerHTML = "";

  if (!loggedExercises.length) {
    elements.workoutHistory.innerHTML = "<p class=\"saved-note\">No workout history yet. Log this session to start tracking progress.</p>";
    return;
  }

  loggedExercises.forEach(exercise => {
    const currentBest = getBestSet(exercise);
    const entries = getAllExerciseEntries(exercise.name).slice(-4).reverse();
    const completionRate = Math.round(getExerciseCompletionRate(exercise.name) * 100);
    const streak = getExerciseCompletionStreak(exercise.name);
    const previousWeek = getPreviousWeekPerformance(exercise.name);
    const card = document.createElement("article");
    card.className = "history-card";
    card.innerHTML = `
      <div class="history-head">
        <strong>${exercise.name}</strong>
        <span>${formatBestSet(currentBest)}</span>
      </div>
      <div class="trend-line">
        ${buildTrendBars(entries)}
      </div>
      <p class="exercise-meta">Last session top set: ${formatBestSet(currentBest)}</p>
      <p class="exercise-meta">${formatWeekChange(currentBest, previousWeek)}</p>
      <p class="exercise-meta">Completion rate: ${completionRate}% | streak: ${streak}</p>
      <div class="history-lines">
        ${entries.map(entry => `<p>${formatWeekLabel(entry.weekKey)} ${getSessionDisplayLabel(entry.sessionDay)}: ${formatBestSet(entry.best)}</p>`).join("")}
      </div>
    `;
    elements.workoutHistory.appendChild(card);
  });
}

function getExerciseCompletionRate(exerciseName) {
  const sessions = Object.values(appState.workoutSessions || {}).flatMap(week => Object.values(week || {}));
  const matching = sessions.flatMap(session => (session.exercises || []).filter(exercise => exercise.name === exerciseName));
  if (!matching.length) return 0;
  return matching.filter(exercise => exercise.completed || getBestSet(exercise)).length / matching.length;
}

function getExerciseCompletionStreak(exerciseName) {
  const entries = getAllExerciseEntries(exerciseName).reverse();
  let streak = 0;
  for (const entry of entries) {
    if (entry.best && (entry.best.bestWeight > 0 || entry.best.bestReps > 0)) {
      streak += 1;
    } else {
      break;
    }
  }
  return `${streak} ${streak === 1 ? "week" : "weeks"}`;
}

function buildTrendBars(entries) {
  if (!entries.length) return "<span class=\"trend-empty\">No trend yet</span>";
  const maxWeight = Math.max(...entries.map(entry => entry.best.bestWeight || 0), 1);
  return entries.slice().reverse().map(entry => {
    const width = entry.best.bestWeight ? Math.max(18, Math.round((entry.best.bestWeight / maxWeight) * 100)) : 18;
    return `<i style="width:${width}%"></i>`;
  }).join("");
}

function buildInsights() {
  const totals = getTotals();
  const carbTargets = getCurrentCarbTargets();
  const plan = getCurrentDayPlan();
  const insights = [];
  const veggieTotal = getVeggieServingsTotal();
  const micros = getMicronutrientTotals();
  const proteinGap = targets.protein - totals.protein;
  const carbGap = carbTargets.low - totals.carbs;
  const calorieGap = targets.caloriesLow - totals.calories;

  if (!getSelectedFoodMeals().length) return ["Next: log your first meal."];

  if (proteinGap > 25) {
    insights.push(`Next: get ${Math.min(Math.ceil(proteinGap / 5) * 5, 40)}g protein.`);
  } else if (proteinGap > 0) {
    insights.push(`Next: finish protein. ${proteinGap}g left.`);
  } else {
    insights.push("Protein is on track.");
  }

  if (plan.type === "strength" && carbGap > 20) {
    insights.push("Next: add carbs around training.");
  } else if (plan.type === "conditioning" && carbGap > 20) {
    insights.push("Next: add a moderate carb bump.");
  }

  if (plan.type !== "recovery" && calorieGap > 250) {
    insights.push("Next: add a meal or shake.");
  }

  if (appState.recoveryLog.fullness === "stuffed") {
    insights.push("Next: shift more calories earlier.");
  }

  if (appState.meals.some(meal => meal.cues.rge)) {
    insights.push("Next: keep portions steady.");
  }

  if (veggieTotal < 2) {
    insights.push("Next: add vegetables.");
  }

  if (micros.fiber < 20) {
    insights.push("Next: add fiber.");
  }

  if (getWorkoutCompletionScore() > 0.8 && totals.protein >= targets.protein) {
    insights.push("Keep the day steady.");
  }

  return insights.slice(0, 2);
}

function renderCoach() {
  const plan = getCurrentDayPlan();
  const score = computeScore();
  const insights = buildInsights();
  const hasMeals = getSelectedFoodMeals().length > 0;
  const hasWorkoutProgress = getWorkoutCompletionScore() > 0;
  const hasRecoveryProgress = getRecoveryCompleted();
  const showLiveScore = hasMeals || hasWorkoutProgress || hasRecoveryProgress;

  if (!showLiveScore) {
    elements.coachHeadline.textContent = "No activity yet today.";
    elements.coachMessage.textContent = "Start your first workout or meal.";
    elements.insightList.innerHTML = "<p>Your targets are ready.</p>";
    return;
  }

  elements.coachHeadline.textContent = plan.type === "strength"
    ? "Fuel the lift. Keep the score earned."
    : plan.type === "conditioning"
      ? "Stay fueled. Keep it sharp."
      : "Recover well. Keep protein steady.";
  elements.coachMessage.textContent = insights[0] || "You are on track.";
  elements.insightList.innerHTML = "";
  insights.slice(0, 2).forEach(insight => {
    const item = document.createElement("p");
    item.textContent = insight;
    elements.insightList.appendChild(item);
  });
  if (!insights.length) {
    const item = document.createElement("p");
    item.textContent = `Score ${score.percentage}%. Keep stacking the basics.`;
    elements.insightList.appendChild(item);
  }
}

function renderRecovery() {
  const recovery = appState.recoveryLog;
  elements.energy.value = recovery.energy;
  elements.fullness.value = recovery.fullness;
  elements.hydrated.checked = recovery.hydrated;
  elements.sauna.checked = recovery.sauna;
  elements.nightStack.checked = recovery.nightStack;
  elements.dailyNote.value = recovery.dailyNote;
  elements.savedNote.textContent = recovery.completed
    ? `Energy ${recovery.energy}/10 • ${recovery.fullness}${recovery.dailyNote ? ` • ${recovery.dailyNote}` : " • check-in saved"}`
    : "No check-in saved yet.";
}

function renderFatalError(error) {
  const root = document.querySelector("main");
  if (!root) return;
  root.innerHTML = `
    <section class="tool-panel">
      <div class="panel-heading">
        <div>
          <p class="eyebrow">App error</p>
          <h2>Something broke during startup</h2>
        </div>
      </div>
      <p class="saved-note">Check the console for details: ${String(error.message || error)}</p>
    </section>
  `;
}

function render() {
  if (shouldPreserveTypingFocus()) return;
  normalizeWorkoutSelections();
  renderAuthStatus();
  renderWorkoutSelectors();
  renderWorkout();
  renderDashboard();
  renderMicronutrients();
  renderFoodSearch();
  renderMealDraft();
  renderRepeatActions();
  renderRecentMeals();
  renderMeals();
  renderTemplates();
  renderRecovery();
  renderCoach();
}

function handleDraftFieldChange(event) {
  beginTypingSession(event.target);
  const field = event.target.dataset.field;
  if (field === "portionMultiplier") {
    if (event.target.value !== "custom") {
      appState.draftMeal.portionMultiplier = event.target.value;
    }
  } else if (field === "portionMultiplierCustom") {
    appState.draftMeal.portionMultiplier = event.target.value;
  } else {
    appState.draftMeal[field] = event.target.value;
  }
  if (event.type === "input") {
    updateMealDraftSummaryUI();
    return;
  }
  flushDraftSave();
  endTypingSession();
  updateMealDraftSummaryUI();
}

function handleProteinFieldChange(event) {
  beginTypingSession(event.target);
  const field = event.target.dataset.proteinField;
  const index = Number(event.target.dataset.proteinIndex);
  appState.draftMeal.proteins[index][field] = event.target.value;
  if (event.type === "input") {
    updateMealDraftSummaryUI();
    return;
  }
  flushDraftSave();
  if (event.target.tagName === "SELECT") {
    renderMealDraft();
    return;
  }
  endTypingSession();
  updateMealDraftSummaryUI();
}

function handleCarbFieldChange(event) {
  beginTypingSession(event.target);
  const field = event.target.dataset.carbField;
  const index = Number(event.target.dataset.carbIndex);
  appState.draftMeal.carbs[index][field] = event.target.value;
  if (event.type === "input") {
    updateMealDraftSummaryUI();
    return;
  }
  flushDraftSave();
  if (event.target.tagName === "SELECT") {
    renderMealDraft();
    return;
  }
  endTypingSession();
  updateMealDraftSummaryUI();
}

function handleIngredientFieldChange(event) {
  beginTypingSession(event.target);
  const field = event.target.dataset.ingredientField;
  const index = Number(event.target.dataset.ingredientIndex);
  appState.draftMeal.ingredients[index][field] = event.target.type === "checkbox"
    ? event.target.checked
    : event.target.value;
  if (["ingredient_name", "amount", "unit"].includes(field)) {
    syncIngredientAutoMacros(index, true);
  }
  if (event.type === "input") {
    updateMealDraftSummaryUI();
    return;
  }
  flushDraftSave();
  endTypingSession();
  updateIngredientMacroFields(index);
  updateMealDraftSummaryUI();
}

function handleIngredientMacroChange(event) {
  beginTypingSession(event.target);
  const field = event.target.dataset.ingredientMacro;
  const index = Number(event.target.dataset.ingredientIndex);
  appState.draftMeal.ingredients[index].source = "manual";
  appState.draftMeal.ingredients[index].macro_estimate[field] = event.target.value;
  if (event.type === "input") {
    updateIngredientMacroFields(index);
    updateMealDraftSummaryUI();
    return;
  }
  flushDraftSave();
  endTypingSession();
  updateIngredientMacroFields(index);
  updateMealDraftSummaryUI();
}

document.querySelector("#mealForm").addEventListener("submit", event => {
  event.preventDefault();
  endTypingSession();
  if (appState.draftMeal.quickAdd && !appState.draftMeal.showAdvanced) {
    logQuickAddMeal();
    return;
  }
  const text = elements.mealEntry.value.trim();
  if (!text) return;
  appState.draftMeal.text = text;
  const isEditing = Boolean(appState.draftMeal.editingMealId);
  const meal = createMealFromDraft();
  if (isEditing) {
    appState.meals = appState.meals.map(item => item.id === meal.id ? meal : item);
    setSelectedFoodDateKey(getMealDateKey(meal));
  } else {
    logMealObject(meal);
  }

  appState.draftMeal = createEmptyDraftMeal();
  elements.templateStatus.textContent = isEditing ? "Meal updated." : "Meal logged.";
  saveState();
  render();
  showFoodToast(isEditing ? `${meal.meal_name || meal.text} updated` : buildMealLoggedFeedback(meal));
});

elements.mealEntry.addEventListener("input", event => {
  beginTypingSession(event.target);
  appState.draftMeal.text = event.target.value;
  appState.draftMeal.quickAdd = null;
  if (!appState.draftMeal.mealName) {
    appState.draftMeal.mealName = event.target.value.slice(0, 48);
  }
  const parsed = parseFreeText(appState.draftMeal.text);
  if (!appState.draftMeal.proteins[0].proteinType && parsed.suggestedProteinType) {
    const defaultsForProtein = proteinOptions[parsed.suggestedProteinType];
    appState.draftMeal.proteins[0].proteinType = parsed.suggestedProteinType;
    appState.draftMeal.proteins[0].proteinUnit = defaultsForProtein.defaultUnit;
    appState.draftMeal.proteins[0].cookedOrRaw = defaultsForProtein.cookedOrRaw;
    if (!appState.draftMeal.proteins[0].proteinAmount && parsed.suggestedProteinAmount) {
      appState.draftMeal.proteins[0].proteinAmount = parsed.suggestedProteinAmount;
    }
    if (parsed.suggestedProteinUnit) {
      appState.draftMeal.proteins[0].proteinUnit = parsed.suggestedProteinUnit;
    }
  }
  if (!appState.draftMeal.carbs[0].carbType && parsed.suggestedCarbType) {
    const defaultsForCarb = carbOptions[parsed.suggestedCarbType];
    appState.draftMeal.carbs[0].carbType = parsed.suggestedCarbType;
    appState.draftMeal.carbs[0].carbUnit = defaultsForCarb.defaultUnit;
    if (!appState.draftMeal.carbs[0].carbAmount && parsed.suggestedCarbAmount) {
      appState.draftMeal.carbs[0].carbAmount = parsed.suggestedCarbAmount;
    }
    if (parsed.suggestedCarbUnit) {
      appState.draftMeal.carbs[0].carbUnit = parsed.suggestedCarbUnit;
    }
  }
  scheduleDraftSave();
});

elements.mealEntry.addEventListener("blur", () => {
  flushDraftSave();
  endTypingSession();
});

if (elements.foodSearchInput) {
  elements.foodSearchInput.addEventListener("input", event => {
    beginTypingSession(event.target);
    if (appState.foodSearchState.mode === "eating_out") {
      appState.foodSearchState.mode = "home_cooked";
      appState.foodSearchState.restaurantName = "";
      appState.foodSearchState.menuItem = "";
    }
    scheduleFoodSearch(event.target.value);
  });

  elements.foodSearchInput.addEventListener("blur", () => {
    endTypingSession();
  });
}

if (elements.restaurantSearchInput) {
  elements.restaurantSearchInput.addEventListener("input", event => {
    beginTypingSession(event.target);
    appState.foodSearchState.mode = "eating_out";
    appState.foodSearchState.restaurantName = event.target.value;
    scheduleFoodSearch();
  });
  elements.restaurantSearchInput.addEventListener("blur", () => {
    endTypingSession();
  });
}

if (elements.restaurantItemInput) {
  elements.restaurantItemInput.addEventListener("input", event => {
    beginTypingSession(event.target);
    appState.foodSearchState.mode = "eating_out";
    appState.foodSearchState.menuItem = event.target.value;
    scheduleFoodSearch();
  });
  elements.restaurantItemInput.addEventListener("blur", () => {
    endTypingSession();
  });
}

if (elements.eatShortcutBar && !elements.eatShortcutBar.dataset.bound) {
  elements.eatShortcutBar.dataset.bound = "true";
  elements.eatShortcutBar.addEventListener("click", event => {
    const button = event.target.closest("[data-eat-shortcut]");
    if (!button) return;
    const shortcut = button.dataset.eatShortcut;
    if (shortcut === "recent") {
      document.querySelector("#eatRecentSection")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (shortcut === "saved") {
      document.querySelector("#eatSavedSection")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (shortcut === "restaurant") {
      appState.foodSearchState.mode = "eating_out";
      saveState();
      renderFoodSearch();
      window.setTimeout(() => {
        elements.restaurantSearchInput?.focus();
      }, 40);
      return;
    }
    if (shortcut === "manual") {
      if (elements.eatSecondaryShell) {
        elements.eatSecondaryShell.open = true;
      }
      elements.mealEntry?.scrollIntoView({ behavior: "smooth", block: "center" });
      window.setTimeout(() => {
        elements.mealEntry?.focus();
      }, 40);
    }
  });
}

document.querySelector("#clearMeals").addEventListener("click", () => {
  const selectedDateKey = getSelectedFoodDateKey();
  appState.meals = appState.meals.filter(meal => getMealDateKey(meal) !== selectedDateKey);
  appState.draftMeal = createEmptyDraftMeal();
  elements.templateStatus.textContent = `${formatFoodDateLabel(selectedDateKey)} cleared.`;
  saveState();
  render();
});

elements.saveMealTemplate.addEventListener("click", () => {
  const text = elements.mealEntry.value.trim();
  if (!text && !appState.draftMeal.mealName.trim()) return;
  if (text) appState.draftMeal.text = text;
  const template = buildTemplateFromDraft();
  const existingIndex = appState.savedTemplates.findIndex(item => (item.template_id || item.id) === template.template_id);
  if (existingIndex >= 0) {
    appState.savedTemplates[existingIndex] = normalizeTemplate({
      ...appState.savedTemplates[existingIndex],
      ...template
    });
  } else {
    appState.savedTemplates.push(template);
  }
  appState.draftMeal.templateId = template.template_id;
  elements.templateStatus.textContent = `${template.meal_name} saved to repeat meals.`;
  saveState();
  render();
});

elements.saveTemplateDefaults.addEventListener("click", () => {
  const templateId = appState.draftMeal.templateId;
  if (!templateId) return;
  const text = elements.mealEntry.value.trim();
  if (text) appState.draftMeal.text = text;
  const template = buildTemplateFromDraft(templateId);
  appState.savedTemplates = appState.savedTemplates.map(item => (item.template_id || item.id) === templateId
    ? normalizeTemplate({
        ...item,
        ...template,
        is_favorite: item.is_favorite,
        times_logged: item.times_logged,
        last_logged_at: item.last_logged_at
      })
    : item);
  elements.templateStatus.textContent = `${template.meal_name} defaults updated.`;
  saveState();
  render();
});

elements.trainingDay.addEventListener("change", (e) => {
  appState.trainingDay = e.target.value;
  normalizeWorkoutSelections();
  saveState();
  render();
});

elements.workoutWeek.addEventListener("change", (e) => {
  appState.selectedWeek = e.target.value;
  normalizeWorkoutSelections();
  saveState();
  render();
});

document.querySelector("#recoveryForm").addEventListener("submit", event => {
  event.preventDefault();
  endTypingSession();
  appState.recoveryLog = {
    energy: Number(elements.energy.value),
    fullness: elements.fullness.value,
    hydrated: elements.hydrated.checked,
    sauna: elements.sauna.checked,
    nightStack: elements.nightStack.checked,
    dailyNote: elements.dailyNote.value,
    completed: true
  };
  saveState();
  render();
});

document.querySelector("#resetDay").addEventListener("click", () => {
  if (!confirm("Reset today's meals and recovery log? Workout data is preserved.")) return;
  const todayKey = getLocalDateKey();
  appState.meals = appState.meals.filter(meal => getMealDateKey(meal) !== todayKey);
  setSelectedFoodDateKey(todayKey);
  appState.draftMeal = createEmptyDraftMeal();
  appState.recoveryLog = { ...defaults.recoveryLog };
  hydrateState();
  saveState();
  render();
});

if (elements.foodDayPrev) {
  elements.foodDayPrev.addEventListener("click", () => {
    shiftSelectedFoodDate(-1);
    saveState();
    render();
  });
}

if (elements.foodDayNext) {
  elements.foodDayNext.addEventListener("click", () => {
    if (isViewingTodayFood()) return;
    shiftSelectedFoodDate(1);
    saveState();
    render();
  });
}

// Energy slider live value display
if (elements.energy && elements.energyValue) {
  elements.energy.addEventListener("input", () => {
    elements.energyValue.textContent = elements.energy.value;
  });
}

document.addEventListener("focusin", event => {
  if (isTypingField(event.target)) beginTypingSession(event.target);
});

document.addEventListener("focusout", event => {
  if (event.target === document.activeElement) return;
  if (!event.relatedTarget || !isTypingField(event.relatedTarget)) {
    endTypingSession();
  }
});

// Export data
function exportAppData() {
  const payload = {
    exportedAt: new Date().toISOString(),
    version: stateKey,
    state: appState
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = `apex-backup-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

// Import data
function importAppData(file) {
  const reader = new FileReader();
  reader.onload = event => {
    try {
      const parsed = JSON.parse(event.target.result);
      const data   = parsed.state || parsed;
      appState = { ...cloneData(defaults), ...data };
      hydrateState();
      saveState();
      render();
      alert("Data imported successfully.");
    } catch {
      alert("Could not read that file. Make sure it's an APEX backup JSON.");
    }
  };
  reader.readAsText(file);
}

async function bootstrapRemoteState() {
  if (!backendService?.isConfigured?.()) {
    appState.authMode = "local";
    renderAuthStatus();
    return;
  }
  try {
    const init = await backendService.init();
    if (init?.userId) appState.userId = init.userId;
    if (init?.mode) appState.authMode = init.mode;
    renderAuthStatus();
    const remoteState = await backendService.loadRemoteState();
    if (remoteState) {
      mergeRemoteState(remoteState);
      hydrateState();
      localStorage.setItem(stateKey, JSON.stringify(appState));
      render();
    }
  } catch (error) {
    appState.authMode = "local";
    renderAuthStatus();
    console.error("Remote bootstrap failed", error);
  }
}

const exportBtn = document.querySelector("#exportData");
if (exportBtn) exportBtn.addEventListener("click", exportAppData);

const importInput = document.querySelector("#importData");
if (importInput) importInput.addEventListener("change", event => {
  const file = event.target.files[0];
  if (file) importAppData(file);
});

window.addEventListener("gain-train-auth-changed", event => {
  const detail = event.detail || {};
  if (detail.userId) appState.userId = detail.userId;
  if (detail.mode) appState.authMode = detail.mode;
  renderAuthStatus();
});

window.addEventListener("pageshow", () => {
  if (hasActiveFoodSearchState()) return;
  clearFoodSearchDomInputs();
  renderFoodSearch();
});

// ── Tab Switching ────────────────────────────────
function switchTab(tabName) {
  document.querySelectorAll(".workspace-panel").forEach(panel => panel.classList.add("hidden"));
  document.querySelectorAll(".wtab").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.tab === tabName);
    btn.setAttribute("aria-selected", String(btn.dataset.tab === tabName));
  });
  document.querySelectorAll(".bottom-nav-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.tab === tabName);
  });
  const panel = document.querySelector(`#tab-${tabName}`);
  if (panel) panel.classList.remove("hidden");
}

const workspaceTabs = document.querySelector("#workspaceTabs");
if (workspaceTabs) {
  workspaceTabs.addEventListener("click", e => {
    const btn = e.target.closest(".wtab");
    if (btn && btn.dataset.tab) switchTab(btn.dataset.tab);
  });
}

const bottomNav = document.querySelector(".bottom-nav");
if (bottomNav) {
  bottomNav.addEventListener("click", e => {
    const btn = e.target.closest(".bottom-nav-btn");
    if (btn && btn.dataset.tab) switchTab(btn.dataset.tab);
  });
}

// ── Session Pill Clicks ──────────────────────────
const sessionPillsContainer = document.querySelector("#sessionPills");
if (sessionPillsContainer) {
  sessionPillsContainer.addEventListener("click", e => {
    const btn = e.target.closest(".session-pill");
    if (!btn) return;
    appState.trainingDay = btn.dataset.session;
    normalizeWorkoutSelections();
    saveState();
    render();
  });
}

const sessionExplainerContainer = document.querySelector("#sessionExplainer");
if (sessionExplainerContainer) {
  sessionExplainerContainer.addEventListener("click", e => {
    const btn = e.target.closest(".session-explainer-card");
    if (!btn) return;
    appState.trainingDay = btn.dataset.session;
    normalizeWorkoutSelections();
    saveState();
    render();
  });
}

// ── Week Pill Clicks ─────────────────────────────
const weekPillsContainer = document.querySelector("#weekPills");
if (weekPillsContainer) {
  weekPillsContainer.addEventListener("click", e => {
    const btn = e.target.closest(".week-pill");
    if (!btn) return;
    appState.selectedWeek = btn.dataset.week;
    normalizeWorkoutSelections();
    saveState();
    render();
  });
}

hydrateState();
render();
bootstrapRemoteState();
