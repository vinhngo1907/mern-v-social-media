const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notifySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "user" },
    id: Schema.Types.ObjectId,
    text: String,
    url: String,
    content: String,
    image: String,
    // recipients: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    recipients: [Schema.Types.ObjectId],
    isRead: { type: Boolean, default: false }
}, { timestamps: true });


module.exports = mongoose.model("notify", notifySchema)