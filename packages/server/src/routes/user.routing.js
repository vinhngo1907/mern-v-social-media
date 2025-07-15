const express = require('express')
const router = express.Router()
const { userAuth, authAdmin } = require('../middleware')
const { UserController } = require('../controllers')
const userCtrl = new UserController();

/** 
 *  @route PUT api/user
 *  @desc Update user's profile
 *  @access Private
*/
router.put('/', userAuth, userCtrl.UpdateProfile);

/** 
 *  @route PATCH api/user/change-password
 *  @desc Change password
 *  @access Private
*/
router.patch('/change-password', userAuth, userCtrl.ChangePassword);

/** 
 *  @route PATCH api/user/change-password
 *  @desc Change password
 *  @access Private
*/
router.patch('/reset-password', userAuth, userCtrl.ResetPassword);

/** 
 *  @route GET api/user
 *  @desc Get users
 *  @access Private
*/
router.get('/', userAuth, userCtrl.GetAllUser);

/** 
 *  @route GET api/user/suggestion
 *  @desc Get users suggestion
 *  @access Private
*/
router.get('/suggestion', userAuth, userCtrl.Suggestion);

/** 
 *  @route GET api/user/search
 *  @desc Search user
 *  @access Private
*/
router.get('/search', userAuth, userCtrl.SearchUser);

/** 
 *  @route GET api/user/me
 *  @desc Get user profile
 *  @access Private
*/
router.get('/me', userAuth, userCtrl.GetMe);

/** 
 *  @route GET api/user/list
 *  @desc Get user list for Admin, Manager, Super Admin
 *  @access Private
*/
router.get('/list', userAuth, userCtrl.ListUser);

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

router.patch('/:id/update_role', userAuth, authAdmin, userCtrl.UpdateUserRoles);


// router.get('/list', userAuth, userCtrl.getUserByAdmin);

module.exports = router;