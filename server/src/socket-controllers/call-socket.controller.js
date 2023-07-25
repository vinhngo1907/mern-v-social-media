'use strict';

const logger = require("node-color-log");

class CallSocketContoller {
    editData(users, sender, recipient){
        
    }
    startCall(io, socket, users, data) {
        try {

        } catch (error) {
            logger.info(error.message);
        }
    }

    endCall(io, socket, users, data) {
        try {

        } catch (error) {
            logger.info(error.message);
        }
    }
}

module.exports = new CallSocketContoller;