const jwt = require('jsonwebtoken')
const configs = require('../../../configs/configs');
const stringHelper = require('../../../libs/helpers/stringHelper');
const userService = require('../../core/services/userService');
const roleService = require('../../core/services/roleService');
const userAccessTokenService = require('../../core/services/userAccessTokenService');
const moment = require("moment");

module.exports = {
    signAccessToken: async (user, deviceInfo = null) => {
        const iat = Math.floor(Date.now() / 1000);
        const exp = parseInt(configs.jwt.ttl)
        // create user access token
        const userAccessToken = await userAccessTokenService.create({
            userId: user.id,
            createdDate: moment().format('YYYY-MM-DD HH:mm:ss'),
            expiredDate: moment().add(exp, 'seconds').format('YYYY-MM-DD HH:mm:ss'),
            data: {
                useAgent: deviceInfo ? deviceInfo.userAgent : '', ip: deviceInfo ? deviceInfo.ip : ''
            },
            lifetime: exp
        });

        const secret = configs.jwt.secret;
        const payload = {
            iat: Math.floor(Date.now() / 1000),
            id: user.id,
            tokenId: stringHelper.uuid.fromBinary(userAccessToken.id),
            userId: user.userId,
            roleId: user.roleId,
            username: user.username,
            exp: parseInt(Math.round(new Date().getTime() / 1000)) + parseInt(configs.jwt.ttl)
        }

        return jwt.sign(payload, secret, {
            issuer: configs.app.name,
            algorithm: configs.jwt.algorithm
        })
    },
    verifyAccessToken: async (req, res, next) => {
        try {
            let token = req.header("Authorization");
            token = typeof token !== 'undefined' && token.indexOf('Bearer') >= 0 ? token.split(' ')[1]
                : (typeof req.query.token !== 'undefined' ? req.query.token : false)
            token = token ? token : (req.cookies && req.cookies['__app-AUTH-TOKEN'] || false)

            if (!token) return next(res.status(401).json({
                status: 0,
                code: 401,
                message: "Not Authorization"
            }))
            try {
                const decoded = jwt.verify(token, configs.jwt.secret);
                const user = await userService.getById(decoded.id);
                const role = user && user.roleId > 0 ? await roleService.getById(user.roleId) : false;

                const userAccessToken = typeof decoded.tokenId !== 'undefined' ? await userAccessTokenService.getById(decoded.tokenId) : false;
                if (!userAccessToken || userAccessToken.status !== userAccessTokenService.status.activated || !user || user.status !== 1 || !role || role.status !== 1) {
                    return  next(res.status(401).json({
                        status: 0,
                        code: 401,
                        message: 'Invalid token'
                    }));
                }

                req.userModel = user;
                req.roleModel = role;
                req.user = {
                    id: user.id,
                    email: user.email,
                    roleId: user.roleId,
                    fullName: user.fullName,
                    avatar: user.avatar,
                    password: user.password,
                    telegramChatId: user.telegramChatId,
                    departmentId: user.departmentId
                };
                req.token = token;
                next();
            } catch (e) {
                next(res.status(401).json({
                    status: 0,
                    code: 401,
                    message: 'Invalid token'
                }))
            }
        } catch (error) {
            next(res.status(401).json({
                status: 0,
                code: 401,
                message: 'Error Authorization'
            }));
        }
    },
    signRefreshToken: async (user) => {
        const secret = configs.jwt.secret_refresh
        const payload = {
            iat: Math.floor(Date.now() / 1000),
            id: user.userId,
            roleId: user.roleId,
            username: user.username,
        }

        return jwt.sign(payload, secret, {
            issuer: configs.app.name,
            //algorithm: configs.jwt.algorithm_refresh,
            expiresIn: configs.jwt.ttl_refresh
        })
    },
    verifyRefreshToken: (refreshToken) => {
        let payload = null
        try {
            const decoded = jwt.verify(refreshToken, configs.jwt.secret_refresh);
            payload = decoded
        } catch (e) {

        }

        return payload
    },
    verifyToken: (token) => {
        const decoded = jwt.verify(token, configs.jwt.secret);
        return decoded;
    },
    decodeToken: (token) => {
        try {
            return jwt.decode(token);
        } catch (e) {

        }

        return null;
    },
    signWithPayload: (payload, secretKey) => {
        return jwt.sign(payload, secretKey);
    }
}
