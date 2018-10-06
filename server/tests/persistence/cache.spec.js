const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');
const cache = require('../../db/cache');

const testGroup = 'thingies';
const uniqueKeyField = 'id';
const testObjs = [
    {
        id: 2053,
        name: "blurg"
    },
    {
        id: 8434,
        name: 'bleh'
    },
    {
        id: 483,
        name: 'bleck'
    },
    {
        id: 623,
        name: 'blip'
    }
];

function clearCache() {
    cache.conn.del(testGroup);
    for(let obj of testObjs) {
        cache.conn.del(`${testGroup}_${obj.id}`);
    }
}

describe('Cache', () => {

    beforeEach(function() {
        clearCache();
    });

    after(function() {
        clearCache();
        cache.conn.quit();
    });

    describe('getSingleFromCache', () => {

        it('should return null if no key exists', async () => {
            const result = await cache.getSingleFromCache(testGroup, testObjs[0].id);
            assert.equal(result, null);
        });

        it('should return the object associate with the keys', async () => {
            await cache.putInCache(testGroup, uniqueKeyField, testObjs[0]);
            const result = await cache.getSingleFromCache(testGroup, testObjs[0].id);
            assert.isObject(result);
            assert.deepEqual(result,testObjs[0]);
        });
    });

    describe('putInCache', () => {

        beforeEach(function() {
            clearCache();
        });

        it('should return an array of [ok, 1] if no key already exists', async () => {
            const results = await cache.putInCache(testGroup, uniqueKeyField, testObjs[0]);
            assert.isArray(results);
            assert.equal(results[0],'OK');
            assert.equal(results[1], 1);
        });

        it('should return an array of \'OK\'s and 1\'s', async () => {
            const results = await cache.putInCache(testGroup, uniqueKeyField, testObjs);
            assert.isArray(results);
            assert.equal(results.length, 8);
        });
    });

    describe('getGroupFromCache', () => {

        it('should return an empty array if no objects exist', async () => {
            const result = await cache.getGroupFromCache(testGroup);
            assert.isArray(result);
            assert.equal(result.length, 0);
        });

        it('should return an array of objects', async () => {
            await cache.putInCache(testGroup, uniqueKeyField, testObjs);
            const results = await cache.getGroupFromCache(testGroup);
            assert.isArray(results);
            assert.equal(results.length, testObjs.length);
            assert.deepInclude(results,testObjs[0]);
        });
    });

    describe('invalidateGroupInCache', () => {

        it('should remove the passed set from the cache', async () => {
            await cache.putInCache(testGroup, uniqueKeyField, testObjs);
            await cache.invalidateGroupInCache(testGroup);
            const results = await cache.getGroupFromCache(testGroup);
            assert.isArray(results);
            assert.equal(results.length, 0);
        });
    });

    describe('invalidateSingleInCache', () => {

        it('should remove the cached object', async () => {
            await cache.putInCache(testGroup, uniqueKeyField, testObjs[0]);
            const result = await cache.getSingleFromCache(testGroup, uniqueKeyField);
            assert.equal(result, null);
        });
    });
});