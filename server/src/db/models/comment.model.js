const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    likes: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    tag: Object,
    reply: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    user: mongoose.Types.ObjectId,
    postId: mongoose.Types.ObjectId,
    postUserId: mongoose.Types.ObjectId
}, { timestamps: true });


module.exports = mongoose.model("comment", commentSchema)