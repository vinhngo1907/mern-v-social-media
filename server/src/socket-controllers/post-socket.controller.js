'use strict';

const logger = require("node-color-log");

class PostSocketContoller {
    likePost(io, socket, users, post) {
        logger.info("Like post");
        try {
            const ids = [...post.user.followers, post.user._id];
            const clients = users.filter(user => ids.includes(user.id));
            if (clients.length > 0) {
                clients.forEach(client => {
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
            const ids = [...post.user.followers, post.user._id]
            const clients = users.filter(user => ids.includes(user.id))

            if (clients.length > 0) {
                clients.forEach(client => {
                    socket.to(`${client.socketId}`).emit('unLikeToClient', post)
                });
            };
        } catch (error) {
            logger.error(error.message);
        }
    }

    createPost(io, socket, users, post) {
        logger.info("Create post");
        // console.log({post});
        try {
            const ids = [...post.user.followers.map(u => u._id), post.user._id];
            // console.log({ ids });
            const clients = users.filter((user) => ids.includes(user.id));
            // console.log({ clients });
            if (clients && clients.length > 0) {
                clients.forEach((client) => {
                    socket.to(`${client.socketId}`).emit('createPostToClient', post)
                });
            };
        } catch (error) {
            logger.error(error.message);
        }
    }

    editPost(io, socket, users, post) {
        logger.info("Edit post");
        try {
            const ids = [...post.user.followers];
            // console.log({ ids });
            const clients = users.filter((user) => ids.includes(user.id));
            if (clients && clients.length > 0) {
                clients.forEach((client) => {
                    socket.to(`${client.socketId}`).emit('editPostToClient', post);
                });
            };
        } catch (error) {
            logger.error(error.message);
        }
    }

    deletePost(io, socket, users, post) {
        logger.info("Delete post");
        // console.log({post});
        try {
            const ids = [...post.user.followers, post.user._id];
            // console.log({ ids });
            const clients = users.filter((user) => ids.includes(user.id));
            if (clients && clients.length > 0) {
                clients.forEach((client) => {
                    socket.to(`${client.socketId}`).emit('deletePostToClient', post);
                });
            };
        } catch (error) {
            logger.error(error.message);
        }
    }
}

module.exports = new PostSocketContoller;