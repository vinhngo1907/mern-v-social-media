const jwt = require("jsonwebtoken");
const { modelSchema } = require("../../db");
const checkAccountRoot = require("./checkRoot");
const { userModel } = modelSchema;

const getToken = (req) => {
    return req.headers.authorization;
};
async function checkPermission(req, res, strapi, capacity, passphrase) {
    try {
        const user = await jwt(getToken(req), strapi);
        //Check super admin
        const validRoot = await checkAccountRoot(user);
        if (validRoot) {
            const apiKey = req.headers["x-api-key"];
            if (!apiKey && !passphrase)
                return res.status(403).json({
                    status: 403,
                    message: "You don't have enough rights"
                });
            const setting = await strapi.query("api::setting.setting").findOne();
            const keyDecrypted = setting.secret_key;
            const buffer = Buffer.from(apiKey, "hex");
            const decrypt = decrypted(buffer.toString("base64"), keyDecrypted);
            const payload = JSON.parse(decrypt);
            console.log("🚀 ~ checkPermission ~ payload:", payload);
            if (payload._id !== user._id || payload.expiredAt < new Date().getTime()) {
                return res.status(403).json({
                    status: 403,
                    message: "You don't have enough rights",
                });
            }
            return true;
        }
        //
        const role = await strapi.entityService.findMany(
            "api::role-support.role-support",
            {
                fields: ["name", "slug"],
                filters: {
                    name: user.role_support?.name,
                },
                populate: {
                    capacities: {
                        fields: ["name", "slug"],
                    },
                },
            }
        );

        if (role.length == 0) {
            ctx.send({ error: "You not allow edit location" }, 401);
            return false;
        }
        const allow = role[0].capacities.some((item) => item.slug == capacity);
        if (allow) {
            return allow;
        } else {
            ctx.send({ error: "You not allow edit location" }, 401);
            return allow;
        }
    } catch (error) {
        return ctx.send({ error: "You don't have enough rights" }, 401);
    }
};

module.exports = checkPermission;