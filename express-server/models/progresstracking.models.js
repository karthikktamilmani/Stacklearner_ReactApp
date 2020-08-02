// Author: Ravi Patel


// Import core dependencies
const mongoose = require('mongoose');
const {Schema} = mongoose;

// Define schema for Progress resource - studentID to be added later
const ProgressSchema = Schema({
	studentID: {
		type: mongoose.Types.ObjectId
	},
	projectID: {
		type: mongoose.Types.ObjectId
	},
	tutorialID: {
		type: mongoose.Types.ObjectId
	}
});

// Attach schemas to respective collections
const Progress = mongoose.model('Progress', ProgressSchema, 'progresses');

// Export models through object export pattern
module.exports = {Progress};
