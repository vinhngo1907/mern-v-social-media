const express = require('express');
const { PORT } = require("./configs");
const { databaseConnection } = require('./db/index');
const expressApp = require('./express-app');
const { socketApp } = require('./socket-app');
const { videoService } = require('./services');
const { startVideoScheduler} = videoService;

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

//---------------- Start config socket------------------//
socketApp(io, server);

//---------------- Use middleware to attach io ------------------//
app.use((req, res, next) => {
    req.io = io;
    next();
});

//----------------Config routes----------------------//
expressApp(app);

//----------------Connect to database------------------//
databaseConnection();

//-------------Starting and build the server-----------//
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
}).on('error', (err) => {
    console.error(err);
    process.exit();
});

startVideoScheduler(io);

// module.exports = io;