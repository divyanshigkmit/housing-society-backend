'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Amenity }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'user_id' })
      this.belongsTo(Amenity, { foreignKey: 'amenity_id' })
    }
  }
  Booking.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amenity_id: {
      type: DataTypes.INTEGER,
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
    }
  }, {
    sequelize,
    tableName: 'bookings',
    modelName: 'Booking',
  });
  return Booking;
};