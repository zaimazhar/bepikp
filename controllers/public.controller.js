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

  // const course = (await Courses.findAll())[0]

  // const participant = await CourseParticipants.create({
  //   participantFullname: 'Muhammad Zaim',
  //   participantId: '970709026337',
  //   participantPhone: '01164134714',
  //   participantEmail: 'zaim.azhar97@gmail.com',
  //   participantAddress: JSON.stringify({
  //     addr1: "no 90, jalan mbi 6/1",
  //     addr2: "taman mbi desaku",
  //     region: "kulim",
  //     state: "kedah",
  //     postcode: "09400"
  //   }),
  //   courseId: course.id
  // })

  // await ParticipantCompany.create({
  //   companyName: 'SHEPro Sdn Bhd',
  //   companyPhone: '01164134714',
  //   companyAttention: 'Yusry',
  //   companyAddress: JSON.stringify({
  //     addr1: "jalan ria",
  //     addr2: "taman mahsuri",
  //     region: "padang serai",
  //     state: "kedah",
  //     postcode: "09400"
  //   }),
  //   companyEmail: 'yusry@shepro.com',
  //   courseParticipantsId: participant.id
  // })

  res.json(await Courses.findAll())

  // const addr1 = (await CourseParticipants.findAll())
  // console.log((JSON.parse(addr1[0].participantAddress)).addr1)

  // res.send(addr1[0].participantAddress)
})

module.exports = router