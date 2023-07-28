'use strict';

const logger = require("node-color-log");

class NotifySocketContoller {
    createNotify(io, socket, users, msg) {
        logger.info("Create Notify");
        try {
            // console.log({users});
            // const client = users.find(user => msg.recipients.includes(user.id));
            const clients = users.filter(user => msg.recipients.includes(user.id));
            // console.log({clients});
            if (clients) {
                clients.forEach((client) => {
                    socket.to(`${client.socketId}`).emit('createNotifyToClient', msg);
                })
            }
        } catch (error) {
            logger.error(error.message);
        }
    }

    removeNotify(io, socket, users, msg) {
        logger.info("Remove Notify");
        try {
            const client = users.find(user => msg.recipients.includes(user.id.toString()))
            // console.log({client})
            if (client) {
                socket.to(`${client.socketId}`).emit('removeNotifyToClient', msg);
            }
        } catch (error) {
            logger.error(error.message);
        }
    }
}

module.exports = new NotifySocketContoller;