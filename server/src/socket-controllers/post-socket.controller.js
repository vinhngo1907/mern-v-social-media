'use strict';

const logger = require("node-color-log");

class PostSocketContoller {
    likePost(io, socket, users, post) {
        try {

        } catch (error) {
            logger.error(error.message);
        }
    }

    commentPost(io, socket, users, post) {
        try {

        } catch (error) {
            logger.error(error.message);
        }
    }
}

module.exports = new PostSocketContoller;