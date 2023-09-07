"use strict"
const { responseDTO, validation, Queue } = require("../utils");
const { modelSchema } = require("../db");
const { userModel, postModel } = modelSchema;
const moment = require("moment-timezone");
const videoQueue = new Queue();

let seniorSongs = [];
let juniorSongs = [];
let otherSongs = [];
let songsForQueue = [];
let playingVideo = null;
let currentVideoStartedTime = null;
// import io from '../../index.js';

const videoController = {
    getVideoById: async (id)=> {
        try {
            return await postModel.findById(id);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = videoController;