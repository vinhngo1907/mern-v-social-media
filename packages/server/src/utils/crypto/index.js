const { AES, enc } = require("crypto-js");
const CryptoJS = require("crypto-js");

function decrypted(secretKeyTotp, passphrase = null) {
    const decrypted = AES.decrypt(
        secretKeyTotp,
        passphrase ?? process.env.SECRET_PASSPHRARE
    );
    return decrypted.toString(enc.Utf8);
}

function encrypted(data, key) {
    const encrypted = AES.encrypt(data, key);
    const buffer = Buffer.from(encrypted.toString(), "base64");
    return buffer.toString("hex");
}

const encryptData = (data, secretKey) => {
    const encryptedData = AES.encrypt(JSON.stringify(data), secretKey).toString();
    return encryptedData;
};

const decryptData = (encryptedData, secretKey) => {
    const decryptedData = AES.decrypt(encryptedData, secretKey).toString(
        CryptoJS.enc.Utf8
    );
    return JSON.parse(decryptedData);
};

module.exports = { decrypted, encrypted, encryptData, decryptData };
