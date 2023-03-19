const express = require('express');
const router = express.Router();
const { userAuth } = require('../middleware');
const { authCtrl } = require("../controllers");

/**  
 * @route POST api/auth/login
 * @desc Check if user is logged in
 * @access Public
*/
// router.get('/', userAuth, authCtrl.login);

// @route POST api/auth/register
// @desc Register user
// @access Public
// router.post('/register', async (req, res) => {
// 	const { username, password } = req.body

// 	// Simple validation
// 	if (!username || !password)
// 		return res
// 			.status(400)
// 			.json({ success: false, message: 'Missing username and/or password' })

// 	try {
// 		// Check for existing user
// 		const user = await User.findOne({ username })

// 		if (user)
// 			return res
// 				.status(400)
// 				.json({ success: false, message: 'Username already taken' })

// 		// All good
// 		const hashedPassword = await argon2.hash(password)
// 		const newUser = new User({ username, password: hashedPassword })
// 		await newUser.save()

// 		// Return token
// 		const accessToken = jwt.sign(
// 			{ userId: newUser._id },
// 			process.env.ACCESS_TOKEN_SECRET
// 		)

// 		res.json({
// 			success: true,
// 			message: 'User created successfully',
// 			accessToken
// 		})
// 	} catch (error) {
// 		console.log(error)
// 		res.status(500).json({ success: false, message: 'Internal server error' })
// 	}
// })

/** 
 *  @route POST api/auth/login
 * @desc Login user
 * @access Public
*/
router.post('/login', authCtrl.login);

module.exports = router
