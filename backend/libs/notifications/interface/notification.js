class Notification {
    async send(message) {
        throw new Error('send() must be implemented by subclass');
    }
}

module.exports = Notification;
