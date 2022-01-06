'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class MEJA extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            MEJA.belongsTo(models.RESTAURANT,{foreignKey:'restaurantId'})
            MEJA.belongsToMany(models.USER, {through: "RESERVATION", foreignKey: "mejaId", otherKey: "userId"})
        }
    };
    MEJA.init({
        mejaId:{
            type:DataTypes.UUID,
            primaryKey:true,
            defaultValue:DataTypes.UUIDV4
        },
        seatAmount: DataTypes.INTEGER,
        reserved: DataTypes.BOOLEAN,
        restaurantId: DataTypes.UUID
    }, {
        sequelize,
        modelName: 'MEJA',
        timestamps: false,
        freezeTableName:true,
        tableName:'MEJA',
    });
    return MEJA;
};