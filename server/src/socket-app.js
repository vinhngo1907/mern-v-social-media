const { socketRoute } = require("./socket-routers");
const { ExpressPeerServer } = require('peer');

const socketInfo = {
    io: undefined,
    socket: undefined,
    users: []
}

function SocketApp(io, server) {
    // Create peer server
    socketRoute(io, socketInfo);
    socketInfo.io = io;
    ExpressPeerServer(server, { path: '/' });
}

module.exports = {
    socketApp: SocketApp,
    socketInfo: socketInfo
}