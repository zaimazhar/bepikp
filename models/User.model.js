const { DataTypes } = require('sequelize/types')
const sequelize = require('../components/mysql.component')

module.exports = sequelize.define('User', {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  }
})