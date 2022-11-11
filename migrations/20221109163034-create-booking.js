'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('bookings', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.literal('uuid_generate_v4()')
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false
      },
      amenity_id: {
        type: DataTypes.UUID,
        allowNull: false
      },
      booking_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      status: {
        type:   DataTypes.ENUM,
        values: ['approve', 'pending', 'cancel'],
        defaultValue: 'pending'
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('bookings');
  }
};