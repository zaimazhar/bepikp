const UserModel = require("../models/User.model");

async function findUser() {
  return UserModel.findAll()
}

module.exports = {
  findUser,
}