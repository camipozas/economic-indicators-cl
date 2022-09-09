const cacheManager = require("cache-manager");
const redisStore = require("cache-manager-redis-store");

const redisCache = cacheManager.caching({
    store: redisStore,
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    auth_pass: process.env.REDIS_PASS,
    db: 0,
    ttl: 60 * 60, // 1 hour
});

module.exports = redisCache;
