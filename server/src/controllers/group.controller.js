'use strict';

const { responseDTO, APIFeatures } = require("../utils");
const { modelSchema } = require("../db");
const { groupModel } = modelSchema;

class GroupController {
    async CreateGroup(req, res) {
        try {
            const { name, additionalInfo } = req.body;
            const newGroup = new groupModel({
                name, additionalInfo, members: [req.user._id]
            });
            await newGroup.save();
            res.json(responseDTO.success("Created group in sucessfully", { ...newGroup._doc }));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }
    async GetUserGroups(req, res) {
        try {
            const apiFatures = new APIFeatures(groupModel.find({
                members: req.user._id
            }), req.query).paginating().sorting();
            const groups = await apiFatures.query.populate("user members", "fullname username avatar");
            res.json(responseDTO.success("Get data in successfully", groups));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }
}

module.exports = GroupController;