'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const discounts = [];
    for (let i = 1; i <= 20; i++) {
      discounts.push({
        discountRate: (Math.random() * 50).toFixed(2),
        productId: Math.floor(Math.random() * 20) + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert('discounts', discounts, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('discounts', null, {});
  }
};
