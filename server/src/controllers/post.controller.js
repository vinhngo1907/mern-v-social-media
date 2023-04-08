'use strict';

const { responseDTO, APIFeatures } = require("../utils");
const { modelSchema } = require("../db");
const { postModel } = modelSchema;

class PostController {
    async CreatePost() {
        try {
            const newPost = await new postModel({ ...req.body });
            await newPost.save();
            res.status(200).json(responseDTO.success("Created post in successfully", newPost));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }
    async UpdatePost(){

    }
    async DeletePost(){

    }
    async LikePost(){

    }

    async UnLikePost(){

    }
    
    async GetUserPosts() {
        try {
            // const user
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    async GetAllPosts() {

    }
}

module.exports = PostController;