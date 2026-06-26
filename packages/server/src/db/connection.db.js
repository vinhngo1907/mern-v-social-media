const logger = require("node-color-log");
const dns = require("dns");
const mongoose = require("mongoose");
const { DB_URL } = require("../configs");
// Promise = global.Promise;

// use it for node version >= 20
dns.setServers(['8.8.8.8', '8.8.4.4']);

dns.resolveSrv(
  "_mongodb._tcp.cluster0.ipawymr.mongodb.net",
  (err, records) => {
    if(err) console.log("ERR:", err);
    // console.log("RECORDS:", records);
  }
);

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