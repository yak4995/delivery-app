'use strict';
module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define('Restaurant', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    tableName: 'restaurants',
    timestamps: false,
  });
  Restaurant.associate = function(models) {
    // associations can be defined here
  };
  return Restaurant;
};