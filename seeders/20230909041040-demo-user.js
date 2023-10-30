'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Users', [
      {
        name: 'admin',
        email: 'admin@yoypmail.com',
        password: '$2a$12$OOHTDuSuwaNaJe9q9LKSI.nOibBZPECXmQJYKPJT8TTuBRTYku51K',
        email_verified_at: new Date(),
        is_active: true,
        RoleId: "550b3cc1-0551-420f-872d-91f0181201b6",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'test',
        email: 'test@yopmail.com',
        password: '$2a$12$OOHTDuSuwaNaJe9q9LKSI.nOibBZPECXmQJYKPJT8TTuBRTYku51K',
        email_verified_at: new Date(),
        is_active: true,
        RoleId: "0209cbd3-2069-44a7-92a2-20af22dfe8ff",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'user',
        email: 'user@yopmail.com',
        password: '$2a$12$OOHTDuSuwaNaJe9q9LKSI.nOibBZPECXmQJYKPJT8TTuBRTYku51K',
        email_verified_at: new Date(),
        is_active: true,
        RoleId: "0209cbd3-2069-44a7-92a2-20af22dfe8ff",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
