const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StatisticSchema = new Schema({
    viewCount: { type: Number, default: 0 },
    visitCount: { type: Number, default: 0 },
    loggedAt: {
        type: Date,
        default: new Date(),
    }
});

module.exports = mongoose.model("statistic", StatisticSchema)