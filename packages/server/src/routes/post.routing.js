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
 * @route GET api/post/saved
 * @desc Get saved posts
 * @access Private
 */
router.get('/user/save', userAuth, postCtrl.GetSavedPosts)

/**
 * @route GET api/post/saved
 * @desc Get saved posts
 * @access Private
 */
router.get('/discover', userAuth, postCtrl.GetDiscoverPosts)

/**
 * @route GET api/post
 * @desc Get posts
 * @access Private
 */
router.get('/user/:id', userAuth, postCtrl.GetUserPosts)

/**
 * @route GET api/post
 * @desc Get a post
 * @access Private
 */
router.get('/:id', userAuth, postCtrl.GetPost)

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
router.patch('/:id/unlike', userAuth, postCtrl.UnLikePost);

/** 
 *  @route PATCH api/post/:id/save
 *  @desc Save a post
 *  @access Private
*/
router.patch('/:id/save', userAuth, postCtrl.SavePost);

/** 
 *  @route PATCH api/post/:id/unsave
 *  @desc UnSave a post
 *  @access Private
*/
router.patch('/:id/unsave', userAuth, postCtrl.UnSavePost);

module.exports = router
