const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    conversation: { type: Schema.Types.ObjectId, ref: 'conversation' },
    sender: { type: Schema.Types.ObjectId, ref: 'user' },
    recipient: { type: Schema.Types.ObjectId, ref: 'user' },
    text: String,
    media: Array,
    call: Object
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('message', messageSchema);