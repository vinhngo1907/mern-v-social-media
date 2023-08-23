const { socketRoute } = require("./socket-routers");
// const { userSocket, callSocket, commentSocket, postSocket, notifySocket, defaultSocket, messageSocket } = require("./socket-routers");
const { ExpressPeerServer } = require('peer');
const logger = require("node-color-log");

const socketInfo = {
    io: undefined,
    socket: undefined,
    users: []
}

function SocketApp(io, server) {
    let users = [];
    const onConnection = (socket) => {
        logger.info("NEW CONNECTION");
        socketRoute(io, socket, users);
        socketInfo.io = io;
        socketInfo.socket = socket;
        socketInfo.users = users;
    }
    io.on("connection", onConnection);

    // Create peer server
    ExpressPeerServer(server, { path: '/' });
}

module.exports = {
    socketApp: SocketApp,
    socketInfo: socketInfo
}