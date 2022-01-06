'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('RESTAURANT', {
      restaurantId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      restaurantName: {
        type: Sequelize.STRING
      },
      aboutText: {
        type: Sequelize.STRING
      },
      aboutImage: {
        type: Sequelize.STRING
      },
      restaurantPassword: {
        type: Sequelize.STRING
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('RESTAURANT');
  }
};