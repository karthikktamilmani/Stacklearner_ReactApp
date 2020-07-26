// Author: Daksh Patel

const mongoose = require('mongoose');

const {Schema} = mongoose;

const authtokenModel = new Schema(
	{
		token: {type: String},
		userId: {type: Schema.Types.ObjectId, ref: 'users'},
		isActive: {type: Boolean}
	}
)

module.exports = mongoose.model('authTokens',authtokenModel);
