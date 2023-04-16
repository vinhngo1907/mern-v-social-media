export const checkImage = (file) => {
    let err = "";
    if (!file) return err = "File does not exist";

    if (file.size > 1024 * 1024)
        err = "The large image size is 1mb."

    if (file.type !== 'image/jpeg' && file.type !== 'image/png')
        err = "Image format is incorrect.";

    return err;
}

export const imageUpload = async (images) => {
    let imgArr = [];
    for (const img of images) {
        const formData = new FormData()
        if (img.camera) {
            formData.append("file", item.camera)
        } else {
            formData.append("file", item)

        }
    }
}