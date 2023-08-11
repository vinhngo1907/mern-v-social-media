'use strict';
const moment = require("moment-timezone");
const { responseDTO, jobsUtil } = require("../utils");
const { modelSchema } = require("../db");
const logger = require("node-color-log");
const { statisticModel, socialModel } = modelSchema;

class StatisticController {
    async GetViewAndVisitStats(req, res) {
        const { type, id } = req.query;
        try {
            const now = moment(new Date());
            const today = now.toDate();
            // const startOfDate = moment(now).startOf("date").toDate();
            // const endOfDate = moment(now).endOf("date").toDate();
            const recordExist = await statisticModel.findOne({ user: id })
                .populate("user clients folowers following", "username fullname avatar following followers");

            if (recordExist) {
                recordExist.loggedAt = today;
                recordExist.viewCount += 1;
                if (type === "visit-pageview") {
                    recordExist.visitCount += 1
                }
                if (recordExist.clients.every(c => c._id.toString() !== req.user._id.toString())) {
                    recordExist.clients.push(req.user._id);
                }

                await recordExist.save()
                logger.info(`Updated ${req.user?.username} stats for date: ${today}`);
                return res.json(responseDTO.success("submit duration success", {
                    ...recordExist._doc, user: req.user
                }));
            }
            else {
                const stats = new statisticModel({
                    viewCount: 1,
                    visitCount: 1,
                    loggedAt: today,
                    user: id,
                    clients: []
                });

                if (req.user._id.toString() !== id.toString()) {
                    stats.clients.push(req.user._id)
                }

                await stats.save();
                await stats.populate("user clients folowers following", "username fullname avatar following followers");
                logger.info(`Updated ${req.user?.username} stats for date: ${today}`);
                return res.json(responseDTO.success("submit duration success", {
                    ...stats._doc, user: req.user
                }));
            }

        } catch (error) {
            // console.log(error);
            logger.error(error.message);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    async GetAllTotalStats(req, res) {
        try {
            const now = moment(new Date());
            const dayStart = moment(now).startOf("date").toDate();
            const dayEnd = moment(now).endOf("date").toDate();
            
            const recordStats = await statisticModel
                .findOne({ user: req.user._id, })
                .populate("user clients folowers following", "username fullname avatar following followers");

            let stats = {}
            if (recordStats) {
                const { viewCount, visitCount, user, clients } = recordStats;
                stats = {
                    viewCount, visitCount, user, clients
                }
            }

            res.status(200).json(responseDTO.success("Get data in successfully", stats));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    async GetAllSocialStats(req, res) {
        logger.info("[>>> GET STATCACHE <<<]");
        try {
            if (jobsUtil.statCache) {
                const { cacheTime, data } = jobsUtil.statCache;
                const durationUntilNow = moment.duration(cacheTime.diff(moment())).asSeconds();
                if (durationUntilNow < 30) {
                    return res.json(responseDTO.success("Get data in insuccessfully", data));
                }
            }

            const today = moment().format('LL');
            const socialStats = await socialModel.find({ loggedAt: today });
            if (!socialStats || socialStats.length === 0) {
                logger.info(`No social stats fetched on ${today}`);
                return res.json(responseDTO.success("Get data in successfully", []));
            }

            const stats = [];
            const { youtube, github } = socialStats[0];
            if (youtube) {
                const { viewCount, subscriberCount, videoCount, } = youtube;
                stats.push({ title: "youtube", viewCount, subscriberCount, videoCount, });
            }

            if (github) {
                const { repoCount, gistCount, followerCount: githubFollowerCount } = github;
                stats.push(
                    {
                        title: "github",
                        repoCount,
                        gistCount,
                        followerCount: githubFollowerCount,
                    }
                );
            }

            jobsUtil.statCache = {
                cacheTime: moment(),
                data: stats
            }

            res.json(responseDTO.success("Get data in successfully", stats));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    async GetFacebookToken(req, res) {
        try {
            await jobsUtil.GetFacebookAccessToken(req.query.token);
            await jobsUtil.FetchAllStats();
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }
}

module.exports = StatisticController;