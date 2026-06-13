const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
	password: { type: String, required: true },
	avatar: {
		type: String,
		default: "https://res.cloudinary.com/v-webdev/image/upload/v1661947123/v-chat-app/profile-user_p2khhu.png"
	},
	mobile: { type: String },
	gender: { type: String },
	website: { type: String },
	address: { type: String },
	story: { type: String },
	followers: [{ type: Schema.Types.ObjectId, ref: "user" }],
	following: [{ type: Schema.Types.ObjectId, ref: "user" }],
	saved: [{ type: Schema.Types.ObjectId }],
	salt: { type: String },
	type: {
		type: String, default: "register",
		enum: ['register', 'google', 'facebook']
	},
	rf_token: { type: String },
	roles: [{ type: Schema.Types.ObjectId, ref: "role" }],
	root: { type: String },
	isActive: { type: Boolean, default: true },
	settings: {
		// Privacy / Discovery
		allowFollow: { type: Boolean, default: true },           // "Enable follow me"
		allowSubUsers: { type: Boolean, default: true },         // "Sub users" – unclear, maybe sub-accounts or followers?
		allowTagging: { type: Boolean, default: true },          // "Enable tagging"

		// Notifications
		notifications: {
			email: {
				enabled: { type: Boolean, default: true },
				likes: { type: Boolean, default: true },
				shares: { type: Boolean, default: true },
				messages: { type: Boolean, default: true },
				mentions: { type: Boolean, default: true },
				// add more categories as needed
			},
			push: {
				enabled: { type: Boolean, default: true },
				soundEnabled: { type: Boolean, default: true },   // "Enable sound Notification"
			},
			sms: {                                                // "Text messages"
				enabled: { type: Boolean, default: false },
				phoneNumber: { type: String },                    // only if enabled
			}
		},

		// Other common settings
		profileVisibility: {
			type: String,
			enum: ['public', 'followers_only', 'private'],
			default: 'public'
		},
		showOnlineStatus: { type: Boolean, default: true },
		quietHours: {
			enabled: { type: Boolean, default: false },
			start: String, // e.g. "22:00"
			end: String    // e.g. "08:00"
		},

		// Flexible catch-all
		custom: { type: Schema.Types.Mixed, default: {} }
	},
}, {
	timestamps: true,
	versionKey: false
});

module.exports = mongoose.model('user', UserSchema);
