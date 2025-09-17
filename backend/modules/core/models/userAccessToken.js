'use strict';
const stringHelper = require('../../../libs/helpers/stringHelper');
const CoreModel = require("../../../libs/core/model");
const { v4: uuidv4 } = require('uuid');

const {
    Model,
    Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserAccessToken extends CoreModel {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.User, {
                targetKey: 'id',
                foreignKey: 'userId',
                constraints: false
            });
        }

        getPayload(field = null) {
            const payload = this.payload ? JSON.parse(this.payload) : null;
            return !payload ? payload : (field ? payload[field] || false : payload);
        }
    }

    // enable model cache
    UserAccessToken.cache = false

    UserAccessToken.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: 'BINARY(16)'
        },
        userId: {
            type: 'int(32)'
        },
        data: {
            type: 'json'
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
        expireIn: {
            type: 'int(32)',
            defaultValue: 0
        }
    }, {
        sequelize,
        tableName: 'g_core_users_access_tokens',
        modelName: 'UserAccessToken',
        hooks: {
            beforeValidate: (model, options) => {
                model.id = stringHelper.uuid.toBinary(uuidv4());
            }
        }
    });

    return UserAccessToken;
};
