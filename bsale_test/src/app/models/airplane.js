const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Airplane = sequelize.define('Airplane', {
  airplane_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  tableName: 'airplane',
  timestamps: false
});

module.exports = Airplane;