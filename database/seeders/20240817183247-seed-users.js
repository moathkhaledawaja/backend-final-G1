'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [];
    for (let i = 1; i <= 20; i++) {
      users.push({
        name: `User ${i}`,
        email: `user${i}@example.com`,
        address: `Address ${i}`,
        password: `password${i}`,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert('users', users, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
