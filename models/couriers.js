'use strict';
module.exports = (sequelize, DataTypes) => {
  const Courier = sequelize.define('Courier', {
    name: DataTypes.STRING
  }, {
    tableName: 'couriers',
    timestamps: false,
  });
  Courier.associate = function(models) {
    // associations can be defined here
  };
  return Courier;
};