'use strict';
const { responseDTO, APIFeatures } = require("../utils");
const { modelSchema } = require("../db");
const { statisticModel } = modelSchema;
const moment = require("moment-timezone");
let stateCache;

class StatisticController {
    async FetchAllStat() {
        try {
            const now = moment(new Date());
            const dayStart = moment(now).startOf("date").toDate();
            const dayEnd = moment(now).endOf("date").toDate();

            const recordExist = await statisticModel.findOne({
                loggedAt: {
                    $gt: dayStart,
                    $lte: dayEnd
                }
            })
            if (recordExist) {
                await statisticModel.findOneAndUpdate(
                    {
                        loggedAt: {
                            $gt: dayStart,
                            $lte: dayEnd
                        }
                    }, {
                    $inc: {
                        viewCount: +1,
                        visitCount: +1
                    },
                    loggedAt: now
                });
            } else {

            }

            stateCache = undefined;
        } catch (error) {
            responseDTO.serverError(error.message);
        }
    }
    async GetTotalStats() {
        try {
            const today = moment().format("LL");
            const statistic = await statisticModel.findOne({ loggedAt: today });
            let stats = {}
            if (statistic) {
                const {
                    viewCount,
                    visitCount
                } = statistic;

                stats = {
                    viewCount,
                    visitCount,
                    cacheTime: moment()
                }
            }
            responseDTO.success("Get data in successfully", stats)
        } catch (error) {
            console.log(error);
            responseDTO.serverError(error.message);
        }
    }
}

module.exports = StatisticController