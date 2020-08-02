// Author: Daksh Patel

// Model for storing the user information

const mongoose = require('mongoose');
const userServices = require('../modules/usermanagement/user.service');
const {Schema} = mongoose;

const userService = userServices();

const userModel = new Schema(
	{
		firstName: {type: String},
		lastName: {type: String},
		email: {type: String},
		password: {type: String, set: userService.hashPassword},
		roles: [{type: Schema.Types.ObjectId, ref: 'roles'}],
		lastActive: {type: Date, default: Date.now},
		unSuccessfulLoginAttempt: {type: Number, default: 0},
		retryAfter: {type: Date}
	}
)
userModel.set('toJSON', {
	transform: function (doc, ret, opt) {
		delete ret['password'];
		return ret;
	}
})
module.exports = mongoose.model('users', userModel);
