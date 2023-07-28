const path = require("path");
const rfs = require("rotating-file-stream");
const moment = require('moment-timezone');
const fs = require("fs");

/* eslint-disable no-console */
/* eslint-disable func-names */
class Logger {
    info(logText) {
        console.log(`${new Date()}info:::::${logText}`);
    }

    debug(logText) {
        console.log(`${new Date()}debug:::::${logText}`);
    };
    error(logText) {
        console.log(`${new Date()}error:::::${logText}`);
    }

    getCustomErrorMorganFormat() {
        return JSON.stringify({
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
    }
}

exports.accessLogStream = rfs.createStream(
    `${(new Date().toJSON().slice(0, 10))}-access.log`, {
    interval: '1d', // rotate daily
    path: path.join('./src/', 'logs/access'),
});

exports.errorLogStream = rfs.createStream(
    `${(new Date().toJSON().slice(0, 10))}-error.log`, {
    interval: '1d', // rotate daily
    path: path.join('./src/', 'logs/error'),
});

module.exports = new Logger;