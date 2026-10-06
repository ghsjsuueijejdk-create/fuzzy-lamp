var C='derbi-v2',A=['./','index.html','manifest.json','icon-192.png','icon-512.png'];
self.addEventListener('install',function(e){self.skipWaiting();e.waitUntil(caches.open(C).then(function(c){return c.addAll(A)}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n!==C}).map(function(n){return caches.delete(n)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){var r=e.request;if(r.method!=='GET')return;
 if(r.mode==='navigate'){e.respondWith(fetch(r,{cache:'no-cache'}).then(function(x){var y=x.clone();caches.open(C).then(function(c){c.put(r,y)});return x}).catch(function(){return caches.match(r).then(function(m){return m||caches.match('index.html')})}));return}
 e.respondWith(caches.match(r).then(function(m){return m||fetch(r).then(function(x){if(x.ok){var y=x.clone();caches.open(C).then(function(c){c.put(r,y)})}return x})}))});
