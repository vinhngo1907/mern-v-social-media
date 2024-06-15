const { modelSchema } = require("../../db");
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
        console.log({user})
        //Check super admin
        const validRoot = await checkAccountRoot(user);
        console.log({validRoot})
        if (validRoot) {
            if (
                !apiKey 
                // && !passphrase
            )
                return res.status(403).json({
                    status: 403,
                    message: "You don't have enough rights"
                });
            const setting = await settingModel.find()[0];
            // console.log({setting})
            const keyDecrypted = setting.secret_key;
            const buffer = Buffer.from(apiKey, "hex");
            const decrypt = decrypted(buffer.toString("base64"), keyDecrypted);
            const payload = JSON.parse(decrypt);
            console.log("🚀 ~ checkPermission ~ payload:", payload);
            if (payload._id !== user._id
                // || payload.expiredAt < new Date().getTime()
            ) {
                return res.status(403).json({
                    status: 403,
                    message: "You don't have enough rights",
                });
            }
            return true;
        }
        
        const roles = await roleModel.find(
            {
                name: user.roles?.name,
            }
        ).select("name slug").populate("capacities", ["name", "slug"]);

        if (roles.length == 0) {
            res.status(401).json({
                status: 401,
                message: "You not allow edit location"
            });
            return false;
        }
        // console.log({ roles })
        const allow = roles[0].capacities.some((item) => item.slug == capacity);
        if (allow) {
            return allow;
        } else {
            res.status(401).json({ status: 401, message: "You not allow edit location" });
            return allow;
        }
    } catch (error) {
        return res.send({ status: 401, message: "You don't have enough rights" });
    }
};

module.exports = checkPermission;