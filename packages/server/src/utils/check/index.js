const { checkRoot } = require("../../middleware");

const getToken = (ctx) => {
    return ctx.request.headers.authorization;
};

async function checkPermission(ctx, strapi, capacity, passphrase) {
    try {
        const user = await jwt(getToken(ctx), strapi);
        //Check super admin
        const validRoot = await checkRoot(user);
        if (validRoot) {
            const apiKey = ctx.headers["x-api-key"];
            if (!apiKey && !passphrase)
                return ctx.send({ error: "You don't have enough rights" }, 401);
            const setting = await strapi.query("api::setting.setting").findOne();
            const keyDecrypted = setting.secret_key;
            const buffer = Buffer.from(apiKey, "hex");
            const decrypt = decrypted(buffer.toString("base64"), keyDecrypted);
            const payload = JSON.parse(decrypt);
            console.log("🚀 ~ checkPermission ~ payload:", payload);
            if (payload.uid !== user.id || payload.expiredAt < new Date().getTime()) {
                return ctx.send({ error: "You don't have enough rights" }, 401);
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