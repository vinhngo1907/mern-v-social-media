const { modelSchema } = require("../db");
const { userModel, roleModel } = modelSchema;
const { responseDTO, checkUtil } = require("../utils");
const checkAccountRoot = require("../utils/check/checkRoot");
const { checkRoot } = checkUtil;

const authAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id)
        .populate('roles');

        console.log(user.roles)

        const isAdmin = user.roles.some(role => role.name.toLowerCase() === 'admin');

        if (!isAdmin) {
            return res.status(403).json(responseDTO.forbiden("Admin resources access denied"));
        }

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json(responseDTO.serverError(error.message));
    }
};

module.exports = authAdmin;