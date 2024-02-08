const fs = require("fs");
const cloudinary = require('cloudinary');
const { CLOUD_NAME, API_KEY, API_SECRET } = require("../configs");
const { responseDTO } = require("../utils");
const { createVideo } = require("../services/video.service");

cloudinary.config({
    cloud_name: `${CLOUD_NAME}`,
    api_key: `${API_KEY}`,
    api_secret: `${API_SECRET}`

});

// Transformation to generate a thumbnail
const thumbnailTransformation = {
    width: 100, // Adjust the width as needed
    height: 100, // Adjust the height as needed
    crop: 'fill', // Crop method (fill, scale, etc.)
    gravity: 'auto',
    format: 'jpg',
    secure: true
};

let allImages = [];
class UploadController {
    post(req, res) {
        try {
            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).json(responseDTO.badRequest('No files were uploaded.'));
            }
            const { file } = req.files;
            if (file.size > 5 * 1024 * 1024) {
                removeTmp(file.tempFilePath)
                return res.status(400).json(responseDTO.badRequest('The large file size is 1mb.'));
            }

            if (
                file.mimetype !== 'image/jpeg' &&
                file.mimetype !== 'image/png' &&
                file.mimetype !== "image/jpg" &&
                file.mimetype !== "video/mp4"
            ) {
                removeTmp(file.tempFilePath)
                return res.status(400).json(responseDTO.badRequest('The file format is incorrect.'))
            }

            let resource_type = 'auto';
            if (file.mimetype.startsWith('image/')) {
                resource_type = 'image';
            } else if (file.mimetype.startsWith('video/')) {
                resource_type = 'video';
            }

            cloudinary.v2.uploader.upload(file.tempFilePath, {
                folder: "v-media", resource_type: resource_type, allowed_formats: ['jpeg', 'jpg', 'png', 'mp4'],
            }, async (err, result) => {
                try {
                    if (err) {
                        console.log(err);
                        throw err;
                    }

                    if (result.resource_type === "video") {
                        const { secure_url, public_id } = result;
                        const videoData = {
                            videoId: public_id,
                            videoUrl: secure_url,
                            // user: req.user._id,
                            title: req.body.title || file.name.split(".")[0] || "sample",
                            duration: result?.duration || 0,
                            thumbnailUrl: secure_url.replace(/\.mp4$/, '.jpg')
                            //  cloudinary.v2
                            // .url(public_id, {
                            //     width: 100, 
                            //     height: 100,
                            //     crop: 'fill',
                            //     format:'jpg'
                            // })
                        }
                        console.log(">>>>>", req.io);
                        await createVideo(videoData, req.user, req);
                    }
                    removeTmp(file.tempFilePath);
                    res.json(responseDTO.success("Added image in successfully", { public_id: result.public_id, url: result.secure_url }));
                } catch (error) {
                    console.error(error);
                    res.status(500).json(responseDTO.serverError(error.message));
                }
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    delete(req, res) {
        try {
            const { public_id } = req.body;
            if (!public_id) return res.status(400).json(responseDTO.badRequest('No images Selected'));

            cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
                if (err) return res.status(400).json(responseDTO.badRequest(err.message));
                console.log({ result })
                res.json(responseDTO.success("Deleted Image in successfully", result));
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    getImages(req, res) {
        try {
            const num = Number(req.query.num) || 9;
            let nextPageCursor = req.query.next_cursor || null;
            cloudinary.v2.api.resources({
                type: "upload",
                prefix: "v-media",
                max_results: num,
                next_cursor: nextPageCursor,
            }, function (err, result) {
                if (err) return res.status(400).json(responseDTO.badRequest('No images Selected'));

                result.resources.forEach(item => {
                    if (!allImages.some((existingItem) => existingItem.public_id === item.public_id)) {
                        allImages.push(item);
                    }
                });

                res.json(responseDTO.success("Get data in successfully", {
                    medias: allImages,
                    result: allImages.length,
                    nextPageCursor: result.next_cursor
                }));
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    getVideos(req, res) {
        try {
            const num = Number(req.query.num) || 9;
            let nextPageCursor = req.query.next_cursor || null;
            cloudinary.v2.api.resources({
                type: "upload",
                prefix: "samples",
                max_results: num,
                resource_type: "video",
                next_cursor: nextPageCursor,
            }, function (err, result) {
                if (err) return res.status(400).json(responseDTO.badRequest('No videos Selected'));

                result.resources.forEach(item => {
                    if (!allImages.some((existingItem) => existingItem.public_id === item.public_id)) {
                        allImages.push(item);
                    }
                });

                res.json(responseDTO.success("Get data in successfully", {
                    medias: allImages,
                    result: allImages.length,
                    nextPageCursor: result.next_cursor
                }));
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }
}

const removeTmp = (path) => {
    fs.unlink(path, err => {
        if (err) throw err;
    })
}

module.exports = UploadController;