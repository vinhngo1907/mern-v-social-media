const { userSocketController } = require("../socket-controllers")

module.exports.userSocket = (io, socket, users) => {
    socket.on("joinUser", (client) => {
        userSocketController.joinUser(io, socket, users, client);
    });
}