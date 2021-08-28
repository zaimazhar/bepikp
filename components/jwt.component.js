const jsonwebtoken = require('jsonwebtoken')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

let opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = 'pikpbackend'

function generateJwt(payload) {
  const jwt = jsonwebtoken.sign(payload, process.env.PIKP_SECRET)
  
  return jwt
}

module.exports = {
  generateJwt,
}