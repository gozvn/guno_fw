const StrategyFactory = require("../factories/strategyFactory");
const authService = require("../services/authService");
const response = require("../../../libs/core/response");
const configs = require("../../../configs/configs");
const NotificationService = require("../../../libs/services/notification.service");
const facebookTokenInfoService = require('../services/facebook/token.info.service');
const googleTokenInfoService = require('../services/google/token.info.service');

module.exports = {
    login: async (req, res) => {
        const data = req.body;
        const provider = data?.provider;
        let userInfo = null;

        switch (provider.toLowerCase()) {
            case 'facebook':
                userInfo = await facebookTokenInfoService.get(data.authToken);
                break;
            case 'google':
                userInfo = await googleTokenInfoService.get(data.authToken);
                break;
        }
        if (!userInfo) {
            return response.jsonEncrypt(req, res,{
                status: 0,
                code: 400,
                message: 'get_user_info_error'
            });
        }

        userInfo.fullName = userInfo.name;
        userInfo.avatar = data.photoUrl;
        let resultData = {};
        try {
            const headers = req.headers;
            const deviceInfo = {
                id: headers['device-id'] || null,
                userAgent: headers['user-agent'],
                ip: headers['x-forwarded-for'] || req.socket.remoteAddress || null
            }
            const user = await authService.getAccessToken(userInfo, deviceInfo);
            resultData = {
                status: 1,
                code: 200,
                data: {
                    user
                }
            };
        } catch (e) {
            resultData = {
                status: 0,
                code: 500
            };
        }
        return response.jsonEncrypt(req, res, resultData);
    },
    request: async (req, res) => {
        const strategy = StrategyFactory.createStrategy(req.params.provider);
        return strategy.request(req, res);
    },

    callback: async (req, res) => {
        const strategy = StrategyFactory.createStrategy(req.params.provider);
        strategy.callback(req, res, async (result) => {
            let resultData = {};
            if (result.error !== false) {
                return response.jsonEncrypt(req, res,{
                    status: 0,
                    code: 400,
                    message: 'Bad Request'
                });
            }
            const email = result.data?.email ?? '';
            const extension = email ? email.split('@') : null;
            if (!email || !extension || extension.length < 1
                || (configs.google.email.extensions.indexOf(extension[1]) < 0) && configs.vccloud.emailExtensions.indexOf(extension[1]) < 0) {
                return response.jsonEncrypt(req, res,{
                    status: 0,
                    code: 403,
                    message: 'Email not allowed'
                });
            }

            try {
                const headers = req.headers;
                const deviceInfo = {
                    userAgent: headers['user-agent'],
                    ip: headers['x-forwarded-for'] || req.socket.remoteAddress || null
                }
                const user = await authService.getAccessToken(result.data, deviceInfo);
                resultData = {
                    status: 1,
                    code: 200,
                    data: {
                        user
                    }
                };

                // NotificationService
                const notificationService = new NotificationService();
                await notificationService.notify(`**${user.email} vừa đăng nhập vào hệ thống.**\n- Environment: ${configs.app.env}\n- IP ${deviceInfo.ip}\n- User-Agent: ${deviceInfo.userAgent}`);
            } catch (e) {
                console.log(e)
                resultData = {
                    status: 0,
                    code: 500
                };
            }

            return response.jsonEncrypt(req, res, resultData);
        });
    }
}
