const { modelSchema } = require("../db");
const { userModel, roleModel } = modelSchema;
const { responseDTO, checkUtil } = require("../utils");
const { checkRoot } = checkUtil;

const authAdmin = async (req, res, next) => {
    try {
        // Get user information by id
        const user = await userModel.findOne({
            _id: req.user._id
        });

        const validRoot = await checkRoot(user);
        if (!validRoot) {
            return res.status(403).json(responseDTO.forbiden("Admin resources access denied" ))
        }

        console.log("[CHECKING ADMIN NÈ]", {user});
        
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json(responseDTO.serverError(error.message));
    }
}

module.exports = authAdmin;