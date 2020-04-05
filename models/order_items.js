'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    order_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    count: DataTypes.INTEGER,
    sum_by_item: DataTypes.INTEGER
  }, {
    tableName: 'order_items',
    timestamps: false,
  });
  OrderItem.associate = function(models) {
    // associations can be defined here
  };
  return OrderItem;
};