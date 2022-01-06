'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class USER extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      USER.belongsToMany(models.MEJA,{through:"RESERVATION",foreignKey:"userId",otherKey:"mejaId"})
    }
  };
  USER.init({
    userId:{
      type:DataTypes.UUID,
      primaryKey:true,
      defaultValue:DataTypes.UUIDV4
    },
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'USER',
    timestamps:false,
    freezeTableName:true,
    tableName:'USER'
  });
  return USER;
};