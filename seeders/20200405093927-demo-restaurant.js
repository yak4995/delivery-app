'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('restaurants', [{
      name: 'СУШИЯ',
      description: 'Ресторан суши'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('restaurants', {id: 1}, {});
  }
};
