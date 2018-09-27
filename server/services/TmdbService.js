const rp = require('request-promise');
const moment = require('moment');

const TMDB_API_KEY = process.env.API_KEY;

const TMDB_BASE_URI = 'https://api.themoviedb.org/3';

function getGenres() {
    const options = {
        uri: `${TMDB_BASE_URI}/genre/movie/list?language=en-US`,
        qs: {
            api_key: TMDB_API_KEY
        },
        json: true
    }
    return rp(options)
    .then((genreResponse) => {
        return genreResponse.genres;
    });
}

function getEnglishMoviesReleasedToday() {
    // Supporting multiple release types and multiple regions
    // means expanding how movies are stored in a troublesome way
    // This will have to be held off for the future
   const options = {
        uri: `${TMDB_BASE_URI}/discover/movie?`,
        qs: {
            api_key: TMDB_API_KEY,
            language: 'en-US', // specific language offered
            region: 'US',
            include_adult: false, // keeps adult videos out of results
            include_video: false, // keeps random videos out of results
            'release_date.gte': moment().utc().format('YYYY-MM-DD'),
            'release_date.lte': moment().utc().format('YYYY-MM-DD'), // videos released later than date in form of YYYY-MM-DD
            'vote_count.gte': 10, // keeps videos with greater than this threshold of ratings
            'vote_average.gte': 1, // keeps videos with greater than 0-10 (actually represents a 0-100 rating)
            with_release_type: 4 // Escaped 4|5 (meaning only digital (4) and physical release (5))
        },
        json: true
    };
    return rp(options)
    .then((moviesResponse) => {
        return moviesResponse.results;
    });
}

function getMovieDetails(movieId) {
   const options = {
        uri: `${TMDB_BASE_URI}/movie/${movieId}?`,
        qs: {
            api_key: TMDB_API_KEY,
            language: 'en-US', // specific language offered
        },
        json: true
    };
    return rp(options)
    .then((movieDetails) => {
        return movieDetails;
    });
}

// fully filtered api request
//https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=vote_average.desc&include_adult=false&include_video=false&page=1&release_date.gte=2018-09-01&vote_count.gte=10&vote_average.gte=8&with_release_type=4%7C5

function getMoviesByFilters(cb) {
    const options = {
        uri: `${TMDB_BASE_URI}/discover/movie?`,
        qs: {
            api_key: TMDB_API_KEY,
            language: 'en-US', // specific language offered
            'sort-by': 'vote_average.desc', // ordered by rating highest to lowest
            include_adult: false, // keeps adult videos out of results
            include_video: false, // keeps random videos out of results
            'release_date.gte': '2018-09-01', // videos released later than date in form of YYYY-MM-DD
            'vote_count.gte': 10, // keeps videos with greater than this threshold of ratings
            'vote_average.gte': 8, // keeps videos with greater than 0-10 (actually represents a 0-100 rating)
            with_release_type: '4%7C5' // Escaped 4|5 (meaning only digital and physical release)
        },
        json: true
    }
    rp(options)
    .then((genreResponse) => {
        return genreResponse.genres;
    })
    .then(cb)
    .catch((error) => {
        throw error;
    });
}

const TMDB = {
    getGenres,
    getEnglishMoviesReleasedToday,
    getMovieDetails
};

module.exports = TMDB;