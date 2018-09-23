const chai = require('chai');
const assert = chai.assert;
const db = require('../../db');
const MovieGenre = require('../../models/MovieGenre');
const Movie = require('../../models/Movie');
const Genre = require('../../models/Genre');

describe('MovieGenre Data Model', () => {
    afterEach( async ()=> {
        await db.raw(`TRUNCATE ${MovieGenre.TABLE} RESTART IDENTITY CASCADE`);
        await db.raw(`TRUNCATE ${Movie.TABLE} RESTART IDENTITY CASCADE`); 
        await db.raw(`TRUNCATE ${Genre.TABLE} RESTART IDENTITY CASCADE`); 
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
        it('should create genre entry for a movie', async () => {
            const newMovie = await Movie.add("Dracula",8.3,new Date(),"20323432");
            const newGenre = await Genre.add("Comedy",8234);
            await MovieGenre.add( newMovie[0], newGenre[0]);
            const results = await MovieGenre.findByMovieId(newMovie[0]);
            assert.isArray(results);
            assert.equal(results.length, 1);
        });
    });
});