'use strict';
const authRouter = require("./auth.routing");
const userRouter = require("./user.routing");
const postRouter = require("./post.routing");
const uploadRouter = require("./upload.routing");

const { BASE_URL } = require("../configs");

function WebRoute(app) {
    app.use(BASE_URL + "/auth", authRouter);
    app.use(BASE_URL + "/user", userRouter);
    app.use(BASE_URL + "/post", postRouter);
    app.use(BASE_URL + "/upload", uploadRouter);
}

module.exports = WebRoute;