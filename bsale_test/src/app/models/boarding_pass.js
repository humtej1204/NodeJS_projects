const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const Purchase = require('./purchase');
const Passenger = require('./passenger');
const SeatType = require('./seat_type');
const Seat = require('./seat');
const Flight = require('./flight');

const BoardingPass = sequelize.define('BoardingPass', {
    boardingPassId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'boarding_pass_id'
    },
    purchaseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'purchase_id'
    },
    passengerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'passenger_id'
    },
    seatTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'seat_type_id'
    },
    seatId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'seat_id'
    },
    flightId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'flight_id'
    },
}, {
    tableName: 'boarding_pass',
    timestamps: false,
});

BoardingPass.belongsTo(Purchase, { foreignKey: 'purchase_id' });
BoardingPass.belongsTo(Passenger, { foreignKey: 'passenger_id' });
BoardingPass.belongsTo(SeatType, { foreignKey: 'seat_type_id' });
BoardingPass.belongsTo(Seat, { foreignKey: 'seat_id' });
BoardingPass.belongsTo(Flight, { foreignKey: 'flight_id' });

module.exports = BoardingPass;