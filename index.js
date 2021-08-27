const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()

// Express Configuration
app.use(cors())
app.use(express.json())
app.use(cookieParser())

// Routes
app.use('/auth', require('./controllers/auth.controller'))

app.get('/', async (req, res) => {
    res.send("Hello World")
})

app.get('/user', async (req, res) => {
    res.send({
        message: "Success"
    })
})

app.listen(3000, () => console.log("Backend running on port 3000"))