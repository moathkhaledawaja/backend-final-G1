'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const wishlistProducts = [];
    for (let i = 1; i <= 20; i++) {
      wishlistProducts.push({
        wishlistId: Math.floor(Math.random() * 20) + 1,
        productId: Math.floor(Math.random() * 20) + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert('wishlistProducts', wishlistProducts, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('wishlistProducts', null, {});
  }
};
