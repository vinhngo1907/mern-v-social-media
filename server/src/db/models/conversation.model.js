const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
    
    recipients: [{ type: Schema.Types.ObjectId, ref: 'user' }],

}, {
    timestamps: true
});

module.exports = ConversationSchema;