const express = require('express');
const router = express.Router();
const { userAuth } = require('../middleware');
const {AuthController} = require("../controllers");
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
router.post('/register',authCtrl.Register)

/** 
 *  @route POST api/auth/login
 * @desc Login user
 * @access Public
*/
router.post('/login', authCtrl.Login);

module.exports = router
