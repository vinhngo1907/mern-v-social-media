const bcrypt = require("bcrypt");

class Password {
    async GenerateSalt() {
        return await bcrypt.genSalt();
    }
    
    async GeneratePassword(password, salt) {
        return await bcrypt.hash(password, salt);
    }
    
    async ValidatePassword(
        enteredPassword,
        savedPassword,
        salt
    ) {
        return (await this.GeneratePassword(enteredPassword, salt) === savedPassword);
    }
}

module.exports = new Password();