const passport = require("passport");
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const database = require('../services/pikp-database.service')

let opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.PIKP_SECRET

passport.use(new JwtStrategy(opts, async (payload, done) => {
  database.findUser()
}))