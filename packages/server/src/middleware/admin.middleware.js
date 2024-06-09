const { checkRoot } = require(".");
const { modelSchema } = require("../db");
const { userModel, roleModel } = modelSchema;
const { responseDTO } = require("../utils");

const authAdmin = async (req, res, next) => {
    try {
        // Get user information by id
        const user = await userModel.findOne({
            _id: req.user.id
        });

        const validRoot = await checkRoot(user);
        if (!validRoot) {
            return res.status(403).json({ msg: "Admin resources access denied" })

        }

        next();
    } catch (error) {
        return res.status(500).json(responseDTO.serverError(error.message));
    }
}

module.exports = authAdmin;