'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        isAlpha: true
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        isAlpha: true
      },
      email: {
        type: DataTypes.STRING,
        isUnique: true,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        isNumeric: true,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        isAlphanumeric: true
      },
      token: {
        type: DataTypes.TEXT ,
        allowNull: true
      },
      token_expiration: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      is_admin: {
        type: DataTypes.BOOLEAN ,
        allowNull: false,
        defaultValue: '0'
      },
      is_delete: {
        type: DataTypes.BOOLEAN ,
        allowNull: false,
        defaultValue: '0'
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('users');
  }
};