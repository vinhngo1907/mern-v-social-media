const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const fileUpload = require('express-fileupload');
const helmet = require("helmet");
const morgan = require("morgan");
const logger = require('node-color-log');

const WebRoute = require('./routes');
const ErrorHandler = require('./utils/errors');

module.exports = async (app) => {
    app.enable('trust proxy');
    app.use(helmet());
    // app.use(morgan('common'));
    app.use(express.json());
    app.use(cors({
        origin: "*",
        credentials: true
    }));
    app.use(cookieParser());
    app.use(express.static(__dirname + '/public'))
    app.use(fileUpload({
        useTempFiles: true
    }));

    app.get('/', (req, res) => {
        logger.info('GET /');
        res.send('App works!!!!!');
    });

    //api
    WebRoute(app);

    // request to handle undefined or all other routes
    app.get('*', (req, res) => {
        loggerUtil.info('GET undefined routes');
        res.send('App works!!!!!');
    });

    // error handling
    app.use(ErrorHandler);
}