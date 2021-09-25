const express = require('express')
const { Courses } = require('../models')

const router = express.Router()

router.get('/', async (req, res) => {
  res.json(await Courses.findAll())
})

module.exports = router