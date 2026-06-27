const mongoose = require("mongoose");
const Schema = mongoose.Schema
const policySchema = new Schema({
    subject: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },

    resource: {
        type: String, // "group", "post", "comment"
        required: true,
    },

    resourceId: {
        type: Schema.Types.ObjectId, // optional (specific group/post)
    },

    actions: [{
        type: String, // Use capacity slugs: "create_post", "delete_any_post", etc.
    }],

    effect: {
        type: String,
        enum: ["allow", "deny"],
        default: "allow",
    },

    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
    }
}, { timestamps: true, versionKey: false })

const resourceSchema = new Schema({
    name: { type: String, unique: true }, // post, comment, video
    description: { type: String }
}, {
    timestamp: true, versionKey: false
});

module.exports = {
    policyModel: mongoose.model("policy", policySchema),
    resourceModel: mongoose.model("resource", resourceSchema)
}