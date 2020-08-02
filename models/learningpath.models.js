// Author: Mansoor Ghazi

// Import core dependencies
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define schema for Project resource
const ProjectSchema = Schema({
    projectTitle: {
        type: String
    },
    projectDescription: {
        type: String
    },
    projectNumber: {
        type: Number
    },
    projectDemoLink: {
        type: String
    },
    projectLengthHours: {
        type: String
    },
    projectLengthMinutes: {
        type: String
    },
    projectAccessLevel: {
        type: String
    },
    projectImageURL: {
        type: String
    }
});

// Define schema for Module resource
const ModuleSchema = Schema({
    moduleTitle: {
        type: String
    },
    moduleNumber: {
        type: Number
    },
    moduleProjectID: {
        type: mongoose.Types.ObjectId,
        ref: 'Project'
    }
});

// Define schema for Tutorial resource
const TutorialSchema = Schema({
    tutorialTitle: {
        type: String
    },
    tutorialVideoURL: {
        type: String
    },
    tutorialModuleID: {
        type: mongoose.Types.ObjectId,
        ref: 'Module'
    },
    tutorialProjectID: {
        type: mongoose.Types.ObjectId,
        ref: 'Project'
    }
});

// Attach schemas to respective collections
const Project = mongoose.model('Project', ProjectSchema, 'projects');
const Module = mongoose.model('Module', ModuleSchema, 'modules');
const Tutorial = mongoose.model('Tutorial', TutorialSchema, 'tutorials');

// Export models through object export pattern 
module.exports = { Project, Module, Tutorial };