const { socketRoute } = require("./socket-routers");
const { ExpressPeerServer } = require('peer');
// const logger = require("node-color-log");

const socketInfo = {
    io: undefined,
    socket: undefined,
    users: []
}

// let users = [];
function SocketApp(io, server) {
    // const onConnection = (socket) => {
    //     logger.info("NEW CONNECTION");
    //     // socketRoute(io, socket, users);'
    //     socket.on("joinUser", (user) => {
    //         !users.some(u => u.id === user._id) && users.push({ id: user._id, socketId: socket.id, followers: user.followers });
    //     });
    //     socket.on("createNotify", (msg) => {
    //         const clients = users.filter(user => msg.recipients.includes(user.id));
    //         if (clients) {
    //             clients.forEach((client) => {
    //                 socket.to(`${client.socketId}`).emit('createNotifyToClient', msg);
    //             });
    //         }
    //     });

    //     socket.on("removeNotify", (msg) => {
    //         const clients = users.filter(user => msg.recipients.includes(user.id.toString()))
    //         if (clients) {
    //             clients.forEach((client) => {
    //                 socket.to(`${client.socketId}`).emit('removeNotifyToClient', msg);
    //             })
    //         }
    //     });
    //     socket.on("likePost", (post) => {
    //         const ids = [...post.user.followers, post.user._id];
    //         const clients = users.filter(user => ids.includes(user.id));
    //         if (clients.length > 0) {
    //             clients.forEach(client => {
    //                 socket.to(`${client.socketId}`).emit('likeToClient', post)
    //             });
    //         };
    //     });

    //     socket.on("unLikePost", (post) => {
    //         const ids = [...post.user.followers, post.user._id]
    //         const clients = users.filter(user => ids.includes(user.id))

    //         if (clients.length > 0) {
    //             clients.forEach(client => {
    //                 socket.to(`${client.socketId}`).emit('unLikeToClient', post)
    //             });
    //         };
    //     });
    //     socket.on('disconnect', () => {
    //         logger.info("SOCKET DISCONNECT!!!");
    //         const data = users.find(user => user.socketId === socket.id)
    //         if (data) {
    //             const clients = users.filter(user =>
    //                 data.followers.find(u => u._id === user.id)
    //             )

    //             if (clients.length > 0) {
    //                 clients.forEach(client => {
    //                     socket.to(`${client.socketId}`).emit('CheckUserOffline', data.id)
    //                 })
    //             }

    //             if (data.call) {
    //                 const callUser = users.find(user => user.id === data.call)
    //                 if (callUser) {
    //                     users = editData(users, callUser.id, null)
    //                     socket.to(`${callUser.socketId}`).emit('callerDisconnect')
    //                 }
    //             }
    //         }

    //         users = users.filter(user => user.socketId !== socket.id);
    //         // console.log({users});
    //     });
    //     // console.log({users});
    //     socketInfo.io = io;
    //     socketInfo.socket = socket;
    //     socketInfo.users = users;
    // }
    // io.on("connection", onConnection);

    // Create peer server
    socketRoute(io, socketInfo);
    ExpressPeerServer(server, { path: '/' });
}

module.exports = {
    socketApp: SocketApp,
    socketInfo: socketInfo
}