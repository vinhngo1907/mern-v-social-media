const router = require("express").Router();
const { userAuth } = require('../middleware');
const { StatisticController } = require("../controllers");
const statisticCtrl = new StatisticController();

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
router.get('/socials', userAuth, statisticCtrl.GetAllSocialStats);

/**
 * @route GET api/statistic/fb_token
 * @desc Get statistics socials
 * @access Private
*/
router.get('/fb_token',statisticCtrl.GetFacebookToken);

module.exports = router;