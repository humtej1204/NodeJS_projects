const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Purchase = sequelize.define('Purchase', {
    purchase_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    purchase_date: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'purchase',
    timestamps: false
});

module.exports = Purchase;