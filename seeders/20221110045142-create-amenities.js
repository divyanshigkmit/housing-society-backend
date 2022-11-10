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
    await queryInterface.bulkInsert('amenities', [{
      name: 'Swimming pool',
      price: 5000,
      is_active: 'true'
    }, {
      name: 'Laundry',
      price: 3000,
      is_active: 'true'
    }, {
      name: 'Spa',
      price: 7000,
      is_active: 'true'
    }, {
      name: 'Fitness center',
      price: 4000,
      is_active: 'true'
    }, {
      name: 'Squash court',
      price: 5000,
      is_active: 'false'
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('amenities', null, {});
  }
};
