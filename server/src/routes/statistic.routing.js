const router = require("express").Router();
const { StatisticController } = require("../controllers");
const statisticCtrl = new StatisticController;
const { userAuth } = require('../middleware');

router.get('/', userAuth, statisticCtrl.FetchAllStat);

module.exports = router;