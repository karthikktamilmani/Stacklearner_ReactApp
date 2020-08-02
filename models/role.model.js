// Author: Daksh Patel

// Model for storing different roles


const mongoose = require('mongoose');

const {Schema} = mongoose;

const roleModel = new Schema(
	{
		role: {type: String}
	}
)

module.exports = mongoose.model('roles', roleModel);
