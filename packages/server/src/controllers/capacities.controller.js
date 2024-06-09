'use strict';

const { responseDTO, APIFeatures } = require("../utils");
const { modelSchema } = require("../db");
const { postModel, capacitiesModel } = require("../db/models");

class CapacityController {
    async Create(req, res) {
        try {
            const { slug, name } = req.body;
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