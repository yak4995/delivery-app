'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('products', [
      {
        name: "Калифорния-сет",
        description: "24 ролла Калифорния",
        price: 250_00,
        restaurant_id: 1
      },
      {
        name: "Сет с угрём",
        description: "Набор из 36 роллов с угрём",
        price: 450_00,
        restaurant_id: 1
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('products', {
      id: {
        [Op.and]: [1, 2]
      }
    }, {});
  }
};
