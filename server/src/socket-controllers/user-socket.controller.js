'use strict';

const logger = require("node-color-log");

class UserSocketContoller {
    joinUser(io, socket, users, user) {
        try {
            !users.some(u => u.id === user._id) && users.push({ id: user._id, socketId: socket.id, followers: user.followers });
        } catch (error) {
            logger.error(error.message);
        }
    }

    checkUserOnline(io, socket, users, user) {
        try {
            const clients = users.filter(u => user.following.find(c => c._id === u.id));
            socket.emit("checkUserOnlineToMe", clients);
            if (clients.length > 0) {
                clients.forEach(client => {
                    socket.to(`${client.socketId}`).emit('checkUserOnlineToClient', user._id)
                })
            }
        } catch (error) {
            logger.error(error.message);
        }
    }

    checkUserOffline(io, socket, users) {
        try {
            const data = users.find(user => user.socketId === socket.id);
            if (data) {
                const clients = users.filter(u => data.followers.find(user => user._id === u.id));
                if (clients.length > 0) {
                    clients.forEach(client => {
                        socket.to(`${client.socketId}`).emit('checkUserOffline', data.id)
                    })
                }
            }
            users = users.filter(u => u.socketId !== socket.Id);
        } catch (error) {
            logger.error(error.message);
        }
    }
}

module.exports = new UserSocketContoller;