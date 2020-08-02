// Author: Ravi Patel


/* Import code dependencies. In this case, these are
learning path module's data models. */
const mongoose = require('mongoose');
const {Progress} = require('../../models/progresstracking.models');

// Controller to get all finished tutorials from the progresses collection
function getAllFinishedTutorials(req, res) {
	// Create query to find all finished tutorials of a specific project
	const {projectID, studentID} = req.params;
	const query = Progress.find({studentID, projectID}, {tutorialID: 1, _id: 0});

	// Execute query and return array of projects
	query.exec((err, tutorials) => {
		if (err) {
			res.status(400).json({message: `Following error was encountered: ${err}`});
		} else if (!tutorials) {
			res.status(404).send('No finished tutorials found.');
		} else {
			res.status(200).json(tutorials);
		}
	});
}

// Controller to add a finished tutorials to the progresses collection
function markTutorialAsFinished(req, res) {
	// Extract studentID, projectID and tutorialID
	const {studentID, projectID, tutorialID} = req.body

	const tutorialToMarkAsFinished = new Progress({studentID, projectID, tutorialID});

	// Save finished tutorial's ID
	tutorialToMarkAsFinished.save().then(() => {
		res.status(200).send('Tutorial finished.')
	}).catch((err) => {
		console.log(err)
	});
}

// Controller to get total number (count) of all finished tutorials
function getCountOfFinishedTutorialsForAllProjects(req, res) {
	// Extract studentID
	const {studentID} = req.params;
	// Create query to get count via aggregation
	Progress.aggregate([
		{
			$match: {"studentID": new mongoose.Types.ObjectId(studentID)}
		},
		{
			$group: {
				_id: '$projectID',
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
module.exports = {getAllFinishedTutorials, markTutorialAsFinished, getCountOfFinishedTutorialsForAllProjects};
