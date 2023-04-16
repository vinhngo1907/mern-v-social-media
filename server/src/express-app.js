const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const fileUpload = require('express-fileupload');
const helmet = require("helmet")
const WebRoute = require('./routes');

module.exports = async (app) => {
    app.use(express.json());
    app.use(cors({
        origin: "*"
    }));
    app.use(cookieParser());
    app.use(express.static(__dirname + '/public'))
    app.use(fileUpload({
        useTempFiles: true
    }));
    app.use(helmet());
    //api
    WebRoute(app);
    
    // error handling
    // errorHandler(app);
}