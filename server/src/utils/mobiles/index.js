const { Twilio } = require("twilio");

class Mobile {
    constructor(to, body, txt) {
        this.to = to;
        this.body = body;
        this.txt = txt;
    }

    async SendSMS() {
        try {

        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async SendOTP() {
        try {

        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

module.exports = Mobile;