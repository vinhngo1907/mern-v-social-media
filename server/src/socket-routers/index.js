const { userSocket } = require("./user-socket.routing");
const { messageSocket } = require("./message-socket.routing");
const { notifySocket } = require("./notify-socket.routing");
const { postSocket } = require("./post-socket.routing");
const { commentSocket } = require("./comment-socket.routing");

function defaultSocket(io, socket, users) {
    io.on("disconnect", () => {
        users = users.filter(u => u.socketId !== socket.Id)
    })
}

function SocketRoute(io, socket, users) {
    // User
    userSocket(io, socket, users);
    
    // Message
    messageSocket(io, socket, users);
    
    // Post
    postSocket(io, socket, users);
    
    // Comment
    commentSocket(io, socket, users);

    // Notify
    notifySocket(io, socket, users);
    
    // User disconnect - offline
    // defaultSocket(io, socket, users);
}

module.exports = SocketRoute;