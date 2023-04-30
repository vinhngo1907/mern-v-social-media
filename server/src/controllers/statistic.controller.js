'use strict';
const moment = require("moment-timezone");
let stateCache;

class StatisticController {
    constructor(){
        
    }
    async FetchAllStat() {
        const today = moment().format("LL");

        stateCache = undefined;
    }
}

module.exports = StatisticController