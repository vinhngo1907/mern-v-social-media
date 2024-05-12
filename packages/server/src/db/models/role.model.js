const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
    name: { type: String, required: true, maxLenth: 200 },
    users: [{ type: Schema.Types.ObjectId, ref: 'user' }]
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('role', RoleSchema);