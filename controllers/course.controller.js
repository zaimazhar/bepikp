const express = require('express')
const { Courses, CourseParticipants } = require('../models')

const router = express.Router()

router.get('/', async (req, res) => {
  res.json(await Courses.findAll())
})

router.post('/register', async (req, res) => {
  const participant = await CourseParticipants.create(req.body)

  
})

module.exports = router