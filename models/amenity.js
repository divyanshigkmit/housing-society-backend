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
    static associate({ Booking }) {
      // define association here
      this.hasMany(Booking, { foreignKey: 'amenity_id' })
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
    is_active: {
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