const models = require('../../../configs/models');
const { redisCache } = require('../../../libs/cache/redisCache')
const userService = require('../services/userService');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const KEY_ALL_RULES = 'CORE:RULE:all_rules';
const RULE_EXPIRE_TIME = 30 * 24 * 60 * 60;
const ROLE_SUPER_ADMIN = 1;
const ROLE_ADMIN = 2;
const ROLE_USER = 3;

const ruleService = {
    ROLE_SUPER_ADMIN, ROLE_ADMIN, ROLE_USER,

    getRoleSuperAdmin: () => {
      return ROLE_SUPER_ADMIN;
    },
    getRoleAdmin: () => {
        return ROLE_ADMIN;
    },
    canQueryAll: (user) => {
        return user.roleId == ROLE_SUPER_ADMIN || user.roleId == ROLE_ADMIN
    },
    canAccess: async (user, route) => {
        //if (user.roleId == ROLE_SUPER_ADMIN || user.roleId == ROLE_ADMIN || user.roleId == ROLE_NORMAL_USER) {
        if (user.roleId === ROLE_SUPER_ADMIN) {
            return true
        }
        const rulesFormat = await ruleService.getFormats();
        const keyRole = `role_${user.roleId}_${route.id}`
        const keyUser = `user_${user.id}_${route.id}`

        let userAccess = null,
            roleAccess = null
        // check user access
        if (typeof rulesFormat[keyUser] !== 'undefined' && rulesFormat[keyUser] == 1) {
            userAccess = true
        } else if (typeof rulesFormat[keyUser] !== 'undefined' && rulesFormat[keyUser] == 0) {
            userAccess = false
        }
        // check role access
        if (typeof rulesFormat[keyRole] !== 'undefined' && rulesFormat[keyRole] == 1) {
            roleAccess = true
        } else if (typeof rulesFormat[keyRole] !== 'undefined' && rulesFormat[keyRole] == 0) {
            roleAccess = false
        }
        return userAccess === true || (userAccess === null && roleAccess === true) ? true : false
    },
    getFormats: async () => {
        const rules = await ruleService.getAll()
        const results = [];
        for (const rule of rules) {
            let key = `${rule.objectType}_${rule.objectId}_${rule.routeId}`
            results[key] = rule.allow
        }
        return results
    },
    getAll: async (reset = false) => {
        const cache = await redisCache.get(KEY_ALL_RULES)
        let rules = []
        if (reset || cache == null) {
            const data = await models.CoreRule.findAll({
                include: models.Route
            })
            for (const i in data) {
                const dataValues = {
                    id: data[i].dataValues.id,
                    objectId: data[i].dataValues.objectId,
                    objectType: data[i].dataValues.objectType,
                    routeId: data[i].dataValues.routeId,
                    allow: data[i].dataValues.allow
                };
                const route = data[i].Route;
                if (route) {
                    dataValues.route = route.route;
                    rules.push(dataValues)
                }
            }
           await redisCache.set(KEY_ALL_RULES, JSON.stringify(rules), RULE_EXPIRE_TIME)
        } else {
            rules = JSON.parse(cache)
        }
        return rules;
    },
    getByObject: async (objectType, objectId) => {
        const routeRules = [];
        const allRules = await ruleService.getAll();
        let user;
        switch (objectType.toLowerCase()) {
            case 'role':
                break
            case 'user':
                user = await userService.getById(objectId);
                break
        }

        // filters
        const allowRules = allRules.filter(e => {
            return (e.objectType === objectType && e.objectId === objectId)
                || (user && e.objectType === 'role' && e.objectId === user.roleId)
        });
        // find some rules
        const deniedRulesByObject = allRules.filter(e => {
            return (e.objectType === objectType && e.objectId === objectId && e.allow === 0)
        });
        const allowedRulesByObject = allRules.filter(e => {
            return (e.objectType === objectType && e.objectId === objectId && e.allow === 1)
        });
        let filterRules = allowRules.filter(e => {
            let index = deniedRulesByObject.findIndex(item => {
                return e.route === item.route;
            });
            index = index === -1 ? allowedRulesByObject.findIndex(item => {
                return e.route === item.route;
            }) : index;
            return index === -1 ? true : false;
        });

        if (typeof filterRules !== 'undefined') {
            filterRules = [...filterRules, ...allowedRulesByObject, ...deniedRulesByObject];
            for (const i in filterRules) {
                let allow = 0,
                    type = filterRules[i].objectType;
                if (filterRules[i].routeId + '' === 'null' || filterRules[i].allow === 1) {
                    allow = 1;
                }
                routeRules.push({
                    id: filterRules[i].id,
                    routeId: filterRules[i].routeId,
                    //name: routesDb.routes[i].name,
                    route: filterRules[i].route,
                    //uri: routesDb.routes[i].uri,
                    allow: allow,
                    type: type
                })
            }
        }
        return routeRules;
        //


        let condition = {
            objectType: objectType,
            objectId: objectId
        }
        switch (objectType.toLowerCase()) {
            case 'role':
                break
            case 'user':
                const user = await userService.getById(objectId);
                condition = {
                    [Op.or]: [{
                        objectType: objectType,
                        objectId: objectId
                    }, {
                        objectType: 'role',
                        objectId: user.roleId
                    }]
                }
                break
        }

        return await models.CoreRule.findAll({
            where: condition
        })
    },
    getByRoute: async (objectType, objectId, route) => {
        return await models.CoreRule.findOne({
            where: {
                objectType: objectType,
                objectId: objectId,
                routeId: route.id
            }
        })
    },
    set: async (objectType, objectId, route, allow) => {
        const exists = await ruleService.getByRoute(objectType, objectId, route);

        if (exists) {
            return await exists.update({
                allow: allow == true ? 1 : 0
            })
        }

        const rule = models.CoreRule.build({
            objectType: objectType,
            objectId: objectId,
            routeId: route.id,
            allow: allow == true ? 1 : 0
        })

        return await rule.save()
    },
    deleteByRouteId: async (routeId) => {
        const result = await models.CoreRule.destroy({
            where: {
                routeId: routeId
            }
        });

        // reset cache
        await ruleService.getAll(true);
        return result;
    }
}

module.exports = ruleService
