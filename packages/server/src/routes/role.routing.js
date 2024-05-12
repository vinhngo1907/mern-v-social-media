const express = require('express');
const router = express.Router();
const { userAuth, authAdmin } = require('../middleware');
const { RoleController } = require("../controllers");
const roleCtrl = new RoleController();

router.get("/", [userAuth, authAdmin], roleCtrl.GetAll);

module.exports = router;