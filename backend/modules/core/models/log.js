'use strict';
const CoreModel = require("../../../libs/core/model");
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Log extends CoreModel {

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
            })
        }
    };

    // enable model cache
    Log.cache = false

    Log.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        url: DataTypes.STRING,
        path: DataTypes.STRING,
        params: {
            type: 'text'
        },
        ip: DataTypes.BIGINT(30),
        userId: DataTypes.INTEGER,
        method: DataTypes.STRING,
        methodCrc: DataTypes.BIGINT(30),
        module: DataTypes.STRING,
        moduleCrc: DataTypes.BIGINT(30),
        controller: DataTypes.STRING,
        controllerCrc: DataTypes.BIGINT(30),
        action: DataTypes.STRING,
        actionCrc: DataTypes.BIGINT(30),
        dataRequest: DataTypes.TEXT,
        dataResponse: DataTypes.TEXT,
    }, {
        sequelize,
        tableName: 'g_core_logs',
        modelName: 'Log',
    });

    return Log;
};
