const CACHE_NAME = "static-v1"; // Change this to force an update
const ASSETS_TO_CACHE = [
    "./",
    "./index.html",
    "./src/style.css"
];

// Install event - Cache all files
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Caching assets...");
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting(); // Forces activation immediately
});

// Activate event - Delete old caches
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        console.log("Deleting old cache:", key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    self.clients.claim(); // Take control of all clients immediately
});

// Fetch event - Serve from cache, but update in background
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                // Fetch a fresh version in the background
                fetch(event.request).then((response) => {
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, response.clone());
                    });
                }).catch(() => console.log("Network fetch failed"));

                return cachedResponse; // Use cached version for faster loading
            }

            // If not in cache, fetch from network and store it
            return fetch(event.request).then((response) => {
                return caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});

/*
Old Code
self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll(["./", "./src/style.css"]);
        })
    );
});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    );
})
*/