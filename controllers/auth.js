const express = require('express')
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

let opts = {}

const router = express.Router()

router.use(passport.initialize())

router.get('/', async (req, res) => {
  res.send('Auth')
})

router.post('/login', async (req, res) => {
  passport.authenticate('jwt')
})

module.exports = router