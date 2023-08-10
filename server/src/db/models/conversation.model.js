const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
    recipients: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    text: String,
    media: Array,
    call: Object,
    isGroupChat: { type: Boolean, default: false },
    groupAdmin: { type: Schema.Types.ObjectId, ref: "user" }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model("conversation", ConversationSchema);