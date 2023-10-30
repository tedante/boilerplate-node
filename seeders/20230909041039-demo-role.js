'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   // create bulk insert data to table role
    await queryInterface.bulkInsert('Roles', [
      {
        id: "550b3cc1-0551-420f-872d-91f0181201b6",
        name: 'admin',
        description: 'Administrator',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "0209cbd3-2069-44a7-92a2-20af22dfe8ff",
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
