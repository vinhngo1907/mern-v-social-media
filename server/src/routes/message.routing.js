const express = require('express');
const router = express.Router();
const { userAuth } = require('../middleware');
const { MessageController } = require("../controllers")
const messageCtrl = new MessageController();

/**
 * @route POST api/create
 * @desc Post message
 * @access Private
 */
router.post("/", userAuth, messageCtrl.CreateMessage);

/**
 * @route POST api/create
 * @desc Post message
 * @access Private
 */
router.get("/", userAuth, messageCtrl.GetMessage);

module.exports = router;