const jwt = require("jsonwebtoken"); //npmpackage
const { ACCESS_SECRET } = require("../../configs");

const checkUser = async (req, res, authHeader, userModel) => {
    const token = authHeader.split(" ")[1];
    if (!token) {
        res.status(401).json({ status: 401, message: "User not found or/and not authorizated" })
    }

    const decoded = jwt.verify(token, ACCESS_SECRET); //data is what you sent in.
    const userId = decoded.userId;
    
    const user = await userModel.findOne({
        _id: userId
    }).populate("roles");

    return user;
};

module.exports = checkUser;
