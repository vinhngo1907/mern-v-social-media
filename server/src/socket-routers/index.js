const { userSocket } = require("./user-socket.routing");
const { messageSocket } = require("./message-socket.routing");
const { notifySocket } = require("./notify-socket.routing");
const { postSocket } = require("./post-socket.routing");
const { commentSocket } = require("./comment-socket.routing");
const logger = require("../utils/logger");
const { callSocketController } = require("../socket-controllers");
const { callSocket } = require("./call-socket.routing");

// module.exports.defaultSocket = (io, socket, users) => {
//     io.on("disconnect", () => {
//         const data = users.find(user => user.socketId === socket.id);
//         if(data){
//             const clients = users.filter(user =>
//                 data?.following?.find(u => u === user.id)
//             );
//             if (clients.length > 0) {
//                 clients.forEach(client =>
//                     socket.to(`${client.socketId}`).emit('checkUserOffline', data.id)
//                 )
//             }
//         }
//         users = users.filter(u => u.socketId !== socket.Id);
//     })
// }

function defaultSocket(io, socket, users) {
    io.on("disconnect", () => {
        logger.info("Socket disconnected!!!");
        const data = users.find(user => user.socketId === socket.id);
        if (data) {
            const clients = users.filter(user =>
                data?.following?.find(u => u === user.id)
            );
            if (clients.length > 0) {
                clients.forEach(client =>
                    socket.to(`${client.socketId}`).emit('checkUserOffline', data.id)
                )
            }
            if (data.call) {
                console.log({data});
                const callUser = users.find(u => u.id === data.call);
                if (callUser) {
                    users = callSocketController.editData(users, callUser.id, null);
                    socket.to(`${callUser.socketId}`).emit('callerDisconnect');
                }
            }
        }
        users = users.filter(u => u.socketId !== socket.Id);
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
    
    // Call
    callSocket(io, socket, users);
    
    // User disconnect - offline
    defaultSocket(io, socket, users);
}

module.exports = SocketRoute;