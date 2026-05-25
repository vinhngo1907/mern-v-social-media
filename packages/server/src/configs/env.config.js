const dotEnv = require("dotenv");
dotEnv.config();

function getEnv(key) {
    return process.env[key];
}

exports.getEnv = getEnv;

function getMongoUrl() {
    const MONGO_DB_URL = getEnv('MONGODB_URI');
    if (!MONGO_DB_URL) {
        throw new Error(`Mongo db url is undefined.`);
    }
    return MONGO_DB_URL;
}

exports.MongoDbUrl = getMongoUrl();

function getGithubUrl() {
    const GITHUB_API_URL = getEnv('GITHUB_API_URL');
    if (!GITHUB_API_URL) {
        throw new Error(`Github api url is undefined.`);
    }
    return GITHUB_API_URL;
}

exports.GITHUB_API_URL = getGithubUrl();

function getYoutubeConfig() {
    const API_KEY = getEnv('YOUTUBE_API_KEY');
    const YOUTUBE_CHANNEL_ID = getEnv('YOUTUBE_CHANNEL_ID')
    // const MESSAGE_API_URL = getEnv('MESSAGE_API_URL')
    const YOUTUBE_API_URL = getEnv('YOUTUBE_API_URL')

    if (!API_KEY || !YOUTUBE_CHANNEL_ID
        // || !MESSAGE_API_URL 
        || !YOUTUBE_API_URL) {
        throw new Error(`Some of youtube env var are missing, please check \n
        ApiKey: ${API_KEY}\n
        ChannelId: ${YOUTUBE_CHANNEL_ID}\n
        YoutubeApiUrl: ${YOUTUBE_API_URL}`);
    }

    return {
        API_KEY,
        YOUTUBE_CHANNEL_ID,
        // MESSAGE_API_URL,
        SEARCH_API_URL: `${YOUTUBE_API_URL}/search`,
        VIDEO_API_URL: `${YOUTUBE_API_URL}/videos`,
        CHANNEL_API_URL: `${YOUTUBE_API_URL}/channels`
    }
}

exports.YoutubeConfig = getYoutubeConfig();

function isProduction() {
    const IS_PRODUCTION = getEnv("NODE_ENV") === "production";
    return IS_PRODUCTION;
}

exports.IsProduction = isProduction();

function getClientUrl() {
    const isProd = isProduction();
    return isProd === false ? getEnv("CLIENT_URL")
        : "https://v-social-media.netlify.app";
}

exports.GetClientUrl = getClientUrl();

function getClientUrls() {
    const isProd = isProduction();

    if (isProd) {
        return ["https://v-social-media.netlify.app"];
    }

    const keys = ["CLIENT_URL", "APP_URL"];

    const result = keys
        .map(k => getEnv(k))
        .filter(Boolean)
        .flatMap(v => v.split(",").map(u => u.trim()));

    return result;
}

exports.clientUrls = getClientUrls();

function getFirebaseConfig() {
    const API_KEY = getEnv('API_KEY');
    const AUTH_DOMAIN = getEnv('AUTH_DOMAIN');
    const DATABASE_URL = getEnv('DATABASE_URL');
    const PROJECT_ID = getEnv('PROJECT_ID');
    const STORAGE_BUCKET = getEnv('STORAGE_BUCKET');
    const MESSAGING_SENDER_ID = getEnv('MESSAGING_SENDER_ID');
    const APP_ID = getEnv('APP_ID');
    const MEASUREMENT_ID = getEnv('MEASUREMENT_ID');

    if (
        !API_KEY ||
        !AUTH_DOMAIN ||
        !PROJECT_ID ||
        !STORAGE_BUCKET ||
        !MESSAGING_SENDER_ID ||
        !APP_ID
    ) {
        throw new Error(`Some Firebase env vars are missing:
    API_KEY: ${API_KEY}
    AUTH_DOMAIN: ${AUTH_DOMAIN}
    PROJECT_ID: ${PROJECT_ID}
    STORAGE_BUCKET: ${STORAGE_BUCKET}
    MESSAGING_SENDER_ID: ${MESSAGING_SENDER_ID}
    APP_ID: ${APP_ID}
    `);
    }

    return {
        apiKey: API_KEY,
        authDomain: AUTH_DOMAIN,
        databaseURL: DATABASE_URL,
        projectId: PROJECT_ID,
        storageBucket: STORAGE_BUCKET,
        messagingSenderId: MESSAGING_SENDER_ID,
        appId: APP_ID,
        measurementId: MEASUREMENT_ID,
    };
}

exports.firebaseConfig = getFirebaseConfig();