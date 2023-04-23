const express = require('express');
const router = express.Router();
const { userAuth } = require('../middleware');
const { NotifyController } = require("../controllers")
const notifyCtrl = new NotifyController();

/**
 * @route GET api/posts
 * @desc Get posts
 * @access Private
 */
router.get("/", userAuth, notifyCtrl.GetNotifies)

module.exports = router;