'use strict';
const { responseDTO, APIFeatures } = require("../utils");
const { modelSchema } = require("../db");
const { statisticModel } = modelSchema;
const moment = require("moment-timezone");
let stateCache;

class StatisticController {
    async FetchAllStats(req, res) {
        try {
            const now = moment(new Date());
            const dayStart = moment(now).startOf("date").toDate();
            const dayEnd = moment(now).endOf("date").toDate();
            let statisticRecord = {}

            const recordExist = await statisticModel.findOne({
                loggedAt: {
                    $gt: dayStart,
                    $lte: dayEnd
                }
            });
            if (recordExist) {
                const { viewCount, visitCount } = recordExist;
                statisticRecord.viewCount = viewCount + 1;
                if (req.query.type === "visit-pageview") {
                    statisticRecord.viewCount = visitCount + 1;
                }

                await statisticModel.findOneAndUpdate(
                    {
                        loggedAt: {
                            $gt: dayStart,
                            $lte: dayEnd
                        }
                    }, {
                    $set: {
                        viewCount: statisticRecord.viewCount,
                        visitCount: statisticRecord.visitCount,
                        loggedAt: now,
                        user: req.user._id,
                        clients: recordExist.clients.every(c => c !== req.user._id) && [...recordExist.clients, req.user._id]
                    }
                });
                res.status(200).json(responseDTO.success("submit duration success"));
            } else {
                const newStatistic = new statisticModel({
                    viewCount: 1,
                    visitCount: 1,
                    user: req.user._id,
                    clients: []
                });

                await newStatistic.save();
                res.status(200).json(responseDTO.success("submit duration success"));
            }

            stateCache = undefined;
        } catch (error) {
            return res.status(500).json(responseDTO.serverError(error.message));
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
            return res.status(500).json(responseDTO.serverError(error.message));;
        }
    }
}

module.exports = StatisticController