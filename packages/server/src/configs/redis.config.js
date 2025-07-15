const { createClient } = require('redis');
const { REDIS_URL } = require("./index");

const redisClient = createClient({
    url: REDIS_URL || 'redis://localhost:6379',
});

redisClient.on('connect', () => {
    console.log('🟢 Redis connected successfully');
});

redisClient.on('error', (err) => {
    console.error('🔴 Redis connection error:', err);
});

(async () => {
    try {
        await redisClient.connect();
    } catch (err) {
        console.error('🔴 Redis connect() failed:', err);
    }
})();

module.exports = redisClient;