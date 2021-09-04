const jsonwebtoken = require('jsonwebtoken')

function generateJwt(payload) {
  return jsonwebtoken.sign(payload, process.env.PIKP_SECRET)
}

function middleware(token) {
  if(jsonwebtoken.verify(token, process.env.PIKP_SECRET)) {
    return true
  }
}

module.exports = {
  generateJwt,
}