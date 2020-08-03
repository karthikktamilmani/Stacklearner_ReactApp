// Import dependencies
const express = require('express');
const {
	getAllProjects, getProjectsCount, getOneProject, createProject, updateProject, deleteProject, getAllModules, getOneModule,
	createModule, updateModule, deleteModule, getAllTutorials, getOneTutorial, createTutorial,
	updateTutorial, deleteTutorial
} = require('./instructionmanagement.controllers');
const {fileUploader} = require('../filemanagement/filemanagement.middlewares');
const authTokenServices = require('../authentication/authtoken.service');
// Function for revealing module pattern
const instructionManagementRouter = () => {
	// Instantiate express router
	const router = express.Router();
	const authTokenService = authTokenServices();

	// PROJECT RESOURCE Routes

	// Setup route - GET all projects from DB
	router.route('/projects').get(authTokenService.validateToken, (req, res) => getAllProjects(req, res));

	// Setup route - GET total number of projects from DB
	router.route('/projects/count').get(authTokenService.validateToken, (req, res) => getProjectsCount(req, res));

	// Setup route - GET one project from DB
	router.route('/projects/:projectID').get(authTokenService.validateToken, (req, res) => getOneProject(req, res));

	// Setup route - POST project to DB
	router.route('/projects/createproject').post(authTokenService.validateToken, (req, res) => createProject(req, res))

	// Setup route - PATCH (update) project
	router.route('/projects/:projectID/updateproject').patch(authTokenService.validateToken, (req, res) => updateProject(req, res));

	// Setup route - DELETE project
	router.route('/projects/:projectID/deleteproject').delete((req, res) => deleteProject(req, res));

	// MODULE RESOURCE Routes

	// Setup route - GET all modules ot a project from DB
	router.route('/projects/:projectID/modules').get((req, res) => getAllModules(req, res));

	// Setup route - GET one module from DB
	router.route('/modules/:moduleID').get((req, res) => getOneModule(req, res));

	// Setup route - POST module to DB
	router.route('/modules/createmodule').post((req, res) => createModule(req, res));

	// Setup route - PATCH (update) module
	router.route('/modules/:moduleID/updatemodule').patch((req, res) => updateModule(req, res));

	// Setup route - DELETE module
	router.route('/modules/:moduleID/deletemodule').delete((req, res) => deleteModule(req, res));

	// TUTORIAL RESOURCE Routes

	// Setup route - GET tutorials of module
	router.route('/modules/:moduleID/tutorials').get((req, res) => getAllTutorials(req, res));

	// Setup route - GET one tutorial
	router.route('/tutorials/:tutorialID').get((req, res) => getOneTutorial(req, res));

	// Setup route - POST tutorial
	router.route('/tutorials/createtutorial').post((req, res) => createTutorial(req, res));

	// Setup route - PATCH (update) tutorial
	router.route('/tutorials/:tutorialID/updatetutorial').patch((req, res) => updateTutorial(req, res));

	// Setup route - DELETE tutorial
	router.route('/tutorials/:tutorialID/deletetutorial').delete((req, res) => deleteTutorial(req, res));

	return router;
}

module.exports = instructionManagementRouter;

