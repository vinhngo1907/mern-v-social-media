const router = require("express").Router();
const { StatisticController } = require("../controllers");
const statisticCtrl = new StatisticController;
const { userAuth } = require('../middleware');

/**
 * @route GET api/statistic/fetch
 * @desc Get statistics
 * @access Private
 */
router.get('/fetch', userAuth, statisticCtrl.FetchAllStats);

/**
 * @route GET api/statistic
 * @desc Get total statistics
 * @access Private
 */
router.get('/', userAuth, statisticCtrl.GetTotalStats);

module.exports = router;