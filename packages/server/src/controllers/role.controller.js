'use strict';

const { responseDTO, APIFeatures, checkUtil } = require("../utils");
const { modelSchema } = require("../db");
const { checkPermissionAdmin } = checkUtil;
const { roleModel } = modelSchema;

class RoleController {
    async GetAll(req, res, next) {
        try {
            const user = req.user;
            console.log("???", user.roles)
            if (!user) {
                return res.status(401).json(responseDTO.unauthorization("User not found or/and authorized"));
            }

            if (user.roles.find((role) => role.slug === "administrator")) {
                // const xApiKey = req.headers['x-api-key'];
                const allowAdmin = await checkPermissionAdmin(
                    req.headers['x-api-key'] ?? null,
                    process.env.secret_key ?? null,
                    user._id.toString()
                );
                
                if (!allowAdmin) {
                    return res.status(403).json(responseDTO.success("You don't have permission to create new role"))
                }
            }
            const roles = await roleModel.find({});
            res.json(responseDTO.success("Get data in successfully", roles));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }
    async CreateRoleSupport(req, res, next) {
        try {
            const user = req.user;
            console.log("???", user.roles)
            if (!user) {
                return res.status(401).json(responseDTO.unauthorization("User not found or/and authorized"));
            }

            
            if (user.roles.find((role) => role.slug === "administrator")) {
                // const xApiKey = req.headers['x-api-key'];

                const allowAdmin = await checkPermissionAdmin(
                    req.headers['x-api-key'] ?? null,
                    process.env.secret_key ?? null,
                    user._id
                );

                if (!allowAdmin) {
                    return res.status(403).json(responseDTO.success("You don't have permission to create new role"))
                }
            }

            res.status(200).json(responseDTO.success("Success"));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }
}

module.exports = RoleController;