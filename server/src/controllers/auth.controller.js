"use strict"
const { responseDTO, validation, passwordUtil, Mailer, signature } = require("../utils");
const { modeSchema } = require("../db");
const { CLIENT_URL, ACTIVE_SECRET } = require("../configs");
const { userModel } = modeSchema;
const jwt = require("jsonwebtoken");

class AuthController {
    async Login(req, res) {
        try {
            const { account, password } = req.body;
            if (validation.ValidateEmail(account)) {
                const user = await userModel.findOne({
                    $or: [
                        { email: account },
                        { username: account }
                    ]
                });
                if (!user) {
                    res.status(400).json(responseDTO.badRequest("This user does not exist"));
                }
                return this.LoginUser(password, user, req, res);
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    async Register(req, res) {
        try {
            const { fullname, username, email, password } = req.body;
            const checkUser = validation.ValidaiteRegister(req.body);

            // Simple validate
            if (checkUser) {
                return res.status(400).json(responseDTO.badRequest(checkUser))
            }

            const newUserName = username.toLowerCase().replace(/ /g, '');

            const salt = await passwordUtil.GenerateSalt();
            const newPassword = await passwordUtil.GeneratePassword(password, salt);
            const newUser = {
                fullname, username: newUserName, email, password: newPassword, salt
            }
            const activeToken = await signature.GenerateActiveToken(newUser);
            const url = `${CLIENT_URL}/active/${activeToken}`
            const mailer = new Mailer(email, url, "Verify your email address");
            mailer.sendMail();
            res.status(200).json(responseDTO.success('Successfully, please check your email!'));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    async ActiveAccount(req, res) {
        try {
            const { token } = req.body;
            if (!token) {
                return res.status(400).json(responseDTO.badRequest("Register in failure, please try again!"));
            }
            const user = jwt.verify(token, ACTIVE_SECRET);
            if (!user) {
                return res.status(400).json(responseDTO.unauthorization("Authenticated faild, please try again."))
            }
            await RegisterUser(user, req, res);


        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }
}
const LoginUser = async (password, user, req, res) => {
    try {
        return res.status(200).json(responseDTO.success("Logged Successfully", {
            user: { ...user, password: "" }
        }));
    } catch (error) {
        console.log(error);
    }
}

const RegisterUser = async (user, req, res) => {
    try {
        // Check for existing user
        const isUserExist = await userModel.findOne({
            $or: [
                { username: user.username },
                { email: user.email }
            ]
        });
        
        if (isUserExist)
            return res.status(400).json(responseDTO.badRequest("This user is already taken"));

        const newUser = await new userModel({ ...user });

        // return token
        const access_token = await signature.GenerateAccessToken({ userId: newUser._id });
        await signature.GenerateRefreshToken({ userId: newUser._id }, res);

        // save user
        await newUser.save();

        res.status(200).json(this.responseDTO.success(
            user.type ? "Register in successfully" : "Account has been activated!", {
            user: { ...newUser._doc, password: "" },
            access_token
        }));

    } catch (error) {
        console.log(error);
        return res.status(500).json(responseDTO.serverError(error.message));
        // return responseDTO.serverError(error.message);
    }
}

module.exports = AuthController;