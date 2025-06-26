const CACHE_NAME = 'fincas-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/finca.html',
  '/css/styles.css',
  '/js/main.js',
  '/js/finca.js',
  '/js/theme.js',
  '/js/storage.js',
  '/js/ui.js',
  '/js/chart.js',
  '/js/export.js'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys
        .filter(key => key !== CACHE_NAME)
        .map(key => caches.delete(key))
    ))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
