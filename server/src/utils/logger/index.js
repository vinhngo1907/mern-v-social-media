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
}

module.exports = new Logger;