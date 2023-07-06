const { commentSocketController } = require("../socket-controllers")

module.exports.commentSocket = (io, socket, users) => {
    socket.on("createComment", (post) => {
        commentSocketController.createComment(io, socket, users, post);
    });

    socket.on("deleteComment", (post) => {
        commentSocketController.deleteComment(io, socket, users, post);
    })

    socket.on("likeComment", (comment) => {
        commentSocketController.likeComment(io, socket, users, comment);
    });

    socket.on("inLikeComment",(comment) =>{
        commentSocketController.unLikeComment(io, socket, users, comment);
    });   
}