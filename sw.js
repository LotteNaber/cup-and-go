// serice worker
const CACHE_NAME = "cupandgo-v1";
const ASSETS = [
  "/",                 // root
  "/index.html",
  "/menu.html",
  "/allergy.html",
  "/checkout.html",
  "/thankyou.html",
  "/cappu.html",
  "/chaiL.html",
  "/latteM.html",
  "lemonade.html",
  "/matcha.html",
  "strawsmoothy.html",
  "/styles.css", 
  "styles2.css",     //alle files
  "/styles3.css",
  "/styles4.css",
  "/allergy.css",
  "/script.js",
  "/script2.js",
  "/script3.js",
  "/script4.js",
  "/thankyou.js",
  "/landingpage.logo.png",
  "/strawsmoothy.png",
  "/small.png",
  "/matcha.png,",
  "/logo.png",
  "/lemonade.png",
  "/latteM.png",
  "/cappu.png",
  "/big.png",
  "/home.png",
  "/menu.png",
  "/allergy.png",
  "/checkout.png",
  "/trash.png",
  "/chaiL.png"

];

// Installeer service worker en cache alle bestanden
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

// Activeer service worker en verwijder oude caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
});

// Intercept fetch: eerst cache, anders netwerk
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
