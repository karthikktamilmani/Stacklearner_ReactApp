// Import mongoose and its schema constructor
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Document Schema - Project
const ProjectSchema = new Schema({
	projectTitle: {
		type: String,
		required: true
	},
	projectNumber: {
		type: Number,
		required: true
	},
	projectDescription: {
		type: String,
		required: true
	},
	projectDemoLink: {
		type: String,
		required: true
	},
	projectImage: {
		type: String,
		required: true
	},
	projectAccessLevel: {
		type: String,
		required: true
	},
	projectLengthHours: {
		type: Number
	},
	projectLengthMinutes: {
		type: Number
	}
});

// Document Schema - Module
const ModuleSchema = new Schema({
	moduleProjectID: {
		type: mongoose.Types.ObjectId,
		ref: 'Project',
		required: true
	},
	moduleTitle: {
		type: String,
		required: true
	},
	moduleNumber: {
		type: Number,
		required: true
	}
});

// Document Schema - Tutorial
const tutorialSchema = new Schema({
	tutorialModuleID: {
		type: mongoose.Types.ObjectId,
		ref: 'Module'
	},
	tutorialProjectID: {
		type: mongoose.Types.ObjectId,
		ref: 'Project'
	},
	tutorialTitle: {
		type: String,
		required: true
	},
	tutorialNumber: {
		type: Number,
		required: true
	},
	tutorialVideoURL: {
		type: String,
		required: true
	}
});

// Map schemas to documents and collections and create models
const Project = mongoose.model('Project', ProjectSchema, 'projects');
const Module = mongoose.model('Module', ModuleSchema, 'modules');
const Tutorial = mongoose.model('Tutorial', tutorialSchema, 'tutorials');

// Export document models
module.exports = { Project, Module, Tutorial };
