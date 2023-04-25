const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	fullname: {
		type: String,
		trim: true,
		required: true,
		maxLength: 25
	},
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		maxLength: 25
	},
	password: {
		type: String,
		required: true
	},
	avatar: {
		type: String,
		default: "https://res.cloudinary.com/v-webdev/image/upload/v1661947123/v-chat-app/profile-user_p2khhu.png"
	},
	mobile: { type: String },
	gender: { type: String },
	website: { type: String },
	address: { type: String },
	story: { type: String },
	followers: [{ type: Schema.Types.ObjectId, ref: "users" }],
	following: [{ type: Schema.Types.ObjectId, ref: "users" }],
	salt: { type: String },
	type: { type: String, default: "register" },
	rf_token: { type: String }
}, {
	timestamps: true
})

module.exports = mongoose.model('users', UserSchema)
