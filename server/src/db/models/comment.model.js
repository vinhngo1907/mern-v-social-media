const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    user: mongoose.Types.ObjectId,
    text: String,
    content: String,
    likes: [{ type: mongoose.Types.ObjectId, ref: 'users' }],
}, { timestamps: true });


module.exports = mongoose.model("comments", commentSchema)