const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
	content: {
		type: String,
		required: true
	},
	images: {
		type: Array
	},
	comments: [{
		type: Schema.Types.ObjectId,
		ref: 'comment'
	}],
	likes: [{
		type: Schema.Types.ObjectId,
		ref: 'user'
	}],
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	// Group relationship
	group: {
		type: Schema.Types.ObjectId,
		ref: 'group',
		default: null
	},

	// New fields for better control
	postType: {
		type: String,
		enum: ['personal', 'group'],
		default: 'personal'
	},
	status: {  // For group moderation
		type: String,
		enum: ['pending', 'approved', 'rejected'],
		default: 'approved'
	},
	// Visibility will be determined by group or user settings
	visibility: {
		type: String,
		enum: ['public', 'followers_only', 'private'],
		default: 'public'
	},
}, { timestamps: true, versionKey: false, });

module.exports = mongoose.model('post', PostSchema)
