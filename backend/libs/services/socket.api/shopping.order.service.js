const socketAPIConfig = require('../../../configs/socket.api')
const stringHelper = require('../../../libs/helpers/stringHelper')
const requestService = require('./request.service')
const utilsHelper = require('../../../libs/helpers/utilsHelper');

const shoppingOrderService = {
    new: async (orderData) => {
        const path = socketAPIConfig.paths.emit.shopping.order.new
        const results = await requestService.post(path, orderData)
        return results?.response?.data ?? false;
    }
}

module.exports = shoppingOrderService;
