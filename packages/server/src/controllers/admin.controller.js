'use strict';

const { responseDTO, APIFeatures, passwordUtil, signature, checkUtil, helpersUtil } = require("../utils");
const { modelSchema } = require("../db");
const { userModel, roleModel, settingModel  } = modelSchema;
// const { changeSlug } = helpersUtil;
const { checkRoot, checkPermission } = checkUtil;
// const logger = require('node-color-log');
const { encrypted } = require("../utils/crypto");

class AdminController {
    async GetAllUser(req, res) {
        try {
            const { name } = req.query;
            let filterArr = [];
            if (name) {
                filterArr.push({ username: { $regex: name, $options: "i" } })
                filterArr.push({ fullname: { $regex: name, $options: "i" } })
            }

            const filterObj = filterArr.length >= 1 ? { "$or": filterArr } : {}
            const features = new APIFeatures(userModel.find({
                ...filterObj
            }).populate({
                path: "roles",
                select: "name slug capacities"
            }).select("-password -salt -__v -createdAt -updatedAt -rf_token"), req.query).paginating().sorting();

            const users = await features.query;
            res.status(200).json(responseDTO.success("Get data successfully", users));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    async GetUser(req, res) {
        try {
            const user = await userModel.findOne({ _id: req.params.id })
                .select("-password -rf_token -salt")
                .populate("following followers", "-password -rf_token -salt");
            if (!user) return res.status(400).json(responseDTO.badRequest("This user does not exist"));

            const roles = await roleModel.find({ _id: { $in: user.roles } }).select("-users");
            const role = roles.filter(r => r.name === "ADMIN");
            if (user.root) {
                delete user.root;
            }

            res.json(responseDTO.success("Get user successfully", {
                ...user,
                isAdmin: role ? true : false
            }));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    async GetMe(req, res) {
        try {
            let me = req.user.toObject ? req.user.toObject() : { ...req.user };

            if (!me) {
                return res.status(401).json(responseDTO.unauthorization("User not found"));
            }

            delete me.rf_token;

            const roles = await roleModel.find({ _id: { $in: me.roles } }).select("-users");
            const role = roles.filter(r => r.name === "ADMIN");

            res.json(responseDTO.success(
                "Get me successfully",
                { ...me, isAdmin: role ? true : false },
            ));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    async UpdateProfile(req, res) {
        try {
            const { fullname, avatar, gender, } = req.body;
            if (!fullname) return res.status(400).json(responseDTO.badRequest("Please add your full name."));

            const updatedUser = await userModel.findOneAndUpdate({ _id: req.user._id }, {
                ...req.body
            }, { new: true, runValidators: true }).select("-password -salt -rf_token");
            if (!updatedUser) {
                return res.status(400).json(responseDTO.badRequest("User not found or/and not authorized"));
            }

            res.status(200).json(responseDTO.success("Updated user successfully", updatedUser));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    async ChangePassword(req, res) {
        if (!req.user) return res.status(400).json(responseDTO.badRequest("User not found or/and not authorized"));

        if (req.user.type !== "register") {
            return res.status(400).json(responseDTO.badRequest(`Quick login account with ${req.user.type} can't use this function.`));
        }

        try {
            const { newPassword, oldPassword } = req.body;
            if (newPassword === oldPassword) {
                return res.status(400).json(responseDTO.badRequest("New password must be different with old password"));
            }

            const userExist = await userModel.findOne({ _id: req.user._id, username: req.user.username }).select("password salt");
            const validPassword = await passwordUtil.ValidatePassword(oldPassword, userExist.password, userExist.salt);
            if (!validPassword) {
                return res.status(400).json(responseDTO.badRequest("Your old password is not correct!"));
            }

            const salt = await passwordUtil.GenerateSalt();
            const hashedPassword = await passwordUtil.GeneratePassword(newPassword, salt);
            if (!hashedPassword || !salt) {
                return res.status(400).json(responseDTO.badRequest("Something wrong with password"));
            }

            const rf_token = await signature.GenerateRefreshToken({ userId: user._id }, res);

            const updatedUser = await userModel.findOneAndUpdate(
                { _id: req.user._id },
                {
                    password: hashedPassword,
                    salt: salt,
                    rf_token: rf_token
                }, {
                new: true, runValidators: true
            }).select("-rf_token -password -salt");

            const access_token = await signature.GenerateAccessToken({ userId: user._id });

            res.json(responseDTO.success("Changed password in successfully", {
                user: updatedUser,
                access_token

            }));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    async ResetPassword(req, res) {
        if (!req.user) return res.status(401).json(responseDTO.unauthorization("Invalid Authentication."));

        if (req.user.type !== "register") {
            return res.status(400).json(responseDTO.badRequest(`Quick login account with ${req.user.type} can't use this function.`));
        }

        try {
            const { password } = req.body;
            const salt = await passwordUtil.GenerateSalt();
            const passwordHashed = await passwordUtil.GeneratePassword(password, salt);

            const updatedUser = await userModel.findOneAndUpdate({ _id: req.user._id }, {
                password: passwordHashed,
                salt: salt
            });

            if (!updatedUser) {
                return res.status(400).json(responseDTO.badRequest(`Something wrong when updating password for ${req.user.username}`));
            }

            res.json(responseDTO.success("Reset Password Success!"));

        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    async ListUser(req, res) {
        try {
            const user = req.user;
            if (!user) {
                return res.status(401).json({ message: "You not found or not authorized!" });
            }

            const { name } = req.query;
            let filterArr = [];
            if (name) {
                filterArr.push({ username: { $regex: name, $options: "i" } })
                filterArr.push({ fullname: { $regex: name, $options: "i" } })
            }

            const filterObj = filterArr.length >= 1 ? { "$or": filterArr } : {}
            const features = new APIFeatures(userModel.find({
                ...filterObj
            })
                .populate({
                    path: "roles",
                    select: "name slug capacities"
                })
                .select("avatar username fullname mobile type createdAt isActive"), req.query)
                .paginating().sorting();

            // .select("-password -salt -__v -createdAt -updatedAt -rf_token"), req.query).paginating().sorting();

            const users = await features.query;
            res.status(200).json(responseDTO.success("Get data successfully", users));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    async UpdateUserRoles(req, res) {
        try {
            const { role } = req.body;
            await userModel.findOneAndUpdate({
                _id: req.params.id
            }, {
                roles: [role]
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

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

            const validRoot = await checkRoot(user);
            if (!validRoot) {
                const allow = await checkPermission(
                    req.headers['x-api-key'] ?? null,
                    process.env.CAPACITY_CREATE_ROLE ?? null,
                    req.user
                );

                if (!allow) {
                    return res.status(403).json(responseDTO.forbiden("You don't have permission to login this page"));
                }
            }

            return LoginUser(password, user, req, res);
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

        const payload = {
            userId: user._id,
            expiredAt: new Date().getTime() + 24 * 60 * 60 * 1000,
        };

        const rf_token = await signature.GenerateRefreshToken(payload, res);
        await userModel.findOneAndUpdate({ _id: user._id }, {
            rf_token: rf_token
        }).select("-rf_token -password -salt");

        const access_token = await signature.GenerateAccessToken(payload);
        const settings = await settingModel.find();

        const apiKey = encrypted(JSON.stringify(payload), settings[0].secret_key || process.env.secret_key);

        return res.json(
            responseDTO.success("Logged Successfully", {
                user: {
                    ...user._doc, password: "",
                    salt: "", rf_token: "", root: ""
                },
                access_token: access_token,
                apiKey,
            })
        );
    } catch (error) {
        console.log(error);
        return res.status(500).json(responseDTO.serverError(error.message));
    }
}


module.exports = AdminController