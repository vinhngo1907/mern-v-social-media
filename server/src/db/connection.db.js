const mongoose = require("mongoose");
const { DB_URL } = require("../configs");

module.exports = async () => {
    try {
        await mongoose.connect(DB_URL, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log("MongoDB Connected!");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}