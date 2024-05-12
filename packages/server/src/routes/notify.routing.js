const express = require('express');
const router = express.Router();
const { userAuth } = require('../middleware');
const { NotifyController } = require("../controllers")
const notifyCtrl = new NotifyController();

/**
 * @route GET api/notify
 * @desc Get notify
 * @access Private
 */
router.get("/", userAuth, notifyCtrl.GetNotifies);

/**
 * @route POST api/notify
 * @desc Post notify
 * @access Private
 */
router.post("/", userAuth, notifyCtrl.CreateNotify);

/**
 * @route DELETE api/notify
 * @desc Delete notify
 * @access Private
 */
router.delete("/:id", userAuth, notifyCtrl.RemoveNotify);

/**
 * @route DELETE api/notify
 * @desc Delete all notify
 * @access Private
 */
router.delete("/", userAuth, notifyCtrl.DeleteAllNotifies);

/**
 * @route PATCH api/notify
 * @desc Patch notify
 * @access Private
 */
router.patch("/:id", userAuth, notifyCtrl.isReadNotify)

module.exports = router;