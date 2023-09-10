"use strict";

const { videoService } = require("../services");
const { responseDTO, validation } = require("../utils");
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

}

module.exports = VideoController;