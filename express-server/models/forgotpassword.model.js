// Author: Daksh Patel

// Model for storing the authTokens and its associated user when user resets their
// password


const mongoose = require('mongoose');
// const userServices = require('./userServices');
const {Schema} = mongoose;

// const userService = userServices();

const forgotPasswordModel = new Schema(
	{
		token: {type: String},
		userId: {type: Schema.Types.ObjectId, ref: 'users'},
		isActive: {type: Boolean, default: true},
	}
)
// forgotPasswordModel.set('toJSON', {
// 	transform: function(doc, ret, opt) {
// 		delete ret['password'];
// 		return ret;
// 	}
// })
module.exports = mongoose.model('forgotPassword', forgotPasswordModel);
