const express = require('express');
const router = express.Router();
const { userAuth, authSocket } = require('../middleware');
const { UploadController } = require("../controllers");
const uploadCtrl = new UploadController();
const rateLimit = require("express-rate-limit");
const slowDown = require("express-slow-down");

/**
 * @route POST api/upload/create
 * @desc Post upload file
 * @access Private
 */
router.post('/create', userAuth, authSocket, uploadCtrl.post);

/**
 * @route POST api/upload/destroy
 * @desc Post destroy file
 * @access Private
 */
router.post('/destroy', userAuth, uploadCtrl.delete);

/**
 * @route GET api/upload/get
 * @desc Get all files
 * @access Private
 */
const uploadApiRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
});

const speedLimiter = slowDown({
    windowMs: 30 * 1000,
    delayAfter: 1,
    delayMs: 500,
});
router.get('/images', uploadApiRateLimiter, speedLimiter, userAuth, uploadCtrl.getImages);

/**
 * @route GET api/upload/video
 * @desc Get all videos
 * @access Private
 */

router.get('/videos', uploadApiRateLimiter, speedLimiter, userAuth, uploadCtrl.getVideos);

module.exports = router;