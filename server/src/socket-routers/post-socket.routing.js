const { postSocketController } = require("../socket-controllers")

module.exports.postSocket = (io, socket, users) => {
    socket.on("likePost", (post) => {
        postSocketController.likePost(io, socket, users, post);
    });
}