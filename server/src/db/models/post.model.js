const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	url: {
		type: String
	},
	comments: [{
		type: Schema.Types.ObjectId,
		ref: 'users'
	}],
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	}
}, { timestamps: true })

module.exports = mongoose.model('posts', PostSchema)
