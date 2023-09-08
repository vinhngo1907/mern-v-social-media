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

exports.getTracksQueue = async () => {
    return songsForQueue;
}