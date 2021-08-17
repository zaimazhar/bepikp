const express = require('express')
const sequelize = require('sequelize')
const mysql = require('mysql2')

const app = express()

app.get('/', async (req, res) => {
    res.send("Hello World")
})

app.get('/user', async (req, res) => {
    res.send("User Page")
})

app.listen(3000, () => console.log("Backend running on port 3000"))