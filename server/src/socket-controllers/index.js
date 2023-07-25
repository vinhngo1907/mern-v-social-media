const userSocketController = require("./user-socket.controller");
const messageSocketController = require("./message-socket.controller");
const notifySocketController = require("./notify-socket.controller");
const postSocketController = require("./post-socket.controller");
const commentSocketController = require("./comment-socket.controller");
const callSocketController = require("./call-socket.controller");

module.exports = {
    userSocketController,
    messageSocketController,
    notifySocketController,
    postSocketController,
    commentSocketController,
    callSocketController
}