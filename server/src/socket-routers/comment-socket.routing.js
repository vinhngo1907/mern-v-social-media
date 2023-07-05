const { commentSocketController } = require("../socket-controllers")

module.exports.commentSocket = (io, socket, users) => {
    socket.on("createComment", (comment) => {
        commentSocketController.createComment(io, socket, users, post);
    });

    socket.on("deleteComment", (post) => {
        commentSocketController.deleteComment(io, socket, users, post);
    })

    socket.on("likeComment", (comment) => {
        commentSocketController.likeComment(io, socket, users, comment);
    });

    socket.on("inLikeComment",(post) =>{
        commentSocketController.unLikeComment(io, socket, users, comment);
    });   
}