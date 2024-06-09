const express = require('express');
const router = express.Router();
const { userAuth, checkRoot } = require('../middleware');
const { CapacityController } = require("../controllers");
const capacityCtrl = new CapacityController();

/**
 * @route POST api/capacity/
 * @desc Create new capcity
 * @access Private
 */
router.post('/', capacityCtrl.Create);

module.exports = router;