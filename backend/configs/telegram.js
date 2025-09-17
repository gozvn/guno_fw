require('dotenv').load()
module.exports = {
    bot: {
        enable: typeof process.env.TELEGRAM_BOT_PUSH_NOTIFICATION_ENABLED !== 'undefined' && process.env.TELEGRAM_BOT_PUSH_NOTIFICATION_ENABLED === 'true' ? true : false,
        appName: 'PM',
        chatId: process.env.TELEGRAM_BOT_PUSH_NOTIFICATION_CHAT_ID || '',
        token: process.env.TELEGRAM_BOT_PUSH_NOTIFICATION_BOT_TOKEN || ''
    }
}
