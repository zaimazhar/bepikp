const express = require('express')
const passport = require('passport')
const jwtComponent = require('../components/jwt.component')
const mysql = require('../services/pikp-database.service')

require('./passport')

const router = express.Router()

router.use(passport.initialize())

router.get('/', async (req, res) => {
  res.send({
    data: 'Auth'
  })
})

router.get('/check/:id', async (req, res) => {
  await mysql.createUser(req.params.id)
  const users = await mysql.getUser()
  console.log(users)
  res.send(users)
})

router.get('/login/:id', async (req, res) => {
  const user = await mysql.findUser(req.params.id)
  
  if(!user) {
    res.status(401)
    res.json({
      message: "Error. User not found."
    })
  }

  const jwt = jwtComponent.generateJwt(user)
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