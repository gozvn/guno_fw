'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('g_core_configs', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            key: {
                type: 'varchar(50)'
            },
            keyCrc: {
                type: Sequelize.BIGINT(30)
            },
            value: {
                type: 'text'
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
        }, { charset: 'utf8', collate: 'utf8_unicode_ci' }).then(() => {
            return queryInterface.addIndex('g_core_configs', {
                name: 'idx_config_key',
                fields: ['keyCrc'],
                unique: true
            })
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('g_core_configs');
    }
};
