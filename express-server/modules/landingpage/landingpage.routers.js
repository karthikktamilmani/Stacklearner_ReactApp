// Import core dependencies
const express = require('express');

// Import controllers
const { getAllProjects } = require('./landingpage.controllers');

// Revealing module pattern
const router = () => {
    // Instantiate express router for learning path module
    const landingPageRouter = express.Router();

    // PROJECT ROUTES

    // Route to GET all projects from DB
    landingPageRouter.route('/projects').get((req, res) => getAllProjects(req, res));

    // Return router after attaching routes to it
    return landingPageRouter;
}

module.exports = router;