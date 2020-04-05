'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('locations', [
      {
        district: "Оболонский",
        address: "ул. Петра Панча",
        client_id: 1,
      },
      {
        district: "Дарницкий",
        address: "ул. арх. Вербицкого",
        client_id: 1,
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('clients', {
      id: {
        [Op.and]: [1, 2]
      }
    }, {});
  }
};
