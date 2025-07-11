const express = require('express');
const cron = require('cron');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const fileUpload = require('express-fileupload');
const helmet = require("helmet");
const morgan = require("morgan");
const logger = require('node-color-log');
const WebRoute = require('./routes');
const ErrorHandler = require('./utils/errors');
// const { loggerUtil } = require('./utils');
const { errorLogStream, accessLogStream, getCustomErrorMorganFormat, loggerDefault } = require('./utils/logger');
const { jobsUtil } = require("./utils");

module.exports = async (app) => {
    // cron job fetch stats
    const { CronJob } = cron;
    const job = new CronJob('*/30 * * * *', async () => {
        logger.info('Fetching all stats');
        await jobsUtil.FetchAllStats();
    });

    // job.start();

    app.enable('trust proxy');

    // adding Helmet to enhance your API's security
    app.use(helmet());

    // using bodyParser to parse JSON bodies into JS objects
    app.use(express.json());

    // enabling CORS for all requests
    app.use(cors({
        origin: "*",
        credentials: true
    }));

    app.use(cookieParser());
    app.use(express.static(__dirname + '/public'));

    // configure isProduction variable
    const isProduction = process.env.NODE_ENV === "production";
    morgan.token('error', (err, req, res, next) => `${err?.stack}`);

    // adding morgan to log HTTP requests
    app.use(
        morgan(getCustomErrorMorganFormat(), {
            skip: (req, res) => (res.statusCode < 400),
            stream: errorLogStream,
        })
    );

    app.use(!isProduction ? morgan('combined', { stream: accessLogStream, }) : morgan("dev"));

    app.use(fileUpload({
        useTempFiles: true
    }));

    app.get('/', (req, res) => {
        logger.info('GET /');
        res.send('Hế lố hế lố, V Dev đây!, App works!!!!!');
    });

    // Api routes
    WebRoute(app);

    // request to handle undefined or all other routes
    app.get('*', (req, res) => {
        logger.info('GET undefined routes');
        res.send('App works!!!!!');
    });

    // Error handlers & middlewares
    app.use(ErrorHandler);
}