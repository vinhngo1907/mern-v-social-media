'use strict';
const authRouter = require("./auth.routing");
const userRouter = require("./user.routing");
const postRouter = require("./post.routing");
const uploadRouter = require("./upload.routing");
const notifyRouter = require("./notify.routing");
const statisticRouter = require("./statistic.routing");
const commentRouter = require("./comment.routing");
const messageRouter = require("./message.routing");
const conversationRouter = require("./conversation.routing");
const groupRouter = require("./group.routing");
const videoRouter = require("./video.routing");
const roleRouter = require("./role.routing");
const capacityRouter = require("./capacity.routing");

const { BASE_URL } = require("../configs");

function WebRoute(app) {
    app.use(BASE_URL + "/auth", authRouter);
    app.use(BASE_URL + "/user", userRouter);
    app.use(BASE_URL + "/post", postRouter);
    app.use(BASE_URL + "/upload", uploadRouter);
    app.use(BASE_URL + "/notify", notifyRouter);
    app.use(BASE_URL + "/statistic", statisticRouter);
    app.use(BASE_URL + "/comment", commentRouter);
    app.use(BASE_URL + "/message", messageRouter);
    app.use(BASE_URL + "/conversation", conversationRouter);
    app.use(BASE_URL + "/group", groupRouter);
    app.use(BASE_URL + "/video", videoRouter);
    app.use(BASE_URL + "/role", roleRouter),
    app.use(BASE_URL +"/capacity", capacityRouter);
}

module.exports = WebRoute;