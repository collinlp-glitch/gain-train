const CACHE = "gain-train-v11";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./config.js",
  "./supabase.js",
  "./supabase-client.js",
  "./usdaAdapter.js",
  "./foodSearchService.js",
  "./food-service.js",
  "./nutrition-repo.js",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  const requestUrl = new URL(event.request.url);
  const isSameOrigin = requestUrl.origin === self.location.origin;
  const isAppAsset = isSameOrigin && (
    requestUrl.pathname.endsWith("/index.html") ||
    requestUrl.pathname.endsWith("/styles.css") ||
    requestUrl.pathname.endsWith("/app.js") ||
    requestUrl.pathname.endsWith("/food-service.js") ||
    requestUrl.pathname.endsWith("/foodSearchService.js") ||
    requestUrl.pathname.endsWith("/config.js") ||
    requestUrl.pathname.endsWith("/supabase.js") ||
    requestUrl.pathname.endsWith("/supabase-client.js") ||
    requestUrl.pathname.endsWith("/nutrition-repo.js") ||
    requestUrl.pathname.endsWith("/usdaAdapter.js")
  );

  if (isAppAsset) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE).then(cache => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type !== "basic") return response;
        const clone = response.clone();
        caches.open(CACHE).then(cache => cache.put(event.request, clone));
        return response;
      });
    })
  );
});
