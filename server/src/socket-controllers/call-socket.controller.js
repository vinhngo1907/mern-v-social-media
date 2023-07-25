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