const { userSocketController } = require("../socket-controllers")

module.exports.userSocket = (io, socket, users) => {
    socket.on("joinUser", (client) => {
        userSocketController.joinUser(io, socket, users, client);
    });
    
    socket.on("checkUserOnline", (data) => {
        userSocketController.checkUserOnline(io, socket, users, data)
    });

    socket.on("disconnect", () => {
        userSocketController.checkUserOffline(io, socket, users)
    });
}