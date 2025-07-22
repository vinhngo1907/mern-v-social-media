const express = require('express');
const router = express.Router();
const { userAuth } = require('../middleware');
const { MessageController } = require("../controllers")
const messageCtrl = new MessageController();

/**
 * @route POST api/message
 * @desc Post message
 * @access Private
 */
router.get("/:id", userAuth, messageCtrl.GetMessage);

/**
 * @route POST api/message
 * @desc Post message
 * @access Private
 */
router.post("/", userAuth, messageCtrl.CreateMessage);

/**
 * @route DELETE api/message
 * @desc Delete message by id
 * @access Private
 */
router.delete("/:id", userAuth, messageCtrl.DeleteMessage);

// --- Mark temp deleted (public?) ---
router.post('/mark-temp-deleted', messageCtrl.DeleteTempMessage);

/**
 * @route DELETE api/message
 * @desc Delete message by id
 * @access Private
 */
router.put('/edit/:id', userAuth, messageCtrl.UpdateMessage);

module.exports = router;