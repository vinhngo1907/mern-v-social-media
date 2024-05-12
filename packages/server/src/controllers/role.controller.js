'use strict';

const { responseDTO, APIFeatures } = require("../utils");
const { modelSchema } = require("../db");
const { roleModel } = modelSchema;

class RoleController {
    async GetAll(req, res, next) {
        try {
            const roles = await roleModel.find({});
            res.json(responseDTO.success("Get data in successfully", roles));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }
}

module.exports = RoleController;