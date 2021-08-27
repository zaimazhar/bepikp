const { DataTypes } = require('sequelize/types')
const sequelize = require('../components/mysql.component')

module.exports = sequelize.define('Course', {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  courseName: {
    type: DataTypes.STRING,
    allowNull: false,
  }
})