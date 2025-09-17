const fetch = (...args) =>
    import ('node-fetch').then(({ default: fetch }) => fetch(...args))
const loggerService = require("../../../core/services/loggerService");
const facebookTokenInfoService = {
    get: async (authToken) => {
        const url = `https://graph.facebook.com/me?fields=id,name,email&access_token=${authToken}`;
        const options = {
            method: 'GET'
        }
        try {
            loggerService.info(`CALL FACEBOOK API URL: ${url}, OPTIONS: ${JSON.stringify(options)}`)
            const rawResponse = await fetch(url, options);
            const response = await rawResponse.json();
            return typeof rawResponse.status !== 200 ? response : false;
        } catch (e) {
            loggerService.error(`Error call get: URL: ${url}, OPTIONS: ${JSON.stringify(options)}, message: ${e.toString()}`)
            return false;
        }
    }
}

module.exports = facebookTokenInfoService;
