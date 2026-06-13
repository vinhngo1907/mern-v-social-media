const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: { type: String, required: true, maxlength: 200 },
    slug: { type: String, required: true, unique: true },
    description: String,
    avatar: { type: Object },
    coverImage: String,

    // Core type
    type: {
        type: String,
        enum: ['community', 'chat', 'hybrid'],
        default: 'community'
    },
    privacy: {
        type: String,
        enum: ['public', 'private', 'secret'],
        default: 'private'
    },

    members: [{
        user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
        role: {
            type: String,
            enum: ['admin', 'manager', 'mod', 'member'],
            default: 'member'
        },
        joinedAt: { type: Date, default: Date.now }
    }],
    memberCount: { type: Number, default: 1 },

    // Community Features
    posts: [{ type: Schema.Types.ObjectId, ref: 'post' }],
    isCommunityEnabled: { type: Boolean, default: true },

    // Chat Features
    conversations: [{
        type: Schema.Types.ObjectId, ref: "conversation"
    }],
    isChatEnabled: { type: Boolean, default: false },

    // Settings
    chatPrivacy: {
        type: String, enum: ['private', 'public'],
        default: 'private'
    },

    // Group-level settings
    settings: {
        allowAnyoneToInvite: { type: Boolean, default: false },
        requireApprovalToJoin: { type: Boolean, default: false },
        invitePermission: {
            type: String,
            enum: ['admin_only', 'mod_and_above', 'anyone'],
            default: 'mod_and_above'
        }
    },

    publicLink: {
        enabled: { type: Boolean, default: false },
        code: { type: String, unique: true, sparse: true }
    },

    createdBy: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'user' }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('group', groupSchema);