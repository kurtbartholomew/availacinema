const chai = require('chai');
const assert = chai.assert;
const Suggestion = require('../../models/Suggestion');
const User = require('../../models/User');
const Movie = require('../../models/Movie');
const dbUtils = require('../../scripts/dbUtils');

describe('Suggestion Data Model', () => {
    afterEach( async ()=> {
        await dbUtils.clearTables(Suggestion.TABLE, User.TABLE, Movie.TABLE);
    });

    describe('add', () => {
        it('should create suggestion entry for a user', async () => {
            const newUser = await User.add(undefined,undefined,{value:"5555555555",weekly:false,daily:true},undefined);
            const newMovie = await Movie.add("Dracula",8.3,new Date(),520234);
            const results = await Suggestion.add(
                "Dracula",
                8.3,
                newUser[0],
                newMovie[0]
            );
            assert.isArray(results);
            assert.equal(results.length, 1);
        });
    });

    describe('addAll', () => {
        it('should create several suggestions for a user', async () => {
            const newUser = await User.add(undefined,undefined,{value:"5555555555",weekly:false,daily:true},undefined);
            const newMovie = await Movie.add("Dracula", 8.3, new Date(), 520234);
            const newMovieTwo = await Movie.add("All Dogs Go To Heaven", 5.3 , new Date(), 38253);

            let suggestions = [
                {
                    title: "Dracula",
                    rating: 8.3,
                    user_id: newUser[0],
                    movie_id: newMovie[0]
                },
                {
                    title: "All Dogs Go To Heaven",
                    rating: 5.3,
                    user_id: newUser[0],
                    movie_id: newMovieTwo[0]
                }
            ];

            const results = await Suggestion.addAll( suggestions );
            assert.isArray(results);
            assert.equal(results.length, 2);
        });
    });

    describe('findByUserId', () => {
        it('should return the movie suggestions given to a user', async () => {
            const newUser = await User.add(undefined,undefined,{value:"5555555555",weekly:false,daily:true},undefined);
            const newMovie = await Movie.add("Dracula",8.3,new Date(),520234);
            await Suggestion.add("Dracula",8.3,newUser[0],newMovie[0]);
            const results = await Suggestion.findByUserId(newUser[0]);
            assert.isArray(results);
            assert.equal(results.length, 1);
        });
    });
});