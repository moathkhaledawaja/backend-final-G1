'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const cartProducts = [];
    for (let i = 1; i <= 20; i++) {
      cartProducts.push({
        quantity: Math.floor(Math.random() * 10) + 1,
        cartId: Math.floor(Math.random() * 20) + 1,
        productId: Math.floor(Math.random() * 20) + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert('cartProducts', cartProducts, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('cartProducts', null, {});
  }
};
