// Author: Daksh Patel

// Model for storing the feedback of the project by the student


const mongoose = require('mongoose');
// const userServices = require('./userServices');
const {Schema} = mongoose;

// const userService = userServices();

const feedbackModel = new Schema(
	{
		comment: {type: String},
		rating: {type: Number},
		projectID: {type: Schema.Types.ObjectId, ref: 'projects'},
		userID: {type: Schema.Types.ObjectId, ref: 'users'}
	}
)

module.exports = mongoose.model('feedbacks', feedbackModel);
