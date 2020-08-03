// Author: Mansoor Ghazi

/* Import code dependencies. In this case, these are
learning path module's data models. */
const {Project, Module, Tutorial} = require('../../models/learningpath.models');

// PROJECT RESOURCE CONTROLLERS

// Controller to fetch all projects from DB
const getAllProjects = (req, res) => {
	// Create query to find all projects and populate the result with project's modules
	const query = Project.find({}, {_v: 0}).sort({projectNumber: 1});

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

// Controller to fetch single project by ID, and its modules, from DB
const getOneProject = (req, res) => {
	// Get projectID from query parameters and create a findById query
	const projectID = req.params.projectID;
	const query = Project.findById(projectID).populate('modules');

	// Execute query - return project and its modules
	query.exec((err, project) => {
		if (err) {
			res.status(400).json({message: `Following error was encountered: ${err}`});
		} else if (!project) {
			res.status(404).json({message: 'No project found.'});
		} else {
			res.status(200).json(project);
		}
	});
}

// MODULE RESOURCE CONTROLLERS

// Controller to get all modules of a project from the modules collection
function getAllModules(req, res) {
	// Get projectID from query parameters to fetch only project's modules
	// Create query to get modules by projectID
	const moduleProjectID = req.params.projectID;
	const query = Module.find({moduleProjectID});

	//  Execute query and return all modules that have the same projectID
	query.exec((err, modules) => {
		if (err) {
			res.status(400).json({message: `Following error was encountered: ${err}`});
		} else if (!modules) {
			res.status(404).json({message: 'No modules found.'});
		} else {
			res.status(200).json(modules);
		}
	});
}

// TUTORIAL RESOURCE CONTROLLERS

// Controller to get a tutorial
function getOneTutorial(req, res) {
	// Get tutorialID from query parameters and create a findById query
	const tutorialID = req.params.tutorialID;
	const query = Tutorial.findById(tutorialID)

	// Execute query - return project and its modules
	query.exec((err, tutorial) => {
		if (err) {
			res.status(400).json({message: `Following error was encountered: ${err}`});
		} else if (!tutorial) {
			res.status(404).send('Tutorial not found.');
		} else {
			res.status(200).json(tutorial);
		}
	});
}

// Controller to get all tutorials of a project
function getTutorialsOfProject(req, res) {
	// Get projectID from query parameters to fetch only project's tutorials
	// Create query to get tutorials by projectID
	const tutorialProjectID = req.params.projectID;
	const query = Tutorial.find({tutorialProjectID}).populate('tutorialModuleID');

	//  Execute query and return all modules that have the same projectID
	query.exec((err, tutorials) => {
		if (err) {
			res.status(400).json({message: `Following error was encountered: ${err}`});
		} else if (!tutorials) {
			res.status(404).send('No tutorials found.');
		} else {
			res.status(200).json(tutorials);
		}
	});
}

// Controller to get a specific tutorial of a project
function getOneTutorialOfProject(req, res) {
	res.send('Getting tutorial of a project');
}

// Controller to get all tutorials of a module
function getTutorialsOfModule(req, res) {
	// Get projectID from query parameters to fetch only project's tutorials
	// Create query to get tutorials by projectID
	const tutorialModuleID = req.params.moduleID;
	const query = Tutorial.find({tutorialModuleID});

	//  Execute query and return all modules that have the same projectID
	query.exec((err, tutorials) => {
		if (err) {
			res.status(400).json({message: `Following error was encountered: ${err}`});
		} else if (!tutorials) {
			res.status(404).send('No tutorials found.');
		} else {
			res.status(200).json(tutorials);
		}
	});
}

// Controller to get count of all tutorials grouped by project
function getTutorialCountGroupedByProject(req, res) {
	Tutorial.aggregate([
		{
			$group: {
				_id: '$tutorialProjectID',
				count: {$sum: 1}
			}
		}
	]).then((counts) => {
		res.status(200).json(counts)
	}).catch((err) => {
		console.log(err);
	})
}

// Export controllers through object export pattern
module.exports = {
	getAllProjects,
	getOneProject,
	getAllModules,
	getOneTutorial,
	getOneTutorialOfProject,
	getTutorialsOfModule,
	getTutorialsOfProject,
	getTutorialCountGroupedByProject
}


