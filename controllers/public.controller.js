const express = require('express')
const { generateJwt } = require('../components/jwt.component')
const { User } = require('../models')
const { authenticationService } = require('../services/authentication')

const router = express.Router()

router.get('/', async (req, res) => {
  res.json({
    "message": "Received your form"
  })
})

router.post('/login', async (req, res) => {
  const token = await authenticationService.auth(req.body)

  if(!token.status) res.status(400).send(token.message)
  else res.json({ token: token.message })
})

router.post('/signup', async (req, res) => {
  const token = await authenticationService.createUser(req.body)

  if(!token) res.status(400).send("Please Register Again")
  else res.json({ ...req.body, token: token.message })
})

router.post('/logout', async (req, res) => {
  if(await authenticationService.logout(req.body.token))
    res.json({ message: "Deleted" })
  else
    res.json({ message: "No user found" })
})

module.exports = router