function validateRegister({ fullname, username, email, password, cf_password }) {
    let error = {}
    if (!fullname) {
        error.fullname = "Fullname can not be blank"
    } else if (fullname.length > 25) {
        error.fullname = "Fullname is up to 25 chars long"
    }

    if (!username) {
        error.username = "User name can not be blank"
    } else if (username.length > 20) {
        error.username = "User name is up to 25 chars long"
    }

    if (!email) {
        error.email = "Email can not be blank"
    } else if (!validateEmail(email)) {
        error.email = "Email format is incorrect"
    }

    if (!password) {
        error.password = "Password can not be blank";
    } else {
        const checkPass = validatePassword(password, cf_password);
        const { pass, cf_pass } = checkPass;
        if (pass) error.password = pass;

        if (cf_pass) error.cf_pass = cf_pass;
    }

    return {
        errMsg: error,
        errLength: Object.keys(error).length
    }
}

function validateUpdateProfile({ fullname, mobile, story }) {
    let error = {}
    if (fullname && fullname.length > 25) {
        error.fullname = "Fullname is up to 25 chars long"
    }

    if (mobile) {
        if (!validatePhone(mobile)) {
            error.mobile = "Mobile format is incorrect";
        }
    }

    if (story && story.length > 200) {
        error.story = "Your story too long."
    }

    return {
        errMsg: error,
        errLength: Object.keys(error).length
    }
}

function validatePassword(password, cf_password) {
    let error = {}
    if (password.length < 6) {
        error.pass = ("Password must be at least 6 chars.")
    }

    if (password !== cf_password) {
        error.cf_pass = ("Confirm password does not match.")
    }

    return error;
}

function validateEmail(email) {
    // eslint-disable-next-line
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[+]/g
    return re.test(phone)
}