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
 *  @route POST api/auth/login
 * @desc Login user
 * @access Public
*/
router.post('/active', authCtrl.ActiveAccount);

/** 
 *  @route POST api/auth/refresh-token
 * @desc Refresh new token
 * @access Public
*/
router.post('/refresh-token', authCtrl.RefreshToken);

/** 
 *  @route POST api/auth/login-sms
 * @desc Login user by sms
 * @access Public
*/
router.post('/sms-login', authCtrl.LoginSMS);

module.exports = router
