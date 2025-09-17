'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('g_core_users_access_tokens', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: 'BINARY(16)'
            },
            userId: {
                type: 'int(32)'
            },
            data: {
                type: 'text'
            },
            status: {
                type:   Sequelize.ENUM,
                values: ['activated', 'blocked'],
                defaultValue: 'activated'
            },
            createdDate: {
                allowNull: false,
                type: Sequelize.DATE
            },
            expiredDate: {
                allowNull: false,
                type: Sequelize.DATE
            },
            lifetime: {
                type: 'int(32)',
                defaultValue: 0
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        }, {charset: 'utf8', collate: 'utf8_unicode_ci'});
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('g_core_users_access_tokens');
    }
};
