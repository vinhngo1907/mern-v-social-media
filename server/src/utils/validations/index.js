class Validation {
    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    validateMobile(phone) {
        const re = /^[+]/g
        return re.test(phone)
    }
    validaiteRegister(user) {
        let error = "";
        const { email, username } = user;
        if (!email || !username) {
            error = "Missing username or/and email"
        }
        if (!this.validateEmail(email)) {
            error = "Email format is incorrect"
        }
        return error;
    }
}

module.exports = new Validation();