const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

let opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = 'pikpbackend'

function makan() {
  return 'makan'
}

function minum() {
  return 'minum'
}

module.exports = {
  makan,
  minum
}