// notifiers/DiscordNotifier.js
const fetch = (...args) =>
    import ('node-fetch').then(({ default: fetch }) => fetch(...args));
const configs = require('../../../configs/discord');
const Notification = require('../interface/notification');

class DiscordProvider extends Notification {
    constructor(appName = null, token = null, chatId = null) {
        super();
        this.appName = appName ?? configs.bot.appName;
        this.token = appName ?? configs.bot.token;
        this.chatId = appName ?? configs.bot.chatId;
    }

    async send(message) {
        if (!this.chatId || !this.token || !message) {
            return false;
        }

        try {
            const url = `https://discord.com/api/v10/channels/${this.chatId}/messages`;
            const body = {
                content: message
            }
            const options = {
                method: 'POST',
                url: url,
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bot ${this.token}`
                }
            }
            const rawResponse = await fetch(url, options);
            return rawResponse.status === 200 ? true : false;
        } catch (e) {
            console.log('Error', __dirname, e)
            return false;
        }
    }
}

module.exports = DiscordProvider;
