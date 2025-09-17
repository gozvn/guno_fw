self.addEventListener('push', function(event) {
    const data = event.data.json();
    const options = {
        body: data.body,
        icon: 'assets/icons/icon-72x72.png',
        image: data.image, // hình ảnh chính trong thông báo
        badge: data.badge, // biểu tượng nhỏ trong thông báo
        actions: data.actions, // các hành động (buttons) trong thông báo
        data: {
            url: data.url
        }
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});
