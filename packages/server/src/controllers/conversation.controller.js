'use strict';

const { responseDTO, APIFeatures } = require("../utils");
const { modelSchema } = require("../db");
const { groupModel } = require("../db/models");
const { CLIENT_URL } = require("../configs");
const { conversationModel, messageModel } = modelSchema;

class ConversationController {
    async GetConversation(req, res) {
        try {
            const features = new APIFeatures(conversationModel.find({
                recipients: req.user._id,
                isGroupChat: false
            }), req.query).paginating().sorting();

            const conversation = await features.query.populate("recipients", "avatar usernam fullname");

            res.status(200).json(responseDTO.success("Get data in successfully", conversation));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    async DeleteConversation(req, res) {
        try {
            const deletedConversation = await conversationModel.findOneAndDelete({
                isGroupChat: false,
                $or: [
                    { recipients: [req.user._id, req.params.id] },
                    { recipients: [req.params.id, req.user._id] }
                ]
            });

            if (!deletedConversation)
                return res.status(400).json(responseDTO.badRequest("This conversation does not exist"));

            await messageModel.deleteMany({
                conversation: deletedConversation._id
            });
            res.status(200).json(responseDTO.success("Deleted conversation in successfully", deletedConversation));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }
    
    async CreateGroup(req, res) {
        try {
            const groupId = req.params.id;
            const creatorId = req.user._id;
            const group = await groupModel.findOne({
                _id: groupId,
                user: creatorId
            });

            if(!group) return res.statsu(400).json(responseDTO.badRequest("Group not found"))

            // Create Conversation
            const newConversation = await conversationModel.create({
                isGroupChat: true,
                group: group._id,
                groupAdmin: creatorId,
                recipients: [creatorId],
            });

            res.status(201).json(responseDTO.success('GroupChat created successfully!!!', {
                group: {
                    ...newGroup.toObject(),
                    publicLink:  `${CLIENT_URL}/groups/${slug}`
                },
                conversation: newConversation
            }));
        } catch (error) {
            console.log(error);
            res.status(500).json(responseDTO.serverError(error.message));
        }
    }
}

module.exports = ConversationController;