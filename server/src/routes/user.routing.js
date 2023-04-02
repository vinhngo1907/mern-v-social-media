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

module.exports = router;