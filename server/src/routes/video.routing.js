const express = require('express');
const router = express.Router();
const { userAuth } = require('../middleware');
const { VideoController } = require("../controllers");
const videoCtrl = new VideoController();

/**
 * @route GET api/video
 * @desc Get video
 * @access Private
 */
router.get("/", userAuth, videoCtrl.getAll);

module.exports = router;