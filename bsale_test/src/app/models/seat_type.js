const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const SeatType = sequelize.define('SeatType', {
    seat_type_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  tableName: 'seat_type',
  timestamps: false
});

module.exports = SeatType;