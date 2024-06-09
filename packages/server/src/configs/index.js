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
    CLIENT_URL: process.env.CLIENT_URL,
    GG_SECRET: process.env.GOOGLE_SECRET,
    FB_SECRET: process.env.FACEBOOK_SECRET,
    CLOUD_NAME: process.env.CLOUD_NAME,
    API_KEY: process.env.API_KEY,
    API_SECRET: process.env.API_SECRET,

    YOUTUBE_API_URL: process.env.YOUTUBE_API_URL,
    YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
    YOUTUBE_CHANNEL_ID: process.env.YOUTUBE_CHANNEL_ID,

    FACEBOOK_API_URL: process.env.FACEBOOK_API_URL,
    FACEBOOK_PAGE_ID: process.env.FACEBOOK_PAGE_ID,
    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,

    GITHUB_API_URL: process.env.GITHUB_API_URL,
    GITHUB_USER: process.env.GITHUB_USER,

    ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    PHONE_NUMB: process.env.TWILIO_PHONE_NUMBER,
    SERVICE_ID: process.env.TWILIO_SERVICE_ID,
    PHONE_SECRET: process.env.PHONE_SECRET,

    SUPER_ADMIN_SECRET_KEY: process.env.SUPER_ADMIN_SECRET_KEY
};