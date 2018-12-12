self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('myCache').then(function(cache) {
        return cache.addAll([
          './js/main.js',
          './index.html',
          './css/styles.css',
          './js/dbhelper.js',
          './js/restaurant_info.js',
          './restaurant.html'
        ]);
      })
    );
  });

  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(resp) {
        return resp || fetch(event.request).then(function(response) {
          let responseClone = response.clone();
          caches.open('myCache').then(function(cache) {
            cache.put(event.request, responseClone);
          });
  
          return response;
        });
      }).catch(function() {
        alert("Error loading content from cache");
      })
    );
  });