const { Sequelize } = require('sequelize')

module.exports = new Sequelize('pikp', 'zaimazhar97', 'Zaimzaim1@', {
  host: 'localhost',
  dialect: 'mysql'
})