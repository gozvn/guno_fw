require('dotenv').load()
module.exports = {
    host: process.env.SHOPEE_APP_PARTNER_HOST,
    port: 443,
    ssl: true,
    version: '2',
    partnerId: process.env.SHOPEE_APP_PARTNER_ID || '',
    partnerKey: process.env.SHOPEE_APP_PARTNER_KEY || '',
    returnURL: process.env.SHOPEE_APP_RETURN_URL || '',
    prefixPath: 'api/v2',
    paths: {
        auth: {
            token: {
                get: 'auth/token/get'
            },
            accessToken: {
                get: 'auth/access_token/get'
            }
        },
        shop: {
            authPartner: 'shop/auth_partner'
        },
        order: {
            list: 'order/get_order_list',
            detail: 'order/get_order_detail'
        }
    }
}
