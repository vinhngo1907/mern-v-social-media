const { socketRoute } = require("./socket-routers");
const { ExpressPeerServer } = require('peer');
const logger = require("node-color-log");

const socketInfo = {
    io: undefined,
    socket: undefined,
    users: []
}

function editData(data, id, call) {
    const newData = data.map(item => item.id === id ? { ...item, call } : item);
    return newData;
}

function SocketApp(io, server) {
    let users = [];
    // let socketServer = null;
    const onConnection = (socket) => {
        logger.info("NEW CONNECTION");
        // socketServer = socket;
        socketRoute(io, socket, users);
        socket.on("callUser", (data) => {
            // console.log({old: users});
            logger.info("CALLING...");
            users = editData(users, data.sender, data.recipient);
            const client = users.find(u => u.id === data.recipient);
            if (client) {
                if (client.call) {
                    socket.emit("userBusy", data);
                    users = editData(users, data.sender, null);
                } else {
                    users = editData(users, data.recipient, data.sender);
                    socket.to(`${client.socketId}`).emit('callUserToClient', data);
                }
            }
            // console.log({new: users});
        });

        socket.on("endCall", (data) => {
            // console.log({old: users});
            const client = users.find(u => u.id === data.sender);
            const clientEndCall = users.find(u => u.id === data.recipient);
            if (clientEndCall) {
                socket.to(`${clientEndCall.socketId}`).emit('endCallToClient', data);
            }
            if (client) {
                socket.to(`${client.socketId}`).emit('endCallToClient', data);
                users = editData(users, client.id, null);
                if (client.call) {
                    const clientCall = users.find(u => u.id === client.call);
                    clientCall && socket.to(`${clientCall.socketId}`).emit('endCallToClient', data);

                    users = editData(users, client.call, null);
                }
            }
            // console.log({new: users});
        });

        socket.on("disconnect", () => {
            logger.info("Socket disconnected!!!");
            // console.log({ users });
            // console.log({ usersCache });
            const data = users.find(user => user.socketId === socket.id);
            if (data) {
                const clients = users.filter(user =>
                    data.followers.find(u => u._id === user.id)
                );
    
                if (clients.length > 0) {
                    clients.forEach(client => {
                        socket.to(`${client.socketId}`).emit('CheckUserOffline', data.id)
                    });
                }
                // console.log({data})
                if (data.call) {
                    const callUser = users.find(user => user.id === data.call);
                    if (callUser) {
                        users = editData(users, callUser.id, null);
                        socket.to(`${callUser.socketId}`).emit('callerDisconnect');
                    }
                }
            }
    
            users = users.filter(u => u.socketId !== socket.id);
        });
        socketInfo.io = io;
        socketInfo.socket = socket;
        socketInfo.users = users;
    }
    io.on("connection", onConnection);

    // Create peer server
    ExpressPeerServer(server, { path: '/' });
}
module.exports = {
    socketApp: SocketApp,
    socketInfo: socketInfo
}