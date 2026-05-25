'use strict';

const { responseDTO, APIFeatures } = require("../utils");
const { modelSchema } = require("../db");
const { generateSlug } = require("../utils/helpers");
const { CLIENT_URL } = require("../configs");
const { groupModel } = modelSchema;
const crypto = require("crypto");

class GroupController {
    async CreateGroup(req, res) {
        try {
            const {
                name, description,
                type = 'community',
                privacy = 'private',
                chatPrivacy = 'private'
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
            });
            await newGroup.save();
            res.json(responseDTO.success("Created group in sucessfully", {
                ...newGroup._doc
            }));
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
            let obj = { privacy: 'public' };
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

    async GetGroupById(req, res) {
        try {
            const group = await groupModel.findOne({
                id: req.params.id,
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

    // ====================== UPDATE GROUP ======================
    async UpdateGroup(req, res) {
        try {
            const { name, description, avatar, coverImage, type, privacy, chatPrivacy } = req.body;

            const group = await Group.findById(req.params.id);
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
            if (avatar) group.avatar = avatar;
            if (coverImage) group.coverImage = coverImage;
            if (type) group.type = type;
            if (privacy) group.privacy = privacy;
            if (chatPrivacy) group.chatPrivacy = chatPrivacy;

            group.updatedBy = req.user._id;

            await group.save();

            res.json(responseDTO.success("Group updated successfully", group));
        } catch (error) {
            console.error(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }
}

module.exports = GroupController;