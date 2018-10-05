const redis = require("redis");
const client = redis.createClient();
const logger = require("../config/logger");
const { promisify } = require('util');
const cacheGetAsPromise = promisify(client.get).bind(client);
const cacheSetWithExpirationAsPromise = promisify(client.setex).bind(client);

client.on("error", function(err) {
    logger.error(`Redis Cache encountered an error: ${err}`);
});

function cacheMiddleware(expireTime, key) {
    return (req, res, next) => {
        const cachedResponse= client.get(key);
        if(cachedResponse) {
            res.send(cachedResponse);
            return;
        } else {
            res.sendResponse = res.send;
            res.send = (body) => {
                client.setex(body, expireTime, key);
                res.sendResponse(body);
            };
            next();
        }
    }
}

function putInCacheWithExpiration(key, expiration, body) {
    return cacheSetWithExpirationAsPromise(key, expiration, body);
}

function getFromCache(key) {
    return cacheGetAsPromise(key);
}

const Cache = {
    cacheMiddleware,
    putInCacheWithExpiration,
    getFromCache
};

module.exports = Cache;