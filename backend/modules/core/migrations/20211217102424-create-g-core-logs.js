'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('g_core_logs', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            url: {
                type: Sequelize.STRING
            },
            path: {
                type: Sequelize.STRING
            },
            params: {
                type: 'text'
            },
            ip: {
                type: Sequelize.BIGINT(30)
            },
            userId: {
                type: Sequelize.INTEGER
            },
            method: {
                type: Sequelize.STRING
            },
            methodCrc: {
                type: Sequelize.BIGINT(30)
            },
            module: {
                type: Sequelize.STRING
            },
            moduleCrc: {
                type: Sequelize.BIGINT(30)
            },
            controller: {
                type: Sequelize.STRING
            },
            controllerCrc: {
                type: Sequelize.BIGINT(30)
            },
            action: {
                type: Sequelize.STRING
            },
            actionCrc: {
                type: Sequelize.BIGINT(30)
            },
            dataRequest: {
                type: Sequelize.TEXT
            },
            dataResponse: {
                type: Sequelize.TEXT
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('g_core_logs');
    }
};
