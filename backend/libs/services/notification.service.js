const DiscordProvider = require("../notifications/providers/discord.provider");

class NotificationService {
    constructor(providers = []) {
        this.providers = providers;
    }

    async notify(message) {
        try {
            if (this.providers.length) {
                await Promise.all(
                    this.providers.map((provider) => provider.send(message))
                );

                return true;
            }

            let notifier = null;
            const providerName = process.env.NOTIFICATION_PROVIDER ?? '';
            switch (providerName.toLowerCase()) {
                case 'discord':
                    notifier = new DiscordProvider();
                    break;
            }

            if (!notifier) {
                return false;
            }

            return await notifier.send(message);
        } catch (e) {
            console.error(__dirname, e);
            return false;
        }
    }
}

module.exports = NotificationService;
