'use strict';

const { CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN, SENDER_MAIL, OAUTH_PLAYGROUND } = require("../../configs");
const nodemailer = require("nodemailer");
// const { google } = require('googleapis')
// const { OAuth2 } = google.auth;

const { OAuth2Client } = require("google-auth-library");
const ResponseDTO = require("../dtos");

class Mailer {
    constructor(to, url, txt) {
        this.to = to;
        this.url = url;
        this.txt = txt;
    }
    async sendMail() {
        const oAuth2Client = new OAuth2Client(
            CLIENT_ID, CLIENT_SECRET, OAUTH_PLAYGROUND
        );

        oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
        try {
            const access_token = await oAuth2Client.getAccessToken();
            const transport = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    type: "OAuth2",
                    user: SENDER_MAIL,
                    clientId: CLIENT_ID,
                    clientSecret: CLIENT_SECRET,
                    refreshToken: REFRESH_TOKEN,
                    accessToken: access_token
                },
            });
            const mailOptions = {
                from: SENDER_MAIL,
                to: to,
                subject: "V-Social-Media-NetWork",
                html: require("./template.email")(this.url, this.txt, CLIENT_ID)
            }

            const result = await transport.sendMail(mailOptions);
            return result;
        } catch (error) {
            console.log(error);
            return ResponseDTO.badRequest(error.message);
        }
    }
}

module.exports = Mailer;