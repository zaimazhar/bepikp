const express = require('express')
const passport = require('passport')
const jwt = require('../components/jwt.component')
const mysql = require('../services/pikp-database.service')

const router = express.Router()

router.use(passport.initialize())

router.get('/', async (req, res) => {
  res.send({
    data: 'Auth'
  })
})

router.get('/check', async (req, res) => {
  
})

router.post('/login', async (req, res) => {
  console.log(await mysql.findUser())
  res.send({
    message: "Not sure"
  })
})

router.get('/dashboard', passport.authenticate('jwt'), (req, res) => {
  res.send({
    message: "Entered privatized page!"
  })
})

module.exports = router