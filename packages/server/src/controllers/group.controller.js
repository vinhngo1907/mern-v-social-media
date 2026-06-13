'use strict';

const fs = require("fs");
const crypto = require("crypto");
const logger = require("node-color-log");
const cloudinary = require('cloudinary');
const { responseDTO, APIFeatures, helpersUtil } = require("../utils");
const { modelSchema } = require("../db");
// const { generateSlug } = require("../utils/helpers");
const { CLIENT_URL, CLOUD_NAME, API_KEY, API_SECRET } = require("../configs");
const { groupJoinRequestModel } = require("../db/models");
const { groupModel } = modelSchema;
const { generateSlug } = helpersUtil;

class GroupController {
    async CreateGroup(req, res) {
        try {
            const {
                name, description,
                type = 'community',
                privacy = 'private',
                chatPrivacy = 'private',
                avatar
            } = req.body;
            // validation
            if (!name || !description) {
                return res.status(400).json(responseDTO.badRequest("Name and description are required"));
            }

            if (name.length < 3 || name.length > 200) {
                return res.status(400)
                    .json(responseDTO.badRequest("Group name must be between 3 and 200 characters"));
            }

            // Generate slug and check duplicate
            const slug = generateSlug(name.trim());
            // const inviteToken = crypto.randomUUID();
            // const inviteLink = `${CLIENT_URL}/invite/group/${inviteToken}`;
            const existingGroup = await groupModel.findOne({ slug });
            if (existingGroup) {
                return res.status(400).json(
                    responseDTO.badRequest("A group with this name already exists")
                );
            }
            const newGroup = new groupModel({
                name,
                slug,
                description: description.trim(),
                type,
                privacy,
                chatPrivacy,
                members: [{
                    user: req.user._id,
                    role: 'admin',
                    joinedAt: new Date()
                }],
                // inviteLink,
                createdBy: req.user._id,
                memberCount: 1,
                avatar
            });
            await newGroup.save();

            res.json(responseDTO.success("Created group in sucessfully", newGroup));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    async GetUserGroups(req, res) {
        try {
            const features = new APIFeatures(
                groupModel.find({
                    "members.user": req.user._id   // ← This is the correct way
                }),
                req.query
            ).paginating().sorting();

            const groups = await features.query
                .populate("members.user", "fullname username avatar");

            res.json(responseDTO.success("Get data in successfully", groups));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    async GetAllGroups(req, res) {
        const { name, type } = req.query;
        try {
            let obj = {
                privacy: { $in: ['public', 'private'] },   // Allow public + private
                type: { $in: ['community', 'hybrid'] }
            };
            if (name) {
                obj = {
                    ...obj,
                    name: { $regex: name, $option: "i" }
                }
            }
            if (type) {
                obj.type = type
            }

            const features = new APIFeatures(groupModel.find({
                ...obj
            }), req.query).paginating().sorting().filtering();

            const groups = await features.query
                .populate({
                    path: 'members.user',
                    select: 'fullname username avatar'
                }).populate('createdBy', 'fullname username avatar')
                .lean();

            res.status(200).json(responseDTO.success("Get data successfully", groups));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    // GET /api/groups/discover
    async DiscoverGroups(req, res) {
        const { name, type } = req.query;
        try {
            let queryObj = {
                privacy: { $in: ['public', 'private'] },   // Allow public + private
                type: { $in: ['community', 'hybrid'] } // Hide pure chat groups
            };

            if (name) {
                queryObj.name = { $regex: name, $options: 'i' };
            }
            if (type && ['community', 'hybrid'].includes(type)) {
                queryObj.type = type;
            }

            const features = new APIFeatures(
                groupModel.find(queryObj),
                req.query
            ).paginating().sorting().filtering();

            const groups = await features.query
                .populate({
                    path: 'members.user',
                    select: 'fullname username avatar'
                })
                .populate('createdBy', 'fullname username avatar')
                .lean();

            res.status(200).json(responseDTO.success("Discover groups successfully", groups));
        } catch (error) {
            console.error(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    async GetGroupById(req, res) {
        try {
            const group = await groupModel.findOne({
                _id: req.params.id,
            }).populate({
                path: 'members.user',
                select: 'fullname username avatar role'
            }).populate('createdBy', 'fullname username avatar')
                .populate('posts');
            if (!group) return res.status(404).json(responseDTO.urlNotFound("Group not found"))

            const isMember = group.members.some(m => m.user._id.toString() === req.user._id.toString());
            if (group.privacy === 'secret' && !isMember) return res.status(403).json(responseDTO.forbiden('Access denined'));

            res.status(200).json(responseDTO.success("Get group detail successfully", group));
        } catch (error) {
            logger.error("[ERROR_GET_GROUP_BY_ID] ", error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    async GetMyRoleInGroup(req, res) {
        try {
            const group = await groupModel.findOne({
                _id: req.params.groupId,
                "members.user": req.user._id
            });

            if (!group) {
                return res.status(404).json(responseDTO.urlNotFound("Not a member of this group"));
            }

            const myMembership = group.members.find(
                m => m.user.toString() === req.user._id.toString()
            );

            res.json(responseDTO.success("Success", {
                role: myMembership.role,
                joinedAt: myMembership.joinedAt
            }));
        } catch (error) {
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    async UpdateGroup(req, res) {
        try {
            const { name, description, avatar, coverImage, type, privacy, chatPrivacy } = req.body;

            const group = await groupModel.findById(req.params.id);
            if (!group) return res.status(404).json(responseDTO.notFound("Group not found"));

            // Check permission (only admin/manager)
            const member = group.members.find(m => m.user.toString() === req.user._id.toString());
            if (!member || !['admin', 'manager'].includes(member.role)) {
                return res.status(403).json(responseDTO.forbidden("You don't have permission"));
            }

            if (name) {
                group.name = name.trim();
                group.slug = generateSlug(name);
            }
            if (description) group.description = description.trim();
            let oldAvatar = null;
            if (avatar) {
                oldAvatar = group.avatar;
                group.avatar = avatar;
            }

            // if (coverImage) group.coverImage = coverImage;
            if (type) group.type = type;
            if (privacy) group.privacy = privacy;
            if (chatPrivacy) group.chatPrivacy = chatPrivacy;

            group.updatedBy = req.user._id;

            await group.save();

            res.json(
                responseDTO.success("Group updated successfully",
                    { ...group, avatar: group?.avatar?.url }
                ));
            // delete old avatar AFTER response
            if (
                oldAvatar?.public_id &&
                req.body.avatar?.public_id &&
                oldAvatar.public_id !== req.body.avatar.public_id
            ) {
                cloudinary.v2.uploader
                    .destroy(oldAvatar.public_id)
                    .catch(console.error);
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    // ==================== INVITE MEMBER ====================
    async GenerateInvite(req, res) {
        try {
            const { id: groupId } = req.params;
            const { userIds } = req.body; // array of user ids or single user

            const group = await Group.findById(groupId);
            if (!group) {
                return res.status(404).json(responseDTO.notFound("Group not found"));
            }

            // Check permission (Only Admin, Manager, or Mod if allowed)
            const member = group.members.find(m => m.user.toString() === req.user._id.toString());
            if (!member || !['admin', 'manager', 'mod'].includes(member.role)) {
                return res.status(403).json(responseDTO.forbidden("You don't have permission to invite members"));
            }

            // TODO: Create GroupInvite records (if using separate model)
            // For now, simple implementation
            const result = {
                groupId,
                invitedBy: req.user._id,
                invitedUsers: userIds || [],
                message: "Invitations sent successfully"
            };

            // You can emit socket event here
            // req.io.to(`group_${groupId}`).emit('newInvite', result);

            res.json(responseDTO.success("Invites sent successfully", result));

        } catch (error) {
            console.error(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    // ==================== JOIN VIA INVITE CODE ====================
    async JoinViaInvite(req, res) {
        try {
            const { inviteCode } = req.params;

            // TODO: Validate invite code from GroupInvite model (recommended)
            // For now, simple version - you can improve later

            const group = await Group.findOne({ "inviteLink.code": inviteCode });
            if (!group) {
                return res.status(404).json(responseDTO.badRequest("Invalid or expired invite link"));
            }

            // Check if user is already a member
            const isMember = group.members.some(m => m.user.toString() === req.user._id.toString());
            if (isMember) {
                return res.status(400).json(responseDTO.badRequest("You are already a member of this group"));
            }

            // Add user as member
            group.members.push({
                user: req.user._id,
                role: 'member',
                joinedAt: new Date()
            });
            group.memberCount += 1;

            await group.save();

            res.json(responseDTO.success("Successfully joined the group", group));

        } catch (error) {
            logger.error(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    // ==================== CHANGE MEMBER ROLE ====================
    async ChangeMemberRole(req, res) {
        try {
            const { id: groupId, userId } = req.params;
            const { role } = req.body; // 'admin', 'manager', 'mod', 'member'

            if (!['admin', 'manager', 'mod', 'member'].includes(role)) {
                return res.status(400).json(responseDTO.badRequest("Invalid role"));
            }

            const group = await Group.findById(groupId);
            if (!group) return res.status(404).json(responseDTO.notFound("Group not found"));

            // Check permission (Only Admin or Manager can change roles)
            const currentUserRole = group.members.find(m => m.user.toString() === req.user._id.toString())?.role;
            if (!['admin', 'manager'].includes(currentUserRole)) {
                return res.status(403).json(responseDTO.forbidden("You don't have permission to change roles"));
            }

            // Find target member
            const targetMember = group.members.find(m => m.user.toString() === userId);
            if (!targetMember) {
                return res.status(404).json(responseDTO.notFound("User is not a member of this group"));
            }

            // Prevent demoting the last admin
            if (targetMember.role === 'admin' && role !== 'admin') {
                const adminCount = group.members.filter(m => m.role === 'admin').length;
                if (adminCount <= 1) {
                    return res.status(400).json(responseDTO.badRequest("Cannot remove the last admin"));
                }
            }

            targetMember.role = role;
            await group.save();

            res.json(responseDTO.success(`Member role changed to ${role}`, group));

        } catch (error) {
            logger.error(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    // ==================== REMOVE MEMBER (Kick) ====================
    async RemoveMember(req, res) {
        try {
            const { id: groupId, userId } = req.params;

            const group = await Group.findById(groupId);
            if (!group) return res.status(404).json(responseDTO.notFound("Group not found"));

            // Check permission
            const currentUserRole = group.members.find(m => m.user.toString() === req.user._id.toString())?.role;
            const targetMemberRole = group.members.find(m => m.user.toString() === userId)?.role;

            if (!currentUserRole || !['admin', 'manager'].includes(currentUserRole)) {
                return res.status(403).json(responseDTO.forbidden("You don't have permission to remove members"));
            }

            // Cannot remove other admins if you're not super admin (optional logic)
            if (targetMemberRole === 'admin' && currentUserRole !== 'admin') {
                return res.status(403).json(responseDTO.forbidden("Only admin can remove other admins"));
            }

            // Remove member
            group.members = group.members.filter(m => m.user.toString() !== userId);
            group.memberCount = Math.max(0, group.memberCount - 1);

            await group.save();

            res.json(responseDTO.success("Member removed successfully"));

        } catch (error) {
            console.error(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    // ==================== JOIN GROUP ====================
    async JoinGroup(req, res) {
        try {
            const { id: groupId } = req.params;
            const userId = req.user._id;

            const group = await groupModel.findById(groupId);
            if (!group) {
                return res.status(404).json(responseDTO.notFound("Group not found"));
            }

            // Check if already a member
            const isMember = group.members.some(m =>
                m.user.toString() === userId.toString()
            );

            if (isMember) {
                return res.status(400).json(responseDTO.badRequest("You are already a member of this group"));
            }

            // Public group → Auto join
            if (group.privacy === 'public') {
                group.members.push({
                    user: userId,
                    role: 'member',
                    joinedAt: new Date()
                });
                group.memberCount += 1;

                await group.save();

                return res.json(responseDTO.success("Joined group successfully", group));
            }

            // Private group → Check approval setting
            const requireApproval = group.settings?.requireApprovalToJoin === true;

            if (requireApproval) {
                // Use Join Request System

                // Check if user already has a pending request
                const existingRequest = await groupJoinRequestModel.findOne({
                    group: groupId,
                    user: userId,
                    status: 'pending'
                });

                if (existingRequest) {
                    return res.status(400).json(responseDTO.badRequest("You already have a pending join request"));
                }

                const newRequest = new groupJoinRequestModel({
                    group: groupId,
                    user: userId,
                    status: 'pending'
                });

                await newRequest.save();

                // TODO: Send notification to admins/managers (socket or in-app notification)

                return res.json(responseDTO.success(
                    "Your request to join has been sent. Please wait for admin/manager approval.",
                    {
                        status: "pending_approval",
                        requestId: newRequest._id
                    }
                ));
            }
            // Private group but no approval required → Auto join
            group.members.push({
                user: userId,
                role: 'member',
                joinedAt: new Date()
            });
            group.memberCount += 1;

            await group.save();

            res.json(responseDTO.success("Joined group successfully", group));

        } catch (error) {
            console.error(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    // Get Join Requests for a Group (Admin/Manager only)
    async GetJoinRequests(req, res) {
        try {
            const { id: groupId } = req.params;

            const group = await groupModel.findById(groupId);
            if (!group) return res.status(404).json(responseDTO.notFound("Group not found"));

            // Check permission
            const member = group.members.find(m => m.user.toString() === req.user._id.toString());
            if (!member || !['admin', 'manager'].includes(member.role)) {
                return res.status(403).json(responseDTO.forbidden("Only admin/manager can view requests"));
            }

            const requests = await groupJoinRequestModel.find({ group: groupId, status: 'pending' })
                .populate('user', 'fullname username avatar')
                .sort({ requestedAt: -1 });

            res.json(responseDTO.success("Join requests retrieved", requests));
        } catch (error) {
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    // Approve / Reject Join Request
    async ReviewJoinRequest(req, res) {
        try {
            const { requestId } = req.params;
            const { status } = req.body; // 'approved' or 'rejected'


            const request = await groupJoinRequestModel.findById(requestId).populate('group').populate('user');

            if (!request) return res.status(404).json(responseDTO.notFound("Request not found"));

            const group = request.group;

            // Check permission
            const member = group.members.find(m => m.user.toString() === req.user._id.toString());
            if (!member || !['admin', 'manager'].includes(member.role)) {
                return res.status(403).json(responseDTO.forbidden("No permission"));
            }

            if (status === 'approved') {
                // Add to group
                group.members.push({
                    user: request.user._id,
                    role: 'member',
                    joinedAt: new Date()
                });
                group.memberCount += 1;
                await group.save();
            }

            request.status = status;
            request.reviewedAt = new Date();
            request.reviewedBy = req.user._id;
            await request.save();

            res.json(responseDTO.success(`Request ${status} successfully`));

        } catch (error) {
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }
}

module.exports = GroupController;