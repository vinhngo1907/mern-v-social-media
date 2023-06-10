const { postSocketController } = require("../socket-controllers")

module.exports.postSocket = (io, socket, users) => {
    socket.on("likePost", (post) => {
        postSocketController.likePost(io, socket, users, post);
    });

    socket.on("unLikePost", (post) => {
        postSocketController.unLikePost(io, socket, users, post);
    });

    socket.on("commentPost", (post)=>{
        postSocketController.commentPost(io, socket, users, post);
    });
}