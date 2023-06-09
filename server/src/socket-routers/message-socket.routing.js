const { messageSocketController } = require("../socket-controllers")

module.exports.messageSocket = (io, socket, users) => {
    socket.on("addMessage", (msg) => {
        messageSocketController.addMessage(io, socket, users, msg);
    });
}