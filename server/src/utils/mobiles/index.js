
const { ACCOUNT_SID, AUTH_TOKEN, PHONE_NUMB, SERVICE_ID } = require("../../configs");
const { Twilio } = require("twilio");
const client = new Twilio(ACCOUNT_SID, AUTH_TOKEN);

class Mobile {
    constructor(to, body, txt) {
        this.to = to;
        this.body = body;
        this.txt = txt;
    }

    async SendSMS() {
        // console.log(this.body);
        try {
            client.messages
                .create({
                    body: `V-Network ${this.txt} - ${this.body}`,
                    from: PHONE_NUMB,
                    to: this.to
                })
                .then(message => console.log(message.sid));

        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async SendOTP(channel) {
        try {
            const auth_token_promotion = await client.accounts.v1.authTokenPromotion().update();
            console.log(auth_token_promotion.dateCreated);
            
            const data = await client
                .verify
                .services(SERVICE_ID)
                .verifications
                .create({
                    to: this.to,
                    channel: channel === 'call' ? 'call' : 'sms'
                });

            return data;
        } catch (error) {
            // console.log(error);
            return error;
        }
    }

    async VerifySMS(code) {
        try {
            const data = await client
                .verify
                .services(SERVICE_ID)
                .verificationChecks
                .create({
                    to: this.to,
                    code
                });

            return data;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

module.exports = Mobile;