const express = require('express')
const router = express.Router()
const { userAuth, authAdmin } = require('../middleware')
const { AdminController } = require('../controllers')
const adminCtrl = new AdminController();

/** 
 *  @route PUT api/user
 *  @desc Update user's profile
 *  @access Private
*/
router.put('/', userAuth, adminCtrl.UpdateProfile);

/** 
 *  @route PATCH api/user/change-password
 *  @desc Change password
 *  @access Private
*/
router.patch('/change-password', userAuth, adminCtrl.ChangePassword);

/** 
 *  @route PATCH api/user/change-password
 *  @desc Change password
 *  @access Private
*/
router.patch('/reset-password', userAuth, adminCtrl.ResetPassword);

/** 
 *  @route GET api/user/me
 *  @desc Get user profile
 *  @access Private
*/
router.get('/me', userAuth, adminCtrl.GetMe);

/** 
 *  @route GET api/user/list
 *  @desc Get user list for Admin, Manager, Super Admin
 *  @access Private
*/
router.get('/user/list', userAuth, adminCtrl.ListUser);

/** 
 *  @route GET api/user/:id
 *  @desc Get user profile
 *  @access Private
*/
router.get('/:id', userAuth, adminCtrl.GetUser);

/** 
 *  @route PATCH api/user/:id/follow
 *  @desc Follow user
 *  @access Private
*/
router.patch('/:id/follow', userAuth, adminCtrl.Follow);

/** 
 *  @route PATCH api/user/:id/unfollow
 *  @desc UnFollow user
 *  @access Private
*/




// router.get('/list', userAuth, adminCtrl.getUserByAdmin);

module.exports = router;