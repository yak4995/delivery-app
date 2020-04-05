'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    client_id: DataTypes.INTEGER,
    restaurant_id: DataTypes.INTEGER,
    destination_id: DataTypes.INTEGER,
    sum_to_pay: DataTypes.INTEGER,
    courier_id: DataTypes.INTEGER,
    delivery_duration: DataTypes.INTEGER,
    deliveryAt: DataTypes.DATE,
    status: DataTypes.STRING
  }, {
    tableName: 'orders',
    updatedAt: 'deliveryAt',
    // timestamps: false,
  });
  Order.associate = function(models) {
    // associations can be defined here
  };
  return Order;
};