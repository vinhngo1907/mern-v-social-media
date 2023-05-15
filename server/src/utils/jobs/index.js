"use strict";
const axios = require("axios");
const moment = require("moment");
const logger = require("node-color-log");
const { YOUTUBE_API_KEY, YOUTUBE_API_URL, YOUTUBE_CHANNEL_ID, GITHUB_API_URL, GITHUB_USER } = require("../../configs");
const { modelSchema } = require("../../db");
const { socialModel } = modelSchema;

class Job {
    constructor(statCache, longLivedFacebookToken, fbPageToken) {
        this.statCache = statCache;
        this.longLivedFacebookToken = longLivedFacebookToken;
        this.fbPageToken = fbPageToken
    }

    static async FetchYoutubeStats(socialData) {
        const ENDPOINT = `${YOUTUBE_API_URL}/channels?part=statistics&id=${YOUTUBE_CHANNEL_ID}&key=${YOUTUBE_API_KEY}`;
        try {
            const respone = await axios.get(ENDPOINT);
            const channel = respone.data.items[0];
            const {
                statistics: {
                    viewCount,
                    subscriberCount,
                    videoCount
                }
            } = channel;

            // const today = moment().format("LL");
            // const youtubeRecord = {
            //     viewCount: +viewCount,
            //     subscriberCount: +subscriberCount,
            //     videoCount: viewCount,
            //     loggedAt: today
            // }

            let result = await socialModel.findOneAndUpdate({
                _id: socialData._id,
                loggedAt: { $eq: socialData.loggedAt }
            }, {
                youtube: {
                    viewCount: +viewCount,
                    subscriberCount: +subscriberCount,
                    videoCount: +videoCount,
                }
            });


            // if (!result) {
            //     result = await socialModel.create({ youtube: youtubeRecord });
            // }
            return result;
        } catch (error) {
            console.log(error);
            logger.error(error.message);
        }
    }

    static async FetchGitHubStats(socialData) {
        try {
            const response = await axios.get(`${GITHUB_API_URL}/users/${GITHUB_USER}`);
            const {
                public_repos,
                public_gists,
                followers
            } = response.data;

            // const today = moment().format("LL");
            // const githubRecord = {
            //     repoCount: public_repos,
            //     gistCount: public_gists,
            //     followerCount: followers,
            //     loggedtAt: today
            // }
            let result = await socialModel.findOneAndUpdate({
                _id: socialData._id,
                loggedAt: { $eq: socialData.loggedAt }
            }, {
                github: {
                    repoCount: public_repos,
                    gistCount: public_gists,
                    followerCount: followers,
                }
            });

            // if (!result) {
            //     result = await socialModel.create({ github: githubRecord })
            // }
            return result;
        } catch (error) {
            console.log(error);
            logger.error(error.message);
        }
    }

    static async FetchFaceBookStats(socialData) {
        try {

        } catch (error) {
            logger.error(error.message);
        }
    }   
    
    async FetchAllStats() {
        const oldData = await socialModel.findOne({ loggedAt: { $eq: moment().format("LL") } });
        if (!oldData) {
            const newData = socialModel({
                github: {},
                youtube: {},
                facebook: {},
                loggedAt: moment().format("LL")
            });
            await newData.save();

            await Job.FetchYoutubeStats(newData);
            await Job.FetchFaceBookStats(newData);
            await Job.FetchGitHubStats(newData);
            this.statCache = undefined;
        }

        if (oldData) {
            await Job.FetchYoutubeStats(oldData);
            await Job.FetchFaceBookStats(oldData);
            await Job.FetchGitHubStats(oldData);
            this.statCache = undefined;
        }
    }
}

module.exports = new Job(undefined, '', '');