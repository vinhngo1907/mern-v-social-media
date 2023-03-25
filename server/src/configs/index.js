const dotEnv = require("dotenv");

if (process.env.NODE_ENV !== "prod") {
    const configFile = `./.env.${process.env.NODE_ENV}`;
    dotEnv.config({ path: configFile });
} else {
    dotEnv.config();
}

module.exports = {
    BASE_URL: "/api",
    PORT: process.env.PORT,
    DB_URL: process.env.MONGODB_URI,
    ACCESS_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_SECRET: process.env.REFRESH_TOKEN_SECRET,
    ACTIVE_SECRET: process.env.ACTIVE_TOKEN_SECRET,
    CLIENT_ID: process.env.MAIL_CLIENT_ID,
    CLIENT_SECRET: process.env.MAIL_CLIENT_SECRET,
    REFRESH_TOKEN: process.env.MAIL_REFRESH_TOKEN,
    SENDER_MAIL: process.env.SENDER_EMAIL_ADDRESS,
    RF_PATH: process.env.RF_PATH,
    OAUTH_PLAYGROUND: process.env.OAUTH_PLAYGROUND,
    CLIENT_URL: process.env.CLIENT_URL
};