const express = require('express')
const { Courses, CourseParticipants, ParticipantCompany } = require('../models')
const { authenticationService } = require('../services/authentication')
const jsonfile = require('jsonfile')

const router = express.Router()

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

router.get('/city/:id', async (req, res) => {
  const id = req.params.id
  jsonfile.readFile('seeders/all.json', function (err, obj) {
    if(err) console.log(err)

    const data = obj
    res.json(data.state[id].city)
  })
})

router.post('/logout', async (req, res) => {
  if(await authenticationService.logout(req.body.token))
    res.json({ message: "Deleted" })
  else
    res.json({ message: "No user found" })
})

router.get('/send', async (req, res) => {
  await Courses.create({
    courseName: "Training 2",
    courseStart: (new Date()).toISOString(),
    courseEnd: (new Date()).toISOString(),
    courseCost: "3000",
    courseVenue: {
      addr1: "the light hotel",
      addr2: "",
      region: "",
      state: "kedah"
    }
  })

  res.json(await Courses.findAll())
})

module.exports = router