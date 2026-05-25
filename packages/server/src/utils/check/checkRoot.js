const { SUPER_ADMIN_SECRET_KEY } = require("../../configs");
const passwordUtil = require("../passwords");

const checkAccountRoot = async (user) => {
    try {
        const validRoot = await passwordUtil.Compare(user.root || "", SUPER_ADMIN_SECRET_KEY);
        
        return validRoot;
    } catch (error) {
        console.log("[CHECK_ACCOUNT_ROOT_ERROR]", error);
        return error;
    }
};

module.exports = checkAccountRoot;
