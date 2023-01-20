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
    const patients = [];
    for (let i = 0; i < 10; i++) {
      patients.push({
        name: `patient ${i}`,
        phone: 6281922121 + i,
        address: `sudirman street no. ${i}`,
        status: i % 2 ? 1 : 0,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    return queryInterface.bulkInsert('Patients', patients, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Patients', null, {
      truncate: true
    });
  }
};
