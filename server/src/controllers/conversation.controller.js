'use strict';

const { responseDTO, APIFeatures } = require("../utils");
const { modelSchema } = require("../db");
const { conversationModel, messageModel } = modelSchema;

class ConversationController {
    async GetConversation(req, res) {
        try {
            const features = new APIFeatures(conversationModel.find({
                recipients: req.user._id
            }), req.query).paginating().sorting();
            
            const conversation = await features.query;

            res.status(200).json(responseDTO.success("Get data in successfully", conversation));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    async DeleteConversation(req, res) {
        try {

        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }
}

module.exports = ConversationController;