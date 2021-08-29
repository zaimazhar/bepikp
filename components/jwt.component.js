const jsonwebtoken = require('jsonwebtoken')


passport.authenticate('jwt', {
  
})

function generateJwt(payload) {
  return jsonwebtoken.sign(payload, process.env.PIKP_SECRET)
  jsonwebtoken.verify()
}

// function middleware(token) {
//   retujsonwebtoken.verify(token, process.env.PIKP_SECRET)) {
//     return true
//   }
// }

module.exports = {
  generateJwt,
}