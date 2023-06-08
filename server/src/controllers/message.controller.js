'use strict';

const { responseDTO, APIFeatures } = require("../utils");
const { modelSchema } = require("../db");
const { conversationModel, messageModel } = modelSchema;

class MessageController {
    async CreateMessage(req, res) {
        try {
            const { sender, recipient, text, media, call } = req.body;
            if (!recipient || (!text.trim() && media.length === 0 && !call)) return;

            const conversation = await conversationModel.findOneAndUpdate({
                $or: [
                    { recipients: [sender, recipient] },
                    { recipients: [recipient, sender] },
                ]
            }, {
                recipients: [sender, recipient],
                ...req.body
            }, { upsert: true, new: true, runValidators: true });

            const newMess = new messageModel({
                conversation: conversation._id,
                text, media, call, sender, recipient
            });
            await newMess.save();
            res.status(200).json(responseDTO.success("Created new message in successfully", newMess))
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    async GetMessage(req, res) {
        try {
            const features = new APIFeatures(messageModel.find({
                $or: [
                    { sender: req.user._id, recipient: req.params.id },
                    { sender: req.params.id, recipient: req.user._id }
                ]
            }), req.query).paginating().sorting("-createdAt");
            const messages = await features.query;
            res.status(200).json(responseDTO.success("Get data in successfully", messages))
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    async DeleteMessage(req, res) {
        try {
            const deletedMessage = await messageModel.findOneAndDelete({ _id: req.params.id, sender: req.user._id });
            if (!deletedMessage) return res.status(400).json(responseDTO.badRequest("This message does not exist"));

            res.status(200).json(responseDTO.success("Deleted message in successfully"));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }
}

module.exports = MessageController;