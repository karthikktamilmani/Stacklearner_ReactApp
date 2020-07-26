// Author: Mansoor Ghazi

// Import core dependencies
const express = require('express');

// Import controllers
const { getAllProjects, getOneProject, createProject, updateProject, deleteProject, getAllModules, createModule, updateModule, deleteModule, createTutorial, getOneTutorial, getTutorialsOfModule, getTutorialsOfProject, getOneTutorialOfProject } = require('./instructionmanagement.controllers');

// Revealing module pattern
const router = () => {
    // Instantiate express router for learning path module
    const instructionManagementRouter = express.Router();

    // PROJECT ROUTES

    // Route to GET all projects from DB
    instructionManagementRouter.route('/projects').get((req, res) => getAllProjects(req, res));

    // Route to GET a single project and its curriculum from DB
    instructionManagementRouter.route('/projects/:projectID').get((req, res) => getOneProject(req, res));

    // Route to create a new project via a POST request
    instructionManagementRouter.route('/createproject').post((req, res) => createProject(req, res));

    // Route to update a project via a PATCH request
    instructionManagementRouter.route('/updateproject/:projectID').patch((req, res) => updateProject(req, res));

    // Route to delete a project via a DELETE request
    instructionManagementRouter.route('/deleteproject/:projectID').delete((req, res) => deleteProject(req, res))

    // MODULE ROUTES
    
    // Route to get all modules of a project via a GET request
    instructionManagementRouter.route('/projects/:projectID/modules').get((req, res) => getAllModules(req, res));

    // Route to create a new module for a project via a POST request
    instructionManagementRouter.route('/projects/:projectID/createmodule').post((req, res) => createModule(req, res));

    // Route to update a module via a PATCH request
    instructionManagementRouter.route('/updatemodule/:moduleID').patch((req, res) => updateModule(req, res));

    // Route to delete a module via a DELETE request
    instructionManagementRouter.route('/deletemodule/:moduleID').delete((req, res) => deleteModule(req, res));

    // TUTORIAL ROUTES

    // Route to get a tutorial from DB via a GET request
    instructionManagementRouter.route('/tutorials/:tutorialID').get((req, res) => getOneTutorial(req, res));

    // Route to get all tutorials of a module via a GET request
    instructionManagementRouter.route('/modules/:moduleID/tutorials').get((req, res) => {
        getTutorialsOfModule(req, res);
    });

    // Route to get all tutorials of a project via a GET request
    instructionManagementRouter.route('/projects/:projectID/tutorials').get((req, res) => {
        getTutorialsOfProject(req, res);
    });

    // Route to get a project's tutorial from the DB via a GET request
    instructionManagementRouter.route('/projects/:projectID/tutorials/:tutorialID').get((req, res) => getOneTutorialOfProject(req, res));

    // Route to create a tutorial via a POST request
    instructionManagementRouter.route('/projects/:projectID/modules/:moduleID/createtutorial').post((req, res) => createTutorial(req, res));

    // Return router after attaching routes to it
    return instructionManagementRouter;
}

module.exports = router;