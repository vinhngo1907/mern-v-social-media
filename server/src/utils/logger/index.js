const path = require("path");
const rfs = require("rotating-file-stream");
const loggerDefault = require("./default.logger");
const moment = require("moment-timezone");

const today = moment(new Date()).tz("Asia/Ho_Chi_Minh").format('YYYY-MM-DD');
// console.log({today})

/* eslint-disable no-console */
/* eslint-disable func-names */
const accessLogStream = rfs.createStream(
    // `${(today.toJSON().slice(0, 10))}-access.log`, {
    `${(today)}-access.log`, {
    interval: '1d', // rotate daily
    path: path.join('./src/', 'logs/access'),
});

const errorLogStream = rfs.createStream(
    `${today}-error.log`, {
    interval: '1d', // rotate daily
    path: path.join('./src/', 'logs/error'),
});

const getCustomErrorMorganFormat = () => JSON.stringify({
    method: ':method',
    url: ':url',
    http_version: ':http-version',
    response_time: ':response-time',
    status: ':status',
    content_length: ':res[content-length]',
    timestamp: ':date[iso]',
    headers_count: 'req-headers-length',
    error: ':error',
});

module.exports = {
    accessLogStream,
    errorLogStream,
    getCustomErrorMorganFormat,
    loggerDefault
};