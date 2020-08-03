/**
 * API Store - Contains the backend services
 *
 * @author :: Karthikk Tamil Mani, B00838575
 */

/* Import code dependencies. In this case, these are
learning path module's data models. */
const {
	Discussion,
	Likes,
	Comments
} = require("../../models/discussion.model");

const User = require('../../models/user.model');

const fetchUserInfo = async (userIDs) => {

	console.log("userIDSss", userIDs);
	const query = User.find({
		'_id': {
			$in: userIDs
		}
	});

	try {
		const users = await query.exec();
		const response = {};
		if (users) {
			users.forEach((eachUser) => {
				response[eachUser["_id"]] = eachUser["firstName"] + " " + eachUser["lastName"];
			});
			console.log("user res ", response);
		}

		return response;
	} catch (error) {
		return error;
	}
}

const getLikesInfo = async (discussionID) => {
	const query = Likes.find({
		'discussionID': discussionID
	});

	try {
		const likes = await query.exec();
		if (likes && likes.length) {
			return likes[0]["userList"];
		}

		return [];
	} catch (error) {
		return error;
	}
};

const getComments = async (discussionID) => {
	const query = Comments.find({
		'discussionID': discussionID
	});

	try {
		const comments = await query.exec();
		const response = [];
		if (comments) {
			const userIDList = []
			comments.forEach((eachComment) => {
				userIDList.push(eachComment["authorID"]);
			});
			//
			let userResponse;
			if (userIDList.length > 0) {
				userResponse = await fetchUserInfo(userIDList);
				// console.log("ttttttttttttt", userResponse);
			}
			//
			comments.forEach((eachComment) => {
				let eachCommentObj = {};
				eachCommentObj["_id"] = eachComment["_id"];
				eachCommentObj["content"] = eachComment["content"];
				eachCommentObj["createdAt"] = eachComment["createdAt"];
				eachCommentObj["authorName"] = userResponse[eachComment["authorID"]];
				response.push(eachCommentObj);
			});
		}
		return response;
	} catch (error) {
		return error;
	}
}

// PROJECT RESOURCE CONTROLLERS
const getAllDiscussions = async (req, res) => {
	const projectID = req.query.projectID;
	const query = Discussion.find({
		projectID: projectID
	});

	query.exec(async (err, discussion) => {
		if (err) {
			res
				.status(400)
				.json({
					message: `Following error was encountered: ${err}`
				});
		} else if (!discussion) {
			res.status(404).json({
				status: "error",
				message: "No discussion thread found for project."
			});
		} else {
			try {
				let userIDList = []
				discussion.forEach((eachDiscussion) => {
					userIDList.push(eachDiscussion["authorID"]);
				});

				let userResponse;
				if (userIDList.length > 0) {
					userResponse = await fetchUserInfo(userIDList);
					// console.log("ttttttttttttt", userResponse);

				}

				let discussions = [];
				for (var iter = 0; iter < discussion.length; iter++) {
					let eachDiscussion = discussion[iter];
					let eachDiscussionObj = {};
					eachDiscussionObj["_id"] = eachDiscussion["_id"];
					eachDiscussionObj["content"] = eachDiscussion["content"];
					eachDiscussionObj["createdAt"] = eachDiscussion["createdAt"];
					eachDiscussionObj["authorName"] = userResponse[eachDiscussion["authorID"]];
					eachDiscussionObj["likes"] = await getLikesInfo(eachDiscussion["_id"]);
					eachDiscussionObj["replies"] = await getComments(eachDiscussion["_id"]);
					discussions.push(eachDiscussionObj);
				}

				// console.log("ressssss", discussions);
				res.status(200).json({
					status: "success",
					discussions: discussions
				});

			} catch (error) {
				res
					.status(400)
					.json({
						message: `Following error was encountered: ${error}`
					});
			}

		}
	});
};

const addNewDiscussion = (req, res) => {
	req.body.createdAt = new Date();
	const discussion = new Discussion(req.body);
	// discussion["createdAt"] = new Date();
	discussion
		.save()
		.then(() => {
			res.status(200).send({
				status: "success",
				key: discussion._id
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(400).json({
				status: "error",
				message: `Following error was encountered: ${err}`,
			});
		});
};

const addNewComment = (req, res) => {
	req.body.createdAt = new Date();
	const comment = new Comments(req.body);
	// discussion["createdAt"] = new Date();
	comment
		.save()
		.then(() => {
			res.status(200).send({
				status: "success",
				key: comment._id
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(400).json({
				status: "error",
				message: `Following error was encountered: ${err}`,
			});
		});
};

const updateLikes = async (discussionID, userList) => {
	const filter = {
		discussionID: discussionID
	};

	const query = Likes.findOneAndUpdate(filter, {
		userList: userList
	}, {
		new: true,
		useFindAndModify: false
	});

	// Execute query
	try {
		const result = await query.exec();
		if (result) {
			return true;
		}
	} catch (error) {
	}
	return false;
}

const toggleLikes = (req, res) => {
	const discussionID = req.query.discussionID;
	const query = Likes.find({
		'discussionID': discussionID
	});
	const userID = req.query.userID;
	// discussion["createdAt"] = new Date();
	query.exec(async (err, likes) => {
		if (err) {
			res
				.status(400)
				.json({
					message: `Following error was encountered: ${err}`
				});
		} else if (likes && likes.length) {
			let userIDList = likes[0]["userList"];
			// console.log("userlist", likes[0]["userList"]);
			if (userIDList.includes(userID)) {
				userIDList.splice(userIDList.indexOf(userID), 1);
			} else {
				userIDList.push(userID);
			}
			if (await updateLikes(discussionID, userIDList)) {
				res.status(200).send({
					status: "success"
				});
			} else {
				res.status(200).send({
					status: "error"
				});
			}


		} else {
			const likesObj = {
				discussionID: discussionID,
				userList: [userID]
			};
			const likesAddQuery = new Likes(likesObj);
			likesAddQuery
				.save()
				.then(() => {
					res.status(200).send({
						status: "success"
					});
				})
				.catch((err) => {
					console.log(err);
					res.status(400).json({
						status: "error",
						message: `Following error was encountered: ${err}`,
					});
				});
		}

	})
};

// Export controllers through object export pattern
module.exports = {
	toggleLikes,
	addNewComment,
	addNewDiscussion,
	getAllDiscussions
};
