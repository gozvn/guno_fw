require('dotenv').load()
module.exports = {
    host: 'n8n.guno.club',
    port: 443,
    ssl: true,
    prefixPath: '',
    auth: {
        key: process.env.AUTH_N8N_WEBHOOK_API_KEY_NAME || '',
        value: process.env.AUTH_N8N_WEBHOOK_API_KEY_VALUE || ''
    },
    paths: {
        webhook: {
            zalo: {
                cskh: {
                    delayGiaoHang: 'webhook/zalo/cskh/guno-delay-orders-tracking'
                },
                mkt: {
                    livestream: 'webhook/zalo/mkt/guno-livestream-daily-session-report'
                },
                stats: {
                    top: 'webhook/zalo/stats/top'
                }
            },
            hubGunoStore: {
                pancake: 'webhook/hub-guno-store/pancake/webhook'
            }
        }
    }
}
