const express = require('express')
const sequelize = require('sequelize')
const mysql = require('mysql2')
const cookieParser = require('cookie-parser')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


const app = express()

// Express Configuration

app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json())
app.use(cookieParser())


// Routes

app.use('/auth', require('./controllers/auth'))

app.get('/', async (req, res) => {
    res.send("Hello World")
})

app.get('/user', async (req, res) => {
    res.send("User Page")
})

app.listen(3000, () => console.log("Backend running on port 3000"))