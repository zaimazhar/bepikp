const jsonwebtoken = require("jsonwebtoken");

function generateJwt(payload) {
	return jsonwebtoken.sign(payload, process.env.PIKP_SECRET);
}

function middleware(req, res, next) {
	if (req.headers)
		if (jsonwebtoken.verify(token, process.env.PIKP_SECRET)) {
			return true;
		}
}

module.exports.jwtComponent = {
	generateJwt,
	middleware,
};
