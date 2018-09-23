const chai = require('chai');
const assert = chai.assert;
const db = require('../../db');
const Genre = require('../../models/Genre');

describe('Genre Data Model', () => {
    afterEach( async ()=> {
        await db.raw(`TRUNCATE ${Genre.TABLE} RESTART IDENTITY CASCADE`);
    });

    describe('add', () => {
        it('should create genre', async () => {
            const results = await Genre.add("Comedy",8234);
            assert.isArray(results);
            assert.equal(results.length, 1);
        });

        it('should throw an error if duplicate TMDB id is used', async () => {
            await Genre.add("Comedy",8234);
            let error;
            try {
                await Genre.add("Comedy",8234);
            } catch(e) {
                error = e;
            }
            assert.isDefined(error);
        });
    });

    describe('all', () => {
        it('should return all genres', async () => {
            await Genre.add("Comedy", 9327);
            await Genre.add("Drama", 8234);
            await Genre.add("Action", 9534);
            await Genre.add("Romance", 34);
            const results = await Genre.all();
            assert.isArray(results);
            assert.equal(results.length, 4);
        });
    });

    describe('findByTMDBId', () => {
        it('should return a genre by it\'s TMDB id', async () => {
            await Genre.add("Comedy",8234);
            const results = await Genre.findByTMDBId(8234);
            assert.isArray(results);
            assert.equal(results.length, 1);
        });
    });

    describe('update', () => {
        it('should change the TMDB id of an existing genre', async () => {
            await Genre.add("Comedy",8234);
            await Genre.update("Comedy", 8444);
            const results = await Genre.findByTMDBId(8444);
            assert.isArray(results);
            assert.equal(results.length, 1);
        });
    });
});