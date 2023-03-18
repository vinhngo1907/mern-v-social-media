const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const WebRoute = require('./routes');

module.exports = async (app) => {
    app.use(express.json());
    app.use(cors({
        origin: "*"
    }));
    app.use(cookieParser());
    app.use(express.static(__dirname + '/public'))

    //api
    WebRoute(app);
    
    // error handling
    // errorHandler(app);
}