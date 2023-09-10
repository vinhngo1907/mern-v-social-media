"use strict"
const Queue = require("../utils/queue");

const { modelSchema } = require("../db");
const { userModel, videoModel } = modelSchema;
const moment = require("moment-timezone");
const io = require("../app");
const videoQueue = new Queue();

let seniorSongs = [];
let juniorSongs = [];
let otherSongs = [];
let songsForQueue = [];
let playingVideo = null;
let currentVideoStartedTime = null;

exports.getVideoById = async (id) => {
    try {
        return await videoModel.findById(id);
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

exports.createVideo = async (videoData, author) => {
    try {
        const newVideo = new videoModel({
            ...videoData,
            user: author._id,
        });
        await newVideo.save();
        otherSongs.push({
            ...newVideo._doc,
            user: {
                _id: user._id,
                username: author.username
            }
        });
        io.emit('other-tracks-update', otherSongs);
    } catch (error) {
        throw error;
    }
}

exports.deleteVideo = async (id) => {
    try {
        videoQueue.deleteVideo(id);
        io.emit('new-video-added', {});
        return await videoModel.findByIdAndDelete(id);
    } catch (error) {
        throw error;
    }
}

exports.initPlaylist = async () => {
    const videos = await videoModel.find().populate('user', 'username');
    const sortVideos = await videos.sort((a, b) => {
        const firstElementInteractions = a.likes.length = a.dislikes.length;
        const secondElementInteractions = b.likes.length - b.dislikes.length;

        if (firstElementInteractions > secondElementInteractions) return -1;
        if (firstElementInteractions < secondElementInteractions) return 1;
        return 0;
    });
    seniorSongs = sortVideos.slice(0, 40);
    io.emit('senior-tracks-update', seniorSongs);
    juniorSongs = sortVideos.slice(40, 100);
    io.emit('junior-tracks-update', juniorSongs);
    otherSongs = sortVideos.slice(100);
    io.emit('other-tracks-update', otherSongs);

    songsForQueue = [];
    if (juniorSongs.length > 0) {
        const fiveRandomJuniorSongs = shuffleVideos(juniorSongs).slice(0, 10);
        songsForQueue.push(...fiveRandomJuniorSongs);
    }
    songsForQueue.push(...seniorSongs);
    songsForQueue = shuffleVideos(songsForQueue);

    for (const video of songsForQueue) {
        videoQueue.enqueue(video);
    }

    io.emit('update-tracks', songsForQueue);
    return songsForQueue;
}

function shuffleVideos(videos) {
    return videos.sort(() => Math.random() - 0.5);
}

exports.getPlayingVideo = async () => {
    const playedTime = moment().diff(currentVideoStartedTime, 'seconds');
    return { playedTime, playedTime }
}

exports.getTracksInQueue = async () => {
    return songsForQueue;
}