'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   // create bulk insert data to table role
    await queryInterface.bulkInsert('Roles', [
      {
        name: 'admin',
        description: 'Administrator',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'user',
        description: 'User',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
