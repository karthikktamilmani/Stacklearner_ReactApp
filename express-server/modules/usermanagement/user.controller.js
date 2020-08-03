// Author: Daksh Patel

// All the controllers related to user management.


const userServiceFactory = require('./user.service');
const authTokenServiceFactory = require('../authentication/authtoken.service');
const createResponse = require('../../globals');
const fs = require('fs');
const sendMail = require('../mailer/mailer.service');

const User = require('../../models/user.model');
const Role = require('../../models/role.model');
const AuthToken = require('../../models/authtoken.model')
const ForgotPassword = require('../../models/forgotpassword.model')
const jwt = require("jsonwebtoken");
const privateKEY = fs.readFileSync('./modules/authentication/private.key', 'utf8');
const publicKEY = fs.readFileSync('./modules/authentication/public.key', 'utf8');

function userController() {
	const userService = userServiceFactory();
	const authTokenService = authTokenServiceFactory();

	const get = (req, res) => {
		return res.send('hello');
	}

	const validateAndRegisterUser = (req, res, next) => {
		let resp;
		let isValid = true;
		let requiredFields = [];
		let message;


		if (!req.body.password) {
			isValid = false;
			requiredFields.push("Password");
		}

		if (!req.body.email) {
			isValid = false;
			requiredFields.push("Email");
		}

		if (!isValid) {
			message = requiredFields.length > 1 ? `${requiredFields.join(', ')} are required.` : `${requiredFields.join(',')} is required.`;
			resp = createResponse(message, {})
			res.status(400);
			return res.json(resp);
		} else {
			next(req, res, registerUser);
		}
	}

	const checkIfUserAlreadyExists = (req, res, next) => {
		let resp;
		User.findOne({email: req.body.email})
			.exec((err, user) => {
				if (err) {
					resp = createResponse(err, {});
					res.status(500);
					return res.json(resp);
				}
				if (user) {
					resp = createResponse("`Email` already exists", {});
					res.status(409);
					return res.json(resp);
				} else {
					next(req, res);
				}
			});
	}

	const registerUser = (req, res) => {
		let resp;
		//console.log(req.body);
		let user = new User(req.body);
		Role.findOne({role: "student"})
			.exec(async (err, role) => {
				if (err) {
					resp = createResponse(err, {});
					res.status(500);
					return res.json(resp);
				}
				if (role) {
					user.roles = [role._id];
					user = await user.save();

					const roles = [role];
					// console.log(roles);
					// console.log(user._id);
					let payload = {
						_id: user._id,
						roles: roles.map(role => role['role'])
					};
					// console.log(payload);
					const authToken = authTokenService.generateToken(payload);

					resp = createResponse("Registration Successful", {user: user.toJSON(), authToken: authToken});
					res.status(201);
					return res.json(resp);
				}
			});
	}

	const register = (req, res) => {
		validateAndRegisterUser(req, res, checkIfUserAlreadyExists);
	}

	const login = (req, res) => {
		let resp;
		const query = {};
		query.email = req.body.email;

		User.findOne(query)
			.populate('roles')
			.exec((err, user) => {
				if (err) {
					resp = createResponse(err, {});
					res.status(500);
					return res.json(resp);
				}

				if (user) {
					const validCreds = userService.verifyPassword(req.body.password, user.password);
					const currentTime = Math.floor(Date.now() / 1000);
					const retryTime = new Date(user.retryAfter).getTime();
					if (user.unSuccessfulLoginAttempt > 5 && currentTime < retryTime) {
						let retrySeconds = retryTime - currentTime;
						let minutes = Math.floor(retrySeconds / 60);
						let seconds = retrySeconds - minutes * 60;
						let result = {
							retryTime: {
								minutes: minutes,
								seconds: seconds
							}
						}
						res.status(401);
						resp = createResponse(`Too many unsuccessful attempts.`, result);
						res.json(resp);
					} else if (validCreds) {
						let payload = {
							_id: user._id,
							roles: user.roles.map(
								role => role['role']
							)
						};
						console.log(payload);
						const authToken = authTokenService.generateToken(payload);

						const result = {
							"user": user,
							"authToken": authToken
						}
						resp = createResponse("Login Successful", result);
						res.status(201);

						return res.json(resp);
					} else {
						if (user.unSuccessfulLoginAttempt > 5) {
							user.unSuccessfulLoginAttempt = 1
						} else if (user.unSuccessfulLoginAttempt < 5) {
							user.unSuccessfulLoginAttempt += 1;
						} else {
							user.unSuccessfulLoginAttempt += 1;
							user.retryAfter = currentTime + 600;
						}
						user.save((err) => {
							if (err) {
								res.send(err);
							} else {
								res.status(401);
								resp = createResponse("Incorrect username or password.", {});
								res.json(resp);
							}
						});

					}
				} else {
					res.status(401);
					resp = createResponse("Incorrect username or password.", {});
					res.json(resp);
				}
			});
	}

	const forgotPassword = async (req, res) => {
		let signOptions = {
			expiresIn: "1h",
			algorithm: "RS256"
		};

		console.log(req.body);
		const {email, currURL} = req.body;
		const query = {"email": email}
		let resp;
		try {
			let user = await User.findOne(query);
			// console.log(user);
			if (user) {
				console.log('inside if');
				const token = jwt.sign({_id: user._id}, privateKEY, signOptions);
				console.log(token);
				let forgotpassword = ForgotPassword({token: token, userId: user._id});
				console.log(forgotpassword);
				await forgotpassword.save();
				console.log('saved');
				let htmlMessage = `Hello ${user.firstName} ${user.lastName},
		 		<p>Please click the link below to reset your password</p>
		 		<p><a href="${currURL}/changePassword?token=${token}">${currURL}/changePassword?token=${token}</a></p>
		 		<p>Note: The above link is only valid for 1 hour.</p>
		 		<br>
		 		<br>
		 		Stacklearner.
		 		`;
				console.log('calling send mail');
				sendMail(user.email, 'Password reset', htmlMessage);
				resp = createResponse(`Email sent to ${user.email}. Please check your email.`, {});
				res.status(200);
				res.json(resp);
			} else {
				resp = createResponse(`Email id you entered is not valid.`, {});
				res.status(400);
				res.json(resp);
			}
		} catch (e) {
			console.log(e);
			resp = createResponse(e, {});
			res.status(500);
			res.json(resp);
		}
		// console.log('sending email');
		// sendMail("daksh.patel@dal.ca","hello","<h1>world</h1>")
	}

	const changePassword = async (req, res) => {
		let resp;
		let verifyOptions = {
			expiresIn: "1h",
			algorithm: ["RS256"]
		};
		const {token, newPassword} = req.body;
		let legit;
		try {
			legit = jwt.verify(token, publicKEY, verifyOptions);
			if (!legit) {
				//console.log('throwing');
				throw new Error("Token invalid");
			}
		} catch (e) {
			console.log(e);
			res.send(e.message);
		}

		if (legit) {
			console.log(legit);
			let user = await User.findById(legit['_id']);
			console.log(user);
			console.log(newPassword);
			user.password = newPassword;
			console.log(user.password);
			user.save((err) => {
				if (err) {
					return res.send(err);
				}
				resp = createResponse("Password updated successfully.", {user: user});
				return res.json(resp);
			})
		}

	}

	const logout = (req, res) => {
		let resp;
		const usernameOrToken = authTokenService.getAuthTokenFromReq(req, res);
		// console.log(usernameOrToken);
		AuthToken.findOne({token: usernameOrToken})
			.exec((err, authToken) => {
				if (err) {
					res.status(500);
					resp = createResponse(err, {});
					res.json(resp);
				}
				if (authToken) {
					authToken.isActive = false;
					authToken.save();
					resp = createResponse("Successully Logged Out", {});
					res.status(200);
					return res.json(resp);
				}
			})
	}

	const getUser = (req, res) => {
		const {user} = req;
		//console.log(user);
		const result = {user: req.user};
		const resp = createResponse("Token valid", result);
		res.status(200);
		res.json(resp);
	}

	const updateUserProfile = (req, res) => {
		let resp;
		const {user} = req;
		//console.log(user);
		if (req.body._id) {
			delete req.body._id;
		}
		//console.log(user);
		//console.log(req.body);
		Object.entries(req.body).forEach((item) => {
			const key = item[0];
			const value = item[1];
			user[key] = value;
		});
		//console.log(user);
		req.user.save((err) => {
			if (err) {
				return res.send(err);
			}
			resp = createResponse("Profile updated successfully.", {user: user});
			return res.json(resp);
		})
	}

	return {get, register, login, logout, getUser, updateUserProfile, forgotPassword, changePassword};
}

module.exports = userController;
