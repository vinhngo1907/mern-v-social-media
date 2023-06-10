'use strict';

const logger = require("node-color-log");

class MessageSocektContoller {
    addMessage(io, socket, users, msg){
        try {
            const user = users.find(user => user.id === msg.recipient);
            
            user && socket.to(`${user.socketId}`).emit('addMessageToClient', msg);
        } catch (error) {
           logger.error(error.message); 
        }
    }

    deleteMessage(io, socket, users, msg){
        try {
            
        } catch (error) {
            logger.error(error.message);
        }
    }
}

module.exports = new MessageSocektContoller;