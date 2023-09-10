"use strict";

const { videoService } = require("../services");
const { responseDTO } = require("../utils");
class VideoController {
    async getById(req, res, next) {
        try {
            const id = req.params.id;
            const video = await videoService.getVideoById(id);
            return res.json(responseDTO.success("Get video in successfully", video));

        } catch (error) {
            next(error);
        }
    }

    async getAll(req, res, next) {
        try {
            const videos = await videoService.getAll();
            await videoService.getVideoById(req.params.id);
            return res.json(responseDTO.success("Get videos in successfully", videos));
        } catch (error) {
            next(error);
        }
    }

    async createVideo(req, res, next) {
        try {
            const video = await videoService.createVideo(req.body, req.user);
            return res.json(responseDTO.success("Created video in successfully", video));
        } catch (error) {
            next(error);
        }
    }

    async deleteVideo(req, res, next) {
        try {
            const { email } = req.user;
            if (email !== 'vinhngotrung1999@outlook.com' && email !== 'admin@vdev.com') {
                return res.status(401).json(responseDTO.unauthorization("You don't have permission!!!"));
            }
            const videoId = req.params.id;
            const videoDeleted = await videoService.deleteVideo(videoId);
            if (!videoDeleted) {
                return res.status(400).json(responseDTO.badRequest("This video doesn't exist"));
            }

            return res.json(responseDTO.success("Deleted video in successfully", videoDeleted));
        } catch (error) {

        }
    }
}

module.exports = VideoController;