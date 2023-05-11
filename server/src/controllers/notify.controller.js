'use strict';

const { responseDTO, APIFeatures } = require("../utils");
const { modelSchema } = require("../db");
const { notifyModel } = modelSchema;

class NotifyController {
    async GetNotifies(req, res) {
        try {
            const features = new APIFeatures(notifyModel.find({
                recipients: req.user._id
            }), req.query).paginating().sorting();
            const notifies = await features.query.populate("user", "avatar username fullname following followers");

            res.json(responseDTO.success("Get data successfully", notifies));
        } catch (error) {
            console.log(error);
            responseDTO.serverError(error.message);
        }
    }
    
    async CreateNotify(req, res) {
        try {
            if (req.body.recipients.includes(req.user._id.toString())) return;

            const newNotify = await new notifyModel({
                ...req.body,
                user: req.user._id
            });
            await newNotify.save();

            res.json(responseDTO.success("Created notify in successfully", { ...newNotify._doc, user: req.user }))
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message))
        }
    }

    async RemoveNotify(req, res) {
        try {
            const { id } = req.params;
            const removedNotify = await notifyModel.findOneAndDelete({ _id: id, url: req.query.url });
            if (!removedNotify) return res.status(400).json(responseDTO.badRequest("This notify not found"));

            res.json(responseDTO.success("Deleted notify in successfully", removedNotify));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message))
        }
    }

    async DeleteAllNotifies(req, res) {
        try {
            const deletedNotifies = await notifyModel.deleteMany({ recipients: req.user_id });
            if (!deletedNotifies) return res.status(400).json(responseDTO.badRequest("You don't have any notifies!"));

            res.json(responseDTO.success("Deleted all notifies in successfully", deletedNotifies));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message))
        }
    }

    async isReadNotify(req, res) {
        try {
            const { id } = req.params;
            const readNotify = await notifyModel.findOneAndUpdate({ _id: id }, { isRead: true }, { new: true, runValidators: true });
            if (!readNotify) return res.status(400).json(responseDTO.badRequest("This notify does not exist"));

            res.json(responseDTO.success("Read notify in successfully", readNotify));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message))
        }
    }
}

module.exports = NotifyController;