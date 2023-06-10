const { notifySocketController } = require("../socket-controllers")

module.exports.notifySocket = (io, socket, users) => {
    socket.on("createNotify", (msg) => {
        notifySocketController.createNotify(io, socket, users, msg);
    });
    
    socket.on("removeNotify", (msg) => {
        notifySocketController.removeNotify(io, socket, users, msg);
    });
}