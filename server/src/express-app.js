const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const fileUpload = require('express-fileupload');
const helmet = require("helmet");
const morgan = require("morgan");
const logger = require('node-color-log');

const WebRoute = require('./routes');
const ErrorHandler = require('./utils/errors');
// const { loggerUtil } = require('./utils');
const { errorLogStream, accessLogStream, getCustomErrorMorganFormat } = require('./utils/logger');

module.exports = async (app) => {
    app.enable('trust proxy');
    app.use(helmet());

    // Middlewares
    app.use(express.json());
    app.use(cors({
        origin: "*",
        credentials: true
    }));

    app.use(cookieParser());
    app.use(express.static(__dirname + '/public'));
    // Morgan - Logger
    const isProduction = process.env.NODE_ENV === "production";
    morgan.token('error', (err, req, res, next) => `${err?.stack}`);
    app.use(
        morgan(getCustomErrorMorganFormat(), {
            skip: (req, res) => (res.statusCode < 400),
            stream: errorLogStream,
        })
    );

    app.use(
        !isProduction ? morgan('combined', { stream: accessLogStream, }) : morgan("dev")
    );

    app.use(fileUpload({
        useTempFiles: true
    }));

    app.get('/', (req, res) => {
        logger.info('GET /');
        res.send('App works!!!!!');
    });

    // Api routes
    WebRoute(app);

    // request to handle undefined or all other routes
    app.get('*', (req, res) => {
        // loggerUtil.info('GET undefined routes');
        res.send('App works!!!!!');
    });

    // error handling
    app.use(ErrorHandler);
}