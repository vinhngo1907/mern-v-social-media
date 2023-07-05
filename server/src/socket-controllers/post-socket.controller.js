'use strict';

const logger = require("node-color-log");

class PostSocketContoller {
    likePost(io, socket, users, newPost) {
        logger.info("Like post");
        try {
            const ids = [...newPost.user.followers, newPost.user._id]
            const clients = users.filter(user => ids.includes(user.id))

            if (clients.length > 0) {
                clients.forEach(client => {
                    socket.to(`${client.socketId}`).emit('likeToClient', newPost)
                })
            }
        } catch (error) {
            logger.error(error.message);
        }
    }

    unLikePost(io, socket, users, newPost) {
        logger.info("Unlike post");
        try {
            const ids = [...newPost.user.followers, newPost.user._id]
            const clients = users.filter(user => ids.includes(user.id))

            if (clients.length > 0) {
                clients.forEach(client => {
                    socket.to(`${client.socketId}`).emit('unLikeToClient', newPost)
                })
            }
        } catch (error) {
            logger.error(error.message);
        }
    }

    commentPost(io, socket, users, post) {
        try {

        } catch (error) {
            logger.error(error.message);
        }
    }
}

module.exports = new PostSocketContoller;