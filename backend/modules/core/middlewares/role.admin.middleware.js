const configs = require('../../../configs/configs');
module.exports = async (req, res, next) => {
    const user = req.user;
    if (!user || [configs.roles.superAdmin, configs.roles.admin].indexOf(user.roleId) < 0) {
        return res.status(403).json({
            status: 0,
            code: 403,
            message: 'accessDenied'
        }).end()
    }
    next();
}
