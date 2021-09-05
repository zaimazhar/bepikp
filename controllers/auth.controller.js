const express = require('express')
const jwtComponent = require('../components/jwt.component')
const { User, Credentials } = require('../models')
const bcrypt = require('bcrypt')
const { Op } = require('sequelize')

const router = express.Router()

router.get('/', async (req, res) => {
  const user = await User.create({
    id: 1,
    username: 'zaimazhar',
    email: 'zaim.azhar97@gmail.com'
  })
  
  res.send(user)
})

router.get('/check/:id', async (req, res) => {
  await mysql.createUser(req.params.id)
  const users = await mysql.getUser()
  console.log(users)
  res.send(users)
})

router.get('/login/:id', async (req, res) => {
  const jwt = jwtComponent.generateJwt(user)
  res.send({
    message: "Not sure"
  })
  
  res.send("GET WITH ID")
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
      console.log("Cool, dapat")
      const token = await jwtComponent.generateJwt({
        id: user.id,
        username: user.username,
        email: user.email,
      })
      
      const credentialCheck = await Credentials.findOne({
        userId: user.id
      })

      if(!credentialCheck) {
        const credential = await Credentials.create({
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
  res.clearCookie('pikp')
  res.redirect('/')
})

router.get('/dashboard', (req, res) => {
  res.send({
    message: "Entered privatized page!"
  })
})

module.exports = router