import * as nutritionRepo from "./nutrition-repo.js";

const CUSTOM_RESTAURANT_STORAGE_KEY = "gain-train-custom-restaurant-foods";
const OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses";
const OPENAI_MEAL_PARSE_PROXY_URL = "/.netlify/functions/openai-meal-parse";
const FOOD_AUTOCORRECT_RULES = [
  [/\bspagetti\b/g, "spaghetti"],
  [/\bspghetti\b/g, "spaghetti"],
  [/\bspaghitti\b/g, "spaghetti"],
  [/\bomelett\b/g, "omelet"],
  [/\bomlett\b/g, "omelet"],
  [/\bomelete\b/g, "omelet"],
  [/\bomelette\b/g, "omelet"],
  [/\bavacado\b/g, "avocado"],
  [/\bavacado\b/g, "avocado"],
  [/\bburitto\b/g, "burrito"],
  [/\bburritoe\b/g, "burrito"],
  [/\bchik[\s-]?fil[\s-]?a\b/g, "chick fil a"],
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

const MOCK_FOOD_RESULTS = [
  { name: "chicken breast", aliases: ["chicken", "breast"], servingAmount: 4, servingUnit: "oz", servingGrams: 112, protein: 35, carbs: 0, fat: 4, calories: 187, fiber: 0 },
  { name: "chicken thigh", aliases: ["chicken thighs", "thighs"], servingAmount: 4, servingUnit: "oz", servingGrams: 112, protein: 29, carbs: 0, fat: 9, calories: 209, fiber: 0 },
  { name: "eggs", aliases: ["egg"], servingAmount: 2, servingUnit: "count", servingGrams: 100, protein: 12, carbs: 1.2, fat: 10, calories: 140, fiber: 0 },
  { name: "ham", aliases: ["deli ham"], servingAmount: 2, servingUnit: "oz", servingGrams: 56, protein: 10, carbs: 2, fat: 4, calories: 90, fiber: 0 },
  { name: "cheese", aliases: ["cheddar", "swiss", "mozzarella", "goat cheese", "feta", "parmesan"], servingAmount: 1, servingUnit: "oz", servingGrams: 28, protein: 7, carbs: 1, fat: 9, calories: 110, fiber: 0 },
  { name: "greek yogurt", aliases: ["yogurt"], servingAmount: 1, servingUnit: "cup", servingGrams: 227, protein: 20, carbs: 8, fat: 0, calories: 120, fiber: 0 },
  { name: "cottage cheese", aliases: ["cottage"], servingAmount: 1, servingUnit: "cup", servingGrams: 210, protein: 24, carbs: 8, fat: 5, calories: 180, fiber: 0 },
  { name: "banana", aliases: [], servingAmount: 1, servingUnit: "each", servingGrams: 118, protein: 1.3, carbs: 27, fat: 0.3, calories: 105, fiber: 3.1 },
  { name: "spinach", aliases: ["greens"], servingAmount: 1, servingUnit: "cup", servingGrams: 30, protein: 1, carbs: 1, fat: 0, calories: 7, fiber: 1 },
  { name: "onion", aliases: ["onions"], servingAmount: 0.25, servingUnit: "cup", servingGrams: 40, protein: 0.5, carbs: 4, fat: 0, calories: 16, fiber: 1 },
  { name: "bell peppers", aliases: ["pepper", "peppers"], servingAmount: 0.5, servingUnit: "cup", servingGrams: 75, protein: 0.5, carbs: 5, fat: 0, calories: 20, fiber: 1.5 },
  { name: "black beans", aliases: ["beans"], servingAmount: 0.5, servingUnit: "cup", servingGrams: 86, protein: 8, carbs: 20, fat: 0.5, calories: 114, fiber: 8 },
  { name: "cabbage", aliases: ["slaw"], servingAmount: 1, servingUnit: "cup", servingGrams: 90, protein: 1, carbs: 5, fat: 0, calories: 22, fiber: 2 },
  { name: "tortilla", aliases: ["burrito tortilla", "wrap"], servingAmount: 1, servingUnit: "each", servingGrams: 70, protein: 6, carbs: 33, fat: 5, calories: 210, fiber: 2 },
  { name: "white rice", aliases: ["rice", "wild rice", "basmati rice"], servingAmount: 1, servingUnit: "cup", servingGrams: 158, protein: 4, carbs: 45, fat: 0.5, calories: 205, fiber: 0.6 },
  { name: "oatmeal", aliases: ["oats"], servingAmount: 1, servingUnit: "cup", servingGrams: 234, protein: 6, carbs: 28, fat: 3, calories: 150, fiber: 4 },
  { name: "spaghetti", aliases: ["pasta", "noodles"], servingAmount: 1, servingUnit: "cup", servingGrams: 140, protein: 8, carbs: 43, fat: 1.3, calories: 220, fiber: 2.5 },
  { name: "spaghetti with meat sauce", aliases: ["spaghetti meat sauce", "pasta with meat sauce", "spaghetti w meat sauce", "spaghetti w/ meat sauce"], servingAmount: 1.5, servingUnit: "cups", servingGrams: 320, protein: 20, carbs: 45, fat: 13, calories: 390, fiber: 5 },
  { name: "marinara sauce", aliases: ["tomato sauce", "pasta sauce", "red sauce"], servingAmount: 0.5, servingUnit: "cup", servingGrams: 125, protein: 2, carbs: 10, fat: 4, calories: 85, fiber: 2 },
  { name: "meat sauce", aliases: ["bolognese"], servingAmount: 1, servingUnit: "cup", servingGrams: 250, protein: 13, carbs: 13, fat: 8, calories: 190, fiber: 2 },
  { name: "ground beef pasta", aliases: ["beef pasta", "pasta beef"], servingAmount: 1.5, servingUnit: "cups", servingGrams: 300, protein: 24, carbs: 40, fat: 14, calories: 410, fiber: 4 },
  { name: "ground turkey", aliases: ["turkey"], servingAmount: 4, servingUnit: "oz", servingGrams: 112, protein: 24, carbs: 0, fat: 8, calories: 170, fiber: 0 },
  { name: "turkey meatballs", aliases: ["turkey meatball"], servingAmount: 6, servingUnit: "oz", servingGrams: 170, protein: 42, carbs: 6, fat: 12, calories: 330, fiber: 0 },
  { name: "steak", aliases: ["flank steak", "ribeye", "beef"], servingAmount: 6, servingUnit: "oz", servingGrams: 170, protein: 42, carbs: 0, fat: 16, calories: 310, fiber: 0 },
  { name: "salmon", aliases: ["fish"], servingAmount: 6, servingUnit: "oz", servingGrams: 170, protein: 38, carbs: 0, fat: 14, calories: 290, fiber: 0 },
  { name: "avocado", aliases: [], servingAmount: 0.5, servingUnit: "each", servingGrams: 100, protein: 2, carbs: 9, fat: 15, calories: 160, fiber: 7 },
  { name: "sweet potato", aliases: ["potato"], servingAmount: 1, servingUnit: "each", servingGrams: 130, protein: 2, carbs: 26, fat: 0, calories: 112, fiber: 4 }
];

const RESTAURANT_MENU_RESULTS = [
  {
    name: "Harvest Bowl",
    restaurant: "Sweetgreen",
    aliases: ["sweetgreen harvest bowl", "harvest bowl sweetgreen", "sweetgreen harvest", "harvest"],
    servingAmount: 1,
    servingUnit: "bowl",
    servingGrams: 425,
    calories: 740,
    protein: 32,
    carbs: 60,
    fat: 41,
    fiber: 13,
    ingredientsSummary: "chicken, wild rice, apples, sweet potato, goat cheese, almonds"
  },
  {
    name: "Crispy Rice Bowl",
    restaurant: "Sweetgreen",
    aliases: ["sweetgreen crispy rice bowl", "crispy rice bowl sweetgreen", "sweetgreen crispy rice"],
    servingAmount: 1,
    servingUnit: "bowl",
    servingGrams: 410,
    calories: 640,
    protein: 28,
    carbs: 61,
    fat: 30,
    fiber: 8,
    ingredientsSummary: "blackened chicken, cabbage slaw, crispy rice, cucumbers, spicy cashew dressing"
  },
  {
    name: "Chicken Pesto Parm",
    restaurant: "Sweetgreen",
    aliases: ["sweetgreen chicken pesto parm", "chicken pesto parm sweetgreen", "pesto parm"],
    servingAmount: 1,
    servingUnit: "bowl",
    servingGrams: 390,
    calories: 525,
    protein: 35,
    carbs: 38,
    fat: 23,
    fiber: 6,
    ingredientsSummary: "chicken, farro, tomatoes, parmesan, pesto vinaigrette"
  },
  {
    name: "Guacamole Greens",
    restaurant: "Sweetgreen",
    aliases: ["sweetgreen guacamole greens", "guacamole greens sweetgreen", "guac greens"],
    servingAmount: 1,
    servingUnit: "bowl",
    servingGrams: 400,
    calories: 555,
    protein: 23,
    carbs: 35,
    fat: 33,
    fiber: 11,
    ingredientsSummary: "chicken, avocado, tortilla chips, romaine, tomatoes, lime cilantro jalapeno vinaigrette"
  },
  {
    name: "Kale Caesar",
    restaurant: "Sweetgreen",
    aliases: ["sweetgreen kale caesar", "kale caesar sweetgreen", "caesar sweetgreen"],
    servingAmount: 1,
    servingUnit: "bowl",
    servingGrams: 365,
    calories: 490,
    protein: 35,
    carbs: 14,
    fat: 32,
    fiber: 4,
    ingredientsSummary: "chicken, kale, parmesan, breadcrumbs, caesar dressing"
  },
  {
    name: "Harissa Chicken Power Bowl",
    restaurant: "CAVA",
    aliases: ["cava harissa chicken power bowl", "harissa chicken power bowl", "cava harissa chicken bowl"],
    servingAmount: 1,
    servingUnit: "bowl",
    servingGrams: 410,
    calories: 620,
    protein: 28,
    carbs: 43,
    fat: 34,
    fiber: 10,
    ingredientsSummary: "harissa chicken, hummus, lentils, greens, pickled onions, tzatziki"
  },
  {
    name: "Chicken + Rice",
    restaurant: "CAVA",
    aliases: ["cava chicken and rice", "cava chicken + rice", "cava chicken rice bowl", "chicken and rice cava"],
    servingAmount: 1,
    servingUnit: "bowl",
    servingGrams: 435,
    calories: 700,
    protein: 33,
    carbs: 56,
    fat: 38,
    fiber: 9,
    ingredientsSummary: "grilled chicken, basmati rice, hummus, tomato cucumber, garlic dressing"
  },
  {
    name: "Steak + Harissa",
    restaurant: "CAVA",
    aliases: ["cava steak harissa", "steak and harissa cava", "cava steak bowl"],
    servingAmount: 1,
    servingUnit: "bowl",
    servingGrams: 405,
    calories: 620,
    protein: 30,
    carbs: 35,
    fat: 38,
    fiber: 8,
    ingredientsSummary: "steak, harissa, hummus, grains, greens, pickled onions"
  },
  {
    name: "Greek Salad",
    restaurant: "CAVA",
    aliases: ["cava greek salad", "greek salad cava"],
    servingAmount: 1,
    servingUnit: "salad",
    servingGrams: 370,
    calories: 580,
    protein: 32,
    carbs: 18,
    fat: 40,
    fiber: 7,
    ingredientsSummary: "chicken, romaine, tomato cucumber, feta, olives, greek vinaigrette"
  },
  {
    name: "Chicken Burrito Bowl",
    restaurant: "Chipotle",
    aliases: ["chipotle chicken bowl", "chipotle burrito bowl", "chicken bowl chipotle"],
    servingAmount: 1,
    servingUnit: "bowl",
    servingGrams: 540,
    calories: 665,
    protein: 43,
    carbs: 63,
    fat: 24,
    fiber: 12,
    ingredientsSummary: "chicken, white rice, black beans, fajita veggies, tomato salsa, lettuce"
  },
  {
    name: "Steak Burrito Bowl",
    restaurant: "Chipotle",
    aliases: ["chipotle steak bowl", "steak bowl chipotle"],
    servingAmount: 1,
    servingUnit: "bowl",
    servingGrams: 535,
    calories: 640,
    protein: 39,
    carbs: 58,
    fat: 25,
    fiber: 12,
    ingredientsSummary: "steak, rice, beans, fajita veggies, salsa, lettuce"
  },
  {
    name: "Chicken Sandwich",
    restaurant: "Chick-fil-A",
    aliases: ["chick fil a sandwich", "chickfila sandwich", "cfa chicken sandwich"],
    servingAmount: 1,
    servingUnit: "sandwich",
    servingGrams: 183,
    calories: 420,
    protein: 29,
    carbs: 41,
    fat: 18,
    fiber: 2,
    ingredientsSummary: "breaded chicken breast, bun, pickles"
  },
  {
    name: "Grilled Nuggets",
    restaurant: "Chick-fil-A",
    aliases: ["chick fil a grilled nuggets", "cfa grilled nuggets", "grilled nuggets chickfila"],
    servingAmount: 12,
    servingUnit: "count",
    servingGrams: 145,
    calories: 200,
    protein: 38,
    carbs: 2,
    fat: 4.5,
    fiber: 0,
    ingredientsSummary: "grilled chicken breast bites"
  },
  {
    name: "Baja Bowl",
    restaurant: "Panera",
    aliases: ["panera baja bowl", "baja grain bowl panera", "panera bowl"],
    servingAmount: 1,
    servingUnit: "bowl",
    servingGrams: 430,
    calories: 730,
    protein: 31,
    carbs: 78,
    fat: 34,
    fiber: 14,
    ingredientsSummary: "chicken, rice, black bean corn salsa, avocado, greek yogurt"
  },
  {
    name: "Turkey Chili",
    restaurant: "Panera",
    aliases: ["panera turkey chili", "turkey chili panera"],
    servingAmount: 1,
    servingUnit: "bowl",
    servingGrams: 340,
    calories: 300,
    protein: 21,
    carbs: 31,
    fat: 10,
    fiber: 8,
    ingredientsSummary: "turkey chili with beans and vegetables"
  },
  {
    name: "Sous Vide Egg Bites",
    restaurant: "Starbucks",
    aliases: ["starbucks egg bites", "egg bites starbucks"],
    servingAmount: 1,
    servingUnit: "order",
    servingGrams: 130,
    calories: 300,
    protein: 19,
    carbs: 9,
    fat: 20,
    fiber: 0,
    ingredientsSummary: "egg bites with cottage cheese and bacon"
  },
  {
    name: "Turkey Bacon Egg White Sandwich",
    restaurant: "Starbucks",
    aliases: ["starbucks turkey bacon sandwich", "egg white sandwich starbucks"],
    servingAmount: 1,
    servingUnit: "sandwich",
    servingGrams: 160,
    calories: 230,
    protein: 17,
    carbs: 28,
    fat: 5,
    fiber: 3,
    ingredientsSummary: "egg whites, turkey bacon, cheese, english muffin"
  },
  {
    name: "Double Chicken Avocado Salad",
    restaurant: "El Pollo Loco",
    aliases: ["pollo loco avocado salad", "double chicken avocado salad", "el pollo loco salad"],
    servingAmount: 1,
    servingUnit: "salad",
    servingGrams: 420,
    calories: 520,
    protein: 49,
    carbs: 18,
    fat: 28,
    fiber: 9,
    ingredientsSummary: "double chicken, avocado, pico, cabbage, cilantro dressing"
  }
];

function safeNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function normalizeText(value) {
  return String(value || "").trim();
}

function applyFoodAutocorrect(value) {
  return FOOD_AUTOCORRECT_RULES.reduce(
    (current, [pattern, replacement]) => current.replace(pattern, replacement),
    String(value || "").toLowerCase()
  );
}

function slugify(value) {
  return normalizeText(value)
    .toLowerCase()
    .replace(/[^\w]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeQuery(value) {
  return applyFoodAutocorrect(normalizeText(value))
    .replace(/\bw\/\b/g, " with ")
    .replace(/&/g, " and ")
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeMealSplitText(value) {
  return applyFoodAutocorrect(normalizeText(value))
    .replace(/\bw\/\b/g, " with ")
    .replace(/&/g, " and ")
    .replace(/[^\w\s,+]/g, " ")
    .replace(/\s*,\s*/g, ",")
    .replace(/\s*\+\s*/g, " + ")
    .replace(/\s+/g, " ")
    .trim();
}

function getOpenAIConfig() {
  const openaiApiKey = normalizeText(window.APP_CONFIG?.OPENAI_API_KEY || window.GAIN_TRAIN_CONFIG?.openaiApiKey);
  const openaiModel = normalizeText(window.APP_CONFIG?.OPENAI_MODEL || window.GAIN_TRAIN_CONFIG?.openaiModel || "gpt-4.1-mini");
  return {
    apiKey: openaiApiKey,
    model: openaiModel
  };
}

function isOpenAIConfigured() {
  return Boolean(getOpenAIConfig().apiKey);
}

function queryVariants(query) {
  const base = normalizeQuery(query);
  if (!base) return [];
  const variants = new Set([base]);
  variants.add(base.replace(/\bwith\b/g, "").replace(/\s+/g, " ").trim());
  variants.add(base.replace(/\bmeat sauce\b/g, "bolognese").replace(/\s+/g, " ").trim());
  variants.add(base.replace(/\bspaghetti\b/g, "pasta").replace(/\s+/g, " ").trim());
  base.split(" ").filter(Boolean).forEach(token => {
    if (token.length > 2) variants.add(token);
  });
  return [...variants].filter(Boolean);
}

function queryLooksLikeRestaurantOrder(query) {
  const normalized = normalizeQuery(query);
  if (!normalized) return false;
  const restaurantSignals = getRestaurantNames()
    .map(name => normalizeQuery(name))
    .filter(Boolean);
  if (restaurantSignals.some(name => normalized.includes(name))) return true;

  const fromMatch = normalized.match(/\bfrom\s+([a-z][a-z\s&'-]+)$/);
  if (fromMatch?.[1]) return true;

  const atMatch = normalized.match(/\bat\s+([a-z][a-z\s&'-]+)$/);
  if (atMatch?.[1]) return true;

  if (/\b(menu item|restaurant|from the menu|takeout|pickup|delivery)\b/.test(normalized)) {
    return true;
  }

  return false;
}

function extractExplicitRestaurantName(query) {
  const normalized = normalizeQuery(query);
  if (!normalized) return "";

  const fromMatch = normalized.match(/\bfrom\s+([a-z][a-z\s&'-]+)$/);
  if (fromMatch?.[1]) return normalizeText(fromMatch[1]);

  const atMatch = normalized.match(/\bat\s+([a-z][a-z\s&'-]+)$/);
  if (atMatch?.[1]) return normalizeText(atMatch[1]);

  const knownRestaurant = getRestaurantNames()
    .map(name => normalizeText(name))
    .find(name => normalized.includes(normalizeQuery(name)));

  return knownRestaurant || "";
}

function restaurantNamesMatch(expected, actual) {
  const left = normalizeQuery(expected);
  const right = normalizeQuery(actual);
  if (!left || !right) return false;
  return left === right || left.includes(right) || right.includes(left);
}

function sumMealBreakdownMacros(items) {
  return (Array.isArray(items) ? items : []).reduce((totals, item) => {
    totals.calories += safeNumber(item?.calories);
    totals.protein += safeNumber(item?.protein);
    totals.carbs += safeNumber(item?.carbs);
    totals.fat += safeNumber(item?.fat);
    totals.fiber += safeNumber(item?.fiber);
    return totals;
  }, {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0
  });
}

function mealBreakdownToSearchResult(mealBreakdown, query) {
  if (!mealBreakdown?.baseMenuItem?.name) return null;
  const restaurant = normalizeText(mealBreakdown.baseMenuItem.brand);
  const name = normalizeText(mealBreakdown.baseMenuItem.name);
  if (!name) return null;

  const totals = sumMealBreakdownMacros(mealBreakdown.items);
  const ingredientsSummary = Array.isArray(mealBreakdown.items)
    ? mealBreakdown.items.map(item => item.name).filter(Boolean).join(", ")
    : normalizeText(mealBreakdown.baseMenuItem.ingredientsSummary);
  const source = mealBreakdown.source === "ai-web" ? "restaurant-web" : "restaurant";

  return normalizeFoodResult({
    id: `${source}-${slugify(`${restaurant}-${name}-${query}`)}`,
    source,
    sourceId: slugify(`${restaurant}-${name}`),
    name,
    brand: restaurant,
    servingAmount: 1,
    servingUnit: normalizeText(mealBreakdown.baseMenuItem.servingLabel || "item"),
    servingLabel: normalizeText(mealBreakdown.baseMenuItem.servingLabel || "1 item"),
    calories: totals.calories,
    protein: totals.protein,
    carbs: totals.carbs,
    fat: totals.fat,
    fiber: totals.fiber,
    ingredientsSummary
  });
}

function normalizeRestaurantMenuResult(item, restaurantName, query = "") {
  return normalizeFoodResult({
    id: `restaurant-web-${slugify(`${restaurantName}-${item?.name || query}`)}`,
    source: "restaurant-web",
    sourceId: slugify(`${restaurantName}-${item?.name || query}`),
    name: normalizeText(item?.name || query || "Menu item"),
    brand: normalizeText(restaurantName),
    servingAmount: safeNumber(item?.servingAmount || 1) || 1,
    servingUnit: normalizeText(item?.servingUnit || "item") || "item",
    servingLabel: normalizeText(item?.servingLabel || `${item?.servingAmount || 1} ${item?.servingUnit || "item"}`),
    calories: safeNumber(item?.calories),
    protein: safeNumber(item?.protein),
    carbs: safeNumber(item?.carbs),
    fat: safeNumber(item?.fat),
    fiber: safeNumber(item?.fiber),
    ingredientsSummary: normalizeText(item?.ingredientsSummary)
  });
}

function tokenize(value) {
  return normalizeQuery(value)
    .split(" ")
    .filter(token => token && !["with", "and", "the", "a", "an"].includes(token));
}

export function normalizeFoodResult(result) {
  if (!result) return null;

  const serving = result.default_serving_json || result.defaultServing || {};
  const source = normalizeText(result.source || "api") || "api";
  const sourceId = normalizeText(result.sourceId || result.source_id || result.external_food_id || result.food_id || result.id);

  return {
    id: normalizeText(result.id || `${source}-${sourceId || normalizeText(result.name || result.food_name)}`),
    source,
    sourceId,
    name: normalizeText(result.name || result.food_name || "Food"),
    brand: normalizeText(result.brand),
    servingAmount: safeNumber(result.servingAmount || serving.servingAmount || result.serving_amount || 1) || 1,
    servingUnit: normalizeText(result.servingUnit || serving.servingUnit || result.serving_unit || "serving") || "serving",
    servingLabel: normalizeText(
      result.servingLabel ||
      serving.servingLabel ||
      result.serving_label ||
      (result.servingAmount && result.servingUnit ? `${result.servingAmount} ${result.servingUnit}` : "") ||
      result.servingUnit ||
      serving.servingUnit ||
      "serving"
    ),
    servingGrams: safeNumber(result.servingGrams || serving.servingGrams || result.serving_grams || 0),
    calories: safeNumber(result.calories || serving.calories),
    protein: safeNumber(result.protein || serving.protein),
    carbs: safeNumber(result.carbs || serving.carbs),
    fat: safeNumber(result.fat || serving.fat),
    fiber: safeNumber(result.fiber || serving.fiber),
    ingredientsSummary: normalizeText(result.ingredientsSummary || result.ingredients_summary)
  };
}

function dedupeFoods(items) {
  const map = new Map();
  items.forEach(item => {
    const normalized = normalizeFoodResult(item);
    if (!normalized) return;
    const key = `${normalized.source}:${normalized.sourceId || normalized.id}:${normalized.name.toLowerCase()}`;
    if (!map.has(key)) {
      map.set(key, normalized);
    }
  });
  return [...map.values()];
}

function scoreFoodMatch(food, query) {
  const variants = queryVariants(query);
  const haystacks = [
    normalizeQuery(food.name),
    normalizeQuery(food.brand),
    normalizeQuery(food.servingLabel),
    normalizeQuery(food.ingredientsSummary),
    ...String(food._aliases || "")
      .split("||")
      .map(value => normalizeQuery(value))
      .filter(Boolean)
  ];
  const queryTokens = tokenize(query);
  let score = 0;

  variants.forEach(variant => {
    haystacks.forEach(haystack => {
      if (!haystack) return;
      if (haystack === variant) score = Math.max(score, 220);
      else if (haystack.startsWith(variant)) score = Math.max(score, 170);
      else if (haystack.includes(variant)) score = Math.max(score, 130);
    });
  });

  haystacks.forEach(haystack => {
    if (!haystack) return;
    const haystackTokens = tokenize(haystack);
    const overlap = queryTokens.filter(token => haystackTokens.includes(token)).length;
    if (overlap) {
      score = Math.max(score, overlap * 45 + (haystackTokens.length <= queryTokens.length + 2 ? 15 : 0));
    }
  });

  if (food.source === "usda") score += 12;
  if (food.source === "restaurant") score += 18;
  if (food.brand) score -= 4;
  if (queryTokens.length > 1 && food.source === "mock") score -= 18;
  if (
    queryTokens.some(token => ["bowl", "salad", "plate", "sandwich", "taco", "spaghetti", "pasta", "meatballs"].includes(token)) &&
    food.source === "restaurant"
  ) {
    score += 18;
  }
  return score;
}

function rankFoods(items, query) {
  return dedupeFoods(items)
    .map(food => ({ food, score: scoreFoodMatch(food, query) }))
    .sort((left, right) => right.score - left.score || left.food.name.localeCompare(right.food.name))
    .map(entry => entry.food);
}

function loadCustomRestaurantFoods() {
  try {
    const raw = window.localStorage.getItem(CUSTOM_RESTAURANT_STORAGE_KEY);
    const parsed = JSON.parse(raw || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn("Custom restaurant foods unavailable", error?.message || error);
    return [];
  }
}

function saveCustomRestaurantFoods(items) {
  try {
    window.localStorage.setItem(CUSTOM_RESTAURANT_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.warn("Unable to save custom restaurant foods", error?.message || error);
  }
}

function normalizeRestaurantCatalogEntry(food, source = "restaurant") {
  return normalizeFoodResult({
    id: `${source}-${slugify(`${food.restaurant}-${food.name}`)}`,
    source,
    sourceId: slugify(`${food.restaurant}-${food.name}`),
    name: food.name,
    brand: food.restaurant,
    servingLabel: `${food.servingAmount || 1} ${food.servingUnit || "item"}`,
    servingAmount: food.servingAmount || 1,
    servingUnit: food.servingUnit || "item",
    servingGrams: food.servingGrams || 0,
    calories: food.calories,
    protein: food.protein,
    carbs: food.carbs,
    fat: food.fat,
    fiber: food.fiber || 0,
    ingredientsSummary: food.ingredientsSummary || "",
    _aliases: [food.restaurant, ...(food.aliases || [])].join("||")
  });
}

function getKnownRestaurantNames() {
  return [...new Set(RESTAURANT_MENU_RESULTS.map(food => food.restaurant).filter(Boolean))];
}

function getRestaurantCatalogFoods() {
  const builtIns = RESTAURANT_MENU_RESULTS.map(food => normalizeRestaurantCatalogEntry(food, "restaurant"));
  const custom = loadCustomRestaurantFoods().map(food => normalizeRestaurantCatalogEntry(food, "restaurant-custom"));
  return dedupeFoods([...builtIns, ...custom]);
}

function extractOpenAIResponseText(payload) {
  if (typeof payload?.output_text === "string" && payload.output_text.trim()) {
    return payload.output_text.trim();
  }

  const textChunks = [];
  (payload?.output || []).forEach(item => {
    (item?.content || []).forEach(content => {
      if (content?.type === "output_text" && typeof content.text === "string") {
        textChunks.push(content.text);
      }
      if (content?.type === "text" && typeof content.text === "string") {
        textChunks.push(content.text);
      }
    });
  });
  return textChunks.join("\n").trim();
}

function extractOpenAISources(payload) {
  const sources = new Map();
  const addSource = source => {
    const url = normalizeText(source?.url || source?.link);
    if (!url) return;
    sources.set(url, {
      title: normalizeText(source?.title || source?.site_name || url),
      url
    });
  };

  (payload?.output || []).forEach(item => {
    if (item?.type === "web_search_call") {
      (item?.action?.sources || []).forEach(addSource);
    }
    (item?.content || []).forEach(content => {
      (content?.annotations || []).forEach(annotation => {
        if (annotation?.type === "url_citation") {
          addSource(annotation);
        }
      });
    });
  });

  return [...sources.values()];
}

async function requestOpenAIRestaurantMenu(restaurantName, menuItem = "") {
  const { apiKey, model } = getOpenAIConfig();
  if (!apiKey && !OPENAI_MEAL_PARSE_PROXY_URL) return [];

  const schema = {
    type: "object",
    additionalProperties: false,
    properties: {
      restaurant: { type: "string" },
      items: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            name: { type: "string" },
            servingAmount: { type: "number" },
            servingUnit: { type: "string" },
            servingLabel: { type: "string" },
            calories: { type: "number" },
            protein: { type: "number" },
            carbs: { type: "number" },
            fat: { type: "number" },
            fiber: { type: "number" },
            ingredientsSummary: { type: "string" }
          },
          required: ["name", "servingAmount", "servingUnit", "servingLabel", "calories", "protein", "carbs", "fat", "fiber", "ingredientsSummary"]
        }
      }
    },
    required: ["restaurant", "items"]
  };

  const requestBody = {
    model,
    reasoning: { effort: "low" },
    tools: [{ type: "web_search_preview" }],
    input: [
      {
        role: "system",
        content: [
          {
            type: "input_text",
            text: [
              "You find menu items for a specific restaurant and return structured nutrition estimates.",
              "Do not substitute another restaurant.",
              "If a specific menu item is provided, return the best matching items from that restaurant first.",
              "If no menu item is provided, return a small set of likely popular current menu items for that restaurant.",
              "Return concise ingredient summaries."
            ].join(" ")
          }
        ]
      },
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: menuItem
              ? `Restaurant: ${restaurantName}. Find the best menu matches for: ${menuItem}`
              : `Restaurant: ${restaurantName}. Return several likely current menu items.`
          }
        ]
      }
    ],
    text: {
      format: {
        type: "json_schema",
        name: "restaurant_menu_items",
        strict: true,
        schema
      }
    }
  };

  let response;
  try {
    response = await fetch(OPENAI_MEAL_PARSE_PROXY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody)
    });
  } catch (error) {
    response = null;
  }

  if ((!response || !response.ok) && apiKey) {
    response = await fetch(OPENAI_RESPONSES_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    });
  }

  if (!response || !response.ok) return [];

  const payload = await response.json();
  const parsed = payload?.output_parsed || JSON.parse(extractOpenAIResponseText(payload) || "{}");
  const resolvedRestaurant = normalizeText(parsed?.restaurant || restaurantName);
  const items = Array.isArray(parsed?.items) ? parsed.items : [];
  return dedupeFoods(items.map(item => normalizeRestaurantMenuResult(item, resolvedRestaurant, menuItem || restaurantName)));
}

async function getRestaurantScopedMatches(restaurantName, menuItem = "") {
  const localMatches = getRestaurantCatalogFoods()
    .filter(item => restaurantNamesMatch(restaurantName, item.brand));

  if (localMatches.length) {
    const rankingQuery = menuItem || restaurantName;
    const ranked = menuItem ? rankFoods(localMatches, rankingQuery) : localMatches;
    return ranked;
  }

  return requestOpenAIRestaurantMenu(restaurantName, menuItem);
}

async function requestOpenAIMealPlan(query, { useWebSearch = false, explicitRestaurant = "" } = {}) {
  const { apiKey, model } = getOpenAIConfig();

  const schema = {
    type: "object",
    additionalProperties: false,
    properties: {
      label: { type: "string" },
      source: { type: "string" },
      restaurant: { type: "string" },
      baseMenuItem: { type: "string" },
      confidence: { type: "string" },
      followupQuestion: { type: "string" },
      customizations: {
        type: "array",
        items: { type: "string" }
      },
      components: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            name: { type: "string" },
            amount: { type: "string" },
            unit: { type: "string" },
            note: { type: "string" }
          },
          required: ["name", "amount", "unit", "note"]
        }
      }
    },
    required: ["label", "source", "restaurant", "baseMenuItem", "confidence", "followupQuestion", "customizations", "components"]
  };

  const knownRestaurants = getKnownRestaurantNames().join(", ");
  const requestBody = {
    model,
    reasoning: { effort: "low" },
    tools: useWebSearch ? [{ type: "web_search_preview" }] : [],
    input: [
      {
        role: "system",
        content: [
          {
            type: "input_text",
            text: [
              "You turn messy meal text into a clean ingredient breakdown for a fitness nutrition app.",
              "Prefer ingredient-level components over vague meal labels.",
              `Known restaurant chains in this app: ${knownRestaurants}.`,
              "If the user says 'from <restaurant>' or 'at <restaurant>', treat that as a strong restaurant lookup signal.",
              explicitRestaurant ? `The restaurant named by the user is: ${explicitRestaurant}. Do not substitute a different restaurant name.` : "",
              "If the query appears to reference a restaurant or menu item that is not in the known list, still use web context and return the most likely restaurant name and menu item when possible.",
              "If the query clearly references a restaurant/menu item, capture the restaurant and base menu item.",
              "Only include likely edible components that matter for macros.",
              "Use empty strings instead of null values.",
              "If an amount is missing, leave amount and unit empty rather than inventing a fake number."
            ].join(" ")
          }
        ]
      },
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: `Break this into likely ingredients and customizations: ${query}`
          }
        ]
      }
    ],
    text: {
      format: {
        type: "json_schema",
        name: "meal_breakdown",
        strict: true,
        schema
      }
    }
  };

  let response;
  try {
    response = await fetch(OPENAI_MEAL_PARSE_PROXY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });
  } catch (error) {
    response = null;
  }

  if ((!response || !response.ok) && apiKey) {
    response = await fetch(OPENAI_RESPONSES_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    });
  }

  if (!response) {
    throw new Error("OpenAI meal parse unavailable");
  }

  if (!response.ok) {
    throw new Error(`OpenAI meal parse failed (${response.status})`);
  }

  const payload = await response.json();
  const parsed = payload?.output_parsed || JSON.parse(extractOpenAIResponseText(payload) || "{}");
  return {
    parsed,
    sources: extractOpenAISources(payload)
  };
}

async function decomposeMealQueryWithAI(query, options = {}) {
  if (!isOpenAIConfigured()) return null;

  try {
    const explicitRestaurant = extractExplicitRestaurantName(query);
    const useWebSearch = options.mode === "eating_out" || queryLooksLikeRestaurantOrder(query);
    const result = await requestOpenAIMealPlan(query, { useWebSearch, explicitRestaurant });
    const parsed = result?.parsed;
    const components = Array.isArray(parsed?.components)
      ? parsed.components.filter(component => normalizeText(component?.name))
      : [];

    if (!components.length) return null;

    const items = [];
    const alternatives = [];
    for (const component of components.slice(0, 8)) {
      const entry = await buildBreakdownEntry(
        component.name,
        normalizeText(component.amount),
        normalizeText(component.unit)
      );
      if (!entry) continue;
      items.push(entry.item);
      alternatives.push({
        ...entry.alternative,
        note: normalizeText(component.note)
      });
    }

    const deduped = dedupeFoods(items);
    if (!deduped.length) return null;

    const restaurant = normalizeText(parsed.restaurant);
    const baseMenuItem = normalizeText(parsed.baseMenuItem);
    const sourceMode = useWebSearch ? "ai-web" : "ai";
    const brandForMenuItem = explicitRestaurant && restaurant && !restaurantNamesMatch(explicitRestaurant, restaurant)
      ? explicitRestaurant
      : restaurant;
    const allowBaseMenuItem = !explicitRestaurant || !restaurant || restaurantNamesMatch(explicitRestaurant, restaurant);

    return {
      label: normalizeText(parsed.label || query),
      source: sourceMode,
      baseMenuItem: allowBaseMenuItem && (brandForMenuItem || baseMenuItem)
        ? {
            name: baseMenuItem || normalizeText(parsed.label || query),
            brand: brandForMenuItem,
            ingredientsSummary: deduped.map(item => item.name).join(", "),
            servingLabel: "AI-estimated"
          }
        : null,
      items: deduped,
      hints: deduped.map(item => `${item.servingAmount || 1} ${item.servingUnit || "serving"} ${item.name}`.trim()),
      alternatives,
      customizations: Array.isArray(parsed.customizations)
        ? parsed.customizations.map(item => normalizeText(item)).filter(Boolean)
        : [],
      confidence: normalizeText(parsed.confidence || "medium"),
      followupQuestion: normalizeText(parsed.followupQuestion),
      sources: Array.isArray(result?.sources) ? result.sources : []
    };
  } catch (error) {
    console.warn("OpenAI meal parse skipped", error?.message || error);
    return null;
  }
}

function scoreRestaurantEntry(food, query) {
  const normalizedQuery = normalizeMealPhrase(query);
  if (!normalizedQuery) return 0;

  const phrases = [
    food.name,
    `${food.brand} ${food.name}`,
    ...String(food._aliases || "").split("||")
  ].map(normalizeMealPhrase).filter(Boolean);

  let score = scoreFoodMatch(food, query) + 20;
  phrases.forEach(phrase => {
    if (phrase === normalizedQuery) score = Math.max(score, 340);
    else if (normalizedQuery.startsWith(phrase)) score = Math.max(score, 300);
    else if (normalizedQuery.includes(phrase)) score = Math.max(score, 260);
  });

  const brandPhrase = normalizeMealPhrase(food.brand);
  const namePhrase = normalizeMealPhrase(food.name);
  if (brandPhrase && normalizedQuery.includes(brandPhrase)) score += 25;
  if (namePhrase && normalizedQuery.includes(namePhrase)) score += 35;

  const requestedProtein = normalizedQuery.match(/\b(chicken|steak|salmon|turkey|beef|shrimp|tofu)\b/)?.[1] || "";
  if (requestedProtein) {
    const proteinHaystack = normalizeMealPhrase(`${food.name} ${food.ingredientsSummary || ""}`);
    if (proteinHaystack.includes(requestedProtein)) {
      score += 60;
    } else {
      score -= 45;
    }
  }

  return score;
}

function findBestRestaurantMatches(query, limit = 6) {
  return getRestaurantCatalogFoods()
    .map(food => ({ food, score: scoreRestaurantEntry(food, query) }))
    .filter(entry => entry.score > 0)
    .sort((left, right) => right.score - left.score || left.food.name.localeCompare(right.food.name))
    .slice(0, limit)
    .map(entry => {
      const { _aliases, ...cleanFood } = entry.food;
      return cleanFood;
    });
}

function filterMockFoods(query) {
  const normalizedQuery = normalizeQuery(query);
  const normalizedFoods = MOCK_FOOD_RESULTS.map(food => normalizeFoodResult({
    id: `mock-${food.name.replace(/\s+/g, "-")}`,
    source: "mock",
    sourceId: food.name.replace(/\s+/g, "-"),
    name: food.name,
    brand: "",
    servingLabel: `${food.servingAmount || 1} ${food.servingUnit || "serving"}`,
    servingAmount: food.servingAmount || 1,
    servingUnit: food.servingUnit || "serving",
    servingGrams: food.servingGrams || 0,
    calories: food.calories,
    protein: food.protein,
    carbs: food.carbs,
    fat: food.fat,
    fiber: food.fiber || 0,
    _aliases: (food.aliases || []).join("||")
  }));
  if (!normalizedQuery) return normalizedFoods;
  const matches = rankFoods(normalizedFoods, query)
    .filter(food => scoreFoodMatch(food, query) > 0)
    .map(food => {
      const { _aliases, ...cleanFood } = food;
      return cleanFood;
    });
  return matches.length ? matches : normalizedFoods;
}

function filterMockFoodsStrict(query) {
  const normalizedQuery = normalizeQuery(query);
  if (!normalizedQuery) return [];
  const normalizedFoods = MOCK_FOOD_RESULTS.map(food => normalizeFoodResult({
    id: `mock-${food.name.replace(/\s+/g, "-")}`,
    source: "mock",
    sourceId: food.name.replace(/\s+/g, "-"),
    name: food.name,
    brand: "",
    servingLabel: `${food.servingAmount || 1} ${food.servingUnit || "serving"}`,
    servingAmount: food.servingAmount || 1,
    servingUnit: food.servingUnit || "serving",
    servingGrams: food.servingGrams || 0,
    calories: food.calories,
    protein: food.protein,
    carbs: food.carbs,
    fat: food.fat,
    fiber: food.fiber || 0,
    _aliases: (food.aliases || []).join("||")
  }));
  return rankFoods(normalizedFoods, query)
    .filter(food => scoreFoodMatch(food, query) > 0)
    .map(food => {
      const { _aliases, ...cleanFood } = food;
      return cleanFood;
    });
}

function getKnownMealIngredientPhrases() {
  const phraseMap = new Map();
  MOCK_FOOD_RESULTS.forEach(food => {
    const phrases = [food.name, ...(food.aliases || [])];
    phrases.forEach(phrase => {
      const normalized = normalizeQuery(phrase);
      if (!normalized || normalized.length < 3) return;
      phraseMap.set(normalized, food.name);
    });
  });

  return [...phraseMap.entries()]
    .sort((left, right) => right[0].length - left[0].length)
    .map(([phrase, canonical]) => ({ phrase, canonical }));
}

const KNOWN_MEAL_INGREDIENT_PHRASES = getKnownMealIngredientPhrases();

function explodeCompoundMealPart(component) {
  const normalized = normalizeQuery(component);
  if (!normalized) return [];

  const strictMatches = filterMockFoodsStrict(normalized);
  if (strictMatches.some(food => normalizeQuery(food.name) === normalized)) {
    return [normalized];
  }

  const found = [];
  const seen = new Set();
  for (const entry of KNOWN_MEAL_INGREDIENT_PHRASES) {
    const pattern = new RegExp(`(^|\\s)${entry.phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?=\\s|$)`);
    if (!pattern.test(normalized)) continue;
    if (seen.has(entry.canonical)) continue;
    seen.add(entry.canonical);
    found.push(entry.canonical);
  }

  return found.length ? found : [normalized];
}

function splitMealComponents(query) {
  const normalized = normalizeMealSplitText(query)
    .replace(/\bomelett\b/g, "omelet")
    .replace(/\bomelette\b/g, "omelet")
    .replace(/\bw\//g, "with");
  if (!normalized) return [];

  return normalized
    .split(/\bwith\b|\band\b|\bplus\b|,|&|\+/)
    .map(part => part.trim())
    .filter(Boolean)
    .flatMap(part => {
      if (part.includes("omelet")) return part.replace(/\bomelet\b/g, "eggs").trim();
      const cleaned = part
        .replace(/\bfrom\b.+$/g, "")
        .replace(/\bside of\b/g, "")
        .replace(/\bmeal\b/g, "")
        .replace(/\s+/g, " ")
        .trim();
      return explodeCompoundMealPart(cleaned);
    })
    .filter(part => part.length > 1);
}

function normalizeMealPhrase(value) {
  return normalizeQuery(value)
    .replace(/\b(fajita veggies|tomato cucumber|wild rice|black bean corn salsa|turkey bacon|egg whites)\b/g, match => match.replace(/\s+/g, "_"))
    .replace(/\s+/g, " ")
    .trim()
    .replace(/_/g, " ");
}

function parseCustomizationClauses(query) {
  const normalized = normalizeMealPhrase(query);
  const remove = [];
  const add = [];
  const boost = [];
  let cleaned = normalized;

  const collect = (regex, bucket, transform = value => value) => {
    let match;
    while ((match = regex.exec(normalized))) {
      const phrase = normalizeMealPhrase(match[1]);
      if (!phrase) continue;
      bucket.push(transform(phrase));
      cleaned = cleaned.replace(match[0], " ");
    }
  };

  collect(/\b(?:no|without|hold)\s+([a-z][a-z\s]+?)(?=(?:\b(?:no|without|hold|add|extra|double|light)\b|,|$))/g, remove);
  collect(/\badd\s+([a-z][a-z\s]+?)(?=(?:\b(?:no|without|hold|add|extra|double|light)\b|,|$))/g, add);
  collect(/\bextra\s+([a-z][a-z\s]+?)(?=(?:\b(?:no|without|hold|add|extra|double|light)\b|,|$))/g, boost, value => ({ phrase: value, factor: 1.5, label: "extra" }));
  collect(/\bdouble\s+([a-z][a-z\s]+?)(?=(?:\b(?:no|without|hold|add|extra|double|light)\b|,|$))/g, boost, value => ({ phrase: value, factor: 2, label: "double" }));

  return {
    baseQuery: cleaned.replace(/\s+/g, " ").trim(),
    remove,
    add,
    boost
  };
}

function ingredientMatchesPhrase(item, phrase) {
  const normalizedPhrase = normalizeMealPhrase(phrase);
  if (!normalizedPhrase || !item) return false;
  const candidates = [
    item.name,
    item.ingredientsSummary,
    item._originalQuery
  ].map(normalizeMealPhrase).filter(Boolean);
  return candidates.some(candidate => (
    candidate === normalizedPhrase ||
    candidate.includes(normalizedPhrase) ||
    normalizedPhrase.includes(candidate)
  ));
}

function multiplyFoodServing(food, factor) {
  if (!food || !factor || factor === 1) return food;
  const baseAmount = safeNumber(food._baseServingAmount || food.servingAmount || 1) || 1;
  const nextAmount = Number((baseAmount * factor).toFixed(2));
  return rescaleFoodForAmount(food, nextAmount, food.servingUnit);
}

function summarizeCustomizations(customizations) {
  const parts = [];
  (customizations.remove || []).forEach(item => parts.push(`no ${item}`));
  (customizations.add || []).forEach(item => parts.push(`add ${item}`));
  (customizations.boost || []).forEach(item => parts.push(`${item.label} ${item.phrase}`));
  return parts;
}

function simplifyMealComponent(component) {
  const normalized = normalizeQuery(component);
  if (!normalized) return "";

  const proteinLead = normalized.match(/\b(chicken|steak|salmon|turkey|beef|shrimp|tofu)\b/);
  if (proteinLead && /\b(burrito|bowl|salad|sandwich|taco|wrap|plate)\b/.test(normalized)) {
    if (proteinLead[1] === "chicken") return "chicken breast";
    if (proteinLead[1] === "turkey") return "ground turkey";
    if (proteinLead[1] === "beef") return "steak";
    return proteinLead[1];
  }

  return normalized
    .replace(/\b(burrito|bowl|salad|sandwich|taco|tacos|wrap|plate)\b/g, "")
    .replace(/\b(grilled|roasted|crispy|spicy|loaded|double|extra)\b/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractComponentAmount(component) {
  const match = String(component || "").match(/^(\d+(?:\.\d+)?)\s*(oz|ounces|grams|g|count|counts|egg|eggs|scoop|scoops|cup|cups|piece|pieces|slice|slices|each)?\s+(.+)$/);
  if (!match) {
    return {
      searchText: String(component || "").trim(),
      amount: "",
      unit: ""
    };
  }
  return {
    amount: match[1],
    unit: match[2] || "",
    searchText: match[3].trim()
  };
}

function normalizeComponentUnit(unit) {
  const normalized = normalizeQuery(unit);
  return ({
    oz: "oz",
    ounces: "oz",
    g: "grams",
    grams: "grams",
    egg: "count",
    eggs: "count",
    count: "count",
    counts: "count",
    scoop: "scoop",
    scoops: "scoops",
    cup: "cup",
    cups: "cups",
    piece: "piece",
    pieces: "pieces",
    slice: "slice",
    slices: "slices",
    each: "each"
  }[normalized] || "");
}

function rescaleFoodForAmount(food, amount, unit) {
  const normalized = normalizeFoodResult(food);
  if (!normalized) return null;
  if (amount === "") return normalized;

  const quantity = safeNumber(amount);
  const normalizedUnit = normalizeComponentUnit(unit) || normalized.servingUnit;
  const baselineAmount = safeNumber(normalized.servingAmount) || 1;
  const comparable = normalizeComponentUnit(normalized.servingUnit) || normalized.servingUnit;
  const basePayload = {
    _baseServingAmount: baselineAmount,
    _baseServingUnit: normalized.servingUnit,
    _baseMacros: {
      calories: safeNumber(normalized.calories),
      protein: safeNumber(normalized.protein),
      carbs: safeNumber(normalized.carbs),
      fat: safeNumber(normalized.fat),
      fiber: safeNumber(normalized.fiber)
    }
  };

  if (!quantity) return { ...normalized, ...basePayload };
  if (normalizedUnit !== comparable) {
    return {
      ...normalized,
      ...basePayload,
      servingAmount: quantity,
      servingUnit: normalizedUnit || normalized.servingUnit,
      servingLabel: `${quantity} ${normalizedUnit || normalized.servingUnit}`.trim()
    };
  }

  const scale = quantity / baselineAmount;
  return {
    ...normalized,
    ...basePayload,
    servingAmount: quantity,
    servingUnit: normalizedUnit,
    servingLabel: `${quantity} ${normalizedUnit}`.trim(),
    calories: safeNumber(normalized.calories) * scale,
    protein: safeNumber(normalized.protein) * scale,
    carbs: safeNumber(normalized.carbs) * scale,
    fat: safeNumber(normalized.fat) * scale,
    fiber: safeNumber(normalized.fiber) * scale
  };
}

function calculateComponentConfidence(query, candidate) {
  const score = scoreFoodMatch(candidate, query);
  if (score >= 170) return "high";
  if (score >= 90) return "medium";
  return "low";
}

async function findBestFoodsForComponent(component) {
  const simplified = simplifyMealComponent(component) || component;
  const localCandidates = filterMockFoodsStrict(simplified).slice(0, 4);
  let remoteCandidates = [];
  try {
    remoteCandidates = (await fetchUsdaFoods(simplified)).slice(0, 6);
  } catch (error) {
    console.warn("Component search failed", error?.message || error);
  }

  const merged = rankFoods([...localCandidates, ...remoteCandidates], simplified)
    .filter(food => food.source !== "restaurant")
    .filter(food => scoreFoodMatch(food, simplified) > 0)
    .slice(0, 4);

  return merged.length ? merged : localCandidates;
}

async function buildBreakdownEntry(component, amount = "", unit = "") {
  const candidates = await findBestFoodsForComponent(component);
  const chosen = candidates.find(food => food.source !== "restaurant") || candidates[0];
  if (!chosen) return null;
  const scaled = rescaleFoodForAmount(chosen, amount, unit);
  return {
    item: {
      ...scaled,
      _originalQuery: component
    },
    alternative: {
      query: component,
      chosen: {
        ...scaled,
        _originalQuery: component
      },
      confidence: calculateComponentConfidence(component, chosen),
      options: candidates.slice(0, 3).map(candidate => rescaleFoodForAmount(candidate, amount, unit))
    }
  };
}

async function decomposeRestaurantQuery(query) {
  const explicitRestaurant = extractExplicitRestaurantName(query);
  const customizations = parseCustomizationClauses(query);
  const lookupQuery = customizations.baseQuery || normalizeMealPhrase(query);
  if (!lookupQuery) return null;

  const restaurantMatches = findBestRestaurantMatches(lookupQuery);
  const topMatch = explicitRestaurant
    ? restaurantMatches.find(item => restaurantNamesMatch(explicitRestaurant, item.brand))
    : restaurantMatches[0];
  if (!topMatch) return null;

  const topScore = scoreRestaurantEntry(topMatch, lookupQuery);
  const normalizedQuery = normalizeMealPhrase(query);
  const strongRestaurantSignal =
    topScore >= 140 ||
    normalizedQuery.includes(normalizeMealPhrase(topMatch.brand)) ||
    normalizedQuery.includes(normalizeMealPhrase(topMatch.name));

  if (!strongRestaurantSignal) return null;

  const baseComponents = splitMealComponents(topMatch.ingredientsSummary || topMatch.name).slice(0, 8);
  const builtEntries = [];
  for (const component of baseComponents) {
    const entry = await buildBreakdownEntry(component);
    if (entry) builtEntries.push(entry);
  }

  let items = builtEntries.map(entry => entry.item);
  let alternatives = builtEntries.map(entry => entry.alternative);

  if (customizations.remove.length) {
    items = items.filter(item => !customizations.remove.some(phrase => ingredientMatchesPhrase(item, phrase)));
    alternatives = alternatives.filter(entry => !customizations.remove.some(phrase => ingredientMatchesPhrase(entry.chosen, phrase)));
  }

  if (customizations.boost.length) {
    customizations.boost.forEach(boost => {
      const itemIndex = items.findIndex(item => ingredientMatchesPhrase(item, boost.phrase));
      if (itemIndex >= 0) {
        items[itemIndex] = multiplyFoodServing(items[itemIndex], boost.factor);
        if (alternatives[itemIndex]) {
          alternatives[itemIndex] = {
            ...alternatives[itemIndex],
            chosen: items[itemIndex]
          };
        }
      }
    });
  }

  for (const phrase of customizations.add) {
    if (items.some(item => ingredientMatchesPhrase(item, phrase))) continue;
    const entry = await buildBreakdownEntry(phrase);
    if (!entry) continue;
    items.push(entry.item);
    alternatives.push(entry.alternative);
  }

  const deduped = dedupeFoods(items);
  if (!deduped.length) return null;

  return {
    label: normalizeText(query),
    source: "restaurant",
    baseMenuItem: {
      name: topMatch.name,
      brand: topMatch.brand,
      ingredientsSummary: topMatch.ingredientsSummary || "",
      servingLabel: topMatch.servingLabel || `${topMatch.servingAmount || 1} ${topMatch.servingUnit || "item"}`
    },
    items: deduped,
    hints: deduped.map(item => `${item.servingAmount || 1} ${item.servingUnit || "serving"} ${item.name}`.trim()),
    alternatives,
    customizations: summarizeCustomizations(customizations)
  };
}

function filterRestaurantFoods(query) {
  const normalizedQuery = normalizeQuery(query);
  if (!normalizedQuery) {
    return getRestaurantCatalogFoods().map(food => {
      const { _aliases, ...cleanFood } = food;
      return cleanFood;
    });
  }
  return findBestRestaurantMatches(query);
}

export function getRestaurantCatalog() {
  return getRestaurantCatalogFoods();
}

export function getRestaurantNames() {
  return [...new Set(getRestaurantCatalogFoods().map(food => food.brand).filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

export function addCustomRestaurantFood(payload) {
  const restaurant = normalizeText(payload?.restaurant);
  const name = normalizeText(payload?.name);
  if (!restaurant || !name) {
    return { ok: false, error: "restaurant and name are required" };
  }

  const customFoods = loadCustomRestaurantFoods();
  const nextFood = {
    restaurant,
    name,
    aliases: Array.isArray(payload?.aliases) ? payload.aliases.map(normalizeText).filter(Boolean) : [],
    servingAmount: safeNumber(payload?.servingAmount) || 1,
    servingUnit: normalizeText(payload?.servingUnit || "item") || "item",
    servingGrams: safeNumber(payload?.servingGrams),
    calories: safeNumber(payload?.calories),
    protein: safeNumber(payload?.protein),
    carbs: safeNumber(payload?.carbs),
    fat: safeNumber(payload?.fat),
    fiber: safeNumber(payload?.fiber),
    ingredientsSummary: normalizeText(payload?.ingredientsSummary)
  };

  const key = slugify(`${restaurant}-${name}`);
  const filtered = customFoods.filter(item => slugify(`${item.restaurant}-${item.name}`) !== key);
  filtered.unshift(nextFood);
  saveCustomRestaurantFoods(filtered);

  return {
    ok: true,
    item: normalizeRestaurantCatalogEntry(nextFood, "restaurant-custom")
  };
}

async function fetchApiFoods(query) {
  const response = await fetch(`/api/food-search?q=${encodeURIComponent(query)}`);
  if (!response.ok) {
    throw new Error(`Food search failed (${response.status})`);
  }
  const payload = await response.json();
  const items = Array.isArray(payload) ? payload : Array.isArray(payload?.items) ? payload.items : [];
  return dedupeFoods(items);
}

async function fetchUsdaFoods(query) {
  if (!window.GainTrainUsdaAdapter?.isConfigured?.()) return [];
  try {
    const variants = queryVariants(query).slice(0, 4);
    const responses = await Promise.all(variants.map(variant => window.GainTrainUsdaAdapter.searchFoods(variant)));
    return rankFoods(responses.flatMap(result => result || []), query);
  } catch (error) {
    console.warn("USDA direct search failed", error?.message || error);
    return [];
  }
}

export async function getRecentFoods(limit = 8) {
  const foods = await nutritionRepo.getRecentFoods(limit);
  return dedupeFoods(foods);
}

export async function getFavoriteFoods() {
  const foods = await nutritionRepo.getFavoriteFoods();
  return dedupeFoods(foods);
}

export async function searchFoods(query, options = {}) {
  const normalizedQuery = normalizeQuery(query);
  const mode = options.mode || "home_cooked";
  const restaurantName = normalizeText(options.restaurantName);
  const menuItem = normalizeText(options.menuItem);
  if (!normalizedQuery && !(mode === "eating_out" && restaurantName)) return [];
  const precomputedMealBreakdown = options.mealBreakdown || null;

  const [recentFoods, favoriteFoods] = await Promise.all([
    getRecentFoods(12),
    getFavoriteFoods()
  ]);

  if (mode === "eating_out" && restaurantName) {
    const scopedMatches = await getRestaurantScopedMatches(restaurantName, menuItem);
    if (scopedMatches.length) {
      return menuItem ? rankFoods(scopedMatches, `${menuItem} ${restaurantName}`) : scopedMatches;
    }
  }

  const localMatches = rankFoods([...favoriteFoods, ...recentFoods], query)
    .filter(food => scoreFoodMatch(food, query) > 0);
  const restaurantMatches = mode === "eating_out" ? filterRestaurantFoods(query) : [];
  const aiMenuMatch = mealBreakdownToSearchResult(precomputedMealBreakdown, query);

  const usdaFoods = await fetchUsdaFoods(query);
  if (usdaFoods.length) {
    return rankFoods([
      aiMenuMatch,
      ...(mode === "eating_out" ? restaurantMatches : []),
      ...localMatches,
      ...usdaFoods
    ].filter(Boolean), query);
  }

  try {
    const apiFoods = await fetchApiFoods(query);
    return rankFoods([
      aiMenuMatch,
      ...(mode === "eating_out" ? restaurantMatches : []),
      ...localMatches,
      ...apiFoods
    ].filter(Boolean), query);
  } catch (error) {
    console.warn("Food search fallback", error?.message || error);
    const mockMatches = filterMockFoods(query);
    return rankFoods([
      aiMenuMatch,
      ...(mode === "eating_out" ? restaurantMatches : []),
      ...localMatches,
      ...mockMatches
    ].filter(Boolean), query);
  }
}

export async function decomposeMealQuery(query, options = {}) {
  const mode = options.mode || "home_cooked";
  const aiBreakdown = await decomposeMealQueryWithAI(query, { mode });
  if (aiBreakdown) return aiBreakdown;

  if (mode === "eating_out") {
    const restaurantBreakdown = await decomposeRestaurantQuery(query);
    if (restaurantBreakdown) return restaurantBreakdown;
  }

  const components = splitMealComponents(query);
  if (components.length < 2) return null;

  const items = [];
  const alternatives = [];
  for (const component of components.slice(0, 6)) {
    const { searchText, amount, unit } = extractComponentAmount(component);
    if (!searchText) continue;

    const entry = await buildBreakdownEntry(searchText, amount, unit);
    if (!entry) continue;
    items.push(entry.item);
    alternatives.push(entry.alternative);
  }

  const deduped = dedupeFoods(items);
  if (deduped.length < 2) return null;

  return {
    label: normalizeText(query),
    items: deduped,
    hints: deduped.map(item => `${item.servingAmount || 1} ${item.servingUnit || "serving"} ${item.name}`.trim()),
    alternatives
  };
}

export async function rememberFood(food) {
  const normalized = normalizeFoodResult(food);
  if (!normalized) return null;

  return nutritionRepo.saveRecentFood({
    id: normalized.id,
    source: normalized.source,
    sourceId: normalized.sourceId,
    external_food_id: normalized.sourceId || normalized.id,
    food_name: normalized.name,
    brand: normalized.brand,
    default_serving_json: {
      servingLabel: normalized.servingLabel,
      servingGrams: normalized.servingGrams,
      calories: normalized.calories,
      protein: normalized.protein,
      carbs: normalized.carbs,
      fat: normalized.fat,
      fiber: normalized.fiber
    }
  });
}
