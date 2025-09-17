'use strict';
const CoreModel = require("../../../libs/core/model");
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends CoreModel {

        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.User.belongsTo(models.Role, {
                targetKey: 'id',
                foreignKey: 'roleId',
                constraints: false
            })
        }

        getExt(field = null) {
            const ext = this.ext ? JSON.parse(this.ext) : {};
            return !field ? ext : (ext && typeof ext[field] !== 'undefined' ? ext[field] : false);
        }

        getOtpData() {
            return this.otpData ? JSON.parse(this.otpData) : [];
        }
    };

    // enable model cache
    User.cache = true;

    User.STATUS_SUSPEND = -1;
    User.STATUS_ACTIVE = 1;

    User.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        email: DataTypes.STRING,
        fullName: DataTypes.STRING,
        avatar: DataTypes.STRING,
        password: DataTypes.STRING,
        status: DataTypes.INTEGER,
        roleId: DataTypes.INTEGER,
        lastLogin: DataTypes.DATE,
        otpData: {
            type: 'json'
        },
        ext: {
            type: 'json'
        }
    }, {
        sequelize,
        tableName: 'g_core_users',
        modelName: 'User',
    });

    return User;
};
