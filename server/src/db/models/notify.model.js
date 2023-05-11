const mongoose = require("mongoose");

const notifySchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: "user" },
    text: String,
    url: String,
    content: String,
    image: String,
    // recipients: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    recipients: [mongoose.Types.ObjectId],
    isRead: { type: Boolean, default: false }
}, { timestamps: true });


module.exports = mongoose.model("notify", notifySchema)