const settings = require("../../../../../configs/workers/telegram").notification;
const requestService = require("./telegramRequest");

const telegramService = {
    start: async (body) => {
        const path = settings.paths.pushNotification;
        const result = await requestService.post(path, body);
        return result || false;
    }
};

module.exports = telegramService;
