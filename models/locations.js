'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    district: DataTypes.STRING,
    address: DataTypes.STRING,
    client_id: DataTypes.INTEGER
  }, {
    tableName: 'locations',
    timestamps: false,
  });
  Location.associate = function(models) {
    // associations can be defined here
  };
  return Location;
};