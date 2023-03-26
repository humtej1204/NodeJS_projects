const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const Airplane = require('./airplane');

const Flight = sequelize.define('Flight', {
  flight_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  takeoff_date_time: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  takeoff_airport: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  landing_date_time: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  landing_airport: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  airplane_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'flight',
  timestamps: false
});

Flight.belongsTo(Airplane, { foreignKey: 'airplane_id' });

module.exports = Flight;