const fs = require("fs");
const cloudinary = require('cloudinary');
const { CLOUD_NAME, API_KEY, API_SECRET } = require("../configs");
const { responseDTO } = require("../utils");

cloudinary.config({
    cloud_name: `${CLOUD_NAME}`,
    api_key: `${API_KEY}`,
    api_secret: `${API_SECRET}`

});

class UploadController {
    post(req, res) {
        try {
            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).json(responseDTO.badRequest('No files were uploaded.'));
            }
            const { file } = req.files;
            if (file.size > 1024 * 1024) {
                removeTmp(file.tempFilePath)
                return res.status(400).json(responseDTO.badRequest('The large file size is 1mb.'));
            }

            if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png' && file.mimetype !== "image/jpg") {
                removeTmp(file.tempFilePath)
                return res.status(400).json(responseDTO.badRequest('The file format is incorrect.'))
            }

            cloudinary.v2.uploader.upload(file.tempFilePath, { folder: "v-media" }, async (err, result) => {
                if (err) {
                    console.log(err);
                    throw err;
                }
                removeTmp(file.tempFilePath);
                res.json(responseDTO.success("Added image in successfully", { public_id: result.public_id, url: result.secure_url }))
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    delete(req, res) {
        try {
            const { public_id } = req.body;
            if (!public_id) res.status(400).json(responseDTO.badRequest('No images Selected'));

            cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
                if (err) return res.status(400).json(responseDTO.badRequest('No images Selected'));
                res.json(responseDTO.success("Deleted Image in successfully"))
            })
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