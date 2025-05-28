const bcrypt = require("bcrypt");
const { scrypt, randomBytes } = require('crypto');

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
        const [hashedPassword, salt] = storedPassword.split('.');
        const buf = await scryptAsync(suppliedPassword, salt, 64);

        try {
            const [hashedPassword, salt] = storedPassword.split('.');
            const buf = await new Promise((resolve, reject) => {
                scrypt(suppliedPassword, salt, 64, (err, derivedKey) => {
                    if (err) return reject(err);
                    resolve(derivedKey);
                });
            });

            return buf.toString('hex') === hashedPassword;
        } catch (err) {
            console.error('Compare error:', err);
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

// const pass =  ToHash("do-may-biet")
// console.log(pass.then(result=>console.log({result})));