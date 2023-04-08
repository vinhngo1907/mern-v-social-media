const express = require('express');
const router = express.Router();
const { userAuth } = require('../middleware');
const { UploadController } = require("../controllers");
const uploadCtrl = new UploadController();

router.post('/create', userAuth, uploadCtrl.post);

router.post('/destroy', userAuth, uploadCtrl.delete);

module.exports = router;