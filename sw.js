const CACHE_NAME = "dsa-v0.0.2"; // Increment this version to force-update cached files

// Complete list of all pages, tools, scripts, styles, and assets to cache for 100% offline access
const ASSETS_TO_CACHE = [
    "./",
    "./index.html",
    "./Others.html",
    "./Logo.svg",
    "./manifest.json",
    "./buttons.css",
    "./canvas.js",
    "./src/style.css",
    "./src/resp.js",
    "./src/wApp.js",
    "./stylesForMathAnimations/style.css",
    "./stylesForMathAnimations/tranformationStyles.css",

    // Icons
    "./Images/Icon/Icon.svg",
    "./Images/Icon/Logo520.png",
    "./Images/Icon/LogoBG.png",
    "./Images/Icon/LogoTr.png",

    // Front page images
    "./Images/MATHS/CircleCentralAngle.jpg",
    "./Images/MATHS/CircleEqn.png",
    "./Images/MATHS/CirInversion.jpg",
    "./Images/MATHS/ComplexPlane.jpg",
    "./Images/MATHS/Derivative.jpg",
    "./Images/MATHS/Determinant.jpg",
    "./Images/MATHS/Ellipse.jpg",
    "./Images/MATHS/LinearEqnSolver.jpg",
    "./Images/MATHS/LinearEqnThree.jpg",
    "./Images/MATHS/LinQuad.jpg",
    "./Images/MATHS/PyTri.jpg",
    "./Images/MATHS/QuadEqn.jpg",
    "./Images/MATHS/Reflection.jpg",
    "./Images/MATHS/Regression.jpg",
    "./Images/MATHS/RightTriangle.jpg",
    "./Images/MATHS/Rotation.jpg",
    "./Images/MATHS/Scaling.jpg",
    "./Images/MATHS/Translation.jpg",
    "./Images/MATHS/UnitCircle.jpg",

    // Mathematics front page
    "./MathsFrontPage/MathPage.html",
    "./MathsFrontPage/styles.css",

    // Shared Utility Functions
    "./DSA_UtilityFunctions/DrawingFunctions/drawing.js",
    "./DSA_UtilityFunctions/DrawingFunctions/graphPage.js",
    "./DSA_UtilityFunctions/MathsFunctions/arrayList.js",
    "./DSA_UtilityFunctions/MathsFunctions/ComplexNumbers.js",
    "./DSA_UtilityFunctions/MathsFunctions/Math1.js",

    // Math Projects
    "./MATHS_PROJECTS/Circle Animation/angle.js",
    "./MATHS_PROJECTS/Circle Animation/circle.html",
    "./MATHS_PROJECTS/CircleEquation/mainPage.html",
    "./MATHS_PROJECTS/CircleEquation/script.js",
    "./MATHS_PROJECTS/CircleEquation/style.css",
    "./MATHS_PROJECTS/Complex_Plane/complexPlane.html",
    "./MATHS_PROJECTS/Complex_Plane/drawCircle.js",
    "./MATHS_PROJECTS/Complex_Plane/script.js",
    "./MATHS_PROJECTS/Complex_Plane/style.css",
    "./MATHS_PROJECTS/Derivative_Concept/mainPage.html",
    "./MATHS_PROJECTS/Derivative_Concept/script.js",
    "./MATHS_PROJECTS/Derivative_Concept/styles.css",
    "./MATHS_PROJECTS/Determinant/detPage.html",
    "./MATHS_PROJECTS/Determinant/detScript.js",
    "./MATHS_PROJECTS/Ellipse/drawEllipse.js",
    "./MATHS_PROJECTS/Ellipse/ellipseAnimation.js",
    "./MATHS_PROJECTS/Ellipse/ellipseMainPage.html",
    "./MATHS_PROJECTS/Ellipse/style.css",
    "./MATHS_PROJECTS/Linear and Quadratic System/mainFile.html",
    "./MATHS_PROJECTS/Linear and Quadratic System/script.js",
    "./MATHS_PROJECTS/Linear and Quadratic System/style.css",
    "./MATHS_PROJECTS/Linear Equation Solver/graph.js",
    "./MATHS_PROJECTS/Linear Equation Solver/inputFile.js",
    "./MATHS_PROJECTS/Linear Equation Solver/page.html",
    "./MATHS_PROJECTS/Linear Equation xyz/mainFile.html",
    "./MATHS_PROJECTS/Linear Equation xyz/xyz_solver.js",
    "./MATHS_PROJECTS/PythagoreanTriples/page.html",
    "./MATHS_PROJECTS/PythagoreanTriples/script.js",
    "./MATHS_PROJECTS/Quadratic Equation Solver/graph.js",
    "./MATHS_PROJECTS/Quadratic Equation Solver/Quad.html",
    "./MATHS_PROJECTS/Quadratic Equation Solver/QuadEqnStyle.css",
    "./MATHS_PROJECTS/Quadratic Equation Solver/solver.js",
    "./MATHS_PROJECTS/Regression/mainPage.html",
    "./MATHS_PROJECTS/Regression/script.js",
    "./MATHS_PROJECTS/Regression/style.css",
    "./MATHS_PROJECTS/Right Triangle Animation/animation.js",
    "./MATHS_PROJECTS/Right Triangle Animation/Right Triangle.html",
    "./MATHS_PROJECTS/Transformation/Circle_Inversion/mainPage.html",
    "./MATHS_PROJECTS/Transformation/Circle_Inversion/script.js",
    "./MATHS_PROJECTS/Transformation/Circle_Inversion/style.css",
    "./MATHS_PROJECTS/Transformation/Reflection/mainfile.html",
    "./MATHS_PROJECTS/Transformation/Reflection/script.js",
    "./MATHS_PROJECTS/Transformation/Rotation/mainPage.html",
    "./MATHS_PROJECTS/Transformation/Rotation/script.js",
    "./MATHS_PROJECTS/Transformation/Rotation/style.css",
    "./MATHS_PROJECTS/Transformation/Scaling/scalingMainPage.html",
    "./MATHS_PROJECTS/Transformation/Scaling/script.js",
    "./MATHS_PROJECTS/Transformation/Translation/script.js",
    "./MATHS_PROJECTS/Transformation/Translation/translationMainPage.html",
    "./MATHS_PROJECTS/UnitCircle/drawCircle.js",
    "./MATHS_PROJECTS/UnitCircle/mainPage.html",
    "./MATHS_PROJECTS/UnitCircle/style.css",
    "./MATHS_PROJECTS/UnitCircle/UCscript.js",

    // Graph
    "./Graph/function.js",
    "./Graph/graph.html",

    // Miscellaneous Projects
    "./MISCELLANEOUS/Animation/a.gif",
    "./MISCELLANEOUS/Animation/animation.html",
    "./MISCELLANEOUS/Animation/b.gif",
    "./MISCELLANEOUS/Animation/bg.jpg",
    "./MISCELLANEOUS/Animation/mouse.gif",
    "./MISCELLANEOUS/Calendar/calendar.html",
    "./MISCELLANEOUS/Calendar/calendarStyle.css",
    "./MISCELLANEOUS/CircleInsideCircle/mainPage.html",
    "./MISCELLANEOUS/CircleInsideCircle/script.js",
    "./MISCELLANEOUS/Circular Motion/Circular.html",
    "./MISCELLANEOUS/Circular Motion/Motion.js",
    "./MISCELLANEOUS/Collision/Collision.html",
    "./MISCELLANEOUS/Collision/motion.js",
    "./MISCELLANEOUS/DifferentPlacesGravity/Canvas/g.js",
    "./MISCELLANEOUS/DifferentPlacesGravity/Canvas/planet.html",
    "./MISCELLANEOUS/DifferentPlacesGravity/page.html",
    "./MISCELLANEOUS/DifferentPlacesGravity/script.js",
    "./MISCELLANEOUS/DifferentPlacesGravity/styles.css",
    "./MISCELLANEOUS/Fireworks/Fireworks.html",
    "./MISCELLANEOUS/Fireworks/fireworks.js",
    "./MISCELLANEOUS/Gravity/Bounce.html",
    "./MISCELLANEOUS/Gravity/gravity.js",
    "./MISCELLANEOUS/Interactive Circles/canvas.js",
    "./MISCELLANEOUS/Interactive Circles/Circles.html",
    "./MISCELLANEOUS/Pendulum/ball.html",
    "./MISCELLANEOUS/Pendulum/shm.js",
    "./MISCELLANEOUS/Projectile/ground.html",
    "./MISCELLANEOUS/Projectile/motion.js",
    "./MISCELLANEOUS/Pxl/image1.html",
    "./MISCELLANEOUS/Pxl/pixel1.js",
    "./MISCELLANEOUS/Rectangles/Rect.html",
    "./MISCELLANEOUS/Rectangles/rect.js",
    "./MISCELLANEOUS/RockPaperScissors/audio_lost.mp3",
    "./MISCELLANEOUS/RockPaperScissors/audio_won.mp3",
    "./MISCELLANEOUS/RockPaperScissors/mainFile.html",
    "./MISCELLANEOUS/RockPaperScissors/script.js",
    "./MISCELLANEOUS/RockPaperScissors/styles.css",
    "./MISCELLANEOUS/Shooting Stars/background.js",
    "./MISCELLANEOUS/Shooting Stars/Landscape.html",
    "./MISCELLANEOUS/Shooting Stars/shootingStar.js"
];

// Install event - Pre-cache all tools and assets
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(async (cache) => {
            console.log("[Service Worker] Caching all website assets for offline use...");
            // Cache each asset safely so one missing file doesn't fail the whole install
            await Promise.all(
                ASSETS_TO_CACHE.map((url) => {
                    return cache.add(url).catch((err) => {
                        console.warn(`[Service Worker] Failed to cache asset: ${url}`, err);
                    });
                })
            );
        })
    );
    self.skipWaiting(); // Immediately activate the new service worker
});

// Activate event - Delete any old caches from previous versions
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        console.log("[Service Worker] Removing old cache:", key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    self.clients.claim(); // Take control of all clients immediately
});

// Fetch event - Cache-first with background revalidation and offline fallback
self.addEventListener("fetch", (event) => {
    const request = event.request;

    // Only handle GET requests
    if (request.method !== "GET") return;

    // Only process http(s) requests (ignores chrome-extension://, etc.)
    if (!request.url.startsWith("http")) return;

    // Skip third-party video embeds (YouTube)
    if (request.url.includes("youtube.com") || request.url.includes("ytimg.com")) {
        return;
    }

    event.respondWith(
        caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
                // Return cached version immediately for instant snappy load
                // In background, if online, update the cached copy
                fetch(request)
                    .then((networkResponse) => {
                        if (networkResponse && networkResponse.status === 200) {
                            caches.open(CACHE_NAME).then((cache) => {
                                cache.put(request, networkResponse);
                            });
                        }
                    })
                    .catch(() => {
                        // Offline: perfectly fine, we already served the cached file
                    });

                return cachedResponse;
            }

            // If not found in cache, fetch from network and cache it for future offline visits
            return fetch(request)
                .then((networkResponse) => {
                    if (!networkResponse || networkResponse.status !== 200 || networkResponse.type === "opaque") {
                        return networkResponse;
                    }

                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, responseToCache);
                    });

                    return networkResponse;
                })
                .catch(() => {
                    // If network fails (completely offline) and user is navigating to an HTML page, serve the home page
                    if (request.headers.get("accept") && request.headers.get("accept").includes("text/html")) {
                        return caches.match("./index.html");
                    }
                });
        })
    );
});
