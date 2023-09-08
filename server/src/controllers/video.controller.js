"use strict"
const { responseDTO, validation, Queue } = require("../utils");
const { modelSchema } = require("../db");
const { userModel, postModel } = modelSchema;
class VideoController {
    async getVideoById(req, res) {
        try {
            return await postModel.findById(id);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = VideoController;