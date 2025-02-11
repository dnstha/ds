const CACHE_NAME = "static-v4"; // The cache name will auto-update when files change

// Install event - Cache essential files
self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(["./", "./src/style.css", "./assets/image1.jpg", "./assets/script.js"]);
        })
    );
    self.skipWaiting(); // Forces activation of the new service worker
});

// Activate event - Delete old caches when a new version is detected
self.addEventListener("activate", (e) => {
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch event - Use cache first, but update in the background if possible
self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request).then((cachedResponse) => {
            if (cachedResponse) {
                // Background update: Fetch a fresh version but return the cached one
                fetch(e.request).then((response) => {
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(e.request, response.clone());
                    });
                }).catch(() => console.log("Network fetch failed"));

                return cachedResponse; // Use the cached version for fast loading
            }

            // If not in cache, fetch from network and store it
            return fetch(e.request).then((response) => {
                return caches.open(CACHE_NAME).then((cache) => {
                    cache.put(e.request, response.clone());
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