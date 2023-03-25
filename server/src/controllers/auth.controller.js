"use strict"
const { ResponseDTO, Validation, Password, Mailer, Signature } = require("../utils");
const { modeSchema } = require("../db");
const { CLIENT_URL, ACTIVE_SECRET } = require("../configs");
const { userModel } = modeSchema;
const jwt = require("jsonwebtoken");

class AuthController {
    constructor() {
        // this.responseDTO = new ResponseDTO();
        // this.validate = new Validation();
        // this.password = new Password();
        // this.signature = new Signature();
    }

    async Login(req, res) {
        try {
            const { account, password } = req.body;
            if (this.validate.validateMobile(account)) {

            }

            const user = await userModel.findOne({
                $or: [
                    { email: account },
                    { username: account }
                ]
            });
            if (!user) {
                res.status(400).json(this.responseDTO.badRequest("This user does not exist"));
            }
            return this.LoginUser(password, user, req, res);
            // res.status(200).json(this.responseDTO.success("Success"))
        } catch (error) {
            console.log(error);
            return res.status(500).json(this.responseDTO.serverError(error.message));
        }
    }

    async Register(req, res) {
        try {
            const { fullname, username, email, password } = req.body;
            const checkUser = Validation.validaiteRegister(req.body);

            // Simple validate
            if (checkUser) {
                return res.status(400).json(this.responseDTO.badRequest(checkUser))
            }

            const newUserName = username.toLowerCase().replace(/ /g, '');

            const salt = await Password.GenerateSalt();
            const newPassword = await Password.GeneratePassword(password, salt);
            const newUser = {
                fullname, username: newUserName, email, password: newPassword, salt
            }
            const activeToken = await Signature.GenerateActiveToken(newUser);
            const url = `${CLIENT_URL}/active/${activeToken}`
            const mailer = new Mailer(email, url, "Verify your email address");
            mailer.sendMail();
            res.status(200).json(ResponseDTO.success('Successfully, please check your email!'));
        } catch (error) {
            console.log(error);
            return res.status(500).json(ResponseDTO.serverError(error.message));
        }
    }

    async ActiveAccount(req, res) {
        try {
            const { token } = req.body;
            if (!token) {
                return res.status(400).json(ResponseDTO.badRequest("Register in failure, please try again!"));
            }
            const user = jwt.verify(token, ACTIVE_SECRET)
            const result = await RegisterUser(user, req, res);
            if (result.status !== 200) {
                return res.status(400).json(result);
            }
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            return res.status(500).json(ResponseDTO.serverError(error.message));
        }
    }

    async LoginUser(password, user, req, res) {
        try {
            return res.status(200).json(this.responseDTO.success("Logged Successfully", {
                user: { ...user, password: "" }
            }))
        } catch (error) {
            console.log(error);
        }
    }

    
}

 const RegisterUser = async(user, req, res)=> {
    try {
        // Check for existing user
        const isUserExist = await userModel.findOne({
            $or: [
                { username: user.username },
                { email: user.email }
            ]
        });

        if (isUserExist)
            return res.status(400).json(ResponseDTO.badRequest("This user is already taken"));

        const newUser = await new userModel({ ...user });

        // return token
        const access_token = await Signature.GenerateAccessToken({ userId: newUser._id });
        const rf_token = await Signature.GenerateRefreshToken({ userId: newUser._id }, res);
        newUser.rf_token = rf_token;

        // save user
        await newUser.save();

        // return res.status(200).json(this.responseDTO.success("Registered in successfully!", {
        //     user: { ...user, password: "" },
        //     access_token
        // }))
        return ResponseDTO.success("Registered in successfully!", {
            user: { ...user, password: "" },
            access_token
        })
    } catch (error) {
        console.log(error);
        // return res.status(400).json(this.responseDTO.serverError(error.message));
        return ResponseDTO.serverError(error.message);
    }
}

module.exports = AuthController;