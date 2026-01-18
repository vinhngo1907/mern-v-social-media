import axios from "axios";
import { postDataAPI } from "../apis/FetchData";

export const checkImage = (file) => {
    let err = "";
    if (!file) return err = "File does not exist";

    if (file.size > 1024 * 1024)
        err = "The large image size is 1mb."

    if (file.type !== 'image/jpeg' && file.type !== 'image/png')
        err = "Image format is incorrect.";

    return err;
}

export const uploadSingleImage = async (image, token, postData = null) => {
    const formData = new FormData();

    if (image.camera) {
        formData.append("file", image.camera);
    } else {
        formData.append("file", image);
    }

    // Add additional data for video (title)
    if (postData) {
        for (const key in postData) {
            formData.append(key, postData[key]);
        }
    }

    const res = await axios.post('/api/upload/create', formData, {
        withCredentials: true,
        headers: {
            'content-type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
        }
    });

    const data = res.data.results;
    return { public_id: data.public_id, url: data.url };
};

export const imageUpload = async (images, token, post = null) => {
    const uploadPromises = images.map((item) => uploadSingleImage(item, token, post));
    const imgArr = await Promise.all(uploadPromises);

    return imgArr;
};

export const imageDestroy = async (img, token) => {
    const res = await postDataAPI('upload/destroy', { public_id: img.public_id }, token);
    return res.data;
}