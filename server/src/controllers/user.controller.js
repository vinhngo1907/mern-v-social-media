'use strict';

const { responseDTO, APIFeatures, passwordUtil } = require("../utils");
const { modelSchema } = require("../db");
const { postModel } = require("../db/models");
const { userModel } = modelSchema;

class UserController {
    async GetAllUser(req, res) {
        try {
            // const users = await userModel.find()
            const { name } = req.query;
            let filterArr = [];
            if (name) {
                filterArr.push({ username: { $regex: name, $options: "i" } })
                filterArr.push({ fullname: { $regex: name, $options: "i" } })
            }

            const filterObj = filterArr.length >= 1 ? { "$or": filterArr } : {}
            const features = new APIFeatures(userModel.find({
                ...filterObj
            }).select("-password -salt -__v -createdAt -updatedAt"), req.query).paginating().sorting();

            const users = await features.query;
            res.status(200).json(responseDTO.success("Get data successfully", users))
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    async GetUser(req, res) {
        try {
            const user = await userModel.findOne({ _id: req.params.id }).populate("following followers", "-password -rf_token -salt");
            if (!user) return res.status(400).json(responseDTO.badRequest("This user does not exist"));

            res.json(responseDTO.success("Get user successfully", user));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }
    async UpdateProfile(req, res) {
        try {
            const { fullname, avatar, gender, } = req.body;
            if (!fullname) return res.status(400).json(responseDTO.badRequest("Please add your full name."));

            const updatedUser = await userModel.findOneAndUpdate({ _id: req.user._id }, {
                ...req.body
            }, { new: true, runValidators: true }).select("-password -salt -rf_token");
            if (!updatedUser) {
                return res.status(400).json(responseDTO.badRequest("User not found or/and not authorized"));
            }

            res.status(200).json(responseDTO.success("Updated user successfully", updatedUser));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    async Follow(req, res) {
        try {
            const { id } = req.params;
            // const users = await userModel.find({ _id: req.user._id, followers: id })
            const users = await userModel.find({ _id: id, followers: req.user._id });
            if (users.length > 0) return res.status(400).json(responseDTO.badRequest("You have been followed this user"));

            const following = await userModel.findOneAndUpdate({ _id: req.user._id }, {
                $push: { following: id }
            }, { new: true }).populate("following followers", "-password -rf_token -salt");

            if (!following) return res.status(400).json(responseDTO.badRequest(`This user ${req.user._id} does not exist`));

            await userModel.findOneAndUpdate({ _id: id }, { $push: { followers: req.user._id } }, { new: true });

            res.status(200).json(responseDTO.success("Followed successfully"));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    async UnFollow(req, res) {
        try {
            const { id } = req.params;
            const unFollowedUser = await userModel.findOneAndUpdate({ _id: id }, {
                $pull: { followers: req.user._id }
            }, { new: true }).populate("following followers", "-password -rf_token -salt");
            if (!unFollowedUser) return res.status(400).json(responseDTO.badRequest("This user not found or/and not authorized"));

            await userModel.findOneAndUpdate({ _id: req.user._id }, { $pull: { following: id } }, { new: true });
            res.status(200).json(responseDTO.success("UnFollowed successfully"));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    async Suggestion(req, res) {
        try {
            const newArr = [...req.user.following, req.user._id];
            const num = req.query.num || 10;

            const users = await userModel.aggregate([
                { $match: { _id: { $nin: newArr } } },
                { $sample: { size: Number(num) } },
                { $lookup: { from: 'users', localField: 'followers', foreignField: '_id', as: 'followers' } },
                { $lookup: { from: 'users', localField: 'following', foreignField: '_id', as: 'following' } }
            ]);
            res.status(200).json(responseDTO.success("Get data successfully", { users, result: users.length }))
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    async SavePost(req, res) {
        try {
            const postExist = await postModel.findOne({ _id: req.params.id });
            if (!postExist) return res.status(400).json(responseDTO.badRequest("This post does not exist"));

            const posts = await userModel.find({ saved: req.params.id });
            if (posts.length > 0) return res.status(400).json(responseDTO.badRequest("Something wrong"));

            const savedPost = await userModel.findOneAndUpdate({ _id: req.user._id }, { $push: { saved: req.params.id } }, { new: true, runValidators: true });
            if (!savedPost) return res.status(400).json(responseDTO.badRequest("This post or/and user does not exist"));

            res.json(responseDTO.success("Saved post in successfully", savedPost))
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }
    async UnSavePost(req, res) {
        try {
            const postExist = await postModel.findOne({ _id: req.params.id });
            if (!postExist) return res.status(400).json(responseDTO.badRequest("This post does not exist"));

            // const posts = await userModel.find({ saved: req.params.id });
            // if (posts.length > 0) return res.status(400).json(responseDTO.badRequest("Something wrong"));

            const savedPost = await userModel.findOneAndUpdate({ _id: req.user._id },
                { $pull: { saved: req.params.id } },
                { new: true, runValidators: true }
            );
            if (!savedPost) return res.status(400).json(responseDTO.badRequest("This post or/and user does not exist"));
            res.json(responseDTO.success("Saved post in successfully", savedPost))
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }
    async ChangePassword(req, res) {
        try {
            if (!req.user) return res.status(400).json(responseDTO.badRequest("User not found or/and not authorized"));

            const { password } = req.body;
            const salt = await passwordUtil.GenerateSalt();
            const hashedPassword = await passwordUtil.GeneratePassword(password, salt);
            if (!hashedPassword || !salt) {
                return res.status(400).json(responseDTO.badRequest("Something wrong with password"));
            }

            await userModel.findOneAndUpdate({ _id: req.user._id }, {
                password: hashedPassword,
                salt: salt
            });

            res.json(responseDTO.success("Changed password in successfully"));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    async ResetPassword(req,res){
        try {
            
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }
}

module.exports = UserController