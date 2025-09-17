const models = require('../../../configs/models');
const logModel = models.Log;

const logService = {
    getById: async (id) => {
        return await logModel.findByPk(id)
    },
    getByUri: async (uri) => {
        return await logModel.findOne({
            where: {
                uriCrc: logModel.sequelize.fn('CRC32', uri)
            }
        })
    },
    create: async (data) => {
        const log = logModel.build(data);
        try {
            log.methodCrc = logModel.sequelize.fn('CRC32', data.method);
            log.moduleCrc = logModel.sequelize.fn('CRC32', data.module);
            log.controllerCrc = logModel.sequelize.fn('CRC32', data.controller);
            log.actionCrc = logModel.sequelize.fn('CRC32', data.action);
            return await log.save();
        } catch (e) {
            return false;
        }
    }
}
module.exports = logService;
