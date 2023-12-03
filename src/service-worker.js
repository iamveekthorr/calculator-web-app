self.addEventListener('install', (installEvent) => {
  installEvent.waitUntil(
    caches.open('calculator-app-v1').then((cache) => {
      console.log(cache);
    })
  );
});

self.addEventListener('fetch', (fetchEvent) => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((res) => {
      return res || fetch(fetchEvent.request);
    })
  );
});
