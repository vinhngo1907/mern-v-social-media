"use strict";
const axios = require("axios");
const moment = require("moment");
const logger = require("node-color-log");
const {
    YOUTUBE_API_KEY, YOUTUBE_API_URL, YOUTUBE_CHANNEL_ID,
    GITHUB_API_URL, GITHUB_USER,
    FACEBOOK_API_URL, FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET, FACEBOOK_PAGE_ID
} = require("../../configs");

const { modelSchema } = require("../../db");
const { socketInfo } = require("../../socket-app");
const { socialModel } = modelSchema;

class Job {
    constructor(statCache, longLivedFacebookToken, fbPageToken) {
        this.statCache = statCache;
        this.longLivedFacebookToken = longLivedFacebookToken;
        this.fbPageToken = fbPageToken;
    }

    async GetFacebookAccessToken(shortLivedToken) {
        try {
            const ENDPOINT = `${FACEBOOK_API_URL}/oauth/access_token?grant_type=fb_exchange_token&client_id=${FACEBOOK_CLIENT_ID}&client_secret=${FACEBOOK_CLIENT_SECRET}&fb_exchange_token=${shortLivedToken}`;
            const response = await axios.get(ENDPOINT);
            this.longLivedFacebookToken = response.data.access_token;

            const PAGE_TOKEN_ENDPOINT = `${FACEBOOK_API_URL}/${FACEBOOK_PAGE_ID}?fields=access_token&access_token=${this.longLivedFacebookToken}`;
            const pageTokenResponse = await axios.get(PAGE_TOKEN_ENDPOINT);
            this.fbPageToken = pageTokenResponse;
        } catch (error) {
            console.log(error.response?.data);
            logger.error(error.message);
            return;
        }
    }

    async FetchFacebookImpression() {
        const ENDPOINT = `${FACEBOOK_API_URL}${FACEBOOK_PAGE_ID}/insights?metric=page_impressions&date_preset=today&access_token=${this.fbPageToken}`;
        const response = await axios.get(ENDPOINT);
        console.log({ impression: response });
        return response.data.data[0]?.values[0]?.value;
    }

    async FetchFacebookFollowerCount() {
        const FOLLOWER_COUNT_ENDPOINT = `${FACEBOOK_API_URL}/${FACEBOOK_PAGE_ID}?fields=followers_count&access_token=${this.longLivedFacebookToken}`;
        const response = await axios(FOLLOWER_COUNT_ENDPOINT);
        return response.data.followers_count;
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

            let result = await socialModel.findOneAndUpdate({
                _id: socialData._id,
                loggedAt: { $eq: socialData.loggedAt }
            }, {
                youtube: {
                    title: "youtube",
                    viewCount: +viewCount,
                    subscriberCount: +subscriberCount,
                    videoCount: +videoCount,
                }
            });
            // console.log({ socketInfo });
            if (socketInfo && socketInfo.socket) {
                // const { socket } = socketInfo;
                socketInfo.socket.emit("fetchYoutubeStats", { youtube: result.youtube });
            }
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

            let result = await socialModel.findOneAndUpdate({
                _id: socialData._id,
                loggedAt: { $eq: socialData.loggedAt }
            }, {
                github: {
                    title: "github",
                    repoCount: public_repos,
                    gistCount: public_gists,
                    followerCount: followers,
                }
            });

            // console.log({ socketInfo });
            if (socketInfo && socketInfo.socket) {
                // const { socket } = socketInfo;
                socketInfo.socket.emit("fetchGithubStats", { github: result.github });
            }
           
            return result;
        } catch (error) {
            console.log(error);
            logger.error(error.message);
        }
    }

    static async FetchFaceBookStats(socialData) {
        try {
            const today = moment().format("LL");
            let result = await socialModel.findOne({
                _id: socialData._id,
                loggedAt: today
            }, {
                facebook: {}
            });
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
            // await Job.FetchFaceBookStats(newData);
            await Job.FetchGitHubStats(newData);
            this.statCache = undefined;
        }

        if (oldData) {
            await Job.FetchYoutubeStats(oldData);
            // await Job.FetchFaceBookStats(oldData);
            await Job.FetchGitHubStats(oldData);
            this.statCache = undefined;
        }
    }
}

module.exports = new Job(undefined, '', '');