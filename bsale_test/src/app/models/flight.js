const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const Airplane = require('./airplane');

const Flight = sequelize.define('Flight', {
  flightId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'flight_id'
  },
  takeoffDateTime: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'takeoff_date_time'
  },
  takeoffAirport: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'takeoff_airport'
  },
  landingDateTime: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'landing_date_time'
  },
  landingAirport: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'landing_airport'
  },
  airplaneId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'airplane_id'
  },
}, {
  tableName: 'flight',
  timestamps: false,
  underscore: true,
});

Flight.belongsTo(Airplane, { foreignKey: 'airplane_id' });

module.exports = Flight;