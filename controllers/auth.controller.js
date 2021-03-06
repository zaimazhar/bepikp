const express = require('express')
const jwtComponent = require('../components/jwt.component')
const { User, Credentials } = require('../models')
const bcrypt = require('bcrypt')
const { Op } = require('sequelize')
const { authenticationService } = require('../services/authentication')

const router = express.Router()

router.use(async (req, res, next) => {
  if(req.headers.authorization) {
    let token = req.headers.authorization.split(' ')[1]
    const check = await Credentials.findOne({
      where: {
        token
      }
    })

    if(!check) res.status(401).send("Unauthorized!")
    else {
      req.token = token
      next()
    }
  }
  else res.status(401).send("Unauthorized!")
})

router.post('/signup', async (req, res) => {
  let { username, email, password } = req.body
  
  if(!username || !email || !password) res.status(400).json({ "message": "Bad Request" })
  
  try {
    password = await bcrypt.hash(password, 10)
    await User.create({
      username,
      email,
      password
    })
    res.status(200).json({
      "message": "Created user"
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      "message": "Unable to create user"
    })
  }
})

router.post('/login', async (req, res) => {
  const { username, email, password } = req.body
  
  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { email: email }, 
          { username: username }
        ]
      }
    })
    
    if(bcrypt.compare(password, user.password)) {
      const token = await jwtComponent.generateJwt({
        id: user.id,
        username: user.username,
        email: user.email,
      })
            
      const sessionCheck = await Credentials.findOne({
        userId: user.id
      })
      
      if(!sessionCheck) {
        await Credentials.create({
          token
        })
        
        res.status(200).cookie('pikp', token, {
          httpOnly: true,
          secure: true,
          maxAge: 60 * 60 * 24 * 1000 * parseInt(process.env.MAX_TOKEN_AGE)
        })
      } else{
        res.status(400).json({
          "message": "Account is currently in-use"
        }) 
      }
    }
  } catch(err) {
    console.error(err)
    res.status(500).json({
      "message": "Unable to authenticate"
    })
  }
})

router.post('/logout', async (req, res) => {
  if(await authenticationService.logout(req.token)) res.sendStatus(200)
  else res.status(400).send("Logout process unsuccesful")
})

router.get('/dashboard', (req, res) => {
  res.send({
    message: "Entered privatized page!"
  })
})

module.exports = router