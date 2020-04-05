'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    restaurant_id: DataTypes.INTEGER
  }, {
    tableName: 'products',
    timestamps: false,
  });
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};