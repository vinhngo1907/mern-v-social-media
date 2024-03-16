const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    name: { type: String, unique: true, maxLength: 200, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    posts: [{ type: Schema.Types.ObjectId, ref: 'post' },],
    coverImage: String,
    additionalInfo: { type: String, required: true },
    inviteLink: { type: String, },
    publicLink: { type: String, required: false },
    description: { type: String, }
}, {
    timestamps: true, versionKey: false
});

module.exports = mongoose.model('group', groupSchema);