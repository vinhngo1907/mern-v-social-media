'use strict';

const logger = require("node-color-log");

class PostSocketContoller {
    likePost(io, socket, users, post) {
        logger.info("Like post");

        try {
            const ids = [...post.user.followers, post.user._id];

            const clients = users.filter(user => ids.includes(user.id));
            // console.log({ clients });
            if (clients.length > 0) {
                clients.forEach(client => {
                    console.log(client);
                    socket.to(`${client.socketId}`).emit('likeToClient', post)
                });
            };
        } catch (error) {
            logger.error(error.message);
        }
    }

    unLikePost(io, socket, users, post) {
        logger.info("Unlike post");
        try {
            const ids = [...post.user.followers, post.user._id];
            const clients = users.filter(user => ids.includes(user.id));
            // console.log({ clients });
            if (clients.length > 0) {
                clients.forEach(client => {
                    console.log({client});
                    socket.to(`${client.socketId}`).emit('unLikeToClient', post)
                });
            };
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