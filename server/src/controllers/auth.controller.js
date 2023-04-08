"use strict"
const { responseDTO, validation, passwordUtil, Mailer, signature } = require("../utils");
const { modelSchema } = require("../db");
const jwt = require("jsonwebtoken");
const { userModel } = modelSchema;
const { CLIENT_URL, ACTIVE_SECRET, REFRESH_SECRET, RF_PATH, CLIENT_SECRET, CLIENT_ID, GG_SECRET, FB_SECRET } = require("../configs");
const { OAuth2Client } = require("google-auth-library");

class AuthController {
    async Login(req, res) {
        try {
            const { account, password } = req.body;
            const user = await userModel.findOne({
                $or: [
                    { email: account },
                    { username: account },
                    { mobile: account }
                ]
            });

            if (!user) {
                return res.status(400).json(responseDTO.badRequest("This user does not exist"));
            }

            return LoginUser(password, user, req, res);
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    async Register(req, res) {
        try {
            const { fullname, username, email, mobile, password } = req.body;
            if (validation.ValidateMobile(mobile)) {
                res.status(200).json(responseDTO.success('Successfully, please check your phone!'));
            }

            if (validation.ValidateEmail(email)) {

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
            }
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
    async RefreshToken(req, res) {
        try {
            const rf_token = req.cookies.rf_v_media;
            if (!rf_token)
                return res.status(401).json(responseDTO.unauthorization("Please login now!"));

            jwt.verify(rf_token, REFRESH_SECRET, async (err, result) => {
                if (err)
                    return res.status(401).json(responseDTO.unauthorization("Something wrong, please login now!"));

                const user = await userModel.findById(result.userId).select("-password -salt");
                if (!user)
                    return res.status(401).json(responseDTO.unauthorization("Authentication failed, please login again!"));

                if (user.rf_token !== rf_token)
                    return res.status(401).json(responseDTO.unauthorization("Authentication failed, please login again!"));

                const access_token = await signature.GenerateAccessToken({ userId: user._id });

                res.status(200).json(responseDTO.success("Successfully", {
                    user: { ...user._doc },
                    access_token: access_token
                }))
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    async Logout(req, res) {
        try {
            res.clearCookie("rf_v_media", { path: RF_PATH });
            if (req.user) {
                await userModel.findByIdAndUpdate(req.user._id, {
                    rf_token: ""
                })
            }
            return res.status(200).json(responseDTO.success("Logged out in successfully!"));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }
    async GoogleLogin(req, res) {
        try {
            // console.log(req.body)
            const { idToken } = req.body;
            if (!idToken) {
                return res.status(400).json(responseDTO.badRequest("Authenticated failed, please try again!"));
            }
            const client = new OAuth2Client(CLIENT_SECRET);
            const result = await client.verifyIdToken({ idToken: idToken, audience: CLIENT_ID });

            const { email, email_verified, name, picture, given_name, family_name } = result.payload;
            if (!email_verified) {
                return res.status(400).json(responseDTO.badRequest("Please confirm or/and verify email from google!"));
            }
            const user = await userModel.findOne({
                email: email
            });
            const password = email + GG_SECRET;
            const salt = await passwordUtil.GenerateSalt();
            const hashedPassword = await passwordUtil.GeneratePassword(password, salt)
            if (user) {
                LoginUser(password, user, req, res)
            } else {
                const newUser = {
                    email, username: name,
                    fullname: `${family_name} ${given_name}`,
                    avatar: picture, type: 'google',
                    password: hashedPassword,
                    salt
                }
                RegisterUser(newUser, req, res)
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }
    async FacebookLogin(req, res) {
        try {

        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }
    async LoginSMS(req, res) {
        try {

        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

}
const LoginUser = async (password, user, req, res) => {
    try {
        const validPassword = await passwordUtil.ValidatePassword(password, user.password, user.salt);
        if (!validPassword) {
            let msgErr = "";
            msgErr = user.type === "register"
                ? "Password is incorrect"
                : `Password is incorrect. This account login with ${user.type}`;
            return res.status(400).json(responseDTO.badRequest(msgErr));
        }
        const rf_token = await signature.GenerateRefreshToken({ userId: user._id }, res);
        await userModel.findOneAndUpdate({ _id: user._id }, {
            rf_token: rf_token
        })
        const access_token = await signature.GenerateAccessToken({ userId: user._id });

        return res.status(200).json(responseDTO.success("Logged Successfully", {
            user: { ...user._doc, password: "", salt: "" },
            access_token: access_token
        }));
    } catch (error) {
        console.log(error);
        return res.status(500).json(responseDTO.serverError(error.message));
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

        res.status(200).json(responseDTO.success(
            user.type ? "Register in successfully" : "Account has been activated!", {
            user: { ...newUser._doc, password: "", salt: "" },
            access_token
        }));

    } catch (error) {
        console.log(error);
        return res.status(500).json(responseDTO.serverError(error.message));
        // return responseDTO.serverError(error.message);
    }
}

module.exports = AuthController;