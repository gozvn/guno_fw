require('dotenv').load()
module.exports = {
    host: process.env.APP_API_IP,
    port: process.env.APP_API_PORT,
    ssl: process.env.APP_API_SSL === 'true' ? true : false,
    prefix: process.env.PREFIX_PATH,
    url: process.env.APP_FRONTEND_URL.split(',')[0],
    paths: {
        auth: {
            login: "auth/login",
            logout: "auth/logout",
            social: {
                request: "auth/{SOCIAL_NAME}/request",
                callback: "auth/{SOCIAL_NAME}/callback",
            },
            google: {
                request: "auth/google/request",
                callback: "auth/google/callback",
            },
        },
        core: {
            settings: {
                get: 'core/settings/get'
            }
        },
        user: {
            profile: {
                get: 'user/profile/get',
                update: 'user/profile/update/{FIELD_NAME}'
            }
        },
        administrator: {
            role: {
                list: 'core/role/list',
                checkNameExist: 'core/role/check-name-exist',
                create: 'core/role/create',
                update: 'core/role/{ROLE_ID}/update',
                delete: 'core/role/{ROLE_ID}/delete'
            },
            user: {
                list: 'core/user/list',
                create: 'core/user/create',
                update: 'core/user/{USER_ID}/update',
                reload: 'core/user/{USER_ID}/reload',
                setRole: 'core/user/{USER_ID}/set-role',
                switchUser: 'core/user/switch-user',
                editAvatar: 'core/user/update-avatar'
            },
            route: {
                list: 'core/route/list',
                import: 'core/route/import',
                update: 'core/route/{ROUTE_ID}/update'
            },
            permission: {
                details: 'core/permission',
                set: 'core/permission/set',
                setDomain: 'core/permission/set-domain',
                setExtra: 'core/permission/set-extra',
                setUserRole: 'core/permission/set-role/user'
            }
        }
    }
}
