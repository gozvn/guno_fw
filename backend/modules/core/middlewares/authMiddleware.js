const jwtHelper = require('../helpers/jwtHelper')

module.exports = async (req, res, next) => {
    await jwtHelper.verifyAccessToken(req, res, next)
}
