'use strict';

const logger = require("node-color-log");

class NotifySocketContoller {
    createNotify(io, socket, users, msg) {
        try {
            const client = users.find(user => msg.recipients.includes(user.id))
            client && socket.to(`${client.socketId}`).emit('createNotifyToClient', msg);
        } catch (error) {
            logger.error(error.message);
        }
    }

    removeNotify(io, socket, users, msg) {
        try {
            const client = users.find(user => msg.recipients.includes(user.id))
            client && socket.to(`${client.socketId}`).emit('removeNotifyToClient', msg);
        } catch (error) {
            logger.error(error.message);
        }
    }
}

module.exports = new NotifySocketContoller;