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
            const features = new APIFeatures(postModel.find({ _id: req.user._id }), req.query).paginating().sorting();
            const posts = await features.query
                .populate("user likes", "username email avatar followers following")
                .populate({
                    path: "comments",
                    populate: {
                        path: "user likes",
                        select: "-password -rf_token -salt -__V"
                    }
                });
            res.json(responseDTO.success("Get data successfully", { posts, result: posts.length }));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    async GetAllPosts(req, res) {
        try {
            const features = new APIFeatures(postModel.find({
                user: [...req.user.following, req.user._id]
            }), req.query).paginating().sorting();

            const posts = await features.query
                .populate("user likes", "username fullname avatar following followers")
                .populate({
                    path: "comments",
                    populate: {
                        path: "user likes",
                        select: "-password"
                    }
                });

            res.json(responseDTO.success("Get posts successfully", { posts, result: posts.length }))
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }
}

module.exports = PostController;