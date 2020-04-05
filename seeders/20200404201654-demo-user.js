'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('clients', [{
      email: 'noreply@example.com',
      passwordHash: '$2b$10$y5D9uF2gEw3GxaEC3pO56OpFjyISNzsAf/NBsBaj1AzwMuXVg5u/S', // qwerty
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('clients', {id: 1}, {});
  }
};
