'use strict';

const logger = require("node-color-log");

class CallSocketContoller {
    editData(data, id, call) {
        const newData = data.map(item => item.id === id ? { ...item, call } : item);
        return newData;
    }

    startCall(io, socket, users, data) {
        logger.info("CALLING...");
        // console.log({ data });
        try {
            // console.log({ old: users });
            users = this.editData(users, data.sender, data.recipient);
            const client = users.find(u => u.id === data.recipient);
            // console.log({client});
            if (client) {
                if (client.call) {
                    socket.emit("userBusy", data);
                    users = this.editData(users, data.sender, null);
                } else {
                    users = this.editData(users, data.recipient, data.sender);
                    socket.to(`${client.socketId}`).emit('callUserToClient', data);
                }
            }
            // console.log({ new: users });
        } catch (error) {
            logger.error(error.message);
        }
    }

    endCall(io, socket, users, data) {
        logger.info("END CALL");
        // console.log({users});
        try {
            const client = users.find(u => u.id === data.sender);
            const clientEndCall = users.find(u => u.id === data.recipient);
            if (clientEndCall) {
                socket.to(`${clientEndCall.socketId}`).emit('endCallToClient', data);
            }
            if (client) {
                socket.to(`${client.socketId}`).emit('endCallToClient', data);
                users = this.editData(users, client.id, null);
                if (client.call) {
                    const clientCall = users.find(u => u.id === client.call);
                    clientCall && socket.to(`${clientCall.socketId}`).emit('endCallToClient', data);

                    users = this.editData(users, client.call, null);
                }
            }
        } catch (error) {
            logger.error(error.message);
        }
    }
}

module.exports = new CallSocketContoller;