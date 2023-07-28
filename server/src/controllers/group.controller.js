'use strict';

const { responseDTO, APIFeatures } = require("../utils");
const { modelSchema } = require("../db");
const { groupModel } = modelSchema;

class GroupController {
    async createGroup(req, res) {
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

}

module.exports = GroupController;