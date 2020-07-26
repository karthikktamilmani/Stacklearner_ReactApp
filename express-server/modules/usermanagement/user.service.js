const passwordHash = require('password-hash');


function userService() {
	const hashPassword = (password) => {
		return passwordHash.generate(password);
	}
	const verifyPassword = (password, hashedPassword) => {
		return passwordHash.verify(password, hashedPassword);
	}

	return {hashPassword, verifyPassword}
}

module.exports = userService;
