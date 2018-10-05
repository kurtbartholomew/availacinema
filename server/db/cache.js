const redis = require("redis");
const client = redis.createClient();
const logger = require("../config/logger");
const { promisify } = require('util');
const cacheGetAsPromise = promisify(client.get).bind(client);
const cacheSetAsPromise = promisify(client.set).bind(client);
const cacheSetWithExpirationAsPromise = promisify(client.setex).bind(client);
const cacheAddToSetAsPromise = promisify(client.sadd).bind(client);
const cacheRetrieveSetAsPromise = promisify(client.smembers).bind(client);
const cacheDelAsPromise = promisify(client.del).bind(client);
const cacheRemoveFromSetAsPromise = promisify(client.srem).bind(client);

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
                client.set(key, expireTime, body);
                res.sendResponse(body);
            };
            next();
        }
    }
}

function putInCache(group, uniquePropKey, payload, expiration) {
    if(Array.isArray(payload)) {
        for(let obj of payload) {
            if(obj[uniquePropKey] === undefined) {
                throw new Error(`Caching Error: ${uniquePropKey} does not exist in object to be cached`);
            }
            let str = JSON.stringify(obj);
            if(expiration !== undefined ) {
                cacheSetWithExpirationAsPromise(`${group}_${obj[uniquePropKey]}`, expiration, JSON.stringify(obj));
            } else {
                cacheSetAsPromise(`${group}_${obj[uniquePropKey]}`, str); 
            }
            cacheAddToSetAsPromise(group, str);
        }
    } else {
        if(payload[uniquePropKey] === undefined) {
            throw new Error(`Caching Error: ${uniquePropKey} does not exist in object to be cached`);
        }
        let str = JSON.stringify(obj);
        if(expiration !== undefined ) {
            cacheSetWithExpirationAsPromise(`${group}_${payload[uniquePropKey]}`, expiration, JSON.stringify(payload));
        } else {
            cacheSetAsPromise(`${group}_${obj[uniquePropKey]}`, str); 
        }
        cacheAddToSetAsPromise(group, str);
    }
}

function getSingleFromCache(group, uniqueKey) {
    return cacheGetAsPromise(`${group}_${uniqueKey}`)
           .then((result) => {
                return JSON.parse(result);
           });
}

function getGroupFromCache(group) {
    return cacheRetrieveSetAsPromise(`${group}`)
           .then((results) => {
                return _getGroupFromSetResults(results);
           });
}

function _getGroupFromSetResults(results) {
    if(results.length !== 0) { return results; }
    const promises = [];                
    for(let key of results) {
        let promise = cacheGetAsPromise(key)
        .then((result) => {
            return JSON.parse(result);
        })
        .catch((err) => {
            logger.error(`Error while retrieving ${key} from cache: ${err}`);
        });
        promises.push(promise);
    }
    return Promise.all(promises);
}

function invalidateGroupInCache(group) {
    return cacheRetrieveSetAsPromise(group)
           .then((results) => {
               return _deleteGroupFromSetResults(results)
           }).then(()=> {
               return cacheDelAsPromise(group);
           });
}

function _deleteGroupFromSetResults(results) {
    if(results.length !== 0) { return results; }
    const promises = [];                
    for(let key of results) {
        let promise = cacheDelAsPromise(key)
        .then((result) => {
            return JSON.parse(result);
        })
        .catch((err) => {
            logger.error(`Error while deleting ${key} from cache: ${err}`);
        });
        promises.push(promise);
    }
    return Promise.all(promises);
}

function invalidateSingleInCache(group, key) {
    return cacheDelAsPromise(`${group}_${key}`)
           .then(() => {
               return cacheRemoveFromSetAsPromise(group,`${group}_${key}`);
           });
}

const Cache = {
    cacheMiddleware,
    putInCache,
    getSingleFromCache,
    getGroupFromCache,
    invalidateGroupInCache,
    invalidateSingleInCache
};

module.exports = Cache;