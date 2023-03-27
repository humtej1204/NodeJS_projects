const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Passenger = sequelize.define('Passenger', {
    passengerId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'passenger_id'
    },
    dni: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'dni'
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'name'
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'age'
    },
    country: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'country'
    },
}, {
    tableName: 'passenger',
    timestamps: false,
    underscore: true,
});

module.exports = Passenger;

