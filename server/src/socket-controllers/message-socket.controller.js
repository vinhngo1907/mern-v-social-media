'use strict';

const logger = require("node-color-log");

class MessageSocketContoller {
    addMessage(io, socket, users, msg) {
        // console.log(">>>>>>>>>> user list: <<<<<<<<<<",{users});
        try {
            // console.log(">>>>>>>>>>>> MSG <<<<<<<<<<<<",{msg})
            const user = users.find(user => user.id === msg.recipient);
            // console.log({user});
            user && socket.to(`${user.socketId}`).emit('addMessageToClient', msg);
        } catch (error) {
            logger.error(error.message);
        }
    }

    deleteMessage(io, socket, users, data) {
        logger.info("Delete Message");
        const { msg } = data;
        try {
            const user = users.find(u => u.id === msg.recipient);
            user && socket.to(`${user.socketId}`).emit("deleteMessageToClient", data);
        } catch (error) {
            logger.error(error.message);
        }
    }

    deleteConversation(io, socket, users, data) {
        logger.info("Delete Conversation");
        try {

        } catch (error) {
            logger.error(error.message);
        }
    }
}

module.exports = new MessageSocketContoller;