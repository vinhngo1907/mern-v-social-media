'use strict';

const logger = require("node-color-log");

class MessageSocketContoller {
    addMessage(io, socket, users, msg){
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

    deleteMessage(io, socket, users, msg){
        try {
            
        } catch (error) {
            logger.error(error.message);
        }
    }
}

module.exports = new MessageSocketContoller;