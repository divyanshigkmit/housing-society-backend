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
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        isAlpha: true
      },
      lastName: {
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
      tokenExpiration: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      isAdmin: {
        type: DataTypes.BOOLEAN ,
        allowNull: false,
        defaultValue: '0'
      },
      isDelete: {
        type: DataTypes.BOOLEAN ,
        allowNull: false,
        defaultValue: '0'
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('users');
  }
};