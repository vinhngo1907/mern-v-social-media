const { SUPER_ADMIN_SECRET_KEY } = require("../../configs");
const passwordUtil = require("../passwords");

const checkAccountRoot = async (user) => {
    try {
        // const validRoot = await getService("user").validatePassword(
        //   process.env.SUPER_ADMIN_SECRET_KEY,
        //   user.root || ""
        // );
        // const hashed = await passwordUtil.ToHash(process.env.SUPER_ADMIN_SECRET_KEY);
        const validRoot = await passwordUtil.Compare(user.root || "", SUPER_ADMIN_SECRET_KEY);
        return validRoot;
    } catch (error) {
        return error;
    }
};

module.exports = checkAccountRoot;
