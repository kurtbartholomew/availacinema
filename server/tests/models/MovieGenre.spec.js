const chai = require('chai');
const assert = chai.assert;
const MovieGenre = require('../../models/MovieGenre');
const Movie = require('../../models/Movie');
const Genre = require('../../models/Genre');
const dbUtils = require('../../scripts/dbUtils');

describe('MovieGenre Data Model', () => {
    beforeEach( async ()=> {
        await dbUtils.clearTables(MovieGenre.TABLE, Movie.TABLE, Genre.TABLE);
    });

    beforeEach( async ()=> {
        await dbUtils.clearTables(MovieGenre.TABLE, Movie.TABLE, Genre.TABLE);
    });

    describe('add', () => {
        it('should create genre entry for a movie', async () => {
            const newMovie = await Movie.add("Dracula",8.3,new Date(),"20323432");
            const newGenre = await Genre.add("Comedy",8234);
            const results = await MovieGenre.add(
                newMovie[0],
                newGenre[0]
            );
            assert.isArray(results);
            assert.equal(results.length, 1);
        });
    });

    describe('findByMovieId', () => {
        it('should should find a movie\'s genres by their id', async () => {
            const newMovie = await Movie.add("Dracula",8.3,new Date(),"20323432");
            const newGenre = await Genre.add("Comedy",8234);
            await MovieGenre.add( newMovie[0], newGenre[0]);
            const results = await MovieGenre.findByMovieId(newMovie[0]);
            assert.isArray(results);
            assert.equal(results.length, 1);
        });
    });
});