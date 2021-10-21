const express = require("express");
const {
	Courses,
	CourseParticipants,
	ParticipantCompany,
} = require("../models");
const { createMail } = require('../services/nodemailer')

const router = express.Router();

const mw = async (req, res, next) => {
	if (req.headers.authorization) {
		const check = await Credentials.findOne({
			where: {
				token: req.headers.authorization,
			},
		});
		
		if (!check) res.status(401).send("Unauthorized!");
		else next();
	} else res.status(401).send("Unauthorized!");
};

router.get("/", async (req, res) => {
	res.json(await Courses.findAll());
});

router.post("/create", async (req, res) => {
	const data = req.body;
	console.log(data);
	const course = Courses.create(data);
	
	if (!course) res.status(400).json({ message: "Invalid Data Submission" });
	
	res.json(course);
});

router.get("/:id", async (req, res) => {
	try {
		const course = await Courses.findByPk(req.params.id)
		
		if(!course) {
			res.status(400).json({ message: "No Course Found With Given ID" })
		}
		
		res.json(course)
	} catch (err) {
		throw new Error(err)
	}
});

router.post("/edit", async (req, res) => {
	try {
		const course = await Courses.update(req.body, {
			where: {
				id: req.body.id
			}
		})
		
		if(!course) {
			res.status(400).json({ message: "No Course Found With Given ID" })
		}
		
		res.json(course)
	} catch(err) {
		throw new Error(err)
	}
})

router.post("/register", async (req, res) => {
	const data = req.body;
	
	if(!data) res.sendStatus(400)

	try {
		const participant = await CourseParticipants.create({
			participantFullname: data.fullname,
			participantAddress: {
				addr1: data.addr1,
				addr2: data.addr2,
				postcode: data.postcode,
				region: data.region,
				state: data.state,
			},
			participantId: data.ic,
			participantPhone: data.phone,
			participantEmail: data.email,
			courseId: data.id,
		});
				
		if (data.companyName) {
			await ParticipantCompany.create({
				companyName: data.companyName,
				companyPhone: data.companyPhone,
				companyEmail: data.companyEmail,
				companyAttention: data.companyAttention,
				companyAddress: {
					addr1: data.companyAddr1,
					addr2: data.companyAddr2,
					postcode: data.companyPostcode,
					region: data.companyRegion,
					state: data.companyState,
				},
				courseParticipantsId: participant.id,
			});
		}
		
		createMail(`${data.fullname} <${data.email}>`)
		
		res.status(200).json({message: "Done"})
	} catch (err) {
		res.status(400).json({ message: err });
	}
});

router.get("/participants/:id", async (req, res) => {
	const participants = await CourseParticipants.findAll({
		include: "participantCompany",
		where: {
			courseId: req.params.id,
		},
	});
	
	// const companies = participants.filter((pt) => pt.participantCompany);
	res.json(participants);
});

module.exports = router;
