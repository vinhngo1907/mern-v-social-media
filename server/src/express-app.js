const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const fileUpload = require('express-fileupload');
const helmet = require("helmet");
const morgan = require("morgan");
const logger = require('node-color-log');
const cron = require('cron');
const {jobsUtil} = require("./utils");

const WebRoute = require('./routes');

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
    const job = new CronJob('*/2 * * * *', async () => {
        logger.info('Fetching all stats');
        await jobsUtil.FetchAllStats();
        
    });
    job.start();
    //api
    WebRoute(app);

    // error handling
    // errorHandler(app);
}