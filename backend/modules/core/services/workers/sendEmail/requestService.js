const fetch = (...args) =>
    import ('node-fetch').then(({ default: fetch }) => fetch(...args));
const stringHelper = require('../../../../../libs/helpers/stringHelper');
const configs = require('../../../../../configs/workers/send-email');

const requestService = {
    _buildUrl: (path) => {
        let host = configs.host,
            port = configs.port,
            ssl = configs.ssl,
            prefix = configs.prefixPath,
            url = ''
        port = port != 80 ? `:${port}` : ''
        if (ssl == true) {
            url = stringHelper.sprintf([`https://%s`, host])
            url += prefix ? `/${prefix}` : ''
        } else {
            url = stringHelper.sprintf([`http://%s`, host])
            url += port
            url += prefix ? `/${prefix}` : ''
        }
        let apiUrl = path ? `${url}/${path}` : url,
            headers = {}
        return {
            url: apiUrl,
            headers: headers
        }
    },
    get: async(path, headers = {}) => {
        const urlInfo = requestService._buildUrl(path);
        const url = urlInfo.url;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }

        if (typeof urlInfo.headers !== 'undefined' && urlInfo.headers) {
            for (const i in urlInfo.headers) {
                options.headers[i] = urlInfo.headers[i]
            }
        }
        if (typeof headers !== 'undefined' && headers) {
            for (const i in headers) {
                options.headers[i] = headers[i]
            }
        }
        try {
            const rawResponse = await fetch(url, options);
            const response = await rawResponse.json();
            if (typeof response !== 'object' || response.success !== true) {
                return false
            }
            return response.data.result;
        } catch (e) {
            return false;
        }
    },
    post: async(path, body, headers = {}) => {
        const urlInfo = requestService._buildUrl(path);
        const url = urlInfo.url;
        const options = {
            method: 'POST',
            url: url,
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }
        if (typeof urlInfo.headers !== 'undefined' && urlInfo.headers) {
            for (const i in urlInfo.headers) {
                options.headers[i] = urlInfo.headers[i]
            }
        }
        if (typeof headers !== 'undefined' && headers) {
            for (const i in headers) {
                options.headers[i] = headers[i]
            }
        }
        try {
            const rawResponse = await fetch(url, options);
            const response = await rawResponse.json();
            if (typeof response !== 'object' || response.success !== true) {
                return false
            }
            return response.data;
        } catch (e) {
            console.log(`ERROR: requestService: ${url} - ${JSON.stringify(e)}`);
            return false;
        }
    }
}
module.exports = requestService;
