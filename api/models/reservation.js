'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RESERVATION extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  };
  RESERVATION.init({
    reserveTime:DataTypes.TIME,
    reserveFor: DataTypes.TIME,
    numberOfCustomer : DataTypes.STRING
  }, {
    sequelize,
    modelName: 'RESERVATION',
    timestamps:false,
    freezeTableName:true,
    tableName:'RESERVATION'
  });
  return RESERVATION;
};