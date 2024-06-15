const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const settingSchema = new Schema({
    // gg_api_key: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    priority_mode: {
        type: String,
        enum: ['right-away-continue', 'right-away-skip'],
        required: true
    },
    // server_socket: {
    //     type: String,
    //     required: true
    // },
    // allow_create_exist_playlist: {
    //     type: String,
    //     enum: ['allow', 'not_allow']
    // },
    secret_key: {
        type: String,
        required: false // adjust this as needed
    }
}, {
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model("setting", settingSchema);