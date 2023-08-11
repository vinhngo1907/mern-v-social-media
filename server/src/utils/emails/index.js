'use strict';

const { CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN, SENDER_MAIL, OAUTH_PLAYGROUND, CLIENT_URL } = require("../../configs");
const nodemailer = require("nodemailer");
const { google } = require('googleapis')
const { OAuth2 } = google.auth;
const logger = require("node-color-log");
// const { OAuth2Client } = require("google-auth-library");
// const { responseDTO } = require("../../utils");

class Mailer {
    constructor(to, url, txt) {
        this.to = to;
        this.url = url;
        this.txt = txt;
    }
    async sendMail() {
        const oAuth2Client = new OAuth2(
            CLIENT_ID, CLIENT_SECRET, OAUTH_PLAYGROUND
        );

        oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

        google.options({ auth: oAuth2Client });
        try {
            // const access_token = await oAuth2Client.getAccessToken();
            const access_token = new Promise((resolve, reject) => {
                oAuth2Client.getAccessToken((err, token) => {
                    if (err) console.log(err); // Handling the errors
                    else resolve(token);
                });
            });
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
                to: this.to,
                subject: "V-Social-Media-NetWork",
                html: require("./template.email")({ url: this.url, txt: this.txt, CLIENT_URL })
            }

            const result = await transport.sendMail(mailOptions);
            return result;
        } catch (error) {
            logger.error(error.message);
            return responseDTO.badRequest(error.message);
        }
    }
}

module.exports = Mailer;