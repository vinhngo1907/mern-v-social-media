const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StatisticSchema = new Schema({
    viewCount: { type: Number, default: 0 },
    visitCount: { type: Number, default: 0 },
    loggedAt: {
        type: Date,
        default: new Date(),
    },
    user: { type: Schema.Types.ObjectId, ref: "user" },
    clients: [{ type: Schema.Types.ObjectId, ref: "user" }]
}, { versionKey: false });

module.exports = mongoose.model("statistic", StatisticSchema)