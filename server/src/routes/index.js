const authRouter = require("./auth.routing");
const userRouter = require("./user.routing");
const postRouter = require("./post.routing");
const { BASE_URL } = require("../configs");

function WebRoute(app) {
    app.use(BASE_URL + "/auth", authRouter);
    app.use(BASE_URL + "/auth", userRouter);
    app.use(BASE_URL + "/auth", postRouter);
}

module.exports = WebRoute;