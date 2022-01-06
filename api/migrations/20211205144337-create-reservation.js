'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('RESERVATION', {
            reserveTime: {
                type: Sequelize.DATE
            },
            reserveFor: {
                type: Sequelize.DATE
            },
            numberOfCustomer : {
              type : Sequelize.STRING
            },
            userId: {
                type: Sequelize.STRING,
                allowNull: false,
                model: {
                    tableName: "USER"
                },
                key: "userId"
            },
            mejaId: {
                type: Sequelize.STRING,
                allowNull: false,
                model: {
                    tableName: "MEJA"
                },
                key: "mejaId"
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('RESERVATION');
    }
};