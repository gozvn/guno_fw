'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('g_core_roles', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER(11)
            },
            name: {
                type: Sequelize.STRING
            },
            status: {
                type: 'tinyint(2)'
            },
            permissionLocked: {
                type: 'tinyint(2)'
            },
            data: {
                type: 'longtext'
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
        await queryInterface.dropTable('g_core_roles');
    }
};
