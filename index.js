const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { 
    sequelize,
    User,
    Credentials,
} = require('./models')
require('dotenv').config()

const app = express()

// Prepare middleware to pass sequelize object to routers
function sequelizeMiddleware(req, res, next) {
    req.sequelize = sequelize
    next()
}

// Express Configuration
app.use(cors())
app.use(express.json())
app.use(cookieParser())

// Middlewares
app.use(sequelizeMiddleware)

// Routes
app.use('/', require('./controllers/public.controller'))
app.use('/auth', require('./controllers/auth.controller'))

app.listen(3000, async () => {
    await sequelize.authenticate()
    await sequelize.sync({ alter: true })
    console.log("Database Running!")
    console.log("Backend running on port 3000")
})