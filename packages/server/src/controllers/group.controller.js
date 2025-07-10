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
            const { name, additionalInfo, description } = req.body;
            if (!name || !description) {
                return res.status(400).json(responseDTO.badRequest("Name and description are required"));
            }

            const slug = generateSlug(name.trim());
            const inviteToken = crypto.randomUUID();
            const inviteLink = `${CLIENT_URL}/invite/group/${inviteToken}`;
            const newGroup = new groupModel({
                name, 
                additionalInfo: additionalInfo.trim(),
                slug,
                members: [req.user._id],
                inviteLink,
                user: req.user._id
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
            const features = new APIFeatures(groupModel.find({
                members: req.user._id
            }), req.query).paginating().sorting();
            const groups = await features.query.populate("user members", "fullname username avatar");
            res.json(responseDTO.success("Get data in successfully", groups));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    async GetAllGroups(req, res) {
        const { name } = req.query;
        try {
            let obj = {};
            if (name) {
                obj = {
                    ...obj,
                    name: { $regex: name, $option: "i" }
                }
            }
            const features = new APIFeatures(groupModel.find({
                ...obj
            }), req.query).paginating().sorting();
            const groups = await features.query;
            res.status(200).json(responseDTO.success("Get data successfully", groups));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }
}

module.exports = GroupController;