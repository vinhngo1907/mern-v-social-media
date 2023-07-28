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
router.get("/", userAuth, groupCtrl.GetUserGroups);

module.exports = router;