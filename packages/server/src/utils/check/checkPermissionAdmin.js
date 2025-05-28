const { modelSchema } = require("../../db");
const { decrypted } = require("../crypto");
const { settingModel } = modelSchema;

async function checkPermissionAdmin(
    xApiKey,
    passphrase,
    userId
) {
    if (!xApiKey) return false;
    const buffer = Buffer.from(xApiKey, "hex");
    const setting = await settingModel.find();
     if (!setting || !setting[0]?.secret_key) return false;

    const decrypt = decrypted(buffer.toString("base64"), setting[0].secret_key);
    if (!decrypt) return false;

    const payload = JSON.parse(JSON.parse(decrypt));
    console.log({userId: payload.userId, isExpired: payload.expiredAt < new Date().getTime()})
    if (payload.userId !== userId  || payload.expiredAt < new Date().getTime()) {
        return false;
    } else {
        return true;
    }
}

module.exports = checkPermissionAdmin;