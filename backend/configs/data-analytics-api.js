require('dotenv').load()
module.exports = {
    host: '103.97.125.92',
    port: 8081,
    ssl: false,
    prefixPath: '',
    paths: {
        reportingManager: {
            dynamic: {
                generate: 'report-mgmt/dynamic/generate'
            },
            static: {
                revenue: {
                    source: {
                        generate: 'report-mgmt/static/revenue/source/generate'
                    }
                }
            }
        }
    }
}
