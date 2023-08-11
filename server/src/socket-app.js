const SocketRoute = require("./socket-routers");
const { ExpressPeerServer } = require('peer');
const logger = require("node-color-log");
const cron = require('cron');
const { jobsUtil } = require("./utils");

const socketInfo = {
    io: undefined,
    socket: undefined,
    users: []
}

function SocketApp(io, server) {
    let users = [];
    let socketServer = null;
    const onConnection = (socket) => {
        logger.info("NEW CONNECTION");
        socketServer = socket;
        SocketRoute(io, socket, users);
        socketInfo.io = io;
        socketInfo.socket = socket;
        socketInfo.users = users;
    }
    io.on("connection", onConnection);

    // Create peer server
    ExpressPeerServer(server, { path: '/' });

    const { CronJob } = cron;
    const job = new CronJob('*/30 * * * *', async () => {
        logger.info('Fetching all stats');
        await jobsUtil.FetchAllStats(socketServer, users);

    });
    
    job.start();
}
module.exports = {
    socketApp: SocketApp,
    socketInfo: socketInfo
}