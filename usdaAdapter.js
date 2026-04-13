(function () {
  const NUTRIENT_MAP = {
    calories: ["1008", "Energy"],
    protein: ["1003", "Protein"],
    carbs: ["1005", "Carbohydrate, by difference"],
    fat: ["1004", "Total lipid (fat)"],
    fiber: ["1079", "Fiber, total dietary"],
    potassium: ["1092", "Potassium, K"],
    calcium: ["1087", "Calcium, Ca"],
    iron: ["1089", "Iron, Fe"]
  };

  function getApiKey() {
    return window.GAIN_TRAIN_CONFIG?.usdaApiKey || "";
  }

  function isConfigured() {
    return Boolean(getApiKey());
  }

  function nutrientValue(nutrients, matchers) {
    const entry = (nutrients || []).find(item =>
      matchers.some(matcher =>
        String(item.nutrientNumber || "").trim() === matcher ||
        String(item.nutrientName || "").trim() === matcher
      )
    );
    return Number(entry?.value || 0);
  }

  function mapFoodResult(food) {
    const nutrients = food.foodNutrients || [];
    const servingAmount = Number(food.servingSize || food.householdServingFullText?.match(/^\d+(?:\.\d+)?/)?.[0] || 100) || 1;
    const servingUnit = food.servingSizeUnit || food.householdServingFullText || "g";
    return {
      id: String(food.fdcId),
      source: "usda",
      name: food.description || "Food",
      brand: food.brandOwner || food.brandName || "",
      servingAmount,
      servingUnit,
      calories: nutrientValue(nutrients, [NUTRIENT_MAP.calories[0], NUTRIENT_MAP.calories[1]]),
      protein: nutrientValue(nutrients, [NUTRIENT_MAP.protein[0], NUTRIENT_MAP.protein[1]]),
      carbs: nutrientValue(nutrients, [NUTRIENT_MAP.carbs[0], NUTRIENT_MAP.carbs[1]]),
      fat: nutrientValue(nutrients, [NUTRIENT_MAP.fat[0], NUTRIENT_MAP.fat[1]]),
      micros: {
        fiber: nutrientValue(nutrients, [NUTRIENT_MAP.fiber[0], NUTRIENT_MAP.fiber[1]]),
        potassium: nutrientValue(nutrients, [NUTRIENT_MAP.potassium[0], NUTRIENT_MAP.potassium[1]]),
        calcium: nutrientValue(nutrients, [NUTRIENT_MAP.calcium[0], NUTRIENT_MAP.calcium[1]]),
        iron: nutrientValue(nutrients, [NUTRIENT_MAP.iron[0], NUTRIENT_MAP.iron[1]])
      },
      isBranded: Boolean(food.brandOwner || food.brandName || food.dataType === "Branded")
    };
  }

  async function searchFoods(query) {
    if (!isConfigured() || !query.trim()) return [];
    const response = await fetch("https://api.nal.usda.gov/fdc/v1/foods/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
        pageSize: 8,
        dataType: ["Foundation", "SR Legacy", "Survey (FNDDS)", "Branded"],
        sortBy: "dataType.keyword",
        sortOrder: "asc",
        api_key: getApiKey()
      })
    });
    if (!response.ok) throw new Error(`USDA search failed (${response.status})`);
    const payload = await response.json();
    return (payload.foods || [])
      .map(mapFoodResult)
      .sort((left, right) => Number(left.isBranded) - Number(right.isBranded));
  }

  async function getFoodDetails(foodId) {
    if (!isConfigured() || !foodId) return null;
    const response = await fetch(`https://api.nal.usda.gov/fdc/v1/food/${foodId}?api_key=${encodeURIComponent(getApiKey())}`);
    if (!response.ok) throw new Error(`USDA detail failed (${response.status})`);
    const payload = await response.json();
    return mapFoodResult(payload);
  }

  window.GainTrainUsdaAdapter = {
    isConfigured,
    searchFoods,
    getFoodDetails,
    mapFoodResult
  };
})();
