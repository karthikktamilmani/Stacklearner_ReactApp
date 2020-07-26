// Import core dependencies
const express = require('express');

// Import controllers
const { getAllFinishedTutorials, markTutorialAsFinished, getCountOfFinishedTutorialsForAllProjects } = require('./progresstracking.controllers');

// Revealing module pattern
const router = () => {
    // Instantiate express router for progress tracking module
    const progressTrackingRouter = express.Router();

    // PROGRESS TRACKING ROUTES

    // Route to GET all progress objects (finished tutorials) for a specific project from DB
    progressTrackingRouter.route('/projects/:projectID/student/:studentID/finishedtutorials').get((req, res) => getAllFinishedTutorials(req, res));

    // Route to update project's progress via POST DB that will mark the tutorial as finished
    progressTrackingRouter.route('/projects/updateprogress').put((req, res) => markTutorialAsFinished(req, res));

    // Route to get total number of finished tutorials of a project
    progressTrackingRouter.route('/projects/student/:studentID/finishedtutorialcount').get((req, res) => getCountOfFinishedTutorialsForAllProjects(req, res));

    // Return router after attaching routes to it
    return progressTrackingRouter;
}

module.exports = router;