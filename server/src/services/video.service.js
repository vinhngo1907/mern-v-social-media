"use strict"
const Queue = require("../utils/queue");
// const { responseDTO, validation } = require("../utils");
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

exports.getPlayingVideo = async () => {

}

exports.getVideoById = async (id) => {
    try {
        return await postModel.findById({ _id: id });
    } catch (error) {
        throw error;
    }
}

exports.getAll = async () => {
    try {
        return songsForQueue;
    } catch (error) {
        throw error;
    }
}

exports.getSenior = () => {
    try {
        return seniorSongs;
    } catch (error) {
        throw error;
    }
}

exports.getJunior = () => {
    try {
        return juniorSongs;
    } catch (error) {
        throw error;
    }
}

exports.getOther = () => {
    try {
        return otherSongs;
    } catch (error) {
        throw error;
    }
}
