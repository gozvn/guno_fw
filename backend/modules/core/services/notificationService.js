const configs = require('../../../configs/configs')

let token = configs.notification.token,
    chatId = configs.notification.chatId,
    notificationEnable = configs.notification.enable === 'true' ? true : false,
    appName = configs.app.name;

const notificationService = {
    send: async (message, botName = null, configs = null) => {
        let markup = {};
        if (configs) {
            appName = botName || configs.appName || appName,
            token = configs.token || token,
            chatId = configs.chatId || chatId,
            notificationEnable = configs.enable || notificationEnable;
            markup = configs.markup || markup;
        }
    }
}

module.exports = notificationService
