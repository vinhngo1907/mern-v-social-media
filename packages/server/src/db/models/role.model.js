const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
    name: { type: String, required: [true, 'Please add name of role'], maxLenth: 200, },
    users: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    slug: { type: String, required: [true, 'Please add slug name'], unique: true },
    capacities: [{ type: Schema.Types.ObjectId, ref: 'capacity' }],
    policies: [{ type: mongoose.Schema.Types.ObjectId, ref: "policy" }],
    resource: {
        type: String,
        required: true, // group, post, .e.g
    },
    createdBy: {
        type: String,
        default: "system",
    },
    updatedBy: {
        type: String,
        default: "system"
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('role', RoleSchema);