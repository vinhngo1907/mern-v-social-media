const express = require('express');
const router = express.Router();
const { userAuth } = require('../middleware');
const { AuthController } = require("../controllers");
const authCtrl = new AuthController();

/**  
 * @route POST api/auth/login
 * @desc Check if user is logged in
 * @access Public
*/
router.post('/login', authCtrl.Login);

/**
 * @route POST api/auth/register
 * @desc Register user
 * @access Public
*/
router.post('/register', authCtrl.Register)

/** 
 * @route POST api/auth/login
 * @desc Login user
 * @access Public
*/
router.post('/active', authCtrl.ActiveAccount);

/** 
 * @route POST api/auth/refresh-token
 * @desc Refresh new token
 * @access Public
*/
router.post('/refresh-token', authCtrl.RefreshToken);

/** 
 * @route POST api/auth/login-sms
 * @desc Login user by sms
 * @access Public
*/
router.post('/logout', userAuth, authCtrl.Logout);

/** 
 *  @route POST api/auth/sms-login
 * @desc Login user by sms
 * @access Public
*/
router.post('/sms-login', authCtrl.LoginSMS);

/** 
 * @route POST api/auth/google-login
 * @desc Login with google
 * @access Public
*/

router.post('/google-login', authCtrl.GoogleLogin);

/** 
 * @route POST api/auth/facebook-login
 * @desc Login with facebook
 * @access Public
*/
router.post('/facebook-login', authCtrl.FacebookLogin);

/** 
 * @route POST api/auth/forgot-password
 * @desc Reset account if forgot password
 * @access Public
*/
router.post('/facebook-login', authCtrl.ForgotPassword);

module.exports = router;
