const checkAccountRoot = require("./checkRoot");
const checkPermission = require("./checkPermission");
const checkPermissionAdmin = require("./checkPermissionAdmin");

module.exports = {
    checkPermission,
    checkPermissionAdmin,
    checkRoot: checkAccountRoot
};