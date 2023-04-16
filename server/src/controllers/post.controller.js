'use strict';

const { responseDTO, APIFeatures } = require("../utils");
const { modelSchema } = require("../db");
const { postModel } = modelSchema;

class PostController {
    async CreatePost(req, res) {
        try {
            const newPost = await new postModel({ ...req.body, user: req.user._id });
            await newPost.save();

            res.json(responseDTO.success("Created post in successfully", { ...newPost._doc, user: req.user }));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }
    async UpdatePost() {

    }
    async DeletePost() {

    }
    async LikePost() {

    }

    async UnLikePost() {

    }

    async GetUserPosts() {
        try {
            const posts = await postModel.find({ _id: req.user._id });
            res.json(responseDTO.success("Get data successfully", posts));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    async GetAllPosts(req, res) {
        try {
            const posts = await postModel.find({
                _id: req.user._id
            });
            res.json(responseDTO.success("Get posts successfully", posts))
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }
}

module.exports = PostController;