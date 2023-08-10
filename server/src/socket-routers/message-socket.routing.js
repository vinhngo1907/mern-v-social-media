const { messageSocketController } = require("../socket-controllers")

module.exports.messageSocket = (io, socket, users) => {
    socket.on("addMessage", (msg) => {
        messageSocketController.addMessage(io, socket, users, msg);
    });

    socket.on("deleteMessage", (data) => {
        messageSocketController.deleteMessage(io, socket, users, data);
    });

    socket.on("deleteConversation", (data) => {
        messageSocketController.deleteConversation(io, socket, users, data);
    });
}