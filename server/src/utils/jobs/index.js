"use strict";
const axios = require("axios");
const { YOUTUBE_API_KEY, YOUTUBE_API_URL, YOUTUBE_CHANNEL_ID } = require("../../configs");
const { modelSchema } = require("../../db");
const { socialModel } = modelSchema;

class Job {
    constructor(statCache) {
        statCache = this.statCache;
    }

    static async FetchYoutubeStats() {
        const ENDPOINT = `${YOUTUBE_API_URL}/channels?part=statistics&id=${YOUTUBE_CHANNEL_ID}&key=${YOUTUBE_API_KEY}`;
        try {
            const respone = await axios.get(ENDPOINT);
            const channel = respone.data.items(0);
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

            let result = await socialModel.findOneAndUpdate({ youtube: { loggedAt: loggedAt } }, {
                $set: {
                    viewCount: +viewCount,
                    subscriberCount: +subscriberCount,
                    videoCount: +videoCount,
                }
            });


            if (!result) {
                result = await socialModel.create(youtubeRecord);
            }
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    static async FetchGitHubStats() {
        try {

        } catch (error) {
            console.log(error);
        }
    }

    static async FetchFaceBookStats() {
        try {

        } catch (error) {

        }
    }

    async FetchAllStats() {
        await Job.FetchYoutubeStats();
        await Job.FetchFaceBookStats();
        await Job.FetchGitHubStats();
    }
}

module.exports = new Job();