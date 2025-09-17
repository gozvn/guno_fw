const ruleService = require("./ruleService");
const routeService = require("./routerService");

module.exports = {
    getByUser: async (user) => {
        try {
            const userId = user.id;
            const roleId = user.roleId;
            const routeRules = [];
            const allRules = await ruleService.getAll();

            // filters
            const allowRules = allRules.filter(e => {
                return (e.objectType === 'user' && e.objectId === userId)
                    || (e.objectType === 'role' && e.objectId === roleId)
            });
            // find some rules
            const deniedRulesByUser = allRules.filter(e => {
                return (e.objectType === 'user' && e.objectId === userId && e.allow === 0)
            });
            const allowedRulesByUser = allRules.filter(e => {
                return (e.objectType === 'user' && e.objectId === userId && e.allow === 1)
            });
            let filterRules = allowRules.filter(e => {
                let index = deniedRulesByUser.findIndex(item => {
                    return e.route === item.route;
                });
                index = index === -1 ? allowedRulesByUser.findIndex(item => {
                    return e.route === item.route;
                }) : index;
                return index === -1 ? true : false;
            });

            if (typeof filterRules !== 'undefined') {
                filterRules = [...filterRules, ...allowedRulesByUser, ...deniedRulesByUser];
                for (const i in filterRules) {
                    let allow = 0,
                        type = filterRules[i].objectType;
                    if (filterRules[i].routeId + '' === 'null' || filterRules[i].allow === 1) {
                        allow = 1;
                    }

                    if (allow !== 1) {
                        continue;
                    }

                    routeRules.push({
                        id: filterRules[i].id,
                        //name: routesDb.routes[i].name,
                        route: filterRules[i].route,
                        //uri: routesDb.routes[i].uri,
                        allow: allow === 1 ? true : false,
                        type: filterRules[i].objectType
                    })
                }
            }
            return routeRules;
        } catch (e) {
            console.log('', JSON.stringify(e));
            return false;
        }
    }
}
