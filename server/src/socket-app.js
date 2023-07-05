const SocketRoute = require("./socket-routers");
const { ExpressPeerServer } = require('peer');
const logger = require("node-color-log");

module.exports = (io, server) => {
    let users = [];
    const onConnection = (socket) => {
        logger.info("NEW CONNECTION");
        SocketRoute(io, socket, users);
    }

    io.on("connection", onConnection);

    // Create peer server
    ExpressPeerServer(server, { path: '/' })
}