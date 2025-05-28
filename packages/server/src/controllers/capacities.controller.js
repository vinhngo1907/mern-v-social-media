'use strict';

const { responseDTO, APIFeatures, validation, checkUtil } = require("../utils");
const { modelSchema } = require("../db");
const { postModel, capacitiesModel } = require("../db/models");
const { checkPermission } = checkUtil;


class CapacityController {
    async Create(req, res) {
        try {
            const validRoot = await checkPermission(req, res, process.env.CAPACITY_CREATE_ROLE);
            if (!validRoot) {
                return res.status(403).json(responseDTO.forbiden("You don't have permission to create a new capacity"));
            }

            const checkCapacity = validation.ValidateCreateCapacity(req.body);
            if (checkCapacity) {
                return res.status(400).json(responseDTO.badRequest(checkCapacity));
            }

            const { slug, name } = req.body;

            const existedCapacity = await capacitiesModel.findOne({
                $or: [{ name }, { slug }]
            });

            if (existedCapacity) {
                return res.status(400).json(responseDTO.badRequest("Capacity already exists!"));
            }

            const newCapacity = new capacitiesModel({ slug, name });
            await newCapacity.save();

            return res.json(responseDTO.success("Created new capacity successfully!", {
                ...newCapacity._doc,
                user: req.user
            }));
        } catch (error) {
            console.error(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }
}

module.exports = CapacityController;