const nodemailer = require("nodemailer");
const { google } = require('googleapis')
const { OAuth2 } = google.auth;
const { CLIENT_ID, CLIENT_SECRET, CLIENT_SECRET, REFRESH_TOKEN, SENDER_MAIL, OAUTH_PLAYGROUND } = require("../../configs");

class Mailer {
    constructor(to, url, txt) {
        this.to = to;
        this.url = url;
        this.txt = txt
    }
    async sendMail() {
        const oAuth2Client = new OAuth2(
            CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN, OAUTH_PLAYGROUND
        );
        oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
    }
}

module.exports = Mailer;