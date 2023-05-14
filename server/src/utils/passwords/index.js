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
    
    static ToUnix(date){
        return Math.floor(date.getTime()/1000)
    }

    static expiredTimestamp(exp){
        return Password.ToUnix(new Date()) > exp;
    }
}

module.exports = new Password();