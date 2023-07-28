const router = require("express").Router();
const { userAuth } = require('../middleware');
const { StatisticController } = require("../controllers");
const statisticCtrl = new StatisticController();
const rateLimit = require("express-rate-limit");
const slowDown = require("express-slow-down");

/**
 * @route GET api/statistic
 * @desc Get total statistics
 * @access Private
 */
router.get('/', userAuth, statisticCtrl.GetTotalStats);

/**
 * @route GET api/statistic/fetch
 * @desc Get statistics
 * @access Private
 */
router.get('/fetch', userAuth, statisticCtrl.GetViewAndVisitStats);

/**
 * @route GET api/statistic/socials
 * @desc Get statistics socials
 * @access Private
*/
const statApiRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
});

const speedLimiter = slowDown({
    windowMs: 30 * 1000,
    delayAfter: 1,
    delayMs: 500,
});
router.get('/socials', statApiRateLimiter, speedLimiter, userAuth, statisticCtrl.GetAllSocialStats);

/**
 * @route GET api/statistic/fb_token
 * @desc Get statistics socials
 * @access Private
*/
router.get('/fb_token', statisticCtrl.GetFacebookToken);

module.exports = router;