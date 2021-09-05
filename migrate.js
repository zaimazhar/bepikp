const sequelize = require('sequelize')

async function migrate() {
  sequelize.sync({
    force: true,

  })
}

migrate()