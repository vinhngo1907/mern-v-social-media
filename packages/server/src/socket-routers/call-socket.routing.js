const { callSocketController } = require("../socket-controllers")

module.exports.callSocket = (io, socket, users) => {
    socket.on("callUser", (data) => {
        callSocketController.startCall(io, socket, users, data);
    });

    socket.on("endCall", (data) => {
        callSocketController.endCall(io, socket, users, data);
    });
}