const express = require('express');
const router = express.Router();
const { userAuth } = require('../middleware');
const { CommentController } = require("../controllers")
const commentCtrl = new CommentController();

router.get("/", userAuth, commentCtrl.GetAllComments);
router.post("/", userAuth, commentCtrl.CreateComment);
// router.delete("/", userAuth, commentCtrl.GetAllComments);
// router.patch("/", userAuth, commentCtrl.GetAllComments);
// router.put("/", userAuth, commentCtrl.GetAllComments);

module.exports = router;