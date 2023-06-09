const userSocketCtrl = require("../socket-controllers/user-socket.controller");
const { userSocket } = require("./user-socket.routing");
const { messageSocket } = require("./message-socket.routing");

function defaultSocket(io, socket, users) {
    io.on("disconnect", () => {
        users = users.filter(u => u.socketId !== socket.Id)
    })
}

function SocketRoute(io, socket, users) {
    // User join - online
    userSocket(io, socket, users);
    
    // Message
    messageSocket(io, socket, users)
    
    // User disconnect - offline
    defaultSocket(io, socket, users);
}

module.exports = SocketRoute;