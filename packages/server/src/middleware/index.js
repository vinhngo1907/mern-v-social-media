module.exports = {
    userAuth: require("./auth.middleware"),
    authAdmin: require("./admin.middleware"),
    authSocket: require("./authSocket.middleware"),
    checkRoot: require("./checkRoot.middleware")
}
