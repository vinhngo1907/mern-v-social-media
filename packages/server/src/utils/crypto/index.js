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
    // Convert the data object to a JSON string
    const dataStr = JSON.stringify(data);

    // Perform the encryption
    const encrypted = AES.encrypt(dataStr, key).toString();
    
    // Convert the encrypted string to a Buffer using base64 encoding
    const buffer = Buffer.from(encrypted, 'base64');
    
    // Convert the buffer to a hex string
    return buffer.toString('hex');
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

// const test = encrypted({
//     userId: '641ea4ca750b8626c03a10c6',
//     iat: 1718444960,
//     exp: 1718531360
//   }, "U2VjcmV0S2V5VG9Ub3BUb2tlbg==");


// console.log({test})

module.exports = { decrypted, encrypted, encryptData, decryptData };
