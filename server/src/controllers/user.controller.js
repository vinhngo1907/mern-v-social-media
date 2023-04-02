'use strict';

const { responseDTO, APIFeatures } = require("../utils");
const { modelSchema } = require("../db");
const { userModel } = modelSchema;

class UserController {
    async UpdateProfile(req, res) {
        try {

        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

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
}

module.exports = UserController