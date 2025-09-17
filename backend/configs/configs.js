require('dotenv').load()
module.exports = {
    app: {
        env: process.env.APP_ENV || 'development',
        name: process.env.APP_NAME || 'App name',
        ruleCheckerMiddlewareDetection: 'ruleCheckerMiddlewaregmsvdr5PNmw3uK9mEVqsFyQRUMStvVJx6qqWbdL4k6pZXGKarHGrz88FYh63y94x',
        frontendUrl: process.env.APP_FRONTEND_URL || '',
        timeout: '300s',
        ssl: {
            isActive: typeof process.env.APP_SSL_ACTIVE !== 'undefined' && process.env.APP_SSL_ACTIVE === 'true' ? true : false,
            port: process.env.APP_SSL_PORT | '',
            key: process.env.APP_SSL_KEY_PATH || '',
            cert: process.env.APP_SSL_CERT_PATH || ''
        },
        template: process.env.APP_TEMPLATE || 'default'
    },
    roles: {
        superAdmin: 1,
        administrator: 2,
        user: 3,
        warehouseManager: 4,
        warehouseStaff: 6,
        accountant: 10,
        livestream: 11,
        productionDepartment: 12
    },
    modules: typeof process.env.APP_MODULES !== 'undefined' ? process.env.APP_MODULES.split(',') : [],
    modules_eco_data_hub: typeof process.env.APP_MODULES_ECO_DATA_HUB !== 'undefined' ? process.env.APP_MODULES_ECO_DATA_HUB.split(',') : [],
    google: {
        isActive: typeof process.env.GOOGLE_RECAPTCHA_ACTIVE !== 'undefined' && process.env.GOOGLE_RECAPTCHA_ACTIVE === 'true' ? true : false,
        recaptchaV3: {
            url: process.env.GOOGLE_RECAPTCHA_URL,
            secretKey: process.env.GOOGLE_RECAPTCHA_V3_SECRET_KEY
        },
        email: {
            extensions: typeof process.env.GOOGLE_EMAIL_EXTENSIONS !== 'undefined' ? process.env.GOOGLE_EMAIL_EXTENSIONS.split(',') : [],
        }
    },
    notification: {
        enable: process.env.NOTIFICATION_ENABLE || false,
        chatId: process.env.NOTIFICATION_CHAT_ID || 'xxx',
        token: process.env.NOTIFICATION_TOKEN || 'xxx',
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'xxx',
        port: process.env.MYSQL_PORT || '3306',
        username: process.env.MYSQL_USER || 'xxx',
        password: process.env.MYSQL_PASSWORD || 'xxx',
        database: process.env.MYSQL_DATABASE || 'xxx'
    },
    logRequest: {
        enabled: process.env.ENABLE_LOG_REQUEST || false
    },
    database: {
        use_env_variable: 'development',
        local: {
            host: process.env.MYSQL_HOST || 'xxx',
            port: process.env.MYSQL_PORT || '3306',
            username: process.env.MYSQL_USER || 'xxx',
            password: process.env.MYSQL_PASSWORD || 'xxx',
            database: process.env.MYSQL_DATABASE || 'xxx',
            dialect: 'mysql',
            timezone: '+07:00',
            logging: console.log
        },
        development: {
            host: process.env.MYSQL_HOST || 'xxx',
            port: process.env.MYSQL_PORT || '3306',
            username: process.env.MYSQL_USER || 'xxx',
            password: process.env.MYSQL_PASSWORD || 'xxx',
            database: process.env.MYSQL_DATABASE || 'xxx',
            dialect: 'mysql',
            timezone: '+07:00',
            logging: console.log,
            // pool: {
            //     max: 10,
            //     min: 0,
            //     acquire: 30000,
            //     idle: 10000
            // }
        },
        test: {
            host: process.env.MYSQL_HOST || 'xxx',
            port: process.env.MYSQL_PORT || '3306',
            username: process.env.MYSQL_USER || 'xxx',
            password: process.env.MYSQL_PASSWORD || 'xxx',
            database: process.env.MYSQL_DATABASE || 'xxx',
            dialect: 'mysql',
            timezone: '+07:00',
            logging: console.log
        },
        production: {
            host: process.env.MYSQL_HOST || 'xxx',
            port: process.env.MYSQL_PORT || '3306',
            username: process.env.MYSQL_USER || 'xxx',
            password: process.env.MYSQL_PASSWORD || 'xxx',
            database: process.env.MYSQL_DATABASE || 'xxx',
            dialect: 'mysql',
            timezone: '+07:00'
        }
    },
    database_eco_data_hub: {
        use_env_variable: 'development', development: {
            host: process.env.MYSQL_ECO_DATA_HUB_HOST || 'xxx',
            port: process.env.MYSQL_ECO_DATA_HUB_PORT || '3306',
            username: process.env.MYSQL_ECO_DATA_HUB_USER || 'xxx',
            password: process.env.MYSQL_ECO_DATA_HUB_PASSWORD || 'xxx',
            database: process.env.MYSQL_ECO_DATA_HUB_DATABASE || 'xxx',
            dialect: 'mysql',
            timezone: '+07:00',
            logging: console.log
        },
        test: {
            host: process.env.MYSQL_ECO_DATA_HUB_HOST || 'xxx',
            port: process.env.MYSQL_ECO_DATA_HUB_PORT || '3306',
            username: process.env.MYSQL_ECO_DATA_HUB_USER || 'xxx',
            password: process.env.MYSQL_ECO_DATA_HUB_PASSWORD || 'xxx',
            database: process.env.MYSQL_ECO_DATA_HUB_DATABASE || 'xxx',
            dialect: 'mysql',
            timezone: '+07:00',
            logging: console.log
        },
        production: {
            host: process.env.MYSQL_ECO_DATA_HUB_HOST || 'xxx',
            port: process.env.MYSQL_ECO_DATA_HUB_PORT || '3306',
            username: process.env.MYSQL_ECO_DATA_HUB_USER || 'xxx',
            password: process.env.MYSQL_ECO_DATA_HUB_PASSWORD || 'xxx',
            database: process.env.MYSQL_ECO_DATA_HUB_DATABASE || 'xxx',
            dialect: 'mysql',
            timezone: '+07:00'
        }
    },
    redis: {
        cache: {
            host: process.env.REDIS_CACHE_HOST || 'xxx',
            port: process.env.REDIS_CACHE_PORT || 'xxx',
            auth: typeof process.env.REDIS_CACHE_AUTH !== 'undefined' ? process.env.REDIS_CACHE_AUTH : 'xxx',
            db: process.env.REDIS_CACHE_DB || 'xxx'
        },
        queue: {
            host: process.env.REDIS_CACHE_HOST || 'xxx',
            port: process.env.REDIS_CACHE_PORT || 'xxx',
            auth: typeof process.env.REDIS_CACHE_AUTH !== 'undefined' ? process.env.REDIS_CACHE_AUTH : 'xxx',
            db: process.env.REDIS_CACHE_DB || 'xxx'
        }
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'xxx',
        algorithm: process.env.JWT_ALGORITHM || 'xxx',
        ttl: process.env.JWT_TTL || 30 * 24 * 60 * 60, // default: 30 days
        secret_refresh: process.env.JWT_SECRET_REFRESH || 'xxx',
        algorithm_refresh: process.env.JWT_ALGORITHM_REFRESH || 'xxx',
        ttl_refresh: '90d'
    },
    auth: {
        basic: {
            users: {
                [process.env.AUTH_BASIC_USERNAME]: process.env.AUTH_BASIC_PASSWORD
            },
            challenge: true,
            realm: 'foo'
        },
        encrypt: {
            algorithm: process.env.ENCRYPT_ALGORITHM || 'aes-256-ctr',
            secretKey: process.env.ENCRYPT_SECRET_KEY || 'xxx',
        },
        data: {
            apiKey: {
                key: process.env.AUTH_DATA_API_KEY_NAME || 'x-data-api-key',
                value: process.env.AUTH_WEBHOOK_API_KEY_VALUE || 'xxx'
            }
        },
        webhook: {
            apiKey: {
                key: process.env.AUTH_WEBHOOK_API_KEY_NAME || 'x-webhook-api-key',
                value: process.env.AUTH_WEBHOOK_API_KEY_VALUE || 'xxx'
            }
        }
    },
    email: {
        service: process.env.EMAIL_TYPE,
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: process.env.EMAIL_SECURE,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        },
        from: process.env.EMAIL_FROM,
        from_name: process.env.EMAIL_FROM_NAME,
        cc: typeof process.env.EMAIL_CC !== 'undefined' ? process.env.EMAIL_CC.split(',') : null,
        bcc: typeof process.env.EMAIL_BCC !== 'undefined' ? process.env.EMAIL_BCC.split(',') : null
    },
    storage: {
        upload: {
            tmp: {
                path: 'storage/uploads/tmp'
            }, path: 'storage/uploads'
        }
    },
    web: {
        rsa: {
            isActive: typeof process.env.WEB_RSA_IS_ACTIVE !== 'undefined' && process.env.WEB_RSA_IS_ACTIVE === 'true' ? true : false,
            privateKey: typeof process.env.WEB_RSA_PRIVATE_KEY !== 'undefined' ? process.env.WEB_RSA_PRIVATE_KEY.replace(/\\n/g, '\n') : null,
            publicKey: typeof process.env.WEB_RSA_PUBLIC_KEY !== 'undefined' ? process.env.WEB_RSA_PUBLIC_KEY.replace(/\\n/g, '\n') : null
        }
    },
    social: {
        google: {
            appID: process.env.GOOGLE_APP_CLIENT_ID,
            appSecret: process.env.GOOGLE_APP_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL
        }
    }
}
