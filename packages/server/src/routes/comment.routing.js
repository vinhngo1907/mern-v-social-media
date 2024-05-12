const express = require('express');
const router = express.Router();
const { userAuth } = require('../middleware');
const { CommentController } = require("../controllers")
const commentCtrl = new CommentController();

/**
 * @route POST api/comment
 * @desc Post comment
 * @access Private
 */
router.post("/", userAuth, commentCtrl.CreateComment);

/**
 * @route PUT api/comment
 * @desc Put comment
 * @access Private
 */
router.put("/:id", userAuth, commentCtrl.UpdateComment);

/**
 * @route PATCH api/comment
 * @desc Patch like comment
 * @access Private
 */
router.patch("/:id/like", userAuth, commentCtrl.LikeComment);

/**
 * @route PATCH api/comment
 * @desc Patch unlike comment
 * @access Private
 */
router.patch("/:id/unlike", userAuth, commentCtrl.UnLikeComment);

/**
 * @route DELETE api/comment
 * @desc Delete comment
 * @access Private
 */
router.delete("/:id", userAuth, commentCtrl.RemoveComment);

module.exports = router;