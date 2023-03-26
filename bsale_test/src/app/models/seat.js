const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const SeatType = require('./seat_type');
const Airplane = require('./airplane');

const Seat = sequelize.define('Seat', {
    seat_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    },
    seat_column: {
        type: DataTypes.STRING(2),
        allowNull: false,
    },
    seat_row: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    seat_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    airplane_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'seat',
    timestamps: false
});

Seat.belongsTo(SeatType, { foreignKey: 'seat_type_id' });
Seat.belongsTo(Airplane, { foreignKey: 'airplaine_id' });

module.exports = Seat;