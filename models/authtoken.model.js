// Author: Daksh Patel

// Model for storing the authTokens and its associated user with authToken's 
// validity status

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
