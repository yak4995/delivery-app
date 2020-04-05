'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      client_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'clients'
          },
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
        allowNull: false
      },
      restaurant_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'restaurants'
          },
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
        allowNull: false
      },
      destination_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'locations'
          },
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
        allowNull: false
      },
      sum_to_pay: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      courier_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'couriers'
          },
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
        allowNull: true
      },
      delivery_duration: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deliveryAt: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'processing',
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('orders');
  }
};