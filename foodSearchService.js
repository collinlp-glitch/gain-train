(function () {
  function getModernFoodService() {
    return window.appServices?.foodService || null;
  }

  function normalizeText(value) {
    return String(value || "").trim().toLowerCase();
  }

  function normalizeLocalIndex(localIndex) {
    return Object.entries(localIndex || {}).map(([name, macros]) => ({
      id: `local-${name}`,
      source: "local",
      name,
      brand: "",
      servingAmount: 1,
      servingUnit: macros.unit || "serving",
      calories: Number(macros.calories || 0),
      protein: Number(macros.protein || 0),
      carbs: Number(macros.carbs || 0),
      fat: Number(macros.fat || 0),
      micros: macros.micros || {},
      isBranded: false
    }));
  }

  function matchesQuery(food, query) {
    const haystack = [food.name, food.brand, food.food_name].map(normalizeText).join(" ");
    return haystack.includes(normalizeText(query));
  }

  function mapMemoryFood(food, sourceLabel) {
    const serving = food.default_serving_json || {};
    return {
      id: String(food.external_food_id || food.id || food.food_name),
      source: sourceLabel,
      name: food.food_name || food.name || "",
      brand: food.brand || "",
      servingAmount: Number(serving.servingAmount || 1),
      servingUnit: serving.servingUnit || "serving",
      calories: Number(serving.calories || 0),
      protein: Number(serving.protein || 0),
      carbs: Number(serving.carbs || 0),
      fat: Number(serving.fat || 0),
      micros: serving.micros || {},
      isBranded: Boolean(food.brand)
    };
  }

  function dedupeFoods(items) {
    const map = new Map();
    items.forEach(item => {
      const key = `${item.source}:${item.id}:${normalizeText(item.name)}`;
      if (!map.has(key)) map.set(key, item);
    });
    return [...map.values()];
  }

  async function searchFoods(query, { localIndex = {}, recentFoods = [], favoriteFoods = [] } = {}) {
    const modernService = getModernFoodService();
    if (modernService?.searchFoods) {
      return modernService.searchFoods(query, { localIndex, recentFoods, favoriteFoods });
    }
    if (!query || query.trim().length < 2) return [];
    const recentMatches = recentFoods.map(food => mapMemoryFood(food, "recent")).filter(food => matchesQuery(food, query));
    const favoriteMatches = favoriteFoods.map(food => mapMemoryFood(food, "favorite")).filter(food => matchesQuery(food, query));
    const localMatches = normalizeLocalIndex(localIndex).filter(food => matchesQuery(food, query));
    const usdaMatches = window.GainTrainUsdaAdapter?.isConfigured()
      ? await window.GainTrainUsdaAdapter.searchFoods(query)
      : [];

    return dedupeFoods([
      ...recentMatches,
      ...favoriteMatches,
      ...localMatches,
      ...usdaMatches
    ]).slice(0, 8);
  }

  async function getFoodDetails(source, foodId) {
    const modernService = getModernFoodService();
    if (modernService?.getFoodDetails) {
      return modernService.getFoodDetails(source, foodId);
    }
    if (source === "usda") {
      return window.GainTrainUsdaAdapter?.getFoodDetails(foodId);
    }
    return null;
  }

  async function decomposeMealQuery(query) {
    const modernService = getModernFoodService();
    if (modernService?.decomposeMealQuery) {
      return modernService.decomposeMealQuery(query);
    }
    return null;
  }

  function mapFoodResultToAppModel(result) {
    return {
      id: String(result.id),
      source: result.source,
      name: result.name,
      brand: result.brand || "",
      servingAmount: Number(result.servingAmount || 1),
      servingUnit: result.servingUnit || "serving",
      calories: Number(result.calories || 0),
      protein: Number(result.protein || 0),
      carbs: Number(result.carbs || 0),
      fat: Number(result.fat || 0),
      micros: result.micros || {},
      isBranded: Boolean(result.isBranded)
    };
  }

  window.GainTrainFoodSearchService = {
    searchFoods,
    decomposeMealQuery,
    getFoodDetails,
    mapFoodResultToAppModel
  };
})();
