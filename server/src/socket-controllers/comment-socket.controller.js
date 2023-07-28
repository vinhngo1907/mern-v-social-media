'use strict';

const logger = require("node-color-log");

class CommentSocketContoller {
    createComment(io, socket, users, post) {
        logger.info("Create comment");
        try {
            const ids = [...post.user.followers, post.user._id];
            const clients = users.filter(user => ids.find(id => id === user.id));
            if (clients.length > 0) {
                clients.forEach(client => {
                    socket.to(`${client.socketId}`).emit("createCommentToClient", post)
                })
            }
        } catch (error) {
            logger.error(error.message);
        }
    }

    deleteComment(io, socket, users, post) {
        logger.info("Delete comment");
        try {
            const ids = [...post.user.followers, post.user._id];
            const clients = users.filter(user => ids.find(id => id === user.id));
            if (clients.length > 0) {
                clients.forEach(client => {
                    socket.to(`${client.socketId}`).emit("deleteCommentToClient", post)
                })
            }
        } catch (error) {
            logger.error(error.message);
        }
    }

    likeComment(io, socket, users, post) {
        logger.info("Like comment");
        try {
            const ids = [...post.user.followers, post.user._id];
            const clients = users.filter(user => ids.find(id => id === user.id));
            if (clients.length > 0) {
                clients.forEach(client => {
                    socket.to(`${client.socketId}`).emit('likeCommentToClient', post);
                });
            }
        } catch (error) {
            logger.error(error.message);
        }
    }

    unLikeComment(io, socket, users, post) {
        logger.info("UnLike comment");
        try {
            const ids = [...post.user.followers, post.user._id];
            const clients = users.filter(user => ids.find(id => id === user.id));
            if (clients.length > 0) {
                clients.forEach(client => {
                    socket.to(`${client.socketId}`).emit("unLiekCommentToClient", post)
                })
            }
        } catch (error) {
            logger.error(error.message);
        }
    }
}

module.exports = new CommentSocketContoller;