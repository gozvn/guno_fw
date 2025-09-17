require('dotenv').load()
module.exports = {
    host: process.env.SOCKET_API_IP,
    port: process.env.SOCKET_API_PORT,
    ssl: process.env.SOCKET_API_SSL === 'true' ? true : false,
    prefix: process.env.SOCKET_PREFIX_PATH,
    paths: {
        emit: {
            shopping: {
                order: {
                    new: 'emit/shopping/order/new'
                }
            }
        }
    }
}
