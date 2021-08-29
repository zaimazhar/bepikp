const sequelize = require('../components/mysql.component')

function nameModel(name) {
  return sequelize.define(name)
}

async function createUser(id) {
  try {
    return nameModel('Credentials').create({
      id,
    })
  } catch(err) {
    console.error(err)
  }
}

async function getUser() {
  try {
    return await nameModel('Credentials').findAll()
  } catch(err) {
    console.error(err)
  }
}

async function findUser(id) {
  try {
    return await nameModel('Credentials').findOne({
      where: {
        id: id
      }
    })
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  createUser,
  getUser,
  findUser,
}