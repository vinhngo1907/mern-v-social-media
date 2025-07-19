const express = require('express');
const router = express.Router();
const { userAuth, authAdmin } = require('../middleware');
const { CapacityController } = require("../controllers");
const capacityCtrl = new CapacityController();

router.get('/', userAuth, capacityCtrl.Get);

/**
 * @route POST api/capacity/
 * @desc Create new capcity
 * @access Private
 */
router.post('/', userAuth, capacityCtrl.Create);

module.exports = router;