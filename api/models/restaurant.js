'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class RESTAURANT extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            RESTAURANT.hasMany(models.MEJA,{foreignKey:"restaurantId"})
        }
    };
    RESTAURANT.init({
        restaurantId:{
            type:DataTypes.UUID,
            primaryKey:true,
            defaultValue:DataTypes.UUIDV4
        },
        restaurantName: DataTypes.STRING,
        aboutText: DataTypes.STRING,
        aboutImage: DataTypes.STRING,
        restaurantPassword: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'RESTAURANT',
        timestamps: false,
        freezeTableName:true,
        tableName:'RESTAURANT'
    });
    return RESTAURANT;
};