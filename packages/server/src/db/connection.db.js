const mongoose = require("mongoose");
const { DB_URL } = require("../configs");

Promise = global.Promise;

const mongoConfig = {
    // useCreateIndex: true,
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false
    serverSelectionTimeoutMS: 5000,
    maxPoolSize: 10,
};

module.exports = async () => {
    try {
        await mongoose.connect(DB_URL, mongoConfig);
        console.log("MongoDB Connected!");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}