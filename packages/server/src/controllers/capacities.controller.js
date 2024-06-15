'use strict';

const { responseDTO, APIFeatures, validation, checkUtil } = require("../utils");
const { modelSchema } = require("../db");
const { postModel, capacitiesModel } = require("../db/models");
const { checkRoot } = checkUtil;


class CapacityController {
    async Create(req, res) {
        try {
            const validRoot = await checkRoot(req.user);
            if(!validRoot){
                return res.status(403).json(responseDTO.forbiden("You can't not create new capacity"))
            }

            const checkCapacity = validation.ValidateCreateCapacity(req.body);
            // Simple validate
            if (checkCapacity) {
                return res.status(400).json(responseDTO.badRequest(checkCapacity))
            }

            const { slug, name } = req.body;
            const existedCapacity = await capacitiesModel.findOne({
                $or: [
                    { name },
                    { slug }
                ]
            });

            if (existedCapacity) {
                return res.status(400).json(responseDTO.badRequest("Capacity có người dùng rồi bạn êi!"));
            }

            const newCapacity = await new capacitiesModel({
                slug,
                name
            });
            await newCapacity.save();
            res.json(responseDTO.success("Created new capacity in successfully!", {
                ...newCapacity._doc,
                user: req.user
            }));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }
}

module.exports = CapacityController;