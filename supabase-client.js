let supabase = null;
let currentUser = null;
let clientFactoryPromise = null;
let initPromise = null;

function getConfig() {
  const appConfig = window.APP_CONFIG || {};
  const legacyConfig = window.GAIN_TRAIN_CONFIG || {};
  return {
    SUPABASE_URL: appConfig.SUPABASE_URL || legacyConfig.supabaseUrl || "",
    SUPABASE_ANON_KEY: appConfig.SUPABASE_ANON_KEY || legacyConfig.supabaseAnonKey || ""
  };
}

async function loadCreateClient() {
  if (clientFactoryPromise) return clientFactoryPromise;
  clientFactoryPromise = import("https://esm.sh/@supabase/supabase-js@2")
    .then(module => module.createClient)
    .catch(error => {
      console.warn("Supabase client import failed", error?.message || error);
      return null;
    });
  return clientFactoryPromise;
}

export async function initSupabase() {
  if (initPromise) return initPromise;

  initPromise = (async () => {
    const config = getConfig();
    if (!config.SUPABASE_URL || !config.SUPABASE_ANON_KEY) {
      return null;
    }

    const createClient = await loadCreateClient();
    if (!createClient) return null;

    if (!supabase) {
      supabase = createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: false
        }
      });
    }

    try {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        console.warn("Supabase session lookup failed", sessionError.message);
      }
      if (sessionData?.session?.user) {
        currentUser = sessionData.session.user;
        return supabase;
      }

      const { data, error } = await supabase.auth.signInAnonymously();
      if (error) {
        console.warn("Anonymous sign-in failed", error.message);
        return supabase;
      }

      currentUser = data?.user || data?.session?.user || null;
      return supabase;
    } catch (error) {
      console.warn("Supabase init failed", error?.message || error);
      return supabase;
    }
  })();

  return initPromise;
}

export function getSupabase() {
  return supabase;
}

export function getCurrentUser() {
  return currentUser;
}
