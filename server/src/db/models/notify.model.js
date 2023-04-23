const mongoose = require("mongoose");

const notifySchema = new mongoose.Schema({
    user: mongoose.Types.ObjectId,
    text: String,
    url: String,
    content: String,
    image: String,
    recipients: [{ type: mongoose.Types.ObjectId, ref: 'users' }],
    isRead: { type: Boolean, default: false }
}, { timestamps: true });


module.exports = mongoose.model("notifies", notifySchema)