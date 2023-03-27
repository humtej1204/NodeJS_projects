const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const SeatType = sequelize.define('SeatType', {
  seatTypeId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'seat_type_id'
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'name'
  },
}, {
  tableName: 'seat_type',
  timestamps: false,
  underscore: true,
});

module.exports = SeatType;