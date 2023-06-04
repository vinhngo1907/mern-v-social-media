'use strict';

const { responseDTO, APIFeatures } = require("../utils");
const { modelSchema } = require("../db");
const { conversationModel, messageModel } = modelSchema;

class MessageController {
    async createMessage(){
        try {
            const updatedConversation = await conversationModel.findOneAndUpdate({});
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }
}

module.exports = new MessageController;