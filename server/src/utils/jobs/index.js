"use strict";
const axios = require("axios");
const moment = require("moment");
const logger = require("node-color-log");
const { YOUTUBE_API_KEY, YOUTUBE_API_URL, YOUTUBE_CHANNEL_ID, GITHUB_API_URL, GITHUB_USER } = require("../../configs");
const { modelSchema } = require("../../db");
const { socialModel } = modelSchema;

class Job {
    constructor(statCache) {
        this.statCache = statCache;
    }

    static async FetchYoutubeStats() {
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
            const today = moment().format("LL");
            const youtubeRecord = {
                viewCount: +viewCount,
                subscriberCount: +subscriberCount,
                videoCount: viewCount,
                loggedAt: today
            }

            let result = await socialModel.findOneAndUpdate({ youtube: { loggedAt: today } }, {
                $set: {
                    viewCount: +viewCount,
                    subscriberCount: +subscriberCount,
                    videoCount: +videoCount,
                }
            });


            if (!result) {
                result = await socialModel.create({ youtube: youtubeRecord });
            }
            return result;
        } catch (error) {
            console.log(error);
            logger.error(error.message);
        }
    }

    static async FetchGitHubStats() {
        try {
            const response = await axios.get(`${GITHUB_API_URL}/users/${GITHUB_USER}`);
            const {
                public_repos,
                public_gists,
                followers
            } = response.data;

            const today = moment().format("LL");
            const githubRecord = {
                repoCount: public_repos,
                gitsCount: public_gists,
                followerCount: followers,
                loggedtAt: today
            }
            let result = await socialModel.findOneAndUpdate({ github: { loggedAt: today } }, {
                $set: {
                    repoCount: public_repos,
                    gitsCount: public_gists,
                    followerCount: followers,
                }
            });

            if (!result) {
                result = await socialModel.create({ github: githubRecord })
            }
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    static async FetchFaceBookStats() {
        try {

        } catch (error) {

        }
    }
    async UpdateFBToken() {

    }
    async FetchAllStats() {
        await Job.FetchYoutubeStats();
        await Job.FetchFaceBookStats();
        await Job.FetchGitHubStats();
        this.statCache = undefined;
    }
}

module.exports = new Job();