const express = require('express')
const passport = require('passport')

const router = express.Router()

router.use(passport.initialize())

router.get('/', async (req, res) => {
  res.send('Auth')
})

// router.post('/login', async (req, res) => {
//   passport.authenticate('jwt')
// })

module.exports = router