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
	}
}, { timestamps: true, versionKey: false, });

module.exports = mongoose.model('post', PostSchema)
