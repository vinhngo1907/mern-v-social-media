const logger = require("node-color-log");

const mongoose = require("mongoose");
const { DB_URL } = require("../configs");
// Promise = global.Promise;

mongoose.set('strictQuery', false);

const mongoConfig = {
    serverSelectionTimeoutMS: 5000,
    maxPoolSize: 10,
};

module.exports = async () => {
    try {
        await mongoose.connect(DB_URL, mongoConfig);
        // console.log("MongoDB Connected!");
        logger.bgColorLog('blue', 'MongoDB connected!')
    } catch (error) {
        // console.log(error);
        logger.error(error);
        process.exit(1);
    }
}