/* eslint-disable no-console */
/* eslint-disable func-names */
class Logger {
    constructor(logText){
        this.logText = logText;
    }
    info() {
        console.log(`${new Date()}info:::::${this.logText}`);
    }

    debug() {
        console.log(`${new Date()}debug:::::${this.logText}`);
    };
    error() {
        console.log(`${new Date()}error:::::${this.logText}`);
    }
}

module.exports = Logger;