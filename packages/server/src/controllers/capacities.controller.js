'use strict';

const { responseDTO, APIFeatures, validation, checkUtil, helpersUtil } = require("../utils");
const { modelSchema } = require("../db");
const { capacitiesModel } = modelSchema;
const { changeSlug } = helpersUtil;
const { checkPermission, checkRoot } = checkUtil;


class CapacityController {
    async Create(req, res) {
        try {
            const validRoot = await checkRoot(req.user);
            // console.log({ validRoot })
            if (!validRoot) {
                const allow = await checkPermission(
                    req.headers['x-api-key'] ?? null,
                    process.env.CAPACITY_CREATE_ROLE ?? null,
                    req.user
                );

                if (!allow) {
                    return res.status(403).json(responseDTO.forbiden("You don't have permission to create a new capacity"));
                }
            }

            const checkCapacity = validation.ValidateCreateCapacity(req.body);
            // console.log({checkCapacity})
            if (checkCapacity) {
                return res.status(400).json(responseDTO.badRequest(checkCapacity));
            }

            const { name } = req.body;
            const slug = changeSlug(name);
            const existedCapacity = await capacitiesModel.findOne({
                $or: [{ name }, { slug }]
            });

            if (existedCapacity) {
                return res.status(400).json(responseDTO.badRequest("Capacity already exists!"));
            }

            const newCapacity = new capacitiesModel({
                slug, name,
                createdBy: req.user.username,
                updatedBy: req.user.username
            });

            await newCapacity.save();

            return res.json(responseDTO.success("Created new capacity successfully!", {
                ...newCapacity._doc,
                // user: req.user
            }));
        } catch (error) {
            console.error(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }
}

module.exports = CapacityController;