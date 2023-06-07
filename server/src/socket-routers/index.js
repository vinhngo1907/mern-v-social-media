const userSocketCtrl = require("../socket-controllers/user-socket.controller");
const { userSocket } = require("./user-socket.routing");

// module.exports.defaultSocket = (io, socket, users) => {

// }

function defaultSocket(io, socket, users) {

}

function SocketRoute(io, socket, users) {
    // User join - online
    userSocket(io, socket, users);

    // User disconnect - offline
    defaultSocket(io, socket, users);
}

module.exports = SocketRoute;