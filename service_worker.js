//cache resources list
self.CACHE_NAME = 'wave-solutions-cache-v1';
const urlsToCache = [
    '/',
    '/static/css/style.css',
    '/static/icons/favicon.png',
    '/static/icons/icon_144x144.png',
    '/static/icons/icon_192x192.png',
    '/static/icons/icon_512x512.png',
    '/static/images/wave.jpg',
    '/manifest.json',
    '/service_worker.js'
];

//installation event listener
self.addEventListener('install', function(event) {
    console.log('[Service Worker] Installing Service Worker and caching resources');
    event.waitUntil(
        caches.open(self.CACHE_NAME)
            .then(function(cache) {
                console.log('[Service Worker] Caching files');
                return cache.addAll(urlsToCache);
            })
    );
});

//activation event listener
self.addEventListener('activate', function(event) {
    console.log('[Service Worker] Activating Service Worker and cleaning old caches');
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cache) {
                    if (cache !== self.CACHE_NAME) {
                        console.log('[Service Worker] Deleting old cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Fetch event listener
self.addEventListener('fetch', function(event) {
    console.log('[Service Worker] Fetching resource:', event.request.url);
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                if (response) {
                    console.log('[Service Worker] Found in cache:', event.request.url);
                    return response;
                }
                console.log('[Service Worker] Fetching from network:', event.request.url);
                return fetch(event.request);
            })
    );
});
