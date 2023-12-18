import * as cacheManager from "cache-manager";
// import * as redisStore from "cache-manager-redis-store";

/*
const redisCache = cacheManager.caching({
    store: redisStore,
    host: process.env.REDIS_HOST as string,
    port: parseInt(process.env.REDIS_PORT as string, 10),
    auth_pass: process.env.REDIS_PASS as string,
    db: 0,
    ttl: 60 * 60, // 1 hour
});
*/

const memoryCache = cacheManager.caching({
	store: "memory",
	ttl: 60 * 60, // 1 hour
});

export { memoryCache };
