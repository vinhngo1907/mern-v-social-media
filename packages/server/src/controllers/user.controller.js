'use strict';

const { responseDTO, APIFeatures, passwordUtil, signature } = require("../utils");
const { modelSchema } = require("../db");
const { userModel } = modelSchema;

class UserController {
    async GetAllUser(req, res) {
        try {
            const { name } = req.query;
            let filterArr = [];
            if (name) {
                filterArr.push({ username: { $regex: name, $options: "i" } })
                filterArr.push({ fullname: { $regex: name, $options: "i" } })
            }

            const filterObj = filterArr.length >= 1 ? { "$or": filterArr } : {}
            const features = new APIFeatures(userModel.find({
                ...filterObj
            }).select("-password -salt -__v -createdAt -updatedAt -rf_token"), req.query).paginating().sorting();

            const users = await features.query;
            res.status(200).json(responseDTO.success("Get data successfully", users));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    async GetUser(req, res) {
        try {
            const user = await userModel.findOne({ _id: req.params.id })
                .select("-password -rf_token -salt")
                .populate("following followers", "-password -rf_token -salt");
            if (!user) return res.status(400).json(responseDTO.badRequest("This user does not exist"));

            res.json(responseDTO.success("Get user successfully", user));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    async GetMe(req, res) {
        try {
            let me = req.user.toObject ? req.user.toObject() : { ...req.user };

            if (!me) {
                return res.status(401).json(responseDTO.unauthorization("User not found"));
            }

            delete me.rf_token;

            res.json(responseDTO.success("Get me successfully", me));
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
            }, { new: true })
                .select("-password -rf_token -salt")
                .populate("following followers", "-password -rf_token -salt -__v");

            if (!following) return res.status(400).json(responseDTO.badRequest(`This user ${req.user._id} does not exist`));

            const newUser = await userModel.findOneAndUpdate({ _id: id }, { $push: { followers: req.user._id } }, { new: true })
                .select("-password -rf_token -salt")
                .populate("followers following", "-salt -rf_token -password -__v");

            res.status(200).json(responseDTO.success("Followed successfully", newUser));
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
            }, { new: true })
                .select("-password -rf_token -salt")
                .populate("following followers", "-password -rf_token -salt");
            if (!unFollowedUser) return res.status(400).json(responseDTO.badRequest("This user not found or/and not authorized"));

            await userModel.findOneAndUpdate({ _id: req.user._id }, { $pull: { following: id } }, { new: true });
            res.status(200).json(responseDTO.success("UnFollowed successfully", unFollowedUser));
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

    async ChangePassword(req, res) {
        if (!req.user) return res.status(400).json(responseDTO.badRequest("User not found or/and not authorized"));

        if (req.user.type !== "register") {
            return res.status(400).json(responseDTO.badRequest(`Quick login account with ${req.user.type} can't use this function.`));
        }

        try {
            const { newPassword, oldPassword } = req.body;
            if (newPassword === oldPassword) {
                return res.status(400).json(responseDTO.badRequest("New password must be different with old password"));
            }

            const userExist = await userModel.findOne({ _id: req.user._id, username: req.user.username }).select("password salt");
            const validPassword = await passwordUtil.ValidatePassword(oldPassword, userExist.password, userExist.salt);
            if (!validPassword) {
                return res.status(400).json(responseDTO.badRequest("Your old password is not correct!"));
            }

            const salt = await passwordUtil.GenerateSalt();
            const hashedPassword = await passwordUtil.GeneratePassword(newPassword, salt);
            if (!hashedPassword || !salt) {
                return res.status(400).json(responseDTO.badRequest("Something wrong with password"));
            }

            const rf_token = await signature.GenerateRefreshToken({ userId: user._id }, res);

            const updatedUser = await userModel.findOneAndUpdate(
                { _id: req.user._id },
                {
                    password: hashedPassword,
                    salt: salt,
                    rf_token: rf_token
                }, {
                new: true, runValidators: true
            }).select("-rf_token -password -salt");

            const access_token = await signature.GenerateAccessToken({ userId: user._id });

            res.json(responseDTO.success("Changed password in successfully", {
                user: updatedUser,
                access_token

            }));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    async ResetPassword(req, res) {
        if (!req.user) return res.status(401).json(responseDTO.unauthorization("Invalid Authentication."));

        if (req.user.type !== "register") {
            return res.status(400).json(responseDTO.badRequest(`Quick login account with ${req.user.type} can't use this function.`));
        }

        try {
            const { password } = req.body;
            const salt = await passwordUtil.GenerateSalt();
            const passwordHashed = await passwordUtil.GeneratePassword(password, salt);

            const updatedUser = await userModel.findOneAndUpdate({ _id: req.user._id }, {
                password: passwordHashed,
                salt: salt
            });

            if (!updatedUser) {
                return res.status(400).json(responseDTO.badRequest(`Something wrong when updating password for ${req.user.username}`));
            }

            res.json(responseDTO.success("Reset Password Success!"));

        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    async SearchUser(req, res) {
        try {
            const { name } = req.query;
            const filterArr = [];
            filterArr.push({ username: { $regex: name, $options: "i" } })
            filterArr.push({ fullname: { $regex: name, $options: "i" } })

            const users = await userModel.find({ $or: filterArr }).limit(10).select("username fullname avatar");
            res.status(200).json(responseDTO.success("Get data in successfully", users));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }
}

module.exports = UserController