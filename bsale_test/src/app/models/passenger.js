const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Passenger = sequelize.define('Passenger', {
    passenger_id: {
        type: DataTypes.INTEGER,
    },
    dni: {
        type: DataTypes.STRING(255),
    },
    name: {
        type: DataTypes.STRING(255),
    },
    afe: {
        type: DataTypes.INTEGER,
    },
    country: {
        type: DataTypes.STRING(255),
    },
}, {
    tableName: 'passenger',
    timestamps: false
});

module.exports = Passenger;

