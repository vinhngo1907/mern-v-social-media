// const io = require("../app");
const Queue = require("../utils/queue");

const { modelSchema } = require("../db");
const { videoModel } = modelSchema;
const moment = require("moment-timezone");
const logger = require("node-color-log");

const videoQueue = new Queue();
let seniorSongs = [];
let juniorSongs = [];
let otherSongs = [];
let songsForQueue = [];
let playingVideo = null;
let currentVideoStartedTime = null;

function startVideoScheduler(io) {
    setInterval(async () => {
        try {
            const playedTime = moment().diff(currentVideoStartedTime, 'seconds');
            if (playingVideo && (playedTime > playingVideo.duration) && videoQueue.size() === 0) {
                playingVideo = null;
            }

            if ((playingVideo === null || (playedTime > playingVideo?.duration)) && videoQueue.size() > 0) {
                logger.warn('Dequeue video to playing video');

                playingVideo = videoQueue.dequeue();
                currentVideoStartedTime = moment();
                // console.log({playingVideo});
                io.emit('playingVideo', {
                    playingVideo,
                    playedTime: 0
                });
            }

            if (videoQueue.size() === 0) {
                logger.info('Playlist is empty, init new');
                await initPlaylist(io);
            }
        } catch (error) {
            console.log(error);
            logger.error(error.message);
        }

    }, 2000);
}

exports.startVideoScheduler = startVideoScheduler;

exports.getVideoById = async (id) => {
    try {
        return await videoModel.findById(id);
    } catch (error) {
        throw error;
    }
}

exports.getAll = async () => {
    try {
        return {
            tracks: songsForQueue,
            result: songsForQueue.length
        };
    } catch (error) {
        throw error;
    }
}

exports.getSenior = () => {
    try {
        return {
            tracks: seniorSongs,
            result: seniorSongs.length
        };
    } catch (error) {
        throw error;
    }
}

exports.getJunior = () => {
    try {
        return {
            tracks: juniorSongs,
            result: juniorSongs.length
        }
    } catch (error) {
        throw error;
    }
}

exports.getOther = () => {
    try {
        return {
            tracks: otherSongs,
            result: otherSongs.length
        };
    } catch (error) {
        throw error;
    }
}

exports.createVideo = async (videoData, author, req) => {
    try {
        const newVideo = new videoModel({
            ...videoData,
            user: author._id,
        });

        await newVideo.save();

        otherSongs.push({
            ...newVideo._doc,
            user: {
                _id: author._id,
                username: author.username
            }
        });
        
        logger.info('Other tracks update');
        
        if(req?.io) {
            req.io.emit('other-tracks-update', {
                tracks: otherSongs,
                result: otherSongs.length
            });
        }

        return newVideo;
    } catch (error) {
        logger.error(error.message);
        throw error;
    }
}

exports.deleteVideo = async (id) => {
    try {
        videoQueue.deleteVideo(id);
        io.emit('new-video-added', {});
        return await videoModel.findByIdAndDelete(id);
    } catch (error) {
        logger.error(error.message);
        throw error;
    }
}

const initPlaylist = async (io) => {
    const videos = await videoModel.find().populate('user', 'username');
    // console.log({videos})
    const sortedVideos = [...videos].sort((a, b) => {
        const firstElementInteractions = a.likes.length - a.dislikes.length;
        const secondElementInteractions = b.likes.length - b.dislikes.length;

        if (firstElementInteractions > secondElementInteractions) return -1;
        if (firstElementInteractions < secondElementInteractions) return 1;
        return 0;
    });

    // console.log({sortedVideos})

    seniorSongs = sortedVideos.slice(0, 40);
    // console.log({seniorSongs});
    io.emit('senior-tracks-update', seniorSongs);
    
    juniorSongs = sortedVideos.slice(40, 100);
    io.emit('junior-tracks-update', juniorSongs);
    
    otherSongs = sortedVideos.slice(100);
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

    io.emit('update-tracks', { tracks: songsForQueue, result: songsForQueue.length });
    return songsForQueue;
}

function shuffleVideos(videos) {
    return videos.sort(() => Math.random() - 0.5);
}

exports.getPlayingVideo = async () => {
    const playedTime = moment().diff(currentVideoStartedTime, 'seconds');
    return { playingVideo, playedTime }
}

exports.getTracksInQueue = async () => {
    return {
        tracks: songsForQueue,
        result: songsForQueue.length
    };
}