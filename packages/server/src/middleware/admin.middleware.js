const { ACCESS_SECRET } = require("../configs");
const { modelSchema } = require("../db");
const { userModel, roleModel } = modelSchema;
const { responseDTO } = require("../utils");

const authAdmin = async (req, res, next) => {
    try {

        next();
    } catch (error) {
        return res.status(500).json(responseDTO.serverError(error.message));
    }
}

module.exports = authAdmin;