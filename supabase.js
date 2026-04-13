(function () {
  const USER_ID_KEY = "gain-train-user-id";
  const AUTH_MODE_KEY = "gain-train-auth-mode";
  let client = null;
  let syncTimer = null;
  let syncInFlight = null;
  let authListenerBound = false;
  let authState = {
    ready: false,
    mode: "local",
    userId: "",
    session: null
  };

  function getConfig() {
    return window.GAIN_TRAIN_CONFIG || {};
  }

  function isConfigured() {
    const config = getConfig();
    return Boolean(config.supabaseUrl && config.supabaseAnonKey && window.supabase?.createClient);
  }

  function getClient() {
    if (!isConfigured()) return null;
    if (!client) {
      const config = getConfig();
      client = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey, {
        auth: {
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: true
        }
      });
    }
    return client;
  }

  function createId(prefix) {
    return window.crypto?.randomUUID?.() || `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function getOrCreateUserId() {
    let userId = localStorage.getItem(USER_ID_KEY);
    if (!userId) {
      userId = createId("profile");
      localStorage.setItem(USER_ID_KEY, userId);
    }
    return userId;
  }

  function setAuthMode(mode) {
    localStorage.setItem(AUTH_MODE_KEY, mode);
    authState.mode = mode;
  }

  function getStoredAuthMode() {
    return localStorage.getItem(AUTH_MODE_KEY) || "local";
  }

  function getAuthUserId(session) {
    return session?.user?.id || "";
  }

  function emitAuthChange() {
    window.dispatchEvent(new CustomEvent("gain-train-auth-changed", {
      detail: { ...authState }
    }));
  }

  function toMealRow(meal, userId) {
    return {
      id: String(meal.id),
      user_id: userId,
      logged_at: meal.loggedAt,
      meal_name: meal.meal_name || meal.text || "Meal",
      meal_category: meal.meal_category || "meal",
      text: meal.text || "",
      portion_multiplier: Number(meal.portion_multiplier || 1),
      notes: meal.notes || "",
      calories: Number(meal.macros?.calories || 0),
      protein: Number(meal.macros?.protein || 0),
      carbs: Number(meal.macros?.carbs || 0),
      fat: Number(meal.macros?.fat || 0),
      fiber: Number(meal.fiber_grams || 0),
      structured_json: {
        templateId: meal.templateId || "",
        structured: meal.structured || {},
        matches: meal.matches || [],
        cues: meal.cues || {}
      }
    };
  }

  function fromMealRow(row) {
    return {
      id: row.id,
      loggedAt: row.logged_at,
      meal_name: row.meal_name,
      meal_category: row.meal_category,
      text: row.text,
      portion_multiplier: Number(row.portion_multiplier || 1),
      notes: row.notes || "",
      templateId: row.structured_json?.templateId || "",
      structured: row.structured_json?.structured || {},
      matches: row.structured_json?.matches || [],
      cues: row.structured_json?.cues || {},
      macros: {
        calories: Number(row.calories || 0),
        protein: Number(row.protein || 0),
        carbs: Number(row.carbs || 0),
        fat: Number(row.fat || 0)
      },
      fiber_grams: Number(row.fiber || 0)
    };
  }

  function toTemplateRow(template, userId) {
    return {
      id: String(template.template_id || template.id),
      user_id: userId,
      template_name: template.meal_name || template.label || "Saved meal",
      meal_category: template.meal_category || "meal",
      text: template.text || "",
      structured_json: {
        proteins: template.proteins || [],
        carbs: template.carbs || [],
        ingredients: template.ingredients || [],
        portion_multiplier: Number(template.portion_multiplier || 1),
        veggieServings: Number(template.veggieServings || 0),
        veggieType: template.veggieType || "",
        notes: template.notes || "",
        estimated_macros: template.estimated_macros || {}
      },
      is_favorite: Boolean(template.is_favorite),
      times_logged: Number(template.times_logged || 0),
      last_logged_at: template.last_logged_at || null
    };
  }

  function fromTemplateRow(row) {
    return {
      template_id: row.id,
      id: row.id,
      meal_name: row.template_name,
      label: row.template_name,
      meal_category: row.meal_category || "meal",
      text: row.text || "",
      proteins: row.structured_json?.proteins || [],
      carbs: row.structured_json?.carbs || [],
      ingredients: row.structured_json?.ingredients || [],
      portion_multiplier: Number(row.structured_json?.portion_multiplier || 1),
      veggieServings: Number(row.structured_json?.veggieServings || 0),
      veggieType: row.structured_json?.veggieType || "",
      notes: row.structured_json?.notes || "",
      estimated_macros: row.structured_json?.estimated_macros || {},
      is_favorite: Boolean(row.is_favorite),
      times_logged: Number(row.times_logged || 0),
      last_logged_at: row.last_logged_at || ""
    };
  }

  function serializeWorkoutSessions(workoutSessions, userId) {
    const sessions = [];
    const exercises = [];
    const sets = [];

    Object.entries(workoutSessions || {}).forEach(([weekKey, weekSessions]) => {
      Object.entries(weekSessions || {}).forEach(([dayKey, session]) => {
        const sessionId = String(session.id || `session-${weekKey}-${dayKey}`);
        sessions.push({
          id: sessionId,
          user_id: userId,
          week_key: weekKey,
          day_key: dayKey,
          label: session.label || "Workout",
          type: session.type || "strength",
          focus: session.focus || "strength",
          created_at: session.createdAt || new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

        (session.exercises || []).forEach((exercise, exerciseIndex) => {
          const exerciseId = String(exercise.id || `${sessionId}-exercise-${exerciseIndex}`);
          exercises.push({
            id: exerciseId,
            workout_session_id: sessionId,
            name: exercise.name,
            exercise_type: exercise.exercise_type || "secondary",
            rep_range_min: Number(exercise.repRange?.min || 0),
            rep_range_max: Number(exercise.repRange?.max || 0),
            rep_range_label: exercise.repRange?.label || "",
            completed: Boolean(exercise.completed),
            sort_order: exerciseIndex
          });

          (exercise.sets || []).forEach((set, setIndex) => {
            sets.push({
              id: String(set.id || `${exerciseId}-set-${setIndex}`),
              workout_exercise_id: exerciseId,
              set_index: setIndex,
              weight: String(set.weight ?? ""),
              reps: String(set.reps ?? ""),
              rir: String(set.rir ?? "")
            });
          });
        });
      });
    });

    return { sessions, exercises, sets };
  }

  function fromWorkoutRows(sessionRows, exerciseRows, setRows) {
    const exerciseMap = new Map();
    const setsByExercise = new Map();

    (setRows || []).forEach(set => {
      const list = setsByExercise.get(set.workout_exercise_id) || [];
      list.push({
        id: set.id,
        weight: set.weight || "",
        reps: set.reps || "",
        rir: set.rir || ""
      });
      setsByExercise.set(set.workout_exercise_id, list);
    });

    (exerciseRows || []).forEach(exercise => {
      const list = exerciseMap.get(exercise.workout_session_id) || [];
      list.push({
        id: exercise.id,
        name: exercise.name,
        exercise_type: exercise.exercise_type,
        sort_order: Number(exercise.sort_order || 0),
        repRange: {
          min: Number(exercise.rep_range_min || 0),
          max: Number(exercise.rep_range_max || 0),
          label: exercise.rep_range_label || ""
        },
        completed: Boolean(exercise.completed),
        sets: (setsByExercise.get(exercise.id) || []).sort((a, b) => 0).map(set => ({
          id: set.id,
          weight: set.weight,
          reps: set.reps,
          rir: set.rir
        }))
      });
      exerciseMap.set(exercise.workout_session_id, list);
    });

    return (sessionRows || []).reduce((acc, row) => {
      if (!acc[row.week_key]) acc[row.week_key] = {};
      acc[row.week_key][row.day_key] = {
        id: row.id,
        dayKey: row.day_key,
        weekKey: row.week_key,
        label: row.label,
        type: row.type,
        focus: row.focus,
        createdAt: row.created_at,
        exercises: (exerciseMap.get(row.id) || []).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
      };
      return acc;
    }, {});
  }

  function toFoodMemoryRows(items, table, userId) {
    return (items || []).map(item => ({
      id: String(item.id || `${table}-${item.source || "local"}-${item.external_food_id || item.food_name}`),
      user_id: userId,
      source: item.source || "local",
      external_food_id: String(item.external_food_id || item.food_id || item.id || item.food_name),
      food_name: item.food_name || item.name || "",
      brand: item.brand || "",
      default_serving_json: item.default_serving_json || item.defaultServing || {},
      last_used_at: item.last_used_at || new Date().toISOString(),
      times_used: Number(item.times_used || 0)
    }));
  }

  function fromFoodMemoryRows(rows) {
    return (rows || []).map(row => ({
      id: row.id,
      source: row.source,
      external_food_id: row.external_food_id,
      food_name: row.food_name,
      brand: row.brand || "",
      default_serving_json: row.default_serving_json || {},
      last_used_at: row.last_used_at || "",
      times_used: Number(row.times_used || 0)
    }));
  }

  function bindAuthListener() {
    const supabase = getClient();
    if (!supabase || authListenerBound) return;
    authListenerBound = true;
    supabase.auth.onAuthStateChange((_event, session) => {
      const authUserId = getAuthUserId(session);
      if (authUserId) {
        localStorage.setItem(USER_ID_KEY, authUserId);
        setAuthMode(session?.user?.is_anonymous ? "anonymous" : "authenticated");
        authState = {
          ready: true,
          mode: session?.user?.is_anonymous ? "anonymous" : "authenticated",
          userId: authUserId,
          session
        };
        emitAuthChange();
      }
    });
  }

  async function ensureAnonymousSession() {
    const supabase = getClient();
    if (!supabase) {
      const userId = getOrCreateUserId();
      authState = { ready: true, mode: "local", userId, session: null };
      emitAuthChange();
      return authState;
    }

    bindAuthListener();
    const sessionResult = await supabase.auth.getSession();
    if (sessionResult.error) throw sessionResult.error;
    if (sessionResult.data.session?.user?.id) {
      const session = sessionResult.data.session;
      const userId = getAuthUserId(session);
      localStorage.setItem(USER_ID_KEY, userId);
      setAuthMode(session.user?.is_anonymous ? "anonymous" : "authenticated");
      authState = {
        ready: true,
        mode: session.user?.is_anonymous ? "anonymous" : "authenticated",
        userId,
        session
      };
      emitAuthChange();
      return authState;
    }

    try {
      const anonymousResult = await supabase.auth.signInAnonymously();
      if (anonymousResult.error) throw anonymousResult.error;
      const session = anonymousResult.data.session;
      const userId = getAuthUserId(session);
      if (!userId) throw new Error("Anonymous auth did not return a user id.");
      localStorage.setItem(USER_ID_KEY, userId);
      setAuthMode("anonymous");
      authState = {
        ready: true,
        mode: "anonymous",
        userId,
        session
      };
      emitAuthChange();
      return authState;
    } catch (error) {
      const userId = getOrCreateUserId();
      setAuthMode("local");
      authState = {
        ready: true,
        mode: "local",
        userId,
        session: null,
        error
      };
      emitAuthChange();
      return authState;
    }
  }

  async function init() {
    const baseState = await ensureAnonymousSession();
    const userId = baseState.userId || getOrCreateUserId();
    const supabase = getClient();
    if (!supabase || baseState.mode === "local") return { ready: true, userId, mode: "local", session: null };
    await supabase.from("profiles").upsert({ id: userId }, { onConflict: "id" });
    return { ready: true, userId, mode: baseState.mode, session: baseState.session };
  }

  async function loadRemoteState() {
    const supabase = getClient();
    if (!supabase) return null;
    const userId = getOrCreateUserId();
    const [
      mealsResult,
      templatesResult,
      favoritesResult,
      recentResult,
      sessionsResult
    ] = await Promise.all([
      supabase.from("meals").select("*").eq("user_id", userId).order("logged_at", { ascending: false }),
      supabase.from("meal_templates").select("*").eq("user_id", userId),
      supabase.from("favorite_foods").select("*").eq("user_id", userId).order("food_name"),
      supabase.from("recent_foods").select("*").eq("user_id", userId).order("last_used_at", { ascending: false }),
      supabase.from("workout_sessions").select("*").eq("user_id", userId)
    ]);

    if (mealsResult.error) throw mealsResult.error;
    if (templatesResult.error) throw templatesResult.error;
    if (favoritesResult.error) throw favoritesResult.error;
    if (recentResult.error) throw recentResult.error;
    if (sessionsResult.error) throw sessionsResult.error;

    const sessionIds = (sessionsResult.data || []).map(row => row.id);
    let exerciseRows = [];
    let setRows = [];

    if (sessionIds.length) {
      const exercisesResult = await supabase.from("workout_exercises").select("*").in("workout_session_id", sessionIds).order("sort_order");
      if (exercisesResult.error) throw exercisesResult.error;
      exerciseRows = exercisesResult.data || [];
      const exerciseIds = exerciseRows.map(row => row.id);
      if (exerciseIds.length) {
        const setsResult = await supabase.from("workout_sets").select("*").in("workout_exercise_id", exerciseIds).order("set_index");
        if (setsResult.error) throw setsResult.error;
        setRows = setsResult.data || [];
      }
    }

    return {
      userId,
      meals: (mealsResult.data || []).map(fromMealRow),
      savedTemplates: (templatesResult.data || []).map(fromTemplateRow),
      favoriteFoods: fromFoodMemoryRows(favoritesResult.data || []),
      recentFoods: fromFoodMemoryRows(recentResult.data || []),
      workoutSessions: fromWorkoutRows(sessionsResult.data || [], exerciseRows, setRows)
    };
  }

  async function replaceUserTable(table, userId, rows) {
    const supabase = getClient();
    const { error: deleteError } = await supabase.from(table).delete().eq("user_id", userId);
    if (deleteError) throw deleteError;
    if (!rows.length) return;
    const { error: insertError } = await supabase.from(table).insert(rows);
    if (insertError) throw insertError;
  }

  async function syncState(state) {
    const supabase = getClient();
    if (!supabase) return { synced: false, reason: "not-configured" };
    const userId = state.userId || getOrCreateUserId();
    await supabase.from("profiles").upsert({ id: userId }, { onConflict: "id" });

    const mealRows = (state.meals || []).map(meal => toMealRow(meal, userId));
    const templateRows = (state.savedTemplates || []).map(template => toTemplateRow(template, userId));
    const recentFoodRows = toFoodMemoryRows(state.recentFoods || [], "recent", userId);
    const favoriteFoodRows = toFoodMemoryRows(state.favoriteFoods || [], "favorite", userId);
    const workoutRows = serializeWorkoutSessions(state.workoutSessions || {}, userId);

    await replaceUserTable("meals", userId, mealRows);
    await replaceUserTable("meal_templates", userId, templateRows);
    await replaceUserTable("recent_foods", userId, recentFoodRows);
    await replaceUserTable("favorite_foods", userId, favoriteFoodRows);

    const { error: deleteSessionsError } = await supabase.from("workout_sessions").delete().eq("user_id", userId);
    if (deleteSessionsError) throw deleteSessionsError;
    if (workoutRows.sessions.length) {
      const { error: sessionError } = await supabase.from("workout_sessions").insert(workoutRows.sessions);
      if (sessionError) throw sessionError;
    }
    if (workoutRows.exercises.length) {
      const { error: exerciseError } = await supabase.from("workout_exercises").insert(workoutRows.exercises);
      if (exerciseError) throw exerciseError;
    }
    if (workoutRows.sets.length) {
      const { error: setError } = await supabase.from("workout_sets").insert(workoutRows.sets);
      if (setError) throw setError;
    }

    return { synced: true, syncedAt: new Date().toISOString(), userId };
  }

  function scheduleSync(state) {
    if (!isConfigured()) return;
    window.clearTimeout(syncTimer);
    syncTimer = window.setTimeout(() => {
      syncInFlight = syncState(state).catch(error => {
        console.error("Supabase sync failed", error);
      });
    }, 800);
  }

  window.GainTrainSupabase = {
    getConfig,
    isConfigured,
    getClient,
    getOrCreateUserId,
    getStoredAuthMode,
    getAuthState: () => ({ ...authState }),
    ensureAnonymousSession,
    init,
    loadRemoteState,
    syncState,
    scheduleSync
  };
})();
