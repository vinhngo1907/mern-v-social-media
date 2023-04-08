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

        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }

    delete(req, res) {
        try {

        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }
}

module.exports = UploadController;