const { commentSocketController } = require("../socket-controllers")

module.exports.commentSocket = (io, socket, users) => {
    socket.on("createComment", (comment) => {
        commentSocketController.createComment(io, socket, users, comment);
    });

    socket.on("likeComment", (comment) => {
        commentSocketController.likeComment(io, socket, users, comment);
    });
}