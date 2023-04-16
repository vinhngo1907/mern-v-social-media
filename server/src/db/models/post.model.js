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
		ref: 'users'
	}],
	likes: [{
		type: Schema.Types.ObjectId,
		ref: 'users'
	}],
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	}
}, { timestamps: true })

module.exports = mongoose.model('posts', PostSchema)
