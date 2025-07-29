const fs = require('fs');
const path = require('path');
const { createLogger, transports } = require('winston');
const { AppError } = require('./app.error');
// const { responseDTO } = require('..');

// console.log(__dirname + '../../../logs')
const logDir = './src/logs/';

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

const LogErrors = createLogger({
    transports: [
        new transports.Console(),
        // new transports.File({ filename: './src/logs/app_error.log' })
        new transports.File({ filename: path.join(logDir, "app_error.log") })
    ]
});

class ErrorLogger {
    constructor() { }
    async logError(err) {
        console.log('==================== Start Error Logger ===============');
        LogErrors.log({
            private: true,
            level: 'error',
            message: `${new Date()}-${JSON.stringify(err)}`
        });
        console.log('==================== End Error Logger ===============');
        // log error with Logger plugins

        return false;
    }

    isTrustError(error) {
        if (error instanceof AppError) {
            return error.isOperational;
        } else {
            return false;
        }
    }
}

// const ErrorHandler = async (err, req, res, next) => {

//     const errorLogger = new ErrorLogger();

//     process.on('uncaughtException', (reason, promise) => {
//         console.log(reason, 'UNHANDLED');
//         throw reason; // need to take care
//     })

//     process.on('uncaughtException', (error) => {
//         errorLogger.logError(error);
//         if (errorLogger.isTrustError(err)) {
//             //process exist // need restart
//         }
//     })

//     // console.log(err.description, '-------> DESCRIPTION')
//     // console.log(err.message, '-------> MESSAGE')
//     // console.log(err.name, '-------> NAME')
//     if (err) {
//         await errorLogger.logError(err);
//         if (errorLogger.isTrustError(err)) {
//             if (err.errorStack) {
//                 const errorDescription = err.errorStack;
//                 return res.status(err.statusCode).json({ 'message': errorDescription });
//                 // return res.status(err.statusCode).json(responseDTO.serverError(errorDescription));
//             }
//             return res.status(err.statusCode).json({ 'message': err.message });
//             // return res.status(err.statusCode).json(responseDTO.serverError(err.message));
//         } else {
//             //process exit // terriablly wrong with flow need restart
//         }
//         return res.status(err.statusCode).json({ 'message': err.message });
//         // return res.status(err.statusCode).json(responseDTO.serverError(err.message));
//     }
//     next();
// }

const ErrorHandler = async (err, req, res, next) => {
    const errorLogger = new ErrorLogger();

    // You should define these globally only once, not inside ErrorHandler
    process.on('uncaughtException', (reason) => {
        console.log(reason, 'UNHANDLED');
        throw reason;
    });

    process.on('unhandledRejection', (error) => {
        errorLogger.logError(error);
        if (!errorLogger.isTrustError(error)) {
            process.exit(1);
        }
    });

    if (err) {
        await errorLogger.logError(err);

        const statusCode = err.statusCode || 500;
        const message = err.message || 'Internal Server Error';

        return res.status(statusCode).json({ message });
    }

    next();
};

module.exports = ErrorHandler;