const { User, Credentials } = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

async function createUser(user) {
	// Hash the password for security purpose
	const passwordHashed = bcrypt.hashSync(user.password, 10);

	// Create user
	const createdUser = await User.create({
		username: user.username,
		password: passwordHashed,
		email: user.email,
	});

	// Return the newly created user
	return createdUser;
}

async function auth(user) {
	// Find the user by either their username or email
	const userAuth = await User.findOne({
		where: {
			[Op.or]: [{ username: user.username }, { email: user.email }],
		},
	});

	// Wrong Email or Username
	if (!userAuth) return { status: false, message: "Wrong Email or Username" };

	// Compare provided password with the one inside the database
	const checkPass = await bcrypt.compareSync(user.password, userAuth.password);

	// Wrong Password
	if (!checkPass) return { status: checkPass, message: "Wrong Password" };

	// Payload
	const payload = {
		id: userAuth.id,
		username: userAuth.username,
		email: userAuth.email
	}

	// Generate JWT to be stored inside the user browser for guarded oepration / path
	const token = jsonwebtoken.sign(payload, process.env.PIKP_SECRET, {
		expiresIn: 60 * 60 * 24 * 1000 * parseInt(process.env.MAX_TOKEN_AGE),
	});

	// Count active session with the user account
	const count = await Credentials.count({ where: { userId: userAuth.id } });

	// If user session (based on devices) reached limit, return error
	if (count == process.env.MAX_DEVICES)
		return { status: false, message: "Max Devices Reached" };

	// Create new session of the user
	await Credentials.create({
		token,
		userId: userAuth.id,
	});

	// If everything is fine, return the token back to the user
	return { status: true, message: token };
}

async function logout(token) {
	const user = jsonwebtoken.verify(token, process.env.PIKP_SECRET)
	const destroyStatus = await Credentials.destroy({
		where: {
			[Op.and]: [
				{ token: token },
				{ userId: user.id }
			]
		}
	})

	if(destroyStatus)
		return true
	else
		return false
}

module.exports.authenticationService = {
	createUser,
	auth,
	logout
};
