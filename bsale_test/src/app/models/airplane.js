const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Airplane = sequelize.define('Airplane', {
  airplaneId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'airplane_id'
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'name'
  },
}, {
  tableName: 'airplane',
  timestamps: false,
  underscore: true,
});

module.exports = Airplane;