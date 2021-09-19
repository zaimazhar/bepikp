const { sequelize } = require('./models')

async function migrate() {
  await sequelize.authenticate()
  await sequelize.sync({ alter: true })
}

migrate()