// Import packages and core dependencies using CommonJS modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import module routers via revealing module pattern
const landingPageModuleRouter = require('./modules/landingpage/landingpage.routers')();
const learningPathModuleRouter = require('./modules/learningpath/learningpath.routers')();
const instructionManagementModuleRouter = require('./modules/instructionmanagement/instructionmanagement.routers')();
const progressTrackingModuleRouter = require('./modules/progresstracking/progresstracking.routers')();
const userManagementModuleRouter = require('./modules/usermanagement/user.router')();
const paymentModuleRouter = require('./modules/payment/payment.routers')();
const feedbackManagementRouter = require('./modules/feedbackmanagement/feedbackmanagement.router')();
const fileManagementModuleRouters = require('./modules/filemanagement/filemanagement.routers')();
const discussionModuleRouter = require('./modules/discussion/discussion.routers')();


// Setup express app and middleware
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Setup connection to MongoDB server
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.once('open', () => console.log(`Connected to local instance of ${process.env.DB_NAME} MongoDB database`));

// Setup routes for modules
app.use('/landingpage', landingPageModuleRouter);
app.use('/learningpath', learningPathModuleRouter);
app.use('/instructionmanagement', instructionManagementModuleRouter);
app.use('/trackprogress', progressTrackingModuleRouter);
app.use('/usermanagement', userManagementModuleRouter);
app.use('/payment', paymentModuleRouter);
app.use('/feedback', feedbackManagementRouter);
app.use('/public', fileManagementModuleRouters);
app.use('/discussion', discussionModuleRouter);

// Start server and listen to incoming requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`App listening on ${PORT}`));
