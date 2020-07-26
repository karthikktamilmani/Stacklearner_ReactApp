// Import core dependencies
const express = require('express');
const authTokenService = require('../authentication/authtoken.service')();

// Import controllers
const { getAllProjects, getOneProject, getAllModules, getOneTutorial, getOneTutorialOfProject, getTutorialsOfModule, getTutorialsOfProject, getTutorialCountGroupedByProject } = require('./learningpath.controllers');

// Revealing module pattern
const router = () => {
    // Instantiate express router for learning path module
    const learningPathRouter = express.Router();

    // PROJECT ROUTES

    // Route to GET all projects from DB
    learningPathRouter.route('/projects').get(authTokenService.validateToken, (req, res) => getAllProjects(req, res));

    // Route to GET a single project and its curriculum from DB
    learningPathRouter.route('/projects/:projectID').get(authTokenService.validateToken, (req, res) => getOneProject(req, res));

    // MODULE ROUTES

    // Define route to get all modules of a project via a GET request
    learningPathRouter.route('/projects/:projectID/modules').get(authTokenService.validateToken, (req, res) => getAllModules(req, res));

    // TUTORIAL ROUTES

    // Route to get a tutorial from DB via a GET request
    learningPathRouter.route('/tutorials/:tutorialID').get(authTokenService.validateToken, (req, res) => getOneTutorial(req, res));

    // Route to get all tutorials of a module via a GET request
    learningPathRouter.route('/modules/:moduleID/tutorials').get(authTokenService.validateToken, (req, res) => {
        getTutorialsOfModule(req, res);
    });

    // Route to get all tutorials of a project via a GET request
    learningPathRouter.route('/projects/:projectID/tutorials').get(authTokenService.validateToken, (req, res) => {
        getTutorialsOfProject(req, res);
    });

    // Route to get a project's tutorial from the DB via a GET request
    learningPathRouter.route('/projects/:projectID/tutorials/:tutorialID').get(authTokenService.validateToken, (req, res) => getOneTutorialOfProject(req, res));

    // Route to get count of all tutorials grouped by project - for progress tracking calculation
    learningPathRouter.route('/tutorialcount').get(authTokenService.validateToken, (req, res) => getTutorialCountGroupedByProject(req, res));

    // Return router after attaching routes to it
    return learningPathRouter;
}

module.exports = router;