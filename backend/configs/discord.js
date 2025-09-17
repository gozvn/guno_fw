require('dotenv').load()
module.exports = {
    bot: {
        enable: typeof process.env.DISCORD_BOT_PUSH_NOTIFICATION_ENABLED !== 'undefined' && process.env.DISCORD_BOT_PUSH_NOTIFICATION_ENABLED === 'true' ? true : false,
        appName: 'GUNO Hub',
        chatId: process.env.DISCORD_NOTIFY_CHANNEL_ID || '',
        token: process.env.DISCORD_BOT_TOKEN || ''
    },
    botError: {
        enable: typeof process.env.DISCORD_BOT_PUSH_NOTIFICATION_ENABLED !== 'undefined' && process.env.DISCORD_BOT_PUSH_NOTIFICATION_ENABLED === 'true' ? true : false,
        appName: 'GUNO Hub',
        chatId: process.env.DISCORD_ERROR_CHANNEL_ID || '',
        token: process.env.DISCORD_BOT_TOKEN || ''
    }
}
