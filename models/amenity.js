'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Amenity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Amenity.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      isAlpha: true
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: '0'
    }
  }, {
    sequelize,
    tableName: 'amenities',
    modelName: 'Amenity',
  });
  return Amenity;
};