const bcrypt = require("bcrypt");
const { scrypt, randomBytes } = require('crypto');
const { promisify } = require("util");
const scryptAsync = promisify(scrypt);

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
    
    async ToHash(password) {
        const salt = randomBytes(8).toString('hex');
        const buf = await new Promise((resolve, reject) => {
            scrypt(password, salt, 64, (err, derivedKey) => {
                if (err) reject(err);
                else resolve(derivedKey);
            });
        });

        return `${buf.toString('hex')}.${salt}`;
    }

    async Compare(storedPassword, suppliedPassword) {
        try {
            console.log({storedPassword, suppliedPassword})
            const [hashedPassword, salt] = storedPassword.split(".");
            console.log({hashedPassword, salt})
            const buf = await scryptAsync(suppliedPassword, salt, 64);

            // console.log("hashedPassword:", hashedPassword);
            console.log("buf:", buf.toString("hex"));
            // console.log("Equal:", buf.toString("hex") === hashedPassword);
            const isEqual = buf.toString("hex") === hashedPassword;
            return isEqual;
        } catch (err) {
            console.error("[PASS_COMPARE_ERROR]:", err);
            return false;
        }
    }
}

module.exports = new Password();

// async function ToHash(password) {
//     const salt = randomBytes(8).toString('hex');
//     const buf = await new Promise((resolve, reject) => {
//         scrypt(password, salt, 64, (err, derivedKey) => {
//             if (err) reject(err);
//             else resolve(derivedKey);
//         });
//     });

//     return `${buf.toString('hex')}.${salt}`;
// }
// const pass = ToHash("U2VjcmV0S2V5VG9Ub3BUb2tlbg==")
// console.log(pass.then(result=>console.log({result})));