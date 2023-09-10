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

/**
 * @route GET api/video
 * @desc Get a video
 * @access Private
 */

router.get("/:id", userAuth, videoCtrl.getById);

/**
 * @route POST api/video
 * @desc Create video
 * @access Private
 */

router.post("/", userAuth, videoCtrl.createVideo);

/**
 * @route DELETE api/video
 * @desc Delete video
 * @access Private
 */
router.delete("/:id", userAuth, videoCtrl.deleteVideo);

module.exports = router;