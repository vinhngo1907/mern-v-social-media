const { commentSocketController } = require("../socket-controllers")

module.exports.commentSocket = (io, socket, users) => {
    socket.on("createComment", (post) => {
        commentSocketController.createComment(io, socket, users, post);
    });

    socket.on("deleteComment", (post) => {
        commentSocketController.deleteComment(io, socket, users, post);
    })

    socket.on("likeComment", (post) => {
        commentSocketController.likeComment(io, socket, users, post);
    });

    socket.on("unLikeComment",(post) =>{
        commentSocketController.unLikeComment(io, socket, users, post);
    });   
}