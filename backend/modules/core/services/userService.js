const coreModels = require('../../../configs/models');
const emailService = require('../../core/services/emailService');
const configs = require('../../../configs/configs');
const stringHelper = require('../../../libs/helpers/stringHelper');
const ejs = require("ejs");
const path = require("path");
const bcrypt = require("bcrypt");
const moment = require("moment");
const model = coreModels.User

const userService = {
    cachePrefix: 'CORE_USER_',
    STATUS_ACTIVE: 1,
    filter: async (options, offset, limit) => {
        const where = options
        try {
            const users = model.findAndCountAll({
                where: where,
                limit, offset
            })
            return users;
        } catch (e) {
            return {
                rows: [],
                count: 0
            };
        }
    },
    getById: async (id, status) => {
        let where = {
            id: id
        }
        if (typeof status !== 'undefined' && status >=0) {
            where.status = status
        }

        let user = null,
            data = model.cache === true ? await model.getCache(userService.cachePrefix + where.id) : false;
        if (typeof data.telegramChatId === 'undefined') {
            data = false;
        }
        if (data == false) {
            user = await coreModels.User.findOne({
                where: where
            });
            if (user && model.cache) {
                await model.setCache(userService.cachePrefix + where.id, user)
            }
        } else {
            user = model.build(data, {
                isNewRecord: false
            })
        }
        return user
    },
    reload: async (user) => {
        const keyId = userService.cachePrefix + user.id;
        const keyEmail = userService.cachePrefix + user.email;
        await model.deleteCache(keyId);
        await model.deleteCache(keyEmail);
        return true;
    },
    getByEmail: async (email, status) => {
        let where = {
            email: email
        }
        if (typeof status !== 'undefined') {
            where.status = status
        }

        let user,
            data = model.cache === true ? await model.getCache(userService.cachePrefix + where.email) : false;
        if (typeof data.telegramChatId === 'undefined') {
            data = false;
        }
        if (data == false) {
            user = await coreModels.User.findOne({
                where: where
            });
            if (user && model.cache) {
                await model.setCache(userService.cachePrefix + where.email, user)
            }
        } else {
            user = model.build(data, {
                isNewRecord: false
            })
        }
        return user
    },
    update: async (user, data) => {
        if (model.cache) {
            await model.deleteCache(userService.cachePrefix + user.email);
            await model.deleteCache(userService.cachePrefix + user.id);
        }
        return await user.update(data);
    },
    getAll: async (options) => {
        const where = options
        try {
            const users = model.findAndCountAll({
                where: where,
            })
            return users;
        } catch (e) {
            return {
                rows: [],
                count: 0
            };
        }
    },
    sendOTP: async (args = {
        user: null, path: null
    }) => {
        const user = args.user;

        // generate otp
        const otp = stringHelper.getRandomNumber(6);
        const otpData = []//user.getOtpData();
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(otp, salt);

        otpData.push({
            path: args.path,
            otp: hash,
            expiresTime: moment().unix() + 5 * 60
        });
        await user.update({
            otpData: JSON.stringify(otpData)
        });

        if (model.cache) {
            await model.deleteCache(userService.cachePrefix + user.email);
            await model.deleteCache(userService.cachePrefix + user.id);
        }

        const templateDirPath = path.join(APP_ROOT_DIR, 'templates', configs.app.template)
        //
        const emailSendOTPTemplate = path.join(templateDirPath, 'core/user/email/sendOTP.ejs')
        const html = await ejs.renderFile(emailSendOTPTemplate, { fullName: user.fullName, otp: otp });
        return await emailService.send(user.email, 'Bigdata Adtech - OTP', html, [], []);
    }
}

module.exports = userService
