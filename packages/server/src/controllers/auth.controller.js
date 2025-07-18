"use strict"
const { responseDTO, validation, passwordUtil, Mailer, signature, Mobile, cryptoUtil } = require("../utils");
const { modelSchema } = require("../db");
const jwt = require("jsonwebtoken");
const { userModel, settingModel } = modelSchema;
const { CLIENT_URL, ACTIVE_SECRET, REFRESH_SECRET, RF_PATH, CLIENT_SECRET, CLIENT_ID, GG_SECRET, FB_SECRET, PHONE_SECRET } = require("../configs");
const { OAuth2Client } = require("google-auth-library");
const fetch = require("node-fetch");
const { ValidateEmail, ValidateMobile } = require("../utils/validations");
const { roleModel } = require("../db/models");
const { encrypted, hashPassword } = cryptoUtil;

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
            }).populate("following followers", "-rf_token -password -salt");

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
            // const { fullname, username, email, mobile, password } = req.body;
            const { fullname, username, account, password } = req.body;

            if (validation.ValidateEmail(account)) {
                const checkUser = validation.ValidaiteRegister(req.body);

                // Simple validate
                if (checkUser) {
                    return res.status(400).json(responseDTO.badRequest(checkUser))
                }

                const salt = await passwordUtil.GenerateSalt();
                const newPassword = await passwordUtil.GeneratePassword(password, salt);

                const newUserName = username.toLowerCase().replace(/ /g, '');
                const newUser = {
                    fullname, username: newUserName, email: account, password: newPassword, salt
                }

                const activeToken = await signature.GenerateActiveToken(newUser);
                const url = `${CLIENT_URL}/active/${activeToken}`;

                const mailer = new Mailer(account, url, "Verify your email address");
                mailer.sendMail();
                return res.status(200).json(responseDTO.success('Successfully, please check your email!'));
            }

            if (validation.ValidateMobile(account)) {
                const salt = await passwordUtil.GenerateSalt();
                const newPassword = await passwordUtil.GeneratePassword(password, salt);
                const newUser = {
                    mobile: account, password: newPassword, salt, username: account, fullname: account, email: account, type: "sms",
                }
                const activeToken = await signature.GenerateActiveToken(newUser);
                const url = `${CLIENT_URL}/active/${activeToken}`;

                const mobiler = new Mobile(account, url, "Verify your mobile sms");
                await mobiler.SendSMS();
                return res.json(responseDTO.success('Successfully, please check your phone!'));
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

                const user = await userModel.findById(result.userId)
                    .select("-password -salt").populate("following followers", "-rf_token -password -salt");
                if (!user)
                    return res.status(401).json(responseDTO.unauthorization("Authentication failed, please login again!"));

                if (user.rf_token !== rf_token)
                    return res.status(401).json(responseDTO.unauthorization("Authentication failed, please login again!"));

                const access_token = await signature.GenerateAccessToken({ userId: user._id });

                res.status(200).json(responseDTO.success("Successfully", {
                    user: { ...user._doc, rf_token: "", salt: "" },
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
            }).populate("following followers", "avatar fullname username email");
            const password = email + GG_SECRET;
            const salt = await passwordUtil.GenerateSalt();
            const hashedPassword = await passwordUtil.GeneratePassword(password, salt)
            if (user) {
                LoginUser(password, user, req, res)
            } else {
                const newUser = {
                    email, 
                    username: name,
                    fullname: `${family_name} ${given_name}`,
                    avatar: picture, 
                    type: 'google',
                    password: hashedPassword,
                    salt
                }
                RegisterUser(newUser, req, res);
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    async FacebookLogin(req, res) {
        try {
            const { accessToken, userID } = req.body;
            const URL = `https://graph.facebook.com/v2.9/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`
            const data = await fetch(URL).then(res => res.json()).then(res => { return res });
            // console.log({data});
            const { name, email, picture } = data;
            const existed = await userModel.findOne({ $or: [{ email: email }, { username: name }] });
            const password = email + FB_SECRET;

            if (existed) {
                LoginUser(password, existed, req, res);
            } else {
                const salt = await passwordUtil.GenerateSalt();
                const hashedPassword = await passwordUtil.GeneratePassword(password, salt)
                const user = {
                    type: "facebook",
                    username: name,
                    fullname: name,
                    email,
                    avatar: picture?.data.url,
                    password: hashedPassword,
                    salt
                }
                RegisterUser(user, req, res);
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    async LoginSMS(req, res) {
        try {
            const { phone } = req.body;
            const mobile = new Mobile(phone, "", "");
            const data = await mobile.SendOTP('sms');

            res.json(responseDTO.success("Successfully, please check your phone!", data));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    async VerifySMS(req, res) {
        try {
            const { phone, code } = req.body;
            const mobile = new Mobile(phone, "", "");
            const data = await mobile.VerifySMS(code);
            if (!data?.valid) return res.status(400).json(responseDTO.badRequest("Invalid Authentication"));

            const password = phone + PHONE_SECRET;

            const user = await userModel.findOne({ mobile: phone, type: 'sms' });
            if (user) {
                return LoginUser(password, user, req, res);
            } else {
                const salt = await passwordUtil.GenerateSalt();
                const hashedPassword = await passwordUtil.GeneratePassword(password, salt);
                const newUser = {
                    type: "sms",
                    password: hashedPassword,
                    salt,
                    mobile: phone,
                    username: phone,
                    email: phone,
                    fullname: phone
                }
                return RegisterUser(newUser, req, res);
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    async ForgotPassword(req, res) {
        try {
            const { account } = req.body;
            if (!account) {
                return res.status(400).json(responseDTO.badRequest("This account does not exist!!!"));
            }

            const user = await userModel.findOne({ account });
            if (!user) {
                return res.status(400).json(responseDTO.badRequest("This account does not exist."));
            }

            if (user.type !== "register") {
                return res.status(400).json(responseDTO.badRequest(`Quick login account with ${user.type} can't use this function.`));
            }

            const resetToken = await signature.GenerateAccessToken({ userId: user._id });
            const url = `${CLIENT_URL}/reset-password/${resetToken}`;

            if (ValidateEmail(account)) {
                const mailer = new Mailer(email, url, "Forgot password?");
                mailer.sendMail();
                return res.json(responseDTO.success('Successfully, please check your email!'));
            }

            if (ValidateMobile(account)) {
                const mobiler = new Mobile(account, url, "Forgot password?");
                await mobiler.SendSMS();
                return res.json(responseDTO.success("Success! Please check your phone."));
            }


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

        const payload = { userId: user._id, expiredAt: new Date().getTime() + 24 * 60 * 60 * 1000, };
        // const roles = await roleModel.find(
        //     { _id: { $in: user.roles } }).select("-users");
        // const role = roles.filter(r => r.name === "ADMIN");

        const rf_token = await signature.GenerateRefreshToken(payload, res);
        await userModel.findOneAndUpdate({ _id: user._id }, {
            rf_token: rf_token
        }).select("-rf_token -password -salt");

        const access_token = await signature.GenerateAccessToken(payload);
        const settings = await settingModel.find();

        const apiKey = encrypted(JSON.stringify(payload), settings[0].secret_key || process.env.secret_key);

        return res.json(
            responseDTO.success("Logged Successfully", {
                user: { ...user._doc, password: "", salt: "", rf_token: "", root: "" },
                access_token: access_token,
                apiKey,
                // isAdmin: role[0]?.name === "ADMIN" ? true : false
            })
        );
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

        const userRole = await roleModel.findOne({ slug: "user" });
        if (!userRole) {
            return res.status(400).json(responseDTO.serverError("Default role 'user' not found in database"));
        }

        const newUser = await new userModel({ ...user, roles: [userRole._id] });

        const payload = { userId: newUser._id, expiredAt: new Date().getTime() + 24 * 60 * 60 * 1000, };
        const access_token = await signature.GenerateAccessToken(payload);

        await signature.GenerateRefreshToken(payload, res);

        const settings = await settingModel.find();
        const apiKey = encrypted(JSON.stringify(payload), settings[0].secret_key || process.env.secret_key);
        // save user
        await newUser.save();

        await roleModel.updateOne(
            { _id: userRole._id },
            { $addToSet: { users: newUser._id } }
        );

        res.status(200).json(responseDTO.success(
            user.type ? "Register in successfully" : "Account has been activated!", {
            user: { ...newUser._doc, password: "", salt: "", rf_token: "", root: "" },
            access_token,
            apiKey
        }));

    } catch (error) {
        console.log(error);
        return res.status(500).json(responseDTO.serverError(error.message));
    }
}

module.exports = AuthController;