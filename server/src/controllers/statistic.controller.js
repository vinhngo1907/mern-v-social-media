'use strict';
const { responseDTO, APIFeatures } = require("../utils");
const { modelSchema } = require("../db");
const { statisticModel } = modelSchema;
const moment = require("moment-timezone");
let statCache;

class StatisticController {
    async FetchAllStats(req, res) {
        console.log(">>>>>>>",req.query)
        try {
            const now = moment(new Date());
            const dayStart = moment(now).startOf("date").toDate();
            const dayEnd = moment(now).endOf("date").toDate();
            const recordExist = await statisticModel.findOne({ user: req.user._id })

            let statisticRecord = {
                viewCount: 0,
                visitCount: 0
            }

            if (recordExist) {
                const { viewCount, visitCount } = recordExist;
                statisticRecord.viewCount = viewCount + 1;

                if (req.query.type === "visit-pageview") {
                    statisticRecord.visitCount = visitCount + 1;
                }

                const updatedStats = await statisticModel.findOneAndUpdate(
                    {
                        user: req.query.id,
                        loggedAt: {
                            $gt: dayStart,
                            $lte: dayEnd
                        }
                    }, {
                    $set: {
                        viewCount: statisticRecord.viewCount,
                        visitCount: statisticRecord.visitCount,
                        loggedAt: now,
                        user: req.user.id,
                        clients: req.query.id !== req.user._id && recordExist.clients.every(c => c !== req.user._id) && [...recordExist.clients, req.user._id]
                    }
                });
                statCache = undefined;
                res.status(200).json(responseDTO.success("submit duration success", updatedStats));
            } else {
                const newStats = new statisticModel({
                    viewCount: 1,
                    visitCount: 1,
                    user: req.query.id,
                    clients: []
                });

                await newStats.save();
                statCache = undefined;
                res.status(200).json(responseDTO.success("submit duration success", {
                    ...newStats._doc, user: req.user
                }));
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }
    async GetTotalStats(req, res) {
        try {
            if (statCache) {
                const { cacheTime, data } = statCache;
                const durationUntilNow = moment.duration(cacheTime.diff(moment())).asSeconds();
                if (durationUntilNow < 30) {
                    return res.status(200).json(responseDTO.success("Get data in successfully", data));
                }
            }
            // const today = moment().format("LL");
            const now = moment(new Date());
            const dayStart = moment(now).startOf("date").toDate();
            const dayEnd = moment(now).endOf("date").toDate();
            const recordStats = await statisticModel
                .findOne({
                    user: req.user._id,
                    // loggedAt: {
                    //     $gt: dayStart,
                    //     $lte: dayEnd
                    // }
                })
                .populate("user", "username fullname avatar following followers");

            let stats = {}
            if (recordStats) {
                const { viewCount, visitCount, user } = recordStats
                stats = {
                    viewCount, visitCount, user
                }
            }

            statCache = {
                cacheTime: moment(),
                data: stats,
            };

            res.status(200).json(responseDTO.success("Get data in successfully", stats));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));;
        }
    }
}

module.exports = StatisticController