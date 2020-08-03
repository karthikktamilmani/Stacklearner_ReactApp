/**
 * API Store - Contains the discussion database models
 *
 * @author :: Karthikk Tamil Mani, B00838575
 */

// Import core dependencies
const mongoose = require("mongoose");
const {
	Schema
} = mongoose;


const DiscussionSchema = Schema({
	authorID: {
		type: mongoose.Types.ObjectId,
		ref: 'users',
		required: true
	},
	content: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date
	},
	projectID: {
		type: mongoose.Types.ObjectId,
		ref: 'projects',
		required: true
	}
});

const LikesSchema = Schema({
	discussionID: {
		type: mongoose.Types.ObjectId,
		ref: 'discussion',
		required: true
	},
	userList: {
		type: [mongoose.Schema.Types.ObjectId]
	}
});

const CommentsSchema = Schema({
	discussionID: {
		type: mongoose.Types.ObjectId,
		ref: 'discussion',
		required: true
	},
	authorID: {
		type: mongoose.Types.ObjectId,
		ref: 'users',
		required: true
	},
	content: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date
	}
});

const Discussion = mongoose.model("Discussion", DiscussionSchema, "discussion");
const Likes = mongoose.model("Likes", LikesSchema, "likes");
const Comments = mongoose.model("Comments", CommentsSchema, "comments");

// Export models through object export pattern
module.exports = {
	Discussion,
	Likes,
	Comments
};
