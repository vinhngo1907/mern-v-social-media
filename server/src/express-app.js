const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const fileUpload = require('express-fileupload');
const helmet = require("helmet");
const morgan = require("morgan");
const logger = require('node-color-log');
const cron = require('cron');
const { jobsUtil, loggerUtil } = require("./utils");

const WebRoute = require('./routes');
const ErrorHandler = require('./utils/errors');

module.exports = async (app) => {
    app.enable('trust proxy');
    app.use(helmet());
    // app.use(morgan('common'));
    app.use(express.json());
    app.use(cors({
        origin: "*"
    }));
    app.use(cookieParser());
    app.use(express.static(__dirname + '/public'))
    app.use(fileUpload({
        useTempFiles: true
    }));

    const { CronJob } = cron;
    const job = new CronJob('*/15 * * * *', async () => {
        logger.info('Fetching all stats');
        // await jobsUtil.FetchAllStats();

    });
    job.start();

    // app.get('/', (req, res) => {
    //     logger.info('GET /');
    //     res.send('App works!!!!!');
    // });

    //api
    WebRoute(app);

    // request to handle undefined or all other routes
    // app.get('*', (req, res) => {
    //     loggerUtil.info('GET undefined routes');
    //     res.send('App works!!!!!');
    // });

    app.get('/api/statistic/fb_token', async (req, res) => {
        try {
            await jobsUtil.GetFacebookAccessToken(req.query.token);
            await jobsUtil.FetchAllStats();
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    })

    // error handling
    app.use(ErrorHandler)
}