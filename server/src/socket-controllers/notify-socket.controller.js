'use strict';

const logger = require("node-color-log");

class NotifySocektContoller {
    createNotify(io, socket, users, msg) {
        try {
            const clients = users.filter(u => msg.recipients.find(id => id === u.id));

            if (clients.length > 0) {
                clients.forEach(client => {
                    socket.to(`${client.socketId}`).emit("createNotifyToClient", msg)
                })
            }
        } catch (error) {
            logger.error(error.message);
        }
    }

    removeNotify(io, socket, users, msg) {
        try {
            const clients = users.filter(u => msg.recipients.find(id => id === u.id));

            if (clients.length > 0) {
                clients.forEach(client => {
                    socket.to(`${client.socketId}`).emit("removeNotifyToClient", msg)
                })
            }
        } catch (error) {
            logger.error(error.message);
        }
    }
}

module.exports = new NotifySocektContoller;