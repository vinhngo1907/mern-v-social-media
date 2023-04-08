const express = require('express')
const router = express.Router()
const { userAuth } = require('../middleware')
const { UserController } = require('../controllers')
const userCtrl = new UserController();

/** 
 *  @route PATCH api/user
 *  @desc Update user's profile
 *  @access Public
*/
router.patch('/', userAuth, userCtrl.UpdateProfile);

/** 
 *  @route GET api/user
 *  @desc Get users
 *  @access Public
*/
router.get('/', userAuth, userCtrl.GetAllUser)

/** 
 *  @route GET api/user/suggestion
 *  @desc Get users suggestion
 *  @access Public
*/
router.get('/suggestion', userAuth, userCtrl.Suggestion)

module.exports = router;