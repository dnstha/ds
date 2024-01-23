self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll(["/", "/src", "/MISCELLANEOUS", "/MATHS_PROJECTS", "/DSA_UtilityFunctions", "/Images", "/Others.html", "/MathsFrontPage", "/stylesForMathAnimations", "/buttons.css"]);
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