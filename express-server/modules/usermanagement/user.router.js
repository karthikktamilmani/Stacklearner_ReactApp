/* eslint-disable no-param-reassign */
const express = require('express');
const userController = require('./user.controller');
const authTokenServices = require('../authentication/authtoken.service');

const routes = () => {
	const userRouter = express.Router();
	const controller = userController();
	const authTokenService = authTokenServices();

	userRouter.route('/').get(controller.get);

	userRouter.route('/signup').post(controller.register);

	userRouter.route('/signin').post(controller.login);

	userRouter.route('/signout').post(authTokenService.validateToken,controller.logout);

	userRouter.route('/getuser').get(authTokenService.validateToken, controller.getUser);

	userRouter.route('/updateprofile').patch(authTokenService.validateToken, controller.updateUserProfile);

	userRouter.route('/forgotpassword').post(controller.forgotPassword);

	userRouter.route('/changepassword').post(controller.changePassword);
	//userRouter.route('/updatepassword').patch(authTokenService.validateToken, controller.updatePassword);

	return userRouter;
}

module.exports = routes;
