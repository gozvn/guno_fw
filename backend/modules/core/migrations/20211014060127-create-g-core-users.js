'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('g_core_users', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                username: {
                    type: Sequelize.STRING
                },
                email: {
                    type: Sequelize.STRING
                },
                password: {
                    type: Sequelize.STRING
                },
                avatar:{
                    type:Sequelize.STRING
                },
                roleId: {
                    type: Sequelize.INTEGER
                },
                allow: {
                    type: 'tinyint(2)',
                    allowNull: true
                },
                extraPermission: {
                    type: Sequelize.TEXT,
                    allowNull: true
                },
                ext: {
                    type: Sequelize.TEXT,
                    allowNull: true
                },
                status: {
                    type: 'tinyint(2)'
                },
                permissionLocked: {
                    type: Sequelize.INTEGER
                },
                lastLogin: {
                    type: Sequelize.DATE
                },
                otpData: {
                    type: 'longtext'
                },
                telegramChatId: {
                    type: 'varchar(50)'
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE
                }
            }, { charset: 'utf8', collate: 'utf8_unicode_ci' })
            .then(() => {
                return queryInterface.addConstraint('g_core_users', {
                    type: 'FOREIGN KEY',
                    fields: ['roleId'],
                    name: 'fk_user_role',
                    references: { //Required fields
                        table: 'g_core_roles',
                        field: 'id'
                    },
                    onDelete: 'SET NULL',
                    onUpdate: 'NO ACTION'
                })
            }).then(() => {
                return queryInterface.addIndex('g_core_users', {
                    name: 'idx_user_role',
                    fields: ['id', 'roleId'],
                    unique: false
                })
            })
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.removeConstraint('g_core_users', 'fk_user_role')
        await queryInterface.dropTable('g_core_users');
    }
};
