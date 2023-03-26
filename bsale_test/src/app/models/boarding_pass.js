const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const Purchase = require('./purchase');
const Passenger = require('./passenger');
const SeatType = require('./seat_type');
const Seat = require('./seat');
const Flight = require('./flight');

const BoardingPass = sequelize.define('BoardingPass', {
    boarding_pass_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    purchase_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    passenger_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    seat_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    seat_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    flight_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'boarding_pass',
    timestamps: false
});

BoardingPass.belongsTo(Purchase, { foreignKey: 'purchase_id' });
BoardingPass.belongsTo(Passenger, { foreignKey: 'passenger_id' });
BoardingPass.belongsTo(SeatType, { foreignKey: 'seat_type_id' });
BoardingPass.belongsTo(Seat, { foreignKey: 'seat_id' });
BoardingPass.belongsTo(Flight, { foreignKey: 'flight_id' });

module.exports = BoardingPass;