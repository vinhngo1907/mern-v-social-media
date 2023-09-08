"use strict";

const { videoService } = require("../services")
class VideoController {
    async getById(req, res, next) {
        try {
            return await videoService.getVideoById(id);
        } catch (error) {
            next(error);
        }
    }
    async getAll(req, res, next) {
        try {
            const videos = await videoService.getAll();
            return res.json(videos);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = VideoController;