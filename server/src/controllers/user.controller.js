'use strict';

const { responseDTO, APIFeatures } = require("../utils");
const { modelSchema } = require("../db");
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

    async UpdateProfile(req, res) {
        try {
            // const {fullname, avatar, gender, } = req.
            const updatedUser = await userModel.findOneAndUpdate({ _id: req.user._id }, {
                ...req.body
            }, { new: true, runValidators: true });
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
        try{

        }catch(error){
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    async UnFollow(req, res) {
        try {
            
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    async Suggestion(req, res) {
        try{

        }catch(error){
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }
}

module.exports = UserController