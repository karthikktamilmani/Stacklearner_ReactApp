// Author: Daksh Patel

// All the services related to authentication tokens


const jwt = require('jsonwebtoken');
const fs = require('fs');
const createResponse = require('../../globals');
require('dotenv').config();

const privateKEY = fs.readFileSync('./modules/authentication/private.key', 'utf8');
const publicKEY = fs.readFileSync('./modules/authentication/public.key', 'utf8');

// const privateKEY=process.env.PRIVATE_KEY
// const publicKEY=process.env.PUBLIC_KEY

// console.log(privateKEY,publicKEY);

const User = require('../../models/user.model');
const AuthToken = require('../../models/authtoken.model');

function authTokenService() {
	let signOptions = {
		expiresIn: "1h",
		algorithm: "RS256"
	};
	let verifyOptions = {
		expiresIn: "1h",
		algorithm: ["RS256"]
	};

	const verifyToken = (err, user, req, res, next) => {
		// console.log('verifyToken');
		//console.log(req);
		const currentRequestUrl = req.route.path;
		let resp;
		if (err) {
			resp = createResponse(err, {});
			res.status(500);
			return res.json(resp);
		}
		if (user) {
			req.user = user;
			AuthToken.findOne({userId: user._id, token: req.usernameOrToken})
				.exec((err, authToken) => {
					if (err) {
						resp = createResponse(err, {});
						res.status(500);
						return res.json(resp);
					}
					if (authToken && authToken.isActive) {
						if (currentRequestUrl.indexOf('instructor') !== -1) {
							if (user.roles.map(role => role['role']).includes('instructor')) {
								next();
							} else {
								resp = createResponse('Unauthorized access', {});
								res.status(401);
								return res.json(resp);
							}
						} else {
							// console.log('going next');
							next();
						}
					} else {
						resp = createResponse("Session Timeout! Please login again.", {});
						res.status(440);
						return res.json(resp);
					}
				});
		}
	};

	const generateToken = (payload) => {
		let token = jwt.sign(payload, privateKEY, signOptions);
		let authToken = {
			token: token,
			userId: payload['_id'],
			isActive: true
		};
		//console.log('generated token', token);
		authToken = new AuthToken(authToken);
		authToken.save();
		// console.log("Token :" + token);
		return token;
	}

	const getAuthTokenFromReq = (req, res) => {
		let resp;
		if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
			// console.log('inside if');
			resp = createResponse('Missing Authorization Header', {});
			res.status(401);
			return res.json(resp);
		}

		const base64Credentials = req.headers.authorization.split(' ')[1];
		const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
		const [usernameOrToken, password] = credentials.split(':');
		return usernameOrToken;
	}

	const validateToken = async (req, res, next) => {
		// console.log('getting auth token');
		const usernameOrToken = getAuthTokenFromReq(req, res);
		req.usernameOrToken = usernameOrToken;
		let legit, resp;
		try {
			legit = jwt.verify(usernameOrToken, publicKEY, verifyOptions);
			if (!legit) {
				//console.log('throwing');
				throw new Error("Token invalid");
			}
		} catch (e) {
			try {
				const authToken = await AuthToken.findOne({token: usernameOrToken});
				//console.log(authToken);
				if (authToken) {
					authToken.isActive = false;
					authToken.save();
					resp = createResponse("Session Timeout! Please login again.", {});
					res.status(400);
					return res.json(resp);
				} else {
					resp = createResponse("Token invalid! Please login again.", {});
					res.status(404);
					return res.json(resp);
				}
			} catch (e) {
				console.log(e);

			}
		}
		//console.log('legit', legit);
		if (legit) {
			User.findById(legit['_id'])
				.populate('roles')
				.exec((err, user) => verifyToken(err, user, req, res, next));
		} else {
			resp = createResponse("Session Timeout! Please login again.", {});
			res.status(404);
			return res.json(resp);
		}
	}


	return {generateToken, validateToken, getAuthTokenFromReq}
}

module.exports = authTokenService;
