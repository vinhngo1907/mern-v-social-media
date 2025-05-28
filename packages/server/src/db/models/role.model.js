const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
    name: { type: String, required: [true, 'Please add name of role'], maxLenth: 200, },
    users: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    slug: { type: String, required: [true, 'Please add slug name'], unique: true },
    capacities: [{ type: Schema.Types.ObjectId, ref: 'capacity' }]
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('role', RoleSchema);