// Author: Devarshi Pandya
// Email: devarshi.pandya@dal.ca
// Banner ID: B00840003

/* Import code dependencies. In this case, these are
learning path module's data models. */
const {Project} = require('../../models/learningpath.models');

// PROJECT RESOURCE CONTROLLERS

// Controller to fetch all projects from DB
const getAllProjects = (req, res) => {
	// Create query to find all projects and populate the result with project's modules
	const query = Project.find({}, {_v: 0, projectNumber: 0}).sort({projectNumber: 1});
	console.log('Fetching projects');
	// Execute query and return array of projects
	query.exec((err, projects) => {
		if (err) {
			res.status(400).json({message: `Following error was encountered: ${err}`});
		} else if (projects.length === 0) {
			res.status(404).json({message: 'No projects found.'});
		} else {
			res.status(200).json(projects);
		}
	});
}

// Export controllers through object export pattern
module.exports = {getAllProjects}


