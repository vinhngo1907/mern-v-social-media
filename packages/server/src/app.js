const express = require('express');
const { PORT } = require("./configs");
const { databaseConnection } = require('./db/index');
const expressApp = require('./express-app');
const { socketApp } = require('./socket-app');
const { videoService } = require('./services');
const { startVideoScheduler } = videoService;
const { CLIENT_URL } = require('./configs');

const allowedOrigins = [CLIENT_URL];
console.log('✅ Allowed Origins:', allowedOrigins);

const corsOptions = {
    // origin: function (origin, callback) {
    //     console.log('🌐 Incoming Origin:', origin);
    //     if (!origin || allowedOrigins.includes(origin)) {
    //         callback(null, true);
    //     } else {
    //         console.log(`❌ Origin ${origin} is NOT allowed by CORS`);
    //         callback(new Error('Not allowed by CORS'));
    //     }
    // },
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true
};


const app = express();

const server = require("http").createServer(app);
// const io = require("socket.io")(server);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: corsOptions
})

//---------------- Start config socket------------------//
socketApp(io, server);

//---------------- Use middleware to attach io ------------------//
app.use((req, res, next) => {
    req.io = io;
    next();
});

//----------------Config routes----------------------//
expressApp(app, corsOptions);

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