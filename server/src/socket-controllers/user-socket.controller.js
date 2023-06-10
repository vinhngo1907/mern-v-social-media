'use strict';

const logger = require("node-color-log");

class UserSocketContoller {
    joinUser(io, socket, users, user) {
        !users.some(u => u.id === user._id) && users.push({ id: user._id, socketId: socket.id, followers: user.followers });
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

    checkUserOffline(io, socket, users, user){
        try {
            
        } catch (error) {
            logger.error(error.message);
        }
    }
}

module.exports = new UserSocketContoller;