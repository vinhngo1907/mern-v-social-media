const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const socialSchema = new Schema({
    github: Object,
    youtube: Object,
    facebook: Object,
    loggedAt: { type: String, required: true }
});

// socialSchema.index({ 
//     youtube: { loggedAt: 1, unique: true } ,
//     github: { loggedAt: 1, unique: true } ,
//     facebook: { loggedAt: 1, unique: true } ,

// });

module.exports = mongoose.model("social", socialSchema);