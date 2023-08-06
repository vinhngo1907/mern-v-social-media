const express = require('express');
const { PORT } = require("./configs");
const { databaseConnection } = require('./db/index');
const expressApp = require('./express-app');
const socketApp = require('./socket-app');
// const { messageSocket } = require('./socket-routers/message-socket.routing');
// const { userSocket } = require('./socket-routers/user-socket.routing');
// const { notifySocket } = require('./socket-routers/notify-socket.routing');
// const { defaultSocket } = require('./socket-routers');

async function StartServer() {
    const app = express();
    const server = require("http").createServer(app);
    const io = require("socket.io")(server);

    //----------------start config socket------------------//
    // let users = [];
    // io.use(isAuthSocket)
    socketApp(io, server);
    // let users = [];
    // io.on('connection', socket => {
    //     console.log("new connection");

    //     // User join - online
    //     userSocket(io, socket, users);
    // });
    //----------------end config socket------------------//

    //----------------config routes----------------------//
    await expressApp(app);

    //----------------connect to database------------------//
    databaseConnection();

    //-------------starting and build the server-----------//
    server.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    }).on('error', (err) => {
        console.log(err);
        process.exit();
    })
}

StartServer();