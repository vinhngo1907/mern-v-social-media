'use strict';

const logger = require("node-color-log");

class CallSocketContoller {
    editData(data, id, call) {
        const newData = data.map(item =>
            item.id === id ? { ...item, call } : item
        );
        return newData;
    }

    startCall(io, socket, users, data) {
        logger.info("CALLING...")
        try {
            users = this.editData(users, data.sender, data.recipient);
            const client = users.find(u => u.id === data.recipient);
            if (client) {
                if (client.call) {
                    socket.emit("userBusy", data);
                    users = this.editData(users, data.sender, null);
                } else {
                    users = this.editData(users, data.recipient, data.sender);
                    socket.to(`${client.socketId}`).emit('callUserToClient')
                }
            }
        } catch (error) {
            logger.info(error.message);
        }
    }

    endCall(io, socket, users, data) {
        logger.info("END CALL")
        try {

        } catch (error) {
            logger.info(error.message);
        }
    }
}

module.exports = new CallSocketContoller;