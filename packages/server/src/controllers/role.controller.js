'use strict';

const { responseDTO, APIFeatures, checkUtil, helpersUtil, validation } = require("../utils");
const { modelSchema } = require("../db");
const { changeSlug } = helpersUtil;
const { checkPermissionAdmin, checkRoot, checkPermission } = checkUtil;
const { roleModel, userModel } = modelSchema;

class RoleController {
    async GetAll(req, res, next) {
        try {
            const user = req.user;
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
                    return res.status(403).json(responseDTO.forbiden("You don't have permission to create new role"))
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
            // console.log("???", user.roles)
            if (!user) {
                return res.status(401).json(responseDTO.unauthorization("User not found or/and authorized"));
            }

            const validRoot = await checkRoot(user);
            // console.log({ validRoot })
            if (!validRoot) {
                return res.status(403).json(responseDTO.forbiden("You not allow create role"))
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

            const checkCapacity = validation.ValidateCreateRole(req.body);
            if (checkCapacity) {
                return res.status(400).json(responseDTO.badRequest(checkCapacity));
            }
            
            const data = req.body;
            const newRole = await new roleModel({
                ...data,
                slug: changeSlug(data.name),
                createdBy: user.username,
                updatedBy: user.username
            });

            await newRole.save();

            res.status(200).json(responseDTO.success("Created new role in successfully!", {
                ...newRole._doc
            }));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    async UpdateRoleSupport(req, res) {
        try {
            const user = req.user;

            if (!user) {
                return res.status(401).json(responseDTO.unauthorization("User not found or/and authorized"));
            }

            const validRoot = await checkRoot(user);
            if (!validRoot) {
                return res.status(403).json(responseDTO.forbiden("You not allow create role"))
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

            const roleId = req.params.id;
            const {
                name,
                userIdsToAdd, userIdsToRemove,
                capacitiesToAdd, capacitiesToRemove
            } = req.body;
            const updateFields = {}

            if (name) {
                updateFields.name = name;
                updateFields.slug = changeSlug(name);
            }

            let updatedRole = null;
            if (Object.keys(updateFields).length > 0) {
                updatedRole = await roleModel.findByIdAndUpdate(
                    roleId,
                    { $set: updateFields },
                    { new: true, runValidators: true }
                );
            }

            if (Array.isArray(userIdsToAdd) && userIdsToAdd.length > 0) {
                updatedRole = await roleModel.findByIdAndUpdate(
                    roleId,
                    { $addToSet: { users: { $each: userIdsToAdd } } },
                    { new: true }
                );

                await userModel.updateMany(
                    { _id: { $in: userIdsToAdd } },
                    { $addToSet: { roles: roleId } }
                )
            }

            if (Array.isArray(userIdsToRemove) && userIdsToRemove.length > 0) {
                updatedRole = await roleModel.findByIdAndUpdate(
                    roleId,
                    { $addToSet: { users: { $each: userIdsToAdd } } },
                    { $pull: { users: { $in: userIdsToRemove } } }
                );
                await userModel.updateMany(
                    { _id: { $in: userIdsToAdd } },
                    { $addToSet: { roles: roleId } }
                );
            }

            if (Array.isArray(userIdsToRemove) && userIdsToRemove.length > 0) {
                updatedRole = await roleModel.findByIdAndUpdate(
                    roleId,
                    { $pull: { users: { $in: userIdsToRemove } } },
                    { new: true }
                );
                await userModel.updateMany(
                    { _id: { $in: userIdsToRemove } },
                    { $pull: { roles: roleId } }
                );
            }

            if (Array.isArray(capacitiesToAdd) && capacitiesToAdd.length > 0) {
                updatedRole = await roleModel.findByIdAndUpdate(
                    roleId,
                    { $addToSet: { capacities: { $each: capacitiesToAdd } } },
                    { new: true }
                );
            }

            if (Array.isArray(capacitiesToRemove) && capacitiesToRemove.length > 0) {
                updatedRole = await roleModel.findByIdAndUpdate(
                    roleId,
                    { $pull: { capacities: { $in: capacitiesToRemove } } },
                    { new: true }
                );
            }

            if (!updatedRole) {
                return res.status(400).json(responseDTO.badRequest("Role not found"));
            }

            res.status(200).json(responseDTO.success("Updated role in successfully!!!", {
                ...updatedRole._doc
            }));

        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    async DeleteRoleSupport(req, res) {
        try {
            const user = req.user;
            if (!user) {
                return res.status(401).json(responseDTO.unauthorization("User not found or/and authorized"));
            }

            const allow = await checkPermission(
                req.headers['x-api-key'] ?? null,
                process.env.CAPACITY_DELETE_ROLE,
                user
            );

            if (!allow) {
                return res.status(400).json(responseDTO.badRequest("You now allow to delete role"))
            }

            const roleId = req.params.id;
            const deletedRole = await roleModel.findOneAndDelete({ _id: roleId });
            if (!deletedRole) return res.status(400).json(responseDTO.badRequest("This role does not exist"));

            res.status(200).json(responseDTO.success("Deleted message in successfully"));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }
}

module.exports = RoleController;