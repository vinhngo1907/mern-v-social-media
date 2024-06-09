class Validation {
    ValidateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    ValidateMobile(phone) {
        const re = /^[+]/g
        return re.test(phone)
    }
    ValidaiteRegister(user) {
        let error = "";
        const { account, username } = user;
        if (!account || !username) {
            error = "Missing username or/and email"
        }
        if (!this.ValidateEmail(account)) {
            error = "Email format is incorrect"
        }
        return error;
    }
    ValidateCreateCapacity(capacity) {
        let error = "";
        const { name, slug } = capacity;

        // Check if name and slug are provided
        if (!name || !slug) {
            error = "Missing name or/and slug";
            return error;
        }

        // Check if name is not empty
        if (name.trim() === "" || slug.trim() === "") {
            error = "Điền cái NAME/SLUG gì kì vậy pa!";
            return error;
        }

        // Convert name to slug
        const expectedSlug = name.toLowerCase().replace(/\s+/g, '_');

        // Check if slug matches the expected slug
        if (slug !== expectedSlug) {
            error = "Slug does not match the expected format (lowercase with underscores)";
            return error;
        }

        // If no errors, return an empty string
        return error;
    }
}

module.exports = new Validation();