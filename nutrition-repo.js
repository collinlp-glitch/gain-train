import { initSupabase, getSupabase, getCurrentUser } from "./supabase-client.js";

const CACHE_KEY = "gain-train-nutrition-cache-v1";

function createId(prefix) {
  return window.crypto?.randomUUID?.() || `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function cloneData(value) {
  return JSON.parse(JSON.stringify(value));
}

function emptyCache() {
  return {
    meals: [],
    mealItems: [],
    favoriteFoods: [],
    recentFoods: []
  };
}

function readCache() {
  try {
    const parsed = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
    return {
      ...emptyCache(),
      ...(parsed || {})
    };
  } catch {
    return emptyCache();
  }
}

function writeCache(nextCache) {
  localStorage.setItem(CACHE_KEY, JSON.stringify(nextCache));
}

function updateCache(mutator) {
  const cache = readCache();
  const next = mutator(cloneData(cache)) || cache;
  writeCache(next);
  return next;
}

function normalizeDateInput(date) {
  if (!date) return new Date();
  if (date instanceof Date) return date;
  return new Date(date);
}

function dayBounds(date) {
  const target = normalizeDateInput(date);
  const start = new Date(target);
  start.setHours(0, 0, 0, 0);
  const end = new Date(target);
  end.setHours(23, 59, 59, 999);
  return { start, end };
}

function normalizeMeal(row) {
  if (!row) return null;
  return {
    id: String(row.id || createId("meal")),
    user_id: row.user_id || "",
    logged_at: row.logged_at || new Date().toISOString(),
    meal_name: row.meal_name || row.name || "Meal",
    meal_category: row.meal_category || "meal",
    text: row.text || "",
    portion_multiplier: Number(row.portion_multiplier || 1),
    notes: row.notes || "",
    calories: Number(row.calories || 0),
    protein: Number(row.protein || 0),
    carbs: Number(row.carbs || 0),
    fat: Number(row.fat || 0),
    fiber: Number(row.fiber || 0),
    structured_json: row.structured_json || {}
  };
}

function normalizeMealItem(row) {
  if (!row) return null;
  return {
    id: String(row.id || createId("meal-item")),
    meal_id: String(row.meal_id || ""),
    food_id: String(row.food_id || row.external_food_id || ""),
    food_name: row.food_name || row.name || "",
    source: row.source || "local",
    amount: row.amount === "" ? "" : Number(row.amount || 0),
    unit: row.unit || "serving",
    calories: Number(row.calories || 0),
    protein: Number(row.protein || 0),
    carbs: Number(row.carbs || 0),
    fat: Number(row.fat || 0),
    fiber: Number(row.fiber || 0),
    micros: row.micros || {}
  };
}

function normalizeFood(row) {
  if (!row) return null;
  return {
    id: String(row.id || `${row.source || "local"}-${row.external_food_id || row.food_id || row.food_name}`),
    source: row.source || "local",
    external_food_id: String(row.external_food_id || row.food_id || row.id || ""),
    food_name: row.food_name || row.name || "",
    brand: row.brand || "",
    default_serving_json: row.default_serving_json || {},
    last_used_at: row.last_used_at || "",
    times_used: Number(row.times_used || 0),
    is_favorite: Boolean(row.is_favorite)
  };
}

function normalizeList(items, normalizer) {
  return (Array.isArray(items) ? items : [])
    .map(normalizer)
    .filter(Boolean);
}

async function getReadySupabase() {
  await initSupabase();
  return getSupabase();
}

async function withRemote(operation, fallback, { timeoutMs = 350 } = {}) {
  try {
    const supabase = await getReadySupabase();
    const user = getCurrentUser();
    if (!supabase || !user?.id) return fallback();
    const remotePromise = Promise.resolve(operation(supabase, user)).catch(error => {
      console.warn("Nutrition repo fallback", error?.message || error);
      return fallback();
    });
    const fallbackPromise = new Promise(resolve => {
      window.setTimeout(() => resolve(fallback()), timeoutMs);
    });
    return await Promise.race([remotePromise, fallbackPromise]);
  } catch (error) {
    console.warn("Nutrition repo fallback", error?.message || error);
    return fallback();
  }
}

function cacheMealsForDay(date) {
  const { start, end } = dayBounds(date);
  const items = readCache().meals.filter(meal => {
    const logged = new Date(meal.logged_at);
    return logged >= start && logged <= end;
  });
  return normalizeList(items, normalizeMeal);
}

export async function loadMealsForDay(date) {
  return withRemote(
    async (supabase, user) => {
      const { start, end } = dayBounds(date);
      const { data, error } = await supabase
        .from("meals")
        .select("*")
        .eq("user_id", user.id)
        .gte("logged_at", start.toISOString())
        .lte("logged_at", end.toISOString())
        .order("logged_at", { ascending: false });
      if (error) throw error;
      const meals = normalizeList(data, normalizeMeal);
      updateCache(cache => {
        const others = cache.meals.filter(item => {
          const logged = new Date(item.logged_at);
          return logged < start || logged > end;
        });
        cache.meals = [...others, ...meals];
        return cache;
      });
      return meals;
    },
    () => cacheMealsForDay(date)
  );
}

export async function createMeal(payload) {
  const meal = normalizeMeal({
    ...payload,
    id: payload?.id || createId("meal"),
    user_id: getCurrentUser()?.id || "",
    logged_at: payload?.logged_at || new Date().toISOString()
  });

  updateCache(cache => {
    cache.meals = [meal, ...cache.meals.filter(item => item.id !== meal.id)];
    return cache;
  });

  return withRemote(
    async (supabase, user) => {
      const row = { ...meal, user_id: user.id };
      const { data, error } = await supabase.from("meals").upsert(row).select().single();
      if (error) throw error;
      const saved = normalizeMeal(data);
      updateCache(cache => {
        cache.meals = [saved, ...cache.meals.filter(item => item.id !== saved.id)];
        return cache;
      });
      return saved;
    },
    () => meal
  );
}

export async function addMealItem(payload) {
  const mealItem = normalizeMealItem({
    ...payload,
    id: payload?.id || createId("meal-item")
  });

  updateCache(cache => {
    cache.mealItems = [mealItem, ...cache.mealItems.filter(item => item.id !== mealItem.id)];
    return cache;
  });

  return withRemote(
    async (supabase) => {
      const { data, error } = await supabase.from("meal_items").upsert({
        id: mealItem.id,
        meal_id: mealItem.meal_id,
        food_id: mealItem.food_id,
        food_name: mealItem.food_name,
        source: mealItem.source,
        amount: mealItem.amount === "" ? null : mealItem.amount,
        unit: mealItem.unit,
        calories: mealItem.calories,
        protein: mealItem.protein,
        carbs: mealItem.carbs,
        fat: mealItem.fat,
        fiber: mealItem.fiber,
        micros: mealItem.micros
      }).select().single();
      if (error) throw error;
      const saved = normalizeMealItem(data);
      updateCache(cache => {
        cache.mealItems = [saved, ...cache.mealItems.filter(item => item.id !== saved.id)];
        return cache;
      });
      return saved;
    },
    () => mealItem
  );
}

export async function updateMealItem(id, patch) {
  const normalizedId = String(id || "");
  let patched = null;

  updateCache(cache => {
    cache.mealItems = cache.mealItems.map(item => {
      if (String(item.id) !== normalizedId) return item;
      patched = normalizeMealItem({ ...item, ...patch, id: normalizedId });
      return patched;
    });
    return cache;
  });

  return withRemote(
    async (supabase) => {
      const { data, error } = await supabase
        .from("meal_items")
        .update(patch || {})
        .eq("id", normalizedId)
        .select()
        .single();
      if (error) throw error;
      const saved = normalizeMealItem(data);
      updateCache(cache => {
        cache.mealItems = cache.mealItems.map(item => String(item.id) === normalizedId ? saved : item);
        return cache;
      });
      return saved;
    },
    () => patched || null
  );
}

export async function deleteMealItem(id) {
  const normalizedId = String(id || "");
  updateCache(cache => {
    cache.mealItems = cache.mealItems.filter(item => String(item.id) !== normalizedId);
    return cache;
  });

  return withRemote(
    async (supabase) => {
      const { error } = await supabase.from("meal_items").delete().eq("id", normalizedId);
      if (error) throw error;
      return { success: true, id: normalizedId };
    },
    () => ({ success: true, id: normalizedId })
  );
}

export async function getRecentFoods(limit = 8) {
  const normalizedLimit = Math.max(1, Number(limit || 8));
  return withRemote(
    async (supabase, user) => {
      const { data, error } = await supabase
        .from("recent_foods")
        .select("*")
        .eq("user_id", user.id)
        .order("last_used_at", { ascending: false })
        .limit(normalizedLimit);
      if (error) throw error;
      const foods = normalizeList(data, normalizeFood);
      updateCache(cache => {
        cache.recentFoods = foods;
        return cache;
      });
      return foods;
    },
    () => normalizeList(readCache().recentFoods, normalizeFood).slice(0, normalizedLimit)
  );
}

export async function saveRecentFood(payload) {
  const normalized = normalizeFood({
    ...(payload || {}),
    id: payload?.id || `${payload?.source || "local"}-${payload?.sourceId || payload?.external_food_id || payload?.food_name || createId("recent-food")}`,
    external_food_id: payload?.external_food_id || payload?.sourceId || payload?.food_id || payload?.id || "",
    food_name: payload?.food_name || payload?.name || "",
    default_serving_json: payload?.default_serving_json || {
      servingLabel: payload?.servingLabel || "",
      servingGrams: Number(payload?.servingGrams || 0),
      calories: Number(payload?.calories || 0),
      protein: Number(payload?.protein || 0),
      carbs: Number(payload?.carbs || 0),
      fat: Number(payload?.fat || 0),
      fiber: Number(payload?.fiber || 0)
    },
    last_used_at: new Date().toISOString(),
    times_used: Number(payload?.times_used || 0)
  });

  const existing = readCache().recentFoods.find(item =>
    String(item.id) === normalized.id ||
    String(item.external_food_id) === normalized.external_food_id
  );

  const recentFood = {
    ...normalized,
    times_used: Number(existing?.times_used || 0) + 1,
    last_used_at: new Date().toISOString()
  };

  updateCache(cache => {
    cache.recentFoods = [recentFood, ...cache.recentFoods.filter(item => {
      return String(item.id) !== recentFood.id && String(item.external_food_id) !== recentFood.external_food_id;
    })].slice(0, 40);
    return cache;
  });

  return withRemote(
    async (supabase, user) => {
      const row = {
        id: recentFood.id,
        user_id: user.id,
        source: recentFood.source,
        external_food_id: recentFood.external_food_id,
        food_name: recentFood.food_name,
        brand: recentFood.brand,
        default_serving_json: recentFood.default_serving_json,
        last_used_at: recentFood.last_used_at,
        times_used: recentFood.times_used
      };
      const { data, error } = await supabase.from("recent_foods").upsert(row).select().single();
      if (error) throw error;
      const saved = normalizeFood(data);
      updateCache(cache => {
        cache.recentFoods = [saved, ...cache.recentFoods.filter(item => {
          return String(item.id) !== saved.id && String(item.external_food_id) !== saved.external_food_id;
        })].slice(0, 40);
        return cache;
      });
      return saved;
    },
    () => recentFood
  );
}

export async function getFavoriteFoods() {
  return withRemote(
    async (supabase, user) => {
      const { data, error } = await supabase
        .from("favorite_foods")
        .select("*")
        .eq("user_id", user.id)
        .order("food_name", { ascending: true });
      if (error) throw error;
      const foods = normalizeList(data, row => normalizeFood({ ...row, is_favorite: true }));
      updateCache(cache => {
        cache.favoriteFoods = foods;
        return cache;
      });
      return foods;
    },
    () => normalizeList(readCache().favoriteFoods, row => normalizeFood({ ...row, is_favorite: true }))
  );
}

export async function toggleFavoriteFood(foodId) {
  const normalizedId = String(foodId || "");
  const cache = readCache();
  const existing = cache.favoriteFoods.find(item =>
    String(item.id) === normalizedId || String(item.external_food_id) === normalizedId
  );

  if (existing) {
    updateCache(next => {
      next.favoriteFoods = next.favoriteFoods.filter(item =>
        String(item.id) !== normalizedId && String(item.external_food_id) !== normalizedId
      );
      return next;
    });

    return withRemote(
      async (supabase, user) => {
        const { error } = await supabase
          .from("favorite_foods")
          .delete()
          .eq("user_id", user.id)
          .or(`id.eq.${normalizedId},external_food_id.eq.${normalizedId}`);
        if (error) throw error;
        return { foodId: normalizedId, is_favorite: false };
      },
      () => ({ foodId: normalizedId, is_favorite: false })
    );
  }

  const recentMatch = cache.recentFoods.find(item =>
    String(item.id) === normalizedId || String(item.external_food_id) === normalizedId
  );

  const favorite = normalizeFood({
    ...(recentMatch || {}),
    id: recentMatch?.id || createId("favorite-food"),
    external_food_id: recentMatch?.external_food_id || normalizedId,
    food_name: recentMatch?.food_name || normalizedId,
    is_favorite: true
  });

  updateCache(next => {
    next.favoriteFoods = [favorite, ...next.favoriteFoods.filter(item => String(item.id) !== favorite.id)];
    return next;
  });

  return withRemote(
    async (supabase, user) => {
      const row = {
        id: favorite.id,
        user_id: user.id,
        source: favorite.source,
        external_food_id: favorite.external_food_id,
        food_name: favorite.food_name,
        brand: favorite.brand,
        default_serving_json: favorite.default_serving_json
      };
      const { data, error } = await supabase.from("favorite_foods").upsert(row).select().single();
      if (error) throw error;
      const saved = normalizeFood({ ...data, is_favorite: true });
      updateCache(next => {
        next.favoriteFoods = [saved, ...next.favoriteFoods.filter(item => String(item.id) !== saved.id)];
        return next;
      });
      return { foodId: saved.external_food_id || saved.id, is_favorite: true, food: saved };
    },
    () => ({ foodId: favorite.external_food_id || favorite.id, is_favorite: true, food: favorite })
  );
}
