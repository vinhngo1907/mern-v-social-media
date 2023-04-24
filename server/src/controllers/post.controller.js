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
    async LikePost(req, res) {
        try {
            const { id } = req.params;
            const posts = await postModel.find({ _id: id, likes: req.user._id });
            if (posts.length > 0) return res.status(400).json(responseDTO.badRequest("You have been liked post"));

            const likedPost = await postModel.findOneAndUpdate({ _id: id }, { $push: { likes: req.user._id } }, { new: true });
            if (!likedPost) return res.status(400).json(responseDTO.badRequest("This post does not exist"));

            res.json(responseDTO.success("Liked post in successfully", likedPost));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    async UnLikePost(req, res) {
        try {
            const { id } = req.params;
            // const posts = await postModel.find({ _id: id, likes: req.user._id });
            // if (posts.length > 0) return res.status(400).json(responseDTO.badRequest("You have been liked post"));

            const unLikedPost = await postModel.findOneAndUpdate(
                { _id: id, likes: req.user._id },
                { $pull: { likes: req.user._id } },
                { new: true }
            );
            if (!unLikedPost) return res.status(400).json(responseDTO.badRequest("This post does not exist"));

            res.json(responseDTO.success("UnLiked post in successfully", unLikedPost));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    async GetUserPosts(req, res) {
        try {
            const { id } = req.params;
            const features = new APIFeatures(postModel.find({ user: id }), req.query).paginating().sorting();
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
                        select: "-password -rf_token -salt -__V"
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