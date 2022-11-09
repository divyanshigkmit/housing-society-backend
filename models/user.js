'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    static associate({ Booking }) {
      // define association here
      this.hasMany(Booking, { foreignKey: 'user_id' })
    }
    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }
  User.init({
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
    }
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};