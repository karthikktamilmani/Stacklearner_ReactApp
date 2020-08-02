// Author: Daksh Patel

const express = require('express');
const feedbackManagementController = require('./feedbackmanagement.controller');
const authTokenServices = require('../authentication/authtoken.service');

const routes = () => {
	const feedbackManagementRouter = express.Router();
	const authTokenService = authTokenServices();
	const controller = feedbackManagementController();

	feedbackManagementRouter.route('/project/:projectID/save')
		.put(authTokenService.validateToken, controller.saveFeedback);

	return feedbackManagementRouter;
}

module.exports = routes;
