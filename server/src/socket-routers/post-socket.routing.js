const { postSocketController } = require("../socket-controllers")

module.exports.postSocket = (io, socket, users) => {
    socket.on("likePost", (post) => {
        postSocketController.likePost(io, socket, users, post);
    });

    socket.on("unLikePost", (post) => {
        postSocketController.unLikePost(io, socket, users, post);
    });

    socket.on("createPost", (post) => {
        postSocketController.createPost(io, socket, users, post);
    });

    socket.on("deletePost", (post) => {
        postSocketController.deletePost(io, socket, users, post);
    });
}