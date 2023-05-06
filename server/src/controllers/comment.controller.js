'use strict';

const { responseDTO, APIFeatures } = require("../utils");
const { modelSchema } = require("../db");
const { postModel, commentModel } = require("../db/models");

class CommentController {
    async CreateComment(req, res) {
        try {
            const postExist = await postModel.findOne({
                _id: req.body.postId,
                user: req.body.postUserId
            });
            if (!postExist) return res.status(400).json(responseDTO.badRequest("This post or/and user not found"));

            if (req.body.reply) {
                const cm = await commentModel.findById(req.body.reply);
                if (!cm) return res.status(400).json({ msg: "This comment does not exist." })
            }
            const newComment = new commentModel({
                ...req.body
            });
            await postModel.findOneAndUpdate({ _id: postExist._id, user: postExist.user }, {
                $push: { comments: newComment._id }
            }, { new: true, runValidators: true })
            await newComment.save();

            res.json(responseDTO.success("Created new comment in successfully", {
                ...newComment._doc,
                user: req.user
            }))
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }
    async UpdateComment(req, res) {
        try {

        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }
    async LikeComment(req, res) {
        try {
            const commentId = req.params.id;
            const likes = await commentModel.findOne({ _id: commentId }, { likes: req.user._id });
            if (likes.length > 0) return;

            const likedCmt = await commentModel.findOneAndUpdate(
                { _id: commentId },
                { $push: { likes: req.user._id } },
                { new: true, runValidators: true });
            if (!likedCmt) return res.status(400).json(responseDTO.badRequest("This comment does not exist"));

            res.json(responseDTO.success("Liked comment in successfully", likedCmt))
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }
    async UnLikeComment(req, res) {
        try {
            const commentId = req.params.id;
            const unLikedCmt = await commentModel.findOneAndUpdate(
                { _id: commentId },
                { $pull: { likes: req.user._id } },
                { new: true, runValidators: true }
            );
            if (!unLikedCmt) return res.status(400).json(responseDTO.badRequest("This comment does not exist"));

            res.json(responseDTO.success("UnLiked comment in successfully", unLikedCmt))
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }
    async RemoveComment(req, res) {
        try {

        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }
}

module.exports = CommentController