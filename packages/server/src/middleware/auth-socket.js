// middleware/socketMiddleware.js

// Assuming you have imported the Socket.IO instance
const io = require('socket.io')();

// Define middleware function
const authSocket = (req, res, next) => {
    // Attach io to req
    req.io = io;
    next(); // Move to the next middleware
};

module.exports = authSocket;
