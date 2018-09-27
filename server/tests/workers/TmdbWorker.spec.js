const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');

const Genre = require('../../models/Genre');
const Movie = require('../../models/Movie');
const MovieGenre = require('../../models/MovieGenre');
const TmdbService = require('../../services/TmdbService');
const TmdbWorker = require('../../workers/TmdbWorker');

const validGenres = [
    {
        id: 5392,
        name: 'Adventure'
    },
    {
        id: 843,
        name: 'Comedy'
    }
];

const MoviesFromDB = [
    {
        id: 7,
        title: 'Angels in the Outfield',
        rating: 5.4,
        release_date: new Date(),
        tmdb_key: 234
    }
];

const movieReleasesResultFromTmdb = [
    {
        id: 5834,
        title: 'Angels in the Outfield',
        rating: 5.4,
        release_date: new Date()
    }
];

const movieDetailsResultFromTmdb = {
    id: 234,
    title: "Angels in the Outfield",
    vote_average: 5.4,
    release_date: new Date(),
    imdb_id: 59232
}

describe('Tmdb Worker', () => {
    describe('retrieveGenresForUpdate', () => {

        beforeEach(() => {
            this.sandbox = sinon.createSandbox();
        });
    
        afterEach(() => {
            this.sandbox.restore();
        });

        it('should attempt add a genres to the database if missing', async () => {
            const genreAddFake = sinon.fake.returns(true);
            this.sandbox.replace(Genre, 'all', ()=>[]);
            this.sandbox.replace(TmdbService, 'getGenres', ()=>validGenres);
            this.sandbox.replace(Genre, 'add', genreAddFake);
            await TmdbWorker.retrieveGenresForUpdate();

            assert.equal(genreAddFake.callCount, 2);
        });

        it('should attempt add a genres to the database if missing', async () => {
            const genreUpdateFake = sinon.fake.returns(true);
            this.sandbox.replace(Genre, 'all', ()=>validGenres);
            this.sandbox.replace(TmdbService, 'getGenres', ()=>validGenres);
            this.sandbox.replace(Genre, 'update', genreUpdateFake);
            await TmdbWorker.retrieveGenresForUpdate();

            assert.equal(genreUpdateFake.callCount, 2);
        });
    });

    describe('retrieveEnglishMoviesReleasedDaily', () => {

        beforeEach(() => {
            this.sandbox = sinon.createSandbox();
        });
    
        afterEach(() => {
            this.sandbox.restore();
        });

        it('should not attempt to add movies if the already exist', async () => {
            const movieAddFake = sinon.fake.returns(true);
            const getMovieDetailsFake = sinon.fake.returns({});
            this.sandbox.replace(TmdbService, 'getEnglishMoviesReleasedToday', ()=> movieReleasesResultFromTmdb);
            this.sandbox.replace(TmdbService, 'getMovieDetails', getMovieDetailsFake);
            this.sandbox.replace(Movie, 'findByTmdbKey', ()=>[{id:5834,name:"Angels in the Outfield"}]);
            this.sandbox.replace(Movie, 'add', movieAddFake);
            await TmdbWorker.retrieveEnglishMoviesReleasedDaily();

            assert.equal(movieAddFake.callCount, 0);
            assert.equal(getMovieDetailsFake.callCount, 0);
        });

        it('should attempt to add a movie if it is missing', async () => {
            const movieAddFake = sinon.fake.returns([2]);
            const getMovieDetailsFake = sinon.fake.returns({});
            this.sandbox.replace(TmdbService, 'getEnglishMoviesReleasedToday', ()=> movieReleasesResultFromTmdb);
            this.sandbox.replace(TmdbService, 'getMovieDetails', getMovieDetailsFake);
            this.sandbox.replace(Movie, 'findByTmdbKey', ()=>[]);
            this.sandbox.replace(Movie, 'add', movieAddFake);
            this.sandbox.replace(Genre,'findByTMDBId', () => [3]);
            this.sandbox.replace(MovieGenre,'add', ()=>true);

            await TmdbWorker.retrieveEnglishMoviesReleasedDaily();

            assert.equal(movieAddFake.callCount, 1);
            assert.equal(getMovieDetailsFake.callCount, 1);
        });

        it('should attempt to add a movies genres if included', async () => {
            const findByTMDBIdFake = sinon.fake.returns([3]);
            const movieGenreAddFake = sinon.fake.returns(true);
            const genreReturn = {genres: validGenres};
            this.sandbox.replace(TmdbService, 'getEnglishMoviesReleasedToday', ()=> movieReleasesResultFromTmdb);
            this.sandbox.replace(TmdbService, 'getMovieDetails', () => genreReturn);
            this.sandbox.replace(Movie, 'findByTmdbKey', ()=>[]);
            this.sandbox.replace(Movie, 'add', () => [2]);
            this.sandbox.replace(Genre, 'findByTMDBId', findByTMDBIdFake);
            this.sandbox.replace(MovieGenre,'add', movieGenreAddFake);

            await TmdbWorker.retrieveEnglishMoviesReleasedDaily();

            assert.equal(findByTMDBIdFake.callCount, 2);
            assert.equal(movieGenreAddFake.callCount, 2);
        });
    });
});