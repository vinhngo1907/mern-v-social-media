const router = require("express").Router();
const { StatisticController } = require("../controllers");
const statisticCtrl = new StatisticController;
const { userAuth } = require('../middleware');

/**
 * @route GET api/statistic
 * @desc Get statistics
 * @access Private
 */
router.get('/', userAuth, statisticCtrl.FetchAllStats);

module.exports = router;