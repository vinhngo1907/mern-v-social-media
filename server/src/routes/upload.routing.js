const express = require('express');
const router = express.Router();
const { userAuth } = require('../middleware');
const { UploadController } = require("../controllers");
const uploadCtrl = new UploadController();

/**
 * @route POST api/upload/create
 * @desc Post upload file
 * @access Private
 */
router.post('/create', userAuth, uploadCtrl.post);

/**
 * @route POST api/upload/destroy
 * @desc Post destroy file
 * @access Private
 */
router.post('/destroy', userAuth, uploadCtrl.delete);

/**
 * @route GET api/upload/get
 * @desc Get all files
 * @access Private
 */
router.get('/get', userAuth, uploadCtrl.get);

module.exports = router;