'use strict';
module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
    email: DataTypes.STRING,
    passwordHash: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN
  }, {
    tableName: 'clients',
    timestamps: false,
    scopes: {
      withoutPassword: {
        attributes: { exclude: ['password'] },
      }
    }
  });
  Client.associate = function(models) {
    // associations can be defined here
  };
  return Client;
};