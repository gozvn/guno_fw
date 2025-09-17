const ruleService = require('../services/ruleService')
const routeService = require('../services/routerService')

module.exports = async (req, res, next) => {
    // ruleCheckerMiddlewaregmsvdr5PNmw3uK9mEVqsFyQRUMStvVJx6qqWbdL4k6pZXGKarHGrz88FYh63y94x
    const route = req.route || null
    const routePath = route ? route.path : null
    try {
        const user = req.user
        if (typeof user == 'undefined') {
            return res.status(401).json({
                status: 0,
                code: 401,
                message: "Not Authorization."
            });
        }

        const allRoutesDb = await routeService.getAllDB();
        const dbRoute = allRoutesDb.find(e => e.uri === routePath);
        if (typeof dbRoute === 'undefined') {
            return next()
        }
        const canAccess = dbRoute == null ? true : await ruleService.canAccess(user, dbRoute);
        if (canAccess !== true) {
            return res.status(403).json({
                status: 0,
                code: 403,
                messages: ["Access denied!"]
            }).end();
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: 0,
            code: 400,
            messages: ["Bad request: rule checker middleware"]
        }).end();
    }
}
