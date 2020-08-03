/**
 * API Store - Contains backend routers
 *
 * @author :: Karthikk Tamil Mani, B00838575
 */

// Import core dependencies
const express = require('express');
const authTokenServices = require('../authentication/authtoken.service');

// Import controllers
const {
	toggleLikes,
	addNewComment,
	addNewDiscussion,
	getAllDiscussions
} = require('./discussion.controllers');

// Revealing module pattern
const router = () => {
	const discussionRouter = express.Router();
	const authTokenService = authTokenServices();

	discussionRouter.route('/details').get(getAllDiscussions);

	discussionRouter.route('/details').post(addNewDiscussion);

	discussionRouter.route('/likes').post(toggleLikes);

	discussionRouter.route('/comment').post(addNewComment);

	return discussionRouter;
}


module.exports = router;
