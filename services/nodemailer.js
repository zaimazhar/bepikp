const nodemailer = require('nodemailer')
const job = require('../services/jobs')
const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  }
});

async function createMail(nama) {
  let message = {
    to: nama,
    subject: 'Testing Email',
    html: "<h1>Hello</h1><p>testing email here</p>"
  }
  
  job.add(transport.sendMail(message, (err, info) => {
    if(err) {
      console.log(`Error: ${err}`)
      return process.exit(1)
    }
    
    console.log(`Sent Email: ${nama}`)
    
    transport.close()
  }))
}

module.exports = {
  createMail
}

