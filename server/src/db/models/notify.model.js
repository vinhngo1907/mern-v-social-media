const mongoose = require("mongoose");

const notifySchema = new mongoose.Schema({
    user: mongoose.Types.ObjectId,
    text: String,
    url: String,
    recipients: [{ type: mongoose.Types.ObjectId, ref: 'users' }]
});


module.exports = mongoose.model("notifies", notifySchema)