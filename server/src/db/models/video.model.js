const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VideoSchema = new Schema({
    title: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "user" },
    videoId: { type: String, required: true, unique: true },
    views: { type: Number, required: true, default: 0, min: 0 },
    duration: { type: Number, required: true },
    thumbnailUrl: { type: String, required: true },
    likes: [],
    dislikes: [],
    videoUrl: { type: String, required: true }
}, { versionKey: false, timestamps: true });

module.exports = mongoose.model("video", VideoSchema);