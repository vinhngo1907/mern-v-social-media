const express = require('express');
const router = express.Router();
const { userAuth, authAdmin } = require('../middleware');
const { RoleController } = require("../controllers");
const roleCtrl = new RoleController();

router.get("/", userAuth, roleCtrl.GetAll);
router.post("/", userAuth, roleCtrl.CreateRoleSupport)

module.exports = router;