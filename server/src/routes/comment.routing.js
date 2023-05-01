const express = require('express');
const router = express.Router();
const { userAuth } = require('../middleware');
const { CommentController } = require("../controllers")
const commentCtrl = new CommentController();

router.post("/", userAuth, commentCtrl.CreateComment);
router.put("/:id", userAuth, commentCtrl.UpdateComment);
router.delete("/:id", userAuth, commentCtrl.RemoveComment);
router.patch("/:id/like", userAuth, commentCtrl.LikeComment);
router.patch("/:id/unlike", userAuth, commentCtrl.UnLikeComment);

module.exports = router;