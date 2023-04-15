const express = require('express')
const router = express.Router()
const { userAuth } = require('../middleware')
const { UserController } = require('../controllers')
const userCtrl = new UserController();

/** 
 *  @route PUT api/user
 *  @desc Update user's profile
 *  @access Private
*/
router.put('/:id', userAuth, userCtrl.UpdateProfile);

/** 
 *  @route GET api/user
 *  @desc Get users
 *  @access Private
*/
router.get('/', userAuth, userCtrl.GetAllUser)

/** 
 *  @route GET api/user/suggestion
 *  @desc Get users suggestion
 *  @access Private
*/
router.get('/suggestion', userAuth, userCtrl.Suggestion);

/** 
 *  @route GET api/user/:id
 *  @desc Get user profile
 *  @access Private
*/
router.get('/:id', userAuth, userCtrl.GetUser);

/** 
 *  @route PATCH api/user/:id/follow
 *  @desc Follow user
 *  @access Private
*/
router.patch('/:id/follow', userAuth, userCtrl.Follow);

/** 
 *  @route PATCH api/user/:id/unfollow
 *  @desc UnFollow user
 *  @access Private
*/
router.patch('/:id/unfollow', userAuth, userCtrl.UnFollow);

module.exports = router;