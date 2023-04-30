'use strict';
const moment = require("moment-timezone");
let stateCache;

class StatisticController {
    async FetchAllStat() {
        const today = moment().format("LL");

        stateCache = undefined;
    }
}

module.exports = StatisticController