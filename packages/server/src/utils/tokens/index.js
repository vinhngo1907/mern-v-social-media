const jwt = require("jsonwebtoken");
const { ACCESS_SECRET, REFRESH_SECRET, ACTIVE_SECRET, RF_PATH } = require("../../configs");
const jwtConfig = require("./jwt.token");

class Signature {
    constructor(){
        
    }
    async GenerateSignature(payload, secret, expires) {
        return jwt.sign(payload, secret, { expiresIn: expires });
    }

    async GenerateAccessToken(payload) {
        return await this.GenerateSignature(payload, ACCESS_SECRET, "1d");
    }

    async GenerateActiveToken(payload) {
        return await this.GenerateSignature(payload, ACTIVE_SECRET, "15m");
    }

    async GenerateRefreshToken(payload, res) {
        const rf_token = await this.GenerateSignature(payload, REFRESH_SECRET, "7d");
        res.cookie("rf_v_media", rf_token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            path: RF_PATH
        });
        return rf_token;
    }
}

module.exports = new Signature();