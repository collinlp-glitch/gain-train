window.GAIN_TRAIN_CONFIG = window.GAIN_TRAIN_CONFIG || {};

if (window.APP_CONFIG?.SUPABASE_URL && !window.GAIN_TRAIN_CONFIG.supabaseUrl) {
  window.GAIN_TRAIN_CONFIG.supabaseUrl = window.APP_CONFIG.SUPABASE_URL;
}

if (window.APP_CONFIG?.SUPABASE_ANON_KEY && !window.GAIN_TRAIN_CONFIG.supabaseAnonKey) {
  window.GAIN_TRAIN_CONFIG.supabaseAnonKey = window.APP_CONFIG.SUPABASE_ANON_KEY;
}

if (window.APP_CONFIG?.USDA_API_KEY && !window.GAIN_TRAIN_CONFIG.usdaApiKey) {
  window.GAIN_TRAIN_CONFIG.usdaApiKey = window.APP_CONFIG.USDA_API_KEY;
}
