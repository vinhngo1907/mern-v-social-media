const express = require('express');
const router = express.Router();
const { userAuth } = require('../middleware');
const { GroupController } = require("../controllers");
const groupCtrl = new GroupController();

/**
 * @route GET api/group
 * @desc Get group
 * @access Private
 */
router.post("/", userAuth, groupCtrl.CreateGroup);

/**
 * @route GET api/group
 * @desc Get groups by user
 * @access Private
 */
router.get("/by", userAuth, groupCtrl.GetUserGroups);

/**
 * @route GET api/group
 * @desc Get all groups
 * @access Private
 */
router.get("/search", userAuth, groupCtrl.GetAllGroups);

module.exports = router;