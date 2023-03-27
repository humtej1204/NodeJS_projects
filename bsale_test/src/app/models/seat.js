const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const SeatType = require('./seat_type');
const Airplane = require('./airplane');

const Seat = sequelize.define('Seat', {
    seatId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'seat_id'
    },
    seatColumn: {
        type: DataTypes.STRING(2),
        allowNull: false,
        field: 'seat_column'
    },
    seatRow: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'seat_row'
    },
    seatTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'seat_type_id'
    },
    airplaneId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'airplane_id'
    },
}, {
    tableName: 'seat',
    timestamps: false,
    underscore: true,
});

Seat.belongsTo(SeatType, { foreignKey: 'seat_type_id' });
Seat.belongsTo(Airplane, { foreignKey: 'airplaine_id' });

module.exports = Seat;