
// importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js");
var cacheStorageKey = 'minimal-pwa-1'
var cacheList=[
	'/',
	'index.html',
	'main.css',
	'zumeng.png'
]
self.addEventListener('install',e =>{
	e.waitUntil(
		caches.open(cacheStorageKey)
			.then((cache) => {
				cache.addAll(cacheList)
			})
			.then(() => {
				console.log("install")
				self.skipWaiting()
			})
	)
})

self.addEventListener('fetch',function(e){
	e.respondWith(
		caches.match(e.request).then(function(response){
			if(response != null){
				return response
			}
			return fetch(e.request.url)
		})
	)
})
self.addEventListener('activate',function(e){
	e.waitUntil(
		//��ȡ����cache����
		caches.keys().then(cacheNames => {
			return Promise.all(
				// ��ȡ���в�ͬ�ڵ�ǰ�汾����cache�µ�����
				cacheNames.filter(cacheNames => {
					return cacheNames !== cacheStorageKey
				}).map(cacheNames => {
					return caches.delete(cacheNames)
				})
			)
		}).then(() => {
			return self.clients.claim()
		})
	)
})
self.addEventListener('notificationclick', event => {
	let clickedNotification = event.notification;
	clickedNotification.close();
	
	// ִ��ĳЩ�첽�������ȴ������
	let promiseChain = doSomething();
	event.waitUntil(promiseChain);
});