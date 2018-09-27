const chai = require('chai');
const assert = chai.assert;
const Movie = require('../../models/Movie');
const date = new Date();
const dbUtils = require('../../scripts/dbUtils');

describe('Movie Data Model', () => {
    afterEach( async ()=> {
        await dbUtils.clearTables(Movie.TABLE);
    });

    describe('add', () => {
        it('should create movie', async () => {
            const results = await Movie.add("Dracula",8.3,date,8234);
            assert.isArray(results);
            assert.equal(results.length, 1);
        });

        it('should throw an error if duplicate TMDB id is used', async () => {
            await Movie.add("Dracula",8.3,date,8234);
            let error;
            try {
                await Movie.add("Dracula",8.3,date,8234);
            } catch(e) {
                error = e;
            }
            assert.isDefined(error);
        });
    });

    describe('all', () => {
        it('should return all movies', async () => {
            await Movie.add("Dracula", 8.3, date, 9327);
            await Movie.add("Monkey Bone", 4.5, date, 8234);
            await Movie.add("Last Action Hero", 9.3, date, 9534);
            await Movie.add("Avengers: Infinity War", 3.2, date, 34);
            const results = await Movie.all();
            assert.isArray(results);
            assert.equal(results.length, 4);
        });
    });

    describe('findById', () => {
        it('should return a movie by it\'s id', async () => {
            let results = await Movie.add("Dracula", 8.3,date, 8234);
            results = await Movie.findById(results[0]);
            assert.isArray(results);
            assert.equal(results.length, 1);
        });
    });

    describe('findByTmdbKey', () => {
        it('should return a movie with the associated Tmdb key', async () => {
            await Movie.add("Dracula", 8.3, date, 9327);
            const results = await Movie.findByTmdbKey(9327);
            assert.isArray(results);
            assert.equal(results.length, 1);
            assert.equal(results[0].tmdb_key, 9327);
        });
    })

    // describe.skip('findMatchingUserFilters', () => {
    //     it('should return movies matching user genre and quality filters', async () => {
    //         await Movie.findMatchingUserFilters();
    //     });
    // });
});