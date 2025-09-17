const fetch = (...args) =>
    import ('node-fetch').then(({ default: fetch }) => fetch(...args))
const socketAPIConfig = require('../../../configs/socket.api')
const loggerService = require('../../../modules/core/services/loggerService')
const stringHelper = require('../../../libs/helpers/stringHelper')

const socketAPIRequest = {
    _buildUrl: (path) => {
        let host = socketAPIConfig.host,
            port = socketAPIConfig.port,
            ssl = socketAPIConfig.ssl,
            prefix = socketAPIConfig.prefixPath,
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
        let apiUrl = path ? `${url}/${path}` : url
        const auth = socketAPIConfig?.auth ?? false;
        if (auth) {
            switch (auth.in) {
                case 'query':
                    apiUrl += apiUrl.indexOf('?') >= 0 ? `&` : `?`
                    apiUrl += `${auth.key}=${auth.value}`
                    break
            }
        }

        return apiUrl
    },
    get: async(path, headers = {}) => {
        const url = socketAPIRequest._buildUrl(path)
        const options = {
            method: 'GET'
        }

        if (typeof headers !== 'undefined' && headers) {
            for (const i in headers) {
                options.headers[i] = headers[i]
            }
        }
        try {
            const rawResponse = await fetch(url, options);
            const response = await rawResponse.json();
            if (typeof response !== 'object' || rawResponse.status !== 200) {
                console.error(`API URL: ${url}, STATUS CODE: ${rawResponse.status}, Response: ${JSON.stringify(response)}, OPTIONS: ${JSON.stringify(options)}`)
                return false
            }
            return {
                response
            }
        } catch (e) {
            console.error(`Error call get: URL: ${url}, OPTIONS: ${JSON.stringify(options)}, message: ${e.toString()}`)
            return false;
        }
    },
    post: async(path, body, args = {
        accessToken: null
    }, headers) => {
        const url = socketAPIRequest._buildUrl(path)
        const options = {
            method: 'POST',
            url: url,
            body: JSON.stringify(body),
            headers: {'Content-Type': 'application/json'}
        }
        if (typeof headers !== 'undefined' && headers) {
            for (const i in headers) {
                options.headers[i] = headers[i]
            }
        }
        try {
            const rawResponse = await fetch(url, options);
            const response = await rawResponse.json();
            if (typeof response !== 'object' || rawResponse.status !== 200) {
                console.error(`API URL: ${url}, STATUS CODE: ${rawResponse.status}, Response: ${JSON.stringify(response)}, OPTIONS: ${JSON.stringify(options)}`)
                return false
            }
            return {
                response
            }
        } catch (e) {
            console.error(`Error call post: URL: ${url}, OPTIONS: ${JSON.stringify(options)}, message: ${e.toString()}`)
            return false;
        }
    },

    put: async(path, body, args = {
        accessToken: null
    }, headers) => {
        const url = socketAPIRequest._buildUrl(path)
        const options = {
            method: 'PUT',
            url: url,
            body: JSON.stringify(body),
            headers: {'Content-Type': 'application/json'}
        }
        if (typeof headers !== 'undefined' && headers) {
            for (const i in headers) {
                options.headers[i] = headers[i]
            }
        }        

        try {
            const rawResponse = await fetch(url, options);
            const response = await rawResponse.json();
            if (typeof response !== 'object' || rawResponse.status !== 200) {
                console.error(`API URL: ${url}, STATUS CODE: ${rawResponse.status}, Response: ${JSON.stringify(response)}, OPTIONS: ${JSON.stringify(options)}`)
                throw new Error('Response not object')
            }
            return response
        } catch (e) {
            console.error(`Error call post: URL: ${url}, OPTIONS: ${JSON.stringify(options)}, message: ${e.toString()}`)
            throw new Error(e.toString())
        }
    }
}
module.exports = socketAPIRequest;
