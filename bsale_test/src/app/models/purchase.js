const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Purchase = sequelize.define('Purchase', {
    purchaseId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'purchase_id'
    },
    purchaseDate: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'purchase_date'
    },
}, {
    tableName: 'purchase',
    timestamps: false,
    underscore: true,
});

module.exports = Purchase;