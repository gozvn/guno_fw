const settings = require("../../../../../configs/workers/send-email");
const requestService = require("./requestService");

const sendEmailService = {
    start: async (body) => {
        const path = settings.paths.send;
        const result = await requestService.post(path, body);
        return result || false;
    }
};

module.exports = sendEmailService;
