const express = require('express');
const router = express.Router();
const { userAuth } = require('../middleware');
const { CommentController } = require("../controllers")
const commentCtrl = new CommentController();

router.get("/", userAuth, commentCtrl.GetAllComments);

module.exports = router;