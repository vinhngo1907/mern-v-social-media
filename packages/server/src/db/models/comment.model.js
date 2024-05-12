const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    likes: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    tag: Object,
    reply: mongoose.Types.ObjectId,
    user: { type: mongoose.Types.ObjectId, ref: 'user' },
    postId: mongoose.Types.ObjectId,
    postUserId: mongoose.Types.ObjectId
}, { timestamps: true, versionKey: false, });


module.exports = mongoose.model("comment", commentSchema);