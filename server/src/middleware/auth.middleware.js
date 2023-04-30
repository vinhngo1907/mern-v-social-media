const jwt = require('jsonwebtoken')
const { ACCESS_SECRET } = require("../configs");
const { modelSchema } = require("../db");
const { userModel } = modelSchema;
const { responseDTO } = require("../utils");

const verifyToken = async (req, res, next) => {
	const authHeader = req.header('Authorization');
	const token = authHeader && authHeader.split(' ')[1];

	if (!token)
		return res
			.status(401)
			.json(responseDTO.unauthorization('Access token not found'))

	try {
		const decoded = jwt.verify(token, ACCESS_SECRET);
		if (!decoded) return res.status(403).json(responseDTO.badRequest("Invalid token."));

		const user = await userModel.findById(decoded.userId)
		.select("-password -__v -createdAt -updatedAt -salt")
		// .populate("followers following", "-password -__v -createdAt -updatedAt -salt");
		
		if (!user) return res.status(400).json(responseDTO.badRequest("User does not exist."));

		req.user = user;
		next()
	} catch (error) {
		console.log(error)
		return res.status(500).json(responseDTO.serverError(error.message))
	}
}

module.exports = verifyToken
