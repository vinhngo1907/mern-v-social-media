const { modelSchema } = require("../../db");
const { decrypted } = require("../crypto");
const { userModel, roleModel, settingModel } = modelSchema;
const checkAccountRoot = require("./checkRoot");
const checkUser = require("./checkUser");

const getToken = (req) => {
    return req.headers.authorization;
};

async function checkPermission(req, res, capacity, passphrase = null) {
    const apiKey = req.header('X-Api-Key');
    try {
        const user = await checkUser(req, res, getToken(req), userModel);
        const validRoot = await checkAccountRoot(user);

        if (validRoot) {
            if (!apiKey) {
                return false;
            }
            const setting = await settingModel.find();
            const keyDecrypted = setting[0].secret_key;
            const buffer = Buffer.from(apiKey, "hex");
            const decrypt = decrypted(buffer.toString("base64"), keyDecrypted);
            // console.log({decrypt})
            const payload = JSON.parse(decrypt);
            // console.log({payload})
            if (payload._id !== user._id) {
                return false;
            }

            return true;
        }

        const roles = await roleModel.find({
            name: user.roles?.name,
        }).select("name slug").populate("capacities", ["name", "slug"]);

        if (roles.length === 0) {
            return false;
        }

        const allow = roles[0].capacities.some((item) => item.slug == capacity);
        return allow;
    } catch (error) {
        console.log("checkPermission: ", error);
        return false;
    }
}

module.exports = checkPermission;