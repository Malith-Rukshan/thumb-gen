const CACHE_NAME = 'thumb-gen-v1.0.2';

// App shell needed to boot offline (hashed JS/CSS get cached on first use)
const PRECACHE_URLS = ['/', '/index.html', '/logo.png', '/favicon.ico', '/manifest.json'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .catch(() => {
        // Don't block installation if a precache request fails
      })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => caches.delete(cacheName))
        )
      )
      .then(() => self.clients.claim())
  );
});

async function putInCache(request, response) {
  if (response && response.ok && response.type === 'basic') {
    const cache = await caches.open(CACHE_NAME);
    await cache.put(request, response.clone());
  }
  return response;
}

// Pages: network-first so new deploys show up immediately, cached shell when offline
async function handleNavigation(request) {
  try {
    const response = await fetch(request);
    return putInCache('/index.html', response);
  } catch {
    const cached = (await caches.match('/index.html')) || (await caches.match('/'));
    return cached || Response.error();
  }
}

// Hashed build assets never change: cache-first
async function handleAsset(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  return putInCache(request, await fetch(request));
}

// Everything else on our origin: serve cache, refresh in the background
async function handleStaleWhileRevalidate(event) {
  const cached = await caches.match(event.request);
  const network = fetch(event.request)
    .then((response) => putInCache(event.request, response))
    .catch(() => cached);
  if (cached) {
    event.waitUntil(network);
    return cached;
  }
  return network;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle our own GET requests; user-supplied URLs and APIs go straight to the network
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(handleNavigation(request));
  } else if (url.pathname.startsWith('/assets/')) {
    event.respondWith(handleAsset(request));
  } else {
    event.respondWith(handleStaleWhileRevalidate(event));
  }
});
