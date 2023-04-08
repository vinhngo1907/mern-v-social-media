const express = require('express');
const router = express.Router();
const { userAuth } = require('../middleware');
const { PostController } = require("../controllers");
const postCtrl = new PostController();

/**
 * @route GET api/posts
 * @desc Get posts
 * @access Private
 */
router.get('/', userAuth, postCtrl.GetAllPosts)

/** 
 * @route POST api/posts
 * @desc Create post
 * @access Private
*/
router.post('/', userAuth, postCtrl.CreatePost)

/** 
 * @route PUT api/posts
 * @desc Update post
 * @access Private
*/
router.put('/:id', userAuth,postCtrl.UpdatePost)

/**  
 * @route DELETE api/posts
 * @desc Delete post
 * @access Private
*/
router.delete('/:id', userAuth, postCtrl.DeletePost)

/**  
 * @route LIKE api/posts
 * @desc Like post
 * @access Private
*/
router.patch('/:id/like', userAuth, postCtrl.LikePost)

/**  
 * @route UnLIKE api/posts
 * @desc Unlike post
 * @access Private
*/
router.patch('/:id/un-like', userAuth, postCtrl.UnLikePost)

module.exports = router
