const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
    recipients: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    text: String,
    media: Array,
    call: Object
}, {
    timestamps: true
});

module.exports = mongoose.model("conversation", ConversationSchema);