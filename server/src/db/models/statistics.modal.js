const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StatisticSchema = new Schema({
    followerCount: { type: Number, default: 0 },
    viewCount: { type: Number, default: 0 },
    visitCount: { type: Number, default: 0 },
    loggedAt: { type: String }
});

module.exports = mongoose.model("statistic", StatisticSchema)