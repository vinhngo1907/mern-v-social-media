const SocketRoute = require("./socket-routers");

module.exports = (io) => {
    let users = [];
    const onConnection = async (socket) => {
        console.log("new connection");

        SocketRoute(io, socket, users);
    }

    io.on("connection", onConnection)
}