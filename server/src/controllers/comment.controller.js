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
                ...newComment,
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
    async LikeComment(req,res) {

    }
    async UnLikeComment(req,res){
        
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