const express = require('express');
const { PORT } = require("./configs");
const { databaseConnection } = require('./db/index');
const expressApp = require('./express-app');
const socketApp = require('./socket-app');

async function StartServer() {
    const app = express();
    const server = require("http").createServer(app);

    await expressApp(app);

    //----------------connect database------------------//
    databaseConnection();


    //----------------start config socket------------------//
    // let users = [];
    const io = require("socket.io")(server);
    // io.use(isAuthSocket)
    socketApp(io);
    // let users = [];
    // io.on('connection', socket => {
    //     console.log("new connection");

    //     // User join - online
    //     userSocket(io, socket, users);
    // });
    //----------------end config socket------------------//

    //--------------------build server------------------//
    server.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    }).on('error', (err) => {
        console.log(err);
        process.exit();
    })
}

StartServer();