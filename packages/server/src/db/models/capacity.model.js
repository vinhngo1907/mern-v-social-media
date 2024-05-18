const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CapacitySchema = new Schema({
    name: { type: String, required: true, unique: true, maxLength: 25, trim: true },
    slug: { type: String, required: true, unique: true }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('capacity', CapacitySchema);