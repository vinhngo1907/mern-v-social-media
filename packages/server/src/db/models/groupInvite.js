// models/GroupInvite.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupInviteSchema = new Schema({
    group: {
        type: Schema.Types.ObjectId,
        ref: 'group',
        required: true
    },

    invitedBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },

    invitedUser: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }, // If inviting existing user

    email: String, // For email invites

    code: {
        type: String,
        required: true,
        unique: true
    },

    type: {
        type: String,
        enum: ['link', 'direct', 'email'],
        default: 'link'
    },

    expiresAt: { type: Date, required: true },

    maxUses: { type: Number, default: 1 }, // 0 = unlimited
    usedCount: { type: Number, default: 0 },

    isUsed: { type: Boolean, default: false },
    usedBy: { type: Schema.Types.ObjectId, ref: 'user' },
    usedAt: Date,

    status: {
        type: String,
        enum: ['active', 'expired', 'revoked'],
        default: 'active'
    }
}, {
    timestamps: true,
    versionKey: false
});

// Indexes
groupInviteSchema.index({ code: 1 });
groupInviteSchema.index({ group: 1, status: 1 });

const groupJoinRequestSchema = new Schema({
    group: {
        type: Schema.Types.ObjectId,
        ref: 'group',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    requestedAt: { type: Date, default: Date.now },
    reviewedAt: Date,
    reviewedBy: { type: Schema.Types.ObjectId, ref: 'user' },
    message: String // Optional message from requester
}, {
    timestamps: true
});

// Indexes
groupJoinRequestSchema.index({ group: 1, user: 1 }, { unique: true });
groupJoinRequestSchema.index({ group: 1, status: 1 });

module.exports =
{
    groupJoinRequestModel: mongoose.model('groupJoinRequest', groupJoinRequestSchema),
    groupInviteModel: mongoose.model('groupInvite', groupInviteSchema)
}