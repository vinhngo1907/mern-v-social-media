module.exports = {
    userAuth: require("./auth.middleware"),
    authAdmin: require("./admin.middleware"),
    authSocket: require("./authSocket.middleware"),
    metric: require("./metric.middleware")
}
