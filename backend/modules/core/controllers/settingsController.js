const {validationResult} = require("express-validator");
const settingsService = require('../services/settingsService');
const response = require("../../../libs/core/response");
const frontendAPIConfigs = require("../../../configs/frontend.api.configs");

module.exports = {
    get: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 0,
                code: 400,
                errors: errors.array()
            })
        }

        const user = req.user;
        const userModel = req.userModel;
        const routes = await settingsService.getByUser(user);

        return response.jsonEncrypt(req, res, {
            status: 1,
            message: 'ok',
            code: 200,
            decrypt: false,
            data: {
                routes: routes,
                user: user ? {
                    userId: user.id,
                    email: user.email,
                    fullName: user.fullName,
                    avatar: user.avatar,
                    roleId: user.roleId ? parseInt(user.roleId) : null,
                    departmentId: user.departmentId ? parseInt(user.departmentId) : null,
                    canChangePassword: user.password ? true : false,
                    telegramChatId: user.telegramChatId,
                    ext: userModel.getExt()
                } : null,
                apiConfigs: user ? frontendAPIConfigs : null
            }
        });
    }
}
