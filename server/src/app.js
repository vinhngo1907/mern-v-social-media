const express = require('express');
const { PORT } = require("./configs");
const { databaseConnection } = require('./db/index');
const expressApp = require('./express-app');
const { socketApp } = require('./socket-app');
const { videoService } = require('./services');
const { startVideoScheduler } = videoService;

// async function StartServer() {
//     const app = express();
//     const server = require("http").createServer(app);
//     const io = require("socket.io")(server);

//     //----------------start config socket------------------//
//     socketApp(io, server);

//     //----------------end config socket------------------//

//     //----------------config routes----------------------//
//     await expressApp(app);

//     //----------------connect to database------------------//
//     databaseConnection();

//     //-------------starting and build the server-----------//
//     server.listen(PORT, () => {
//         console.log(`Server started on port ${PORT}`);
//     }).on('error', (err) => {
//         console.log(err);
//         process.exit();
//     })
// }

// StartServer();

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

//----------------start config socket------------------//
socketApp(io, server);

//----------------config routes----------------------//
expressApp(app);

//----------------connect to database------------------//
databaseConnection();

//-------------starting and build the server-----------//
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
}).on('error', (err) => {
    console.log(err);
    process.exit();
});

startVideoScheduler(io);

module.exports = io;