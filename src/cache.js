const cacheManager = require("cache-manager");

/* Creating a cache object that will store data in memory for 1 hour. */
const memoryCache = cacheManager.caching({
    store: "memory",
    ttl: 60 * 60, // 1 hour
});

module.exports = memoryCache;
