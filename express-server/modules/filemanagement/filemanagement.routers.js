// Import dependencies
const express = require('express');
const { getImage } = require('./filemanagement.controllers');

// Function for revealing module pattern
const fileManagementRouter = () => {
    // Instantiate express router
    const router = express.Router();

    // IMAGE RESOURCE Routes

    // Setup route - GET an image from public
    router.route('/:imageName').get((req, res) => getImage(req, res));

    return router;
}

module.exports = fileManagementRouter;