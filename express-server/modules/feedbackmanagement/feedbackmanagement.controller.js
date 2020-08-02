// Author: Daksh Patel

const authTokenServiceFactory = require('../authentication/authtoken.service');
const createResponse = require('../../globals');
const sendMail = require('../mailer/mailer.service');
const Feedback = require('../../models/feedback.model');

function feedbackmanagementController() {
	const authTokenService = authTokenServiceFactory();

	const saveFeedback = async (req, res) => {
		let resp;
		const {projectID} = req.params;
		let comment = req.body.comment;
		let rating = req.body.rating;
		// feedback.projectID=projectID;
		// feedback.userID=req.user._id;
		const filter = {userID: req.user._id, projectID: projectID};
		const update = {comment: comment, rating: rating};
		try {
			let feedback = await Feedback.findOneAndUpdate(filter, update, {new: true, upsert: true})
			resp = createResponse("Feedback saved successfully", {});
			res.status(201);
			res.json(resp);
		} catch (e) {
			res.status(500);
			resp = createResponse("Internal server error", {});
			res.json(resp);
		}
	}
	return {saveFeedback};
}

module.exports = feedbackmanagementController;
