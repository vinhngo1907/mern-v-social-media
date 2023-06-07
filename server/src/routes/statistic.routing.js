const router = require("express").Router();
const { StatisticController } = require("../controllers");
const statisticCtrl = new StatisticController();
const { userAuth } = require('../middleware');

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
router.get('/fetch', userAuth, statisticCtrl.GetAllStats);

/**
 * @route GET api/statistic/socials
 * @desc Get statistics socials
 * @access Private
 */
router.get('/socials', userAuth, statisticCtrl.GetAllSocialStats);

router.get('/api/statistic/fb_token',statisticCtrl.GetFacebookToken);

module.exports = router;