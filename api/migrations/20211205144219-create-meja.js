'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('MEJA', {
            mejaId: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true
            },
            seatAmount: {
                type: Sequelize.INTEGER
            },
            reserved: {
                type: Sequelize.BOOLEAN
            },
            restaurantId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: {
                        tableName: "RESTAURANT"
                    },
                    key: "restaurantId"
                }
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('MEJA');
    }
};